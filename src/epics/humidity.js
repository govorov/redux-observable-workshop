import { FetchEpic } from './common';

import {
    FETCH,
    FETCH_DONE,
    FETCH_FAILED,
} from '../reducers/humidity';

import { fetchHumidity } from '../adapters/humidity';


export const humidityFetch = FetchEpic({
    triggerActionType : FETCH,
    successActionType : FETCH_DONE,
    failedActionType  : FETCH_FAILED,
    fetchFunction     : fetchHumidity,
});
