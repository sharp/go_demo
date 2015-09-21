import React, {Component, PropTypes} from 'react';

export const select =
  type => {
    switch (type) {
    case 'cloud-done':
      return (
        <g><path d="M19.35 10.04c-.68-3.45-3.71-6.04-7.35-6.04-2.89 0-5.4 1.64-6.65 4.04-3.01.32-5.35 2.87-5.35 5.96 0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zm-9.35 6.96l-3.5-3.5 1.41-1.41 2.09 2.08 5.18-5.17 1.41 1.41-6.59 6.59z"></path></g>
      );
    case 'info-outline':
      return (
        <g><path d="M11 17h2v-6h-2v6zm1-15c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11h2v-2h-2v2z"></path></g>
      );
    case 'check':
      return (
        <g><path d="M9 16.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z"></path></g>
      );
    case 'grade':
      return (
        <g><path d="M12 17.27l6.18 3.73-1.64-7.03 5.46-4.73-7.19-.61-2.81-6.63-2.81 6.63-7.19.61 5.46 4.73-1.64 7.03z"></path></g>
      );
    case 'arrow-back':
      return (
        <g><path d="M20 11h-12.17l5.59-5.59-1.42-1.41-8 8 8 8 1.41-1.41-5.58-5.59h12.17v-2z"></path></g>
      );
    case 'logo':
      return (
        <g><path d="M20 2h-16c-1.1 0-1.99.9-1.99 2l-.01 18 4-4h14c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zm-11 9h-2v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"></path></g>
      );
    case 'messenger':
    default:
      return (
        <g><path d="M20 2h-16c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2z"></path></g>
      );
    }
  };

export class Icon extends Component {
  static propTypes = {
    size: PropTypes.string,
    type: PropTypes.string
  };

  render() {
    const {size = 24, type} = this.props;
    const style = {
      fill: 'currentcolor',
      verticalAlign: 'middle',
      width: size,
      height: size
    };
    return (
      <svg
        viewBox="0 0 24 24"
        preserveAspectRatio="xMidYMid meet"
        fit
        style={style}>
        {select(type)}
      </svg>
    );
  }
}

export default Icon;
