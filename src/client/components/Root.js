import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import setStore from '../../shared/setStore';

const store = setStore();

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
