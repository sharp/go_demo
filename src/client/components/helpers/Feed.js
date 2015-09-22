import React, {Component, PropTypes} from 'react';
import css from 'react-css-modules';
import {Map} from 'immutable';
import styles from '../../styles/feed.css';
import Icon from './Icon';

export class Feed extends Component {
  static propTypes = {
    entry: PropTypes.instanceOf(Map).isRequired
  };

  render() {
    const {entry} = this.props;
    const type = entry.get('type');
    const msg = entry.get('msg');
    return (
      <div styleName="container">
        <div styleName={type}>
          <div styleName={
            (msg)
              ? 'header-no-bottom'
              : 'header'
          }>
            <div styleName={`header-${type}`}>
              <div>
                <Icon type={entry.get('icon')}/>
              </div>
              <div styleName={`title-${type}`}>{entry.get('title')}</div>
            </div>
          </div>
          {(msg)
            ? <div styleName={`supporting-${type}`}>
                {msg}
              </div>
            : null}
        </div>
      </div>
    );
  }
}

export default css(Feed, styles);
