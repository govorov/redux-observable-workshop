import { request } from '../app.helpers';


export const fetchPrecipitation = () => {
    console.log('PRPRPRPRPR');
    return request('/precipitation');
};
