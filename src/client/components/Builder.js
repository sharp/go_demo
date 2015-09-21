import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import uuid from 'node-uuid';
import {Map} from 'immutable';
import {actionMergeIn as mergeInForm} from '../../shared/reducers/form';
import View from './helpers/View';
import Panel from './helpers/Panel';
import Thread from './helpers/Thread';

// Select state to use.
const mapStateToProps =
  state => ({
    form: state.form
  });

// Pick available actions.
// form -> actions -> mergeIn
const mapDispatchToProps =
  dispatch => ({
    actions: bindActionCreators({mergeInForm}, dispatch)
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

class Builder extends Component {
  static propTypes = {
    builder: PropTypes.shape({
      form: PropTypes.instanceOf(Map).isRequired
    }).isRequired,
    params: PropTypes.object
  };

  addFieldToForm(field) {
    const {builder, params: {id}} = this.props;
    const __uuid = uuid.v4();
    return builder.actions.mergeInForm(
      [id, 'fields', __uuid],
      field
        .set('formId', id)
        .set('id', __uuid)
    );
  }
  render() {
    const {builder: {form}} = this.props;
    return (
      <View>
        <Panel type="half-first">
          <Thread
            type="button"
            entries={form.get('reference').toList().take(6)}
            options={{
              onClick: entry => this.addFieldToForm(entry)
            }}/>
        </Panel>
        <Panel type="half-second">
          right
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
