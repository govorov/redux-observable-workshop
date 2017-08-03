import { request } from '../common/helpers';


export const fetchTemperature = () => {
    return request('/temperature');
};
