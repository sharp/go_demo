import React, {Component, PropTypes} from 'react';
import {Map, List} from 'immutable';
import css from 'react-css-modules';
import styles from '../../styles/thread.css';
import Card from './Card';
import Feed from './Feed';
import Button from './Button';
import Field from './Field';
import randomString from '../../../shared/utils/randomString';

export class Thread extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    entries: PropTypes.instanceOf(List).isRequired,
    options: PropTypes.object
  };
  render() {
    const {type, entries = [], options = {}} = this.props;
    return (
      <div styleName="container">
        {entries.map(entry => {
          const clean = {
            key: (Map.isMap(entry) && entry.get('id')) || randomString(),
            entry,
            options
          };

          switch (type) {
          case 'card':
            return (
              <Card {...clean} />
            );
          case 'feed':
            return (
              <Feed {...clean} />
            );
          case 'button':
            return (
              <Button {...clean} />
            );
          case 'field':
            return (
              <Field {...clean} />
            );
          default:
            return (
              null
            );
          }
        })}
      </div>
    );
  }
}

export default css(Thread, styles);
