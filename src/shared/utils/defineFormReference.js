import {Map, fromJS} from 'immutable';

/**
 * defineFieldShape()
 *
 * Example: result returned for type is `short_text`:
 *
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
 * @param base {Object}
 * @param type {String}
 * @returns {Object}
 */

export const defineFieldShape =
  (base, type) => {
    return base
      .getIn(['fields', type])
      .reduce((acc, current) => {
        return acc.set(current, base.getIn(['properties', current]));
      }, new Map);
  };

/**
 * buildFieldsModelsFromReference()
 *
 * Example: Shapes returned (field `short_text` is expanded):
 *
 *  {
 *    short_test: {
 *      type: {
 *        type: 'string',
 *        value: '',
 *        required: true
 *      },
 *      question: {
 *        type: 'string',
 *        value: '',
 *        required: true
 *      },
 *      description: {
 *        type: 'string',
 *        value: null,
 *        required: false
 *      }
 *    }
 *    long_text: ...,
 *    multiple_choice: ...,
 *    picture_choice: ...,
 *    ...
 *  }
 *
 * @param schema {Object}
 * @returns {Object}
 */
const defineFormReference = schema => {
  const base = fromJS(schema);

  return base
    .get('fields')
    .keySeq()
    .reduce((acc, current) => {
      const shape = defineFieldShape(base, current);
      return acc.set(current, shape);
    }, new Map);
};

export default defineFormReference;
