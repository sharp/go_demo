import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Map, List, Record} from 'immutable';
import {
  actionMergeIn as mergeInForm,
  actionRemoveIn as removeInForm,
  actionAddField as addFieldInForm
} from '../../shared/reducers/form';
import View from './helpers/View';
import Panel from './helpers/Panel';
import Thread from './helpers/Thread';
import Iframe from './helpers/Iframe';
import Input from './helpers/Input';

// Select state to use.
const mapStateToProps =
  state => ({
    form: state.form
  });

// Pick available actions.
// form -> actions -> mergeIn
const mapDispatchToProps =
  dispatch => ({
    actions: bindActionCreators({
      mergeInForm,
      removeInForm,
      addFieldInForm
    }, dispatch)
  });

// Keep clean components props.
const mergeProps =
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    builder: {
      ...stateProps,
      ...dispatchProps
    }
  });

const onBlur = (path, actions, name) => event => {
  const value = event.target.value;
  return actions.mergeInForm(path, new Map({[name]: value}));
};

class Builder extends Component {
  static propTypes = {
    builder: PropTypes.shape({
      form: PropTypes.instanceOf(Record).isRequired
    }).isRequired,
    params: PropTypes.object
  };

  addFieldToForm(field) {
    const {builder, params: {id}} = this.props;
    return builder.actions.addFieldInForm(id, field);
  }

  render() {
    const {builder, params: {id}} = this.props;
    const {form, actions} = builder;
    return (
      <View>
        <Panel type="half-first">
          <div style={{
            margin: '.2rem .4rem .6rem .4rem',
            background: '#fff',
            padding: '1.6rem',
            boxShadow: '0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)'
          }}>
            <Input
              type="text"
              value={form.getIn(['collection', id, 'name'])}
              onBlur={onBlur([id], actions, 'name')}
            />
            <Input
              type="text"
              value={form.getIn(['collection', id, 'description'])}
              onBlur={onBlur([id], actions, 'description')}
            />
          </div>
          {/* TODO: fix this... */}
          <div style={{margin: '.2rem 0 .4rem'}}>
            <Thread
              type="field"
              entries={form.getIn(['collection', id, 'fields'], new List()).toList()}
              options={{actions: actions}}
            />
          </div>
          <Thread
            type="button"
            entries={form.getIn(['reference', 'models', 'fields'], new Map()).toList()}
            options={{
              onClick: entry => this.addFieldToForm(entry)
            }}
          />
        </Panel>
        <Panel type="half-second">
          <Iframe
            builder={builder}
            entry={builder.form.getIn(['collection', id], new Map())}
          />
        </Panel>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Builder);
