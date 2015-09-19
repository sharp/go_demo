import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actionMergeIn as mergeInForm} from '../../shared/reducers/form';

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
  render() {
    return (
      <div>Builder</div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Builder);
