import React, {Component, PropTypes} from 'react';
import css from 'react-css-modules';
import Icon from './Icon';
import styles from '../../styles/button.css';

export const Inner = ({entry}) => {
  return (
    <div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Icon type="add" size="20" />
        <Icon type={entry.get('type')} size="32" />
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontSize: '1.4rem', padding: '0 0rem', lineHeight: '2.8rem'}}>
          {entry.get('name')}
        </div>
      </div>
    </div>
  );
};

export const Selector = ({entry, action, children}) =>
  <div onClick={() => action(entry)}>
    {children}
  </div>;

export class Button extends Component {
  static propTypes = {
    entry: PropTypes.func.isRequired,
    options: PropTypes.shape({
      onClick: PropTypes.function
    })
  };

  render() {
    const {entry, options: {onClick}} = this.props;
    const e = new entry();
    return (
      <div styleName="container">
        <div styleName="base">
          <Selector entry={e} action={onClick}>
            <div styleName="supporting">
              <Inner entry={e}/>
            </div>
          </Selector>
        </div>
      </div>
    );
  }
}

export default css(Button, styles);
