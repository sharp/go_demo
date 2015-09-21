import React, {Component, PropTypes} from 'react';
import css from 'react-css-modules';
import {Map} from 'immutable';
import styles from '../../styles/button.css';

export const Inner = ({entry}) => {
  return (
    <div>
      <div>{entry.get('name')}</div>
    </div>
  );
};

export const Selector = ({entry, action, children}) =>
  <div onClick={() => action(entry)}>
    {children}
  </div>;

export class Button extends Component {
  static propTypes = {
    entry: PropTypes.instanceOf(Map).isRequired,
    options: PropTypes.shape({
      onClick: PropTypes.function
    })
  };

  render() {
    const {entry, options: {onClick}} = this.props;
    return (
      <div styleName="container">
        <div styleName="base">
          <Selector entry={entry} action={onClick}>
            <div styleName="supporting">
              <Inner entry={entry}/>
            </div>
          </Selector>
        </div>
      </div>
    );
  }
}

export default css(Button, styles);
