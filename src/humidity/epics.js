import { FetchEpic } from '../common/epic-creators';

import {
    FETCH,
    FETCH_DONE,
    FETCH_FAILED,
} from './reducer';

import { fetchHumidity } from './adapter';


export const humidityFetchEpic = FetchEpic({
    triggerActionType : FETCH,
    successActionType : FETCH_DONE,
    failedActionType  : FETCH_FAILED,
    fetchFunction     : fetchHumidity,
});
