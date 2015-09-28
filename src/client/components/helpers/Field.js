import React, {Component, PropTypes} from 'react';
import {Record} from 'immutable';
import css from 'react-css-modules';
import styles from '../../styles/field.css';
import Icon from './Icon';
import Input from '../helpers/Input';

const onBlur = (actions, entry, name) => event => {
  const {addFieldInForm} = actions;
  const value = event.target.value;
  const result = entry.setIn(['content', name], value);
  return addFieldInForm(entry.get('formId'), result);
};

const generateInputs =
  (actions, formId, entry) => {
    return Object.keys(entry.get('content').toObject()).map(current => {
      switch (current) {
      case 'question':
      case 'description':
      case 'choices':
        return (
          <Input
            key={entry.get('id') + current}
            type="text"
            value={entry.getIn(['content', current])}
            onBlur={onBlur(actions, entry, current)}/>
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
    entry: PropTypes.instanceOf(Record).isRequired,
    options: PropTypes.shape({
      actions: PropTypes.object
    })
  };

  constructor(props, context) {
    super(props, context);
    this.state = {open: true};
  }

  toggle() {
    this.setState({open: !this.state.open });
  }

  render() {
    const {open} = this.state;
    const {entry, options: {actions}} = this.props;
    const formId = entry.get('formId');
    const fieldId = entry.get('id');

    return (
      <div styleName="container">
        <div styleName="base">

          {/* Header */}
          <div styleName={(open) ? 'header-no-bottom' : 'header'}>

            {/* Details */}
            <div styleName="header-container">
              <div styleName="header-content">
                <Icon type={entry.getIn(['content', 'type'])} size="20" />
                {(open)
                  ? null
                  : <div styleName="header-title">
                      {entry.getIn(['content', 'question'])}
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
                {generateInputs(actions, formId, entry)}
              </div>
            : null
          }
        </div>
      </div>
    );
  }
}

export default css(Field, styles);
