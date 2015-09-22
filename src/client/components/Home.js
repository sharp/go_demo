import React, {Component, PropTypes} from 'react';
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
    feed: state.feed
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
  static propTypes = {
    builder: PropTypes.object.isRequired
  };

  render() {
    const {builder: {form, feed}} = this.props;
    return (
      <View>
        <Panel type="three_one-first">
          <Thread
            type="card"
            entries={form.get('collection').toList()}
            options={{link: {baseUrl: 'form'}}}/>
        </Panel>
        <Panel type="three_one-second">
          <Thread
            type="feed"
            entries={feed.sortBy(n => n.get('count')).reverse()}/>
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
