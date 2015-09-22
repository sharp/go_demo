import React, {Component, PropTypes} from 'react';
import css from 'react-css-modules';
import styles from '../../styles/view.css';

class View extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return (
      <div styleName="container">
        {this.props.children}
      </div>
    );
  }
}

export default css(View, styles);
