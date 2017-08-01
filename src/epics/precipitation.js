import { FetchEpic } from './common';

import {
    FETCH,
    FETCH_DONE,
    FETCH_FAILED,
} from '../reducers/precipitation';

import { fetchPrecipitation } from '../adapters/precipitation';


export const precipitationFetchEpic = FetchEpic({
    triggerActionType : FETCH,
    successActionType : FETCH_DONE,
    failedActionType  : FETCH_FAILED,
    fetchFunction     : fetchPrecipitation,
});
