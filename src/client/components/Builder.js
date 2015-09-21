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

  render() {
    return (
      <View>
        <Panel type="half-first">
          left
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
