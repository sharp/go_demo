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
    case 'rating':
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
    case 'delete':
      return (
        <g><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-12h-12v12zm13-15h-3.5l-1-1h-5l-1 1h-3.5v2h14v-2z"></path></g>
      );
    case 'clear':
      return (
        <g><path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"></path></g>
      );
    case 'backup':
      return (
        <g><path d="M19.35 10.04c-.68-3.45-3.71-6.04-7.35-6.04-2.89 0-5.4 1.64-6.65 4.04-3.01.32-5.35 2.87-5.35 5.96 0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zm-5.35 2.96v4h-4v-4h-3l5-5 5 5h-3z"></path></g>
      );
    case 'cached':
      return (
        <g><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46c1.23.78 2.69 1.24 4.26 1.24 4.42 0 8-3.58 8-8h3l-4-4zm-13 4c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46c-1.23-.78-2.69-1.24-4.26-1.24-4.42 0-8 3.58-8 8h-3l4 4 4-4h-3z"></path></g>
      );
    case 'sync':
      return (
        <g><path d="M12 4v-3l-4 4 4 4v-3c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46c.78-1.23 1.24-2.69 1.24-4.26 0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8l-1.46-1.46c-.78 1.23-1.24 2.69-1.24 4.26 0 4.42 3.58 8 8 8v3l4-4-4-4v3z"></path></g>
      );
    case 'refresh':
      return (
        <g><path d="M17.65 6.35c-1.45-1.45-3.44-2.35-5.65-2.35-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78l-3.22 3.22h7v-7l-2.35 2.35z"></path></g>
      );
    case 'add':
      return (
        <g><path d="M19 13h-6v6h-2v-6h-6v-2h6v-6h2v6h6v2z"></path></g>
      );
    case 'expand-more':
      return (
        <g><path d="M16.59 8.59l-4.59 4.58-4.59-4.58-1.41 1.41 6 6 6-6z"></path></g>
      );
    case 'expand-less':
      return (
        <g><path d="M12 8l-6 6 1.41 1.41 4.59-4.58 4.59 4.58 1.41-1.41z"></path></g>
      );
    // updated
    case 'short_text':
    case 'long_text':
      return (
        <g><path d="M9 4v3h5v12h3v-12h5v-3h-13zm-6 8h3v7h3v-7h3v-3h-9v3z"></path></g>
      );
    case 'multiple_choice':
      return (
        <g><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41 6.34-6.34zm4.24-1.41l-10.58 10.58-4.18-4.17-1.41 1.41 5.59 5.59 12-12-1.42-1.41zm-21.83 7.82l5.59 5.59 1.41-1.41-5.58-5.59-1.42 1.41z"></path></g>
      );
    case 'statement':
      return (
        <g><path d="M6 17h3l2-4v-6h-6v6h3zm8 0h3l2-4v-6h-6v6h3z"></path></g>
      );
    case 'dropdown':
      return (
        <g><path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 12l-4-4h8l-4 4z"></path></g>
      );
    case 'yes_no':
      return (
        <g><path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93h-2.87v-.93zm0 2.93h5.24c.25.31.48.65.68 1h-5.92v-1zm0 3h6.74c.08.33.15.66.19 1h-6.93v-1zm0 9.93v-.93h2.87c-.87.48-1.84.8-2.87.93zm5.24-2.93h-5.24v-1h5.92c-.2.35-.43.69-.68 1zm1.5-3h-6.74v-1h6.93c-.04.34-.11.67-.19 1z"></path></g>
      );
    case 'number':
      return (
        <g><path d="M3 5h-2v16c0 1.1.9 2 2 2h16v-2h-16v-16zm11 10h2v-10h-4v2h2v8zm7-14h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm0 16h-14v-14h14v14z"></path></g>
      );
    case 'opinion_scale':
      return (
        <g><path d="M11.99 2c-5.52 0-9.99 4.48-9.99 10s4.47 10 9.99 10c5.53 0 10.01-4.48 10.01-10s-4.48-10-10.01-10zm.01 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5h-10.22c.8 2.04 2.78 3.5 5.11 3.5z"></path></g>
      );
    case 'email':
      return (
        <g><path d="M21.99 8c0-.72-.37-1.35-.94-1.7l-9.05-5.3-9.05 5.3c-.57.35-.95.98-.95 1.7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zm-9.99 5l-8.26-5.16 8.26-4.84 8.26 4.84-8.26 5.16z"></path></g>
      );
    case 'website':
      return (
        <g><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"></path></g>
      );
    case 'legal':
      return (
        <g><path d="M4 10v7h3v-7h-3zm6 0v7h3v-7h-3zm-8 12h19v-3h-19v3zm14-12v7h3v-7h-3zm-4.5-9l-9.5 5v2h19v-2l-9.5-5z"></path></g>
      );
    case 'picture_choice':
      return (
        <g><path d="M14 5c0-1.1-.9-2-2-2h-1v-1c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v1h-1c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2h8v-15h-8zm-2 13h-2v-2h2v2zm0-9h-2v-2h2v2zm4 9h-2v-2h2v2zm0-9h-2v-2h2v2zm4 9h-2v-2h2v2zm0-9h-2v-2h2v2z"></path></g>
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
