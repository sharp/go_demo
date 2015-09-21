import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import css from 'react-css-modules';
import Icon from './helpers/Icon';
import styles from '../styles/header.css';

class Header extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    })
  };

  renderNav(path) {
    if (path === '/') {
      return (
        <div styleName="tab-empty"></div>
      );
    }
    return (
      <Link styleName="link" to="/">
        <div styleName="tab-container">
          <div styleName="tab">
            <div styleName="icon">
              <Icon type="arrow-back" size="32"/>
            </div>
            <div styleName="title">
              <div>Back</div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  render() {
    return (
      <div>
        {/* TODO: if `phone` only */}
        {/* <div styleName="top-space"></div> */}
        <Link styleName="link" to="/">
          <div styleName="tab-container">
            <div styleName="tab-full">
              <div styleName="icon">
                <Icon type="logo" size="32"/>
              </div>
              <div styleName="title">
                <div>Typeform Builder</div>
              </div>
            </div>
          </div>
        </Link>
        {this.renderNav(this.props.location.pathname)}
      </div>
    );
  }
}

export default css(Header, styles);
