import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import io from 'socket.io-client';

// Reducers.
import form, {
  actionSetReference as setFormReference,
  actionSetCollection as setFormCollection
} from '../../shared/reducers/form';
import feed, {
  actionSetList as setFeedList
} from '../../shared/reducers/feed';

// Middleware.
import emitClientAction from '../../shared/middleware/emitClientAction';

import setStore from '../../shared/setStore';
import Header from './Header';

const socket = io(`${location.protocol}//${location.hostname}:8090`);

const store = setStore(
  [emitClientAction(socket)],
  {feed, form}
);

socket.on('hydrate', state => {
  store.dispatch(setFormReference(state.form.reference.fields));
  store.dispatch(setFormCollection(state.form.collection));
  store.dispatch(setFeedList(state.feed.list));
});

socket.on('action', action => store.dispatch(action));

export default class Root extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <Provider store={store}>
        <div>
          <Header {...this.props}/>
          {this.props.children}
        </div>
      </Provider>
    );
  }
}
