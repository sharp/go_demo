import React, {Component, PropTypes} from 'react';
import css from 'react-css-modules';
import styles from '../../styles/thread.css';

export class Thread extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    entries: PropTypes.array.isRequired
  };
  render() {
    const {type, entries = []} = this.props;
    return (
      <div styleName="container">
        {entries.map(entry => {
          switch (type) {
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
