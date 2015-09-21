import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import {
  actionSetReference as setFormReference,
  actionSetCollection as setFormCollection
} from '../../shared/reducers/form';
import setStore from '../../shared/setStore';

const socket = io(`${location.protocol}//${location.hostname}:8090`);
const store = setStore();

socket.on('state', state => {
  store.dispatch(setFormReference(state.form.reference));
  store.dispatch(setFormCollection(state.form.collection));
});

export default class Root extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <Provider store={store}>
        <div>
          {this.props.children}
        </div>
      </Provider>
    );
  }
}
