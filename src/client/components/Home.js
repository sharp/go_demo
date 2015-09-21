import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actionAdd as addForm} from '../../shared/reducers/form';
import View from './helpers/View';
import Panel from './helpers/Panel';
import Thread from './helpers/Thread';

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
      <View>
          <Thread type="fail" entries={[]}/>
        <Panel type="three_one-first">
        </Panel>
          <Thread type="fail" entries={[]}/>
        <Panel type="three_one-second">
        </Panel>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Home);
