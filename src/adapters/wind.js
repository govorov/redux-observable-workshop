import { request } from '../app.helpers';


export const fetchWindSpeed = () => {
    return request('/wind/speed');
};


export const fetchWindDirection = () => {
    return request('/wind/direction');
};
