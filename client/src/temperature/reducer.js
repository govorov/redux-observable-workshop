import {
    commonInitialState,
    commonFetchActionHandler,
    commonFetchDoneActionHandler,
    commonFetchFailedActionHandler,
} from '../common/reducer';


const initialState = {
  ...commonInitialState,
  // loading : false,
  // value   : null,
  // error   : null,
  // tick    : 0,
};


export const FETCH        = 'temperature.fetch';
export const FETCH_DONE   = 'temperature.fetch.done';
export const FETCH_FAILED = 'temperature.fetch.failed';


export const temperatureReducer = (state = initialState,action) => {

    switch (action.type) {
        // [? 1]
        case FETCH        : return commonFetchActionHandler(state,action);
        case FETCH_DONE   : return commonFetchDoneActionHandler(state,action);
        case FETCH_FAILED : return commonFetchFailedActionHandler(state,action);
        default:
            return state;
    }

};


// const fetchActionHandler = (state,action) => {
//     return  {
//         ...state,
//         loading : true,
//     };
// };


// const fetchDoneActionHandler = (state,action) => {
//     const { value } = action.payload;
//     return {
//         ...state,
//         value,
//         loading: false,
//     };
// };


// const fetchFailedActionHandler = (state,action) => {
//     const { error } = action.payload;
//     return {
//         ...state,
//         loading: false,
//         error,
//     };
// };
