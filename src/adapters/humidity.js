import { request } from '../app.helpers';


export const fetchHumidity = () => {
    return request('/humidity');
};
