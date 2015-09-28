import {Record, Map, fromJS} from 'immutable';
import ensure from '../utils/ensureEntryIsValidAndImmutable';
import randomString from '../utils/randomString';

// Shape.
// ----------------------------------
export const FieldEntry = new Record({
  id: '',
  formId: '',
  required: false,
  created_at: Date.now(),
  content: new Map()
});

export const FormEntry = new Record({
  id: '',
  name: '',
  description: null,
  created_at: Date.now(),
  fields: new Map(),
  result: new Map()
});

const InitialState = new Record({
  reference: new Map(),
  collection: new Map()
});

export const initialState = new InitialState;

// Actions types.
// ----------------------------------
export const SET_REFERENCE = 'form/SET_REFERENCE';
export const SET_COLLECTION = 'form/SET_COLLECTION';
export const ADD = 'form/ADD';
export const REMOVE = 'form/REMOVE';
export const ADD_FIELD = 'form/ADD_FIELD';
export const REMOVE_FIELD = 'form/REMOVE_FIELD';
export const MERGE_IN = 'form/MERGE_IN';
export const REMOVE_IN = 'form/REMOVE_IN';

// Actions.
// ----------------------------------
export const actionSetReference =
    msg => ({type: SET_REFERENCE, msg});

export const actionSetCollection =
    msg => ({type: SET_COLLECTION, msg});

export const actionAdd =
    msg => ({type: ADD, msg});

export const actionRemove =
    msg => ({type: REMOVE, msg});

export const actionAddField =
  (id, value) => ({type: ADD_FIELD, msg: {id, value}});

export const actionRemoveField =
  (path, value) => ({type: REMOVE_IN, msg: {id, value}});

export const actionMergeIn =
  (path, value) => ({type: MERGE_IN, msg: {path, value}});

export const actionRemoveIn =
  (path, value) => ({type: REMOVE_IN, msg: {path, value}});

// Utils.
// ----------------------------------

/**
 * extractShapeFromReference()
 *
 * it keep:
 * reference -> name as Model -> type
 * reference -> * -> value as Model -> *
 *
 * Example: shape returned for type is `short_text`:
 *
 * FROM:
 *  {
 *    type: {
 *      type: 'string',
 *      value: '',
 *      required: true
 *    },
 *    question: {
 *      type: 'string',
 *      value: '',
 *      required: true
 *    },
 *    description: {
 *      type: 'string',
 *      value: null,
 *      required: false
 *    }
 *  }
 *
 * TO:
 *  {
 *    type: 'short_text',
 *    question: '',
 *    description: null
 *  }
 *
 * @param reference {Object} Current field reference.
 * @param type {String} Current field type.
 * @returns {Object}
 */
export const extractShapeFromReference =
  (reference, type) => {
    return reference.withMutations(container => {
      container
        .keySeq()
        .forEach(key => {
          if (key === 'type') {
            return container.set('type', type);
          }
          return container.set(key, container.getIn([key, 'value']));
        });
    });
  };

/**
 * defineFieldModelsFromReference()
 *
 * Example: Models returned:
 *
 *  Map {
 *    short_text: Record {
 *      type: 'short_text',
 *      question: '',
 *      description: null
 *    },
 *    long_text: Record(...),
 *    multiple_choice: Record(...),
 *    picture_choice: Record(...),
 *    ...
 *  }
 * @param reference {Object} GLobal fields references.
 * @returns {Object}
 */
export const defineFieldModelsFromReference =
  reference => {
    return reference
      .keySeq()
      .reduce((acc, current) => {
        const ensureImmutable = fromJS(reference.get(current));
        const shape = extractShapeFromReference(ensureImmutable, current);
        return acc.set(current, new Record(shape.toObject()));
      }, new Map);
  };


// Methods.
// ----------------------------------

/**
 * setReference()
 *
 * Store value and build corresponding models (only `fields` atm).
 *
 * @param state {Object}
 * @param value {Object}
 * @returns {Object}
 */
export const setReference =
  (state, value) => {
    const ensureImmutable = fromJS(value);

    return state.withMutations(container => {
      // Store fields reference.
      container.setIn(['reference', 'fields'], ensureImmutable);

      // Define and then store fields models.
      container.setIn(
        ['reference', 'models', 'fields'],
        defineFieldModelsFromReference(ensureImmutable)
      );
    });
  };

/**
 * setCollection()
 *
 * Set a new form collection.
 *
 * Even if server side shares the same shape, constructing each
 * entry allow us to get data from externals sources without
 * breaking things. It's also needed as models are builds
 * according to reference.
 *
 * TODO: reference HAVE TO BE set BEFORE collection.
 * -> be sure that happened or throw err?
 *
 * @param state {Object}
 * @param value {Object}
 * @returns {Object}
 */
export const setCollection =
  (state, value) => {
    const ensureImmutable = fromJS(value);

    const result = ensureImmutable.reduce((acc, current) => {
      const initial = current.withMutations(container => {
        const formId = container.get('id');
        const fields = container.get('fields');

        return fields
          .keySeq()
          .forEach(id => {
            const path = ['fields', id];
            const field = container.getIn(path);
            const content = field.get('content');
            const Model = state.getIn(['reference', 'models', 'fields', content.get('type')]);

            if (!Model) {
              throw new Error(
                `Form -> reference -> models -> fields -> ${content.get('type')} should be defined.`
              );
            }

            container.setIn(['fields', id], new FieldEntry({
              id,
              formId,
              created_at: field.get('created_at') || Date.now(),
              content: new Model(content.toObject())
            }));
          });
      });
      return acc.set(initial.get('id'), new FormEntry({
        id: initial.get('id'),
        name: initial.get('name'),
        description: initial.get('description'),
        created_at: initial.get('created_at'),
        fields: initial.get('fields'),
        result: initial.get('result')
      }));
    }, new Map);

    return state.set('collection', result);
  };

/**
 * add()
 *
 * Add a new form to the collection.
 *
 * TODO: handle add a form with existing fields.
 * form -> fields aren't set using FieldEntry Model if provided,
 * that is not expected.
 *
 * @param state {Object}
 * @param value {Object}
 * @returns {Object}
 */
export const add =
  (state, value) => {
    const initial = fromJS(value);

    // Ensure that fields match related models.
    const final = initial.withMutations(container => {
      const fields = container.getIn(['fields'], new Map());

      return fields
        .keySeq()
        .forEach(fieldId => {
          const currentField        = container.getIn(['fields', fieldId]);
          const currentFieldContent = container.getIn(['fields', fieldId, 'content']);
          const currentType         = container.getIn(['fields', fieldId, 'content', 'type']);

          const Model = state.getIn(['reference', 'models', 'fields', currentType]);

          container.setIn(['fields', fieldId], new FieldEntry({
            id: fieldId,
            formId: container.get('id'),
            created_at: currentField.get('created_at') || Date.now(),
            content: new Model(currentFieldContent)
          }));
        });
    });


    return state.update('collection', new Map(),
      current => current.set(final.get('id'), new FormEntry(final))
    );
  };

/**
 * remove()
 *
 * Remove a form in the collection.
 *
 * @param state {Object}
 * @param value {Object}
 * @returns {Object}
 */
export const remove =
  (state, value) => {
    const ensureImmutable = fromJS(value);
    return state.update('collection', new Map(),
        current => current.delete(ensureImmutable.get('id'))
    );
  };

/**
 * addField()
 *
 * Add a new field entry to a specific form using related field model.
 *
 * @param state {Object}
 * @param formId {String}
 * @param value {Object}
 * @returns {Object}
 */
export const addField =
  (state, formId, value) => {
    const ensureImmutable = fromJS(value);

    if (!state.hasIn(['collection', formId])) {
      throw new Error(
        `Form -> collection -> ${formId} not found.`
      );
    }

    return state.updateIn(['collection', formId, 'fields'],
      current => {
        const fieldId = (ensureImmutable.has('id'))
          ? ensureImmutable.get('id')
          : randomString();

        const Model = state.getIn(['reference', 'models', 'fields', ensureImmutable.getIn(['content', 'type']) || ensureImmutable.get('type')]);

        return current.set(fieldId, new FieldEntry({
          id: fieldId,
          formId,
          content: new Model(ensureImmutable.get('content') && ensureImmutable.get('content').toObject())
        }));
      }
    );
  };

/**
 * removeField()
 *
 * @param state {Object}
 * @param formId {String}
 * @param fieldId {String}
 */
export const removeField =
  (state, formId, fieldId) => {
    return state.deleteIn(['collection', formId, 'fields', fieldId]);
  };

// TODO: update as it don't follow the model.
// You can update without restriction, that is not expected.
// This method is actually in use, and so still exported to not
// break everything. But should not be public at the end.
export const mergeIn =
  (state, path, value) => {
    const ensureImmutable = fromJS(value);
    return state.updateIn(['collection', ...path], new Map(),
      current => current.merge(ensureImmutable)
    );
  };

export const removeIn =
  (state, path) => state.deleteIn(['collection', ...path]);

// Reducer.
// ----------------------------------
export default function form(state = initialState, action = {}) {
  switch (action.type) {
  case SET_REFERENCE:
    return setReference(state, action.msg);
  case SET_COLLECTION:
    return setCollection(state, action.msg);
  case ADD:
    return add(state, action.msg);
  case REMOVE:
    return remove(state, action.msg);
  case ADD_FIELD:
    return addField(state, action.msg.id, action.msg.value);
  case REMOVE_FIELD:
    return removeField(state, action.msg.formId, action.msg.fieldId);
  case MERGE_IN:
    const {type, ready, result, msg: {path, value}} = action;
    const obj = {
      path,
      value: {
        ...value,
        result
      }
    };
    const update =
      (ready)
        ? {type, msg: obj}
        : action;
    return mergeIn(state, update.msg.path, update.msg.value);
  case REMOVE_IN:
    return removeIn(state, action.msg.path, action.msg.value);
  default:
    return state;
  }
}
