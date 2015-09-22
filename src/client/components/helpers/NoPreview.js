import React, {Component, PropTypes} from 'react';
import css from 'react-css-modules';
import styles from '../../styles/nopreview.css';
import Icon from './Icon';

export class NoPreview extends Component {
  static propTypes = {
    height: PropTypes.number.isRequired
  };

  render() {
    return (
      <div style={{height: this.props.height}} styleName="container">
        <div styleName="message-container">
          <Icon type="expand-less" size="48"/>
          <div styleName="message">no preview...</div>
          <div styleName="message">Use the update menu above to see it !</div>
        </div>
      </div>
    );
  }
}

export default css(NoPreview, styles);
