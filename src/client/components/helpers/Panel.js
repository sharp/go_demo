import React, {Component, PropTypes} from 'react';
import css from 'react-css-modules';
import styles from '../../styles/panel.css';

class Panel extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    children: PropTypes.any
  };

  render() {
    return (
      <div styleName={this.props.type}>
        {this.props.children}
      </div>
    );
  }
}

export default css(Panel, styles);
