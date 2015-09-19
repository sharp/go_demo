import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actionAdd as addForm} from '../../shared/reducers/form';

// Select state to use.
const mapStateToProps =
  state => ({
    form: state.form,
    answer: state.answer
  });

// Pick available actions.
// form -> actions -> add
const mapDispatchToProps =
  dispatch => ({
    actions: bindActionCreators({addForm}, dispatch)
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

class Home extends Component {
  render() {
    return (
      <div>Home</div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Home);
