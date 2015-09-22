import React, {Component, PropTypes} from 'react';
import css from 'react-css-modules';
import {Map} from 'immutable';
import styles from '../../styles/iframe.css';
import NoPreview from '../helpers/NoPreview';

export class Iframe extends Component {
  static propTypes = {
    builder: PropTypes.shape({
      form: PropTypes.instanceOf(Map).isRequired
    }).isRequired,
    entry: PropTypes.instanceOf(Map)
  };
  render() {
    const {builder, entry} = this.props;
    const id = (entry && entry.get('id')) || 'fail';

    const preview = builder.form.getIn(['collection', id, 'result', '_links']);

    function renderIfPreview() {
      if (preview) {
        const link =
          preview
            .filter(n => n.get('rel') === 'form_render')
            .first();
        return (
          <iframe
            src={link && link.get('href')}
            frameBorder="0"
            allowFullScreen
            style={{width: '100%', height: '100%'}}></iframe>
        );
      }

      return (
        <NoPreview height={window.innerHeight - 96}/>
      );
    }

    return (
      <div styleName="container">
        <div style={{height: window.innerHeight - 96}}>
          {renderIfPreview()}
        </div>
      </div>
    );
  }
}

export default css(Iframe, styles);
