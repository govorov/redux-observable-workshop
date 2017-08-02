// import React, { Component } from 'react';
import React from 'react';
import { Icon } from './icon.component';


// export class ErrorIcon extends Component {

//     getVisibilityClass() {
//         return this.props.flag ? 'error-icon-active' : '';
//     }


//     render() {
//         return (
//             <Icon name="exclamation-circle" type="fa" className={`${this.getVisibilityClass()} text-danger error-icon`} />
//         );
//     }
// }


// React stateless functional component example
export const ErrorIcon = ({flag}) => {

    const getVisibilityClass = (flag) => {
        return flag ? 'error-icon-active' : '';
    };

    return (
        <Icon name="exclamation-circle" type="fa" className={`${getVisibilityClass(flag)} text-danger error-icon`} />
    );

};
