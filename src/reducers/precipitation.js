import {
    commonFetchActionHandler,
    commonFetchDoneActionHandler,
    commonFetchFailedActionHandler,
} from './common';


const initialState = {
  loading : false,
  value   : null,
  error   : null,
};


export const FETCH        = 'precipitation.fetch';
export const FETCH_DONE   = 'precipitation.fetch.done';
export const FETCH_FAILED = 'precipitation.fetch.failed';


export const precipitationReducer = (state = initialState,action) => {

    switch (action.type) {
        // [? 1]
        case FETCH        : return commonFetchActionHandler(state,action);
        case FETCH_DONE   : return commonFetchDoneActionHandler(state,action);
        case FETCH_FAILED : return commonFetchFailedActionHandler(state,action);
        default:
            return state;
    }

};
