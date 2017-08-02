import { request } from '../app.helpers';


export const fetchPrecipitation = () => {
    return request('/precipitation');
};
