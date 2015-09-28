import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Record} from 'immutable';
import css from 'react-css-modules';
import {
  actionAdd as addForm
} from '../../shared/reducers/form';
import {update} from '../actions';
import Icon from './helpers/Icon';
import styles from '../styles/header.css';
import randomString from '../../shared/utils/randomString';

// Select state to use.
const mapStateToProps =
  state => ({
    form: state.form
  });

// Pick available actions.
// actions -> update
const mapDispatchToProps =
  dispatch => ({
    actions: bindActionCreators({update, addForm}, dispatch)
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

class Header extends Component {
  static propTypes = {
    builder: PropTypes.shape({
      form: PropTypes.instanceOf(Record).isRequired,
      actions: PropTypes.object.isRequired
    }).isRequired,
    location: PropTypes.object,
    history: PropTypes.object,
    params: PropTypes.object
  };

  addFormToCollection() {
    const id = randomString();
    this.props.builder.actions.addForm({
      id,
      name: 'Enter your title...',
      description: 'Enter your description...'
    });
    this.props.history.pushState(null, `/form/${id}`);
  }

  updateForm() {
    const {builder: {form, actions}, params: {id}} = this.props;
    const currentForm = form.getIn(['collection', id]).toObject();

    // TODO: use a dedicated action for update form, specially because
    // send -> true added like this is not acceptable.
    return actions.addForm({
      ...currentForm,
      send: true
    });
  }

  renderNav(path) {
    if (path === '/') {
      return (
        <div styleName="tab-container">
          <div onClick={() => this.addFormToCollection()} styleName="tab">
            <div styleName="icon-center">
              <div styleName="icon-fix-padding">
                <Icon type="add" size="24"/>
              </div>
              <Icon type="assignment" size="32"/>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div styleName="tab-container">
        <div styleName="tab">
          <Link styleName="link" to="/">
            <div styleName="icon">
              <Icon type="arrow-back" size="32"/>
            </div>
            <div styleName="title">
              <div>Back</div>
            </div>
          </Link>
        </div>
        <div onClick={() => this.updateForm()} styleName="tab">
          <div styleName="icon-center">
            <Icon type="backup" size="32"/>
            <div styleName="icon-fix-padding">
              <Icon type="add" size="24"/>
            </div>
            <Icon type="refresh" size="32"/>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div styleName="container">
        {/* TODO: if `phone` only */}
        {/* <div styleName="top-space"></div> */}
        <div styleName="tab-container">
          <div  styleName="tab">
            <Link styleName="link" to="/">
              <div styleName="icon">
                <Icon type="logo" size="32"/>
              </div>
              <div styleName="title">
                <div>Typeform Builder</div>
              </div>
            </Link>
          </div>
        </div>
        {this.renderNav(this.props.location.pathname)}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(css(Header, styles));
