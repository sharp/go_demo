import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Record} from 'immutable';
import css from 'react-css-modules';
import styles from '../../styles/card.css';

export class Card extends Component {
  static propTypes = {
    entry: PropTypes.instanceOf(Record).isRequired,
    options: PropTypes.shape({
      link: PropTypes.shape({
        baseUrl: PropTypes.string
      })
    })
  };

  render() {
    const {entry, options = {}} = this.props;
    const name = entry.get('name');
    const description = entry.get('description');

    return (
      <div styleName="base">
        {(description)
          ? (
            <div>
              <div styleName="title-no-bottom">{name}</div>
              <div styleName="supporting">{description}</div>
            </div>
          )
          : (
            <div>
              <div styleName="title">{name}</div>
            </div>
          )
        }

        {(options.link)
          ? (
            <div styleName="actions-border">
              <Link to={`/${options.link.baseUrl}/${entry.get('id')}`} styleName="button">View Form</Link>
            </div>
          )
          : null
        }
      </div>
    );
  }
}

export default css(Card, styles);
