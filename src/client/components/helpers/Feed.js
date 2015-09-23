import React, {Component, PropTypes} from 'react';
import css from 'react-css-modules';
import {Record} from 'immutable';
import styles from '../../styles/feed.css';
import Icon from './Icon';

export class Feed extends Component {
  static propTypes = {
    entry: PropTypes.instanceOf(Record).isRequired
  };

  render() {
    const {entry} = this.props;
    const type = entry.getIn(['content', 'type']);
    const text = entry.getIn(['content', 'text']);

    return (
      <div styleName="container">
        <div styleName={type}>
          <div styleName={
            (text)
              ? 'header-no-bottom'
              : 'header'
          }>
            <div styleName={`header-${type}`}>
              <div>
                <Icon type={entry.getIn(['content', 'icon'])}/>
              </div>
              <div styleName={`title-${type}`}>{entry.getIn(['content', 'title'])}</div>
            </div>
          </div>
          {(text)
            ? <div styleName={`supporting-${type}`}>
                {text}
              </div>
            : null}
        </div>
      </div>
    );
  }
}

export default css(Feed, styles);
