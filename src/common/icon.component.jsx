import React from 'react';


const getIconClass = ({type,name,className}) => {
    const iconType = type === 'fa' ? 'fa' : 'wi';
    return `${className || ''} ${iconType} ${iconType}-fw ${iconType}-${name}`;
}


export const Icon = ({type,name,className}) => {
    return <i className={ getIconClass({type,name,className}) }></i>
}
