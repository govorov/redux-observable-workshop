import { request } from '../common/helpers';


export const fetchHumidity = () => {
    //WIP fromPromise
    return request('/humidity');
};
