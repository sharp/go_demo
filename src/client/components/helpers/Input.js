import React, {Component, PropTypes} from 'react';
import css from 'react-css-modules';
import styles from '../../styles/input.css';

export class Input extends Component {
  static propTypes = {
    type: PropTypes.string,
    onBlur: PropTypes.any
  };
  constructor(props, context) {
    super(props, context);
    this.state = {value: props.value};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    const {type = 'text', onBlur} = this.props;
    return (
      <input
        type={type}
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
        onBlur={onBlur}
        styleName={`input-type-${type}`}/>
    );
  }
}

export default css(Input, styles);
