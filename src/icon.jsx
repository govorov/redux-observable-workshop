import React, { Component } from 'react';


export class Icon extends Component {

  getIconClass() {
    const iconType = this.props.type === 'fa' ? 'fa' : 'wi';
    return `${iconType} ${iconType}-fw ${iconType}-${this.props.name}`;
  }

  render() {
    return <i className={ this.getIconClass() }></i>
  }
}
