import { request } from '../common/helpers';


export const fetchPrecipitation = () => {
    return request('/precipitation');
};
