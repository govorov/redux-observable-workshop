import React, { Component } from 'react';
import './loader.style.scss';


export class Loader extends Component {

	getClassName() {
		return `loader ${this.props.active ? 'loader-active' : ''}`;
	}

	render() {
		return (
			<div className={ this.getClassName() }>
			</div>
		);
	}

}
