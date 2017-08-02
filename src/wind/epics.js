import { FetchEpic } from '../common/epic-creators';

import {
    FETCH_SPEED,
    FETCH_SPEED_DONE,
    FETCH_SPEED_FAILED,
    FETCH_DIRECTION,
    FETCH_DIRECTION_DONE,
    FETCH_DIRECTION_FAILED,
} from './reducer';

import { fetchWindSpeed, fetchWindDirection } from './adapter';


export const windSpeedFetchEpic = FetchEpic({
    triggerActionType : FETCH_SPEED,
    successActionType : FETCH_SPEED_DONE,
    failedActionType  : FETCH_SPEED_FAILED,
    fetchFunction     : fetchWindSpeed,
});


export const windDirectionFetchEpic = FetchEpic({
    triggerActionType : FETCH_DIRECTION,
    successActionType : FETCH_DIRECTION_DONE,
    failedActionType  : FETCH_DIRECTION_FAILED,
    fetchFunction     : fetchWindDirection,
});
