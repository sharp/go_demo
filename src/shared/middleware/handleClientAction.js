import createAction from './../utils/createAction';
import fetch from 'node-fetch';
import {Record} from 'immutable';
import {
  TYPEFORM_API_KEY,
  apiEndpoint
} from '../../server/constants';

// Shapes.
// ----------------------------------

// Commented lines, if provided, need to follow
// Typeform requirements.
// TODO: put defaults, but `webhook_submit_url` will probably go out of the Model.
const Form = new Record({
  title: '',
  fields: []
  //  tags: ['']
  //  design_id: '',
  //  webhook_submit_url: ''
});

// Helpers.
// ----------------------------------
const asyncHandler =
  async (endpoint, options) => {
    return await fetch(endpoint, {...options});
  };

const extractFrom =
  payload => {
    const {name, fields} = payload;
    return new Form({
      title: name,
      fields: Object.keys(fields).map(current => {
        return fields[current].content;
      })
    }).toObject();
  };

// Middleware.
// ----------------------------------
const handleClientAction = store => next => action => {
  if (action.client !== true) return next(action);

  switch (action.type) {
  case 'form/ADD':
    const base = createAction(action, asyncHandler);
    const delegate =
      base(
        `${apiEndpoint}/forms`,
        {
          method: 'POST',
          headers: {'X-API-TOKEN': TYPEFORM_API_KEY},
          body: JSON.stringify(extractFrom(action.msg))
        }
      );
    return next(delegate);
  default:
    return next(action);
  }
};

export default handleClientAction;
