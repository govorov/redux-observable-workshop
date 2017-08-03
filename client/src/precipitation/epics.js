import { FetchEpic } from '../common/epic-creators';

import {
    FETCH,
    FETCH_DONE,
    FETCH_FAILED,
} from './reducer';

import { fetchPrecipitation } from './adapter';


export const precipitationFetchEpic = FetchEpic({
    triggerActionType : FETCH,
    successActionType : FETCH_DONE,
    failedActionType  : FETCH_FAILED,
    fetchFunction     : fetchPrecipitation,
});
