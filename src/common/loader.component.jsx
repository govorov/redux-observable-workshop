import React from 'react';
import './loader.style';


const getClassName = (active) => {
    return `loader ${active ? 'loader-active' : ''}`;
}


export const Loader = ({active}) => {
    return <div className={ getClassName(active) }></div>
}
