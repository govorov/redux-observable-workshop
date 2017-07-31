import { request } from '../app.helpers';


export const fetchTemperature = () => {
    return request('/temperature');
};
