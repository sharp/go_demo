import React, {Component, PropTypes} from 'react';
import {Map} from 'immutable';
import css from 'react-css-modules';
import styles from '../../styles/field.css';
import Icon from './Icon';
import Input from '../helpers/Input';

const onBlur = (path, actions, name) => event => {
  const {mergeInForm} = actions;
  const value = event.target.value;
  return mergeInForm(path, new Map({[name]: value}));
};

const generateInputs =
  (actions, path, entry) => {
    return Object.keys(entry.toObject()).map(current => {
      switch (current) {
      case 'question':
      case 'description':
      case 'choices':
        return (
          <Input
            key={entry.get('id') + current}
            type="text"
            value={entry.get(current)}
            onBlur={onBlur(path, actions, current)}/>
        );
      // TODO: handle w/ check box
      case 'required':
        return null;
      default:
        return null;
      }
    });
  };

export class Field extends Component {
  static propTypes = {
    entry: PropTypes.instanceOf(Map).isRequired,
    options: PropTypes.shape({
      actions: PropTypes.object
    })
  };

  constructor(props, context) {
    super(props, context);
    this.state = {open: false};
  }

  toggle() {
    this.setState({open: !this.state.open });
  }

  render() {
    const {open} = this.state;
    const {entry, options: {actions}} = this.props;

    const formId = entry.get('formId');
    const fieldId = entry.get('id');
    const path = [formId, 'fields', fieldId];

    return (
      <div styleName="container">
        <div styleName="base">

          {/* Header */}
          <div styleName={(open) ? 'header-no-bottom' : 'header'}>

            {/* Details */}
            <div styleName="header-container">
              <div styleName="header-content">
                <Icon type={entry.get('type')} size="20" />
                {(open)
                  ? null
                  : <div styleName="header-title">
                      {entry.get('question')}
                    </div>
                }
              </div>
            </div>

            {/* UI */}
            {/* TODO: make component for that when all */}
            <div onClick={() => this.toggle()} styleName="header-ui-elem">
              <div styleName="header-ui-elem-icon">
                <Icon type={(open) ? 'expand-less' : 'expand-more'} size="20" />
              </div>
            </div>
            <div onClick={() => actions.removeInForm([formId, 'fields', fieldId])} styleName="header-ui-elem">
              <div styleName="header-ui-elem-icon">
                <Icon type="delete" size="20" />
              </div>
            </div>

          </div>

          {/* Inputs */}
          {(open)
            ? <div styleName="inputs-container">
                {generateInputs(actions, path, entry)}
              </div>
            : null
          }
        </div>
      </div>
    );
  }
}

export default css(Field, styles);
