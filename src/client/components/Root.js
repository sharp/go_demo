import React, {Component} from 'react';
import {Provider} from 'react-redux';
import setStore from '../../shared/setStore';

const store = setStore();

export default class Root extends Component {
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
