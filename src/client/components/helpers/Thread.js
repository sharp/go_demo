import React, {Component, PropTypes} from 'react';
import {List} from 'immutable';
import css from 'react-css-modules';
import styles from '../../styles/thread.css';
import Card from './Card';
import Feed from './Feed';
import Button from './Button';

export class Thread extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    entries: PropTypes.instanceOf(List).isRequired,
    options: PropTypes.object
  };
  render() {
    const {type, entries = []} = this.props;
    return (
      <div styleName="container">
        {entries.map(entry => {
          switch (type) {
          case 'card':
            return (
              <Card
                key={entry.get('id')}
                entry={entry}
                options={this.props.options} />
            );
          case 'feed':
            return (
              <Feed
                key={entry.get('id')}
                entry={entry} />
            );
          case 'button':
            return (
              <Button
                key={entry.get('type')}
                entry={entry}
                options={this.props.options}/>
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
