import {
    commonInitialState,
    commonFetchActionHandler,
    commonFetchDoneActionHandler,
    commonFetchFailedActionHandler,
} from './common';


const initialState = {
    ...commonInitialState,
    // value   : null,
    // loading : false,
    // error   : null,
};


export const FETCH        = 'humidity.fetch';
export const FETCH_DONE   = 'humidity.fetch.done';
export const FETCH_FAILED = 'humidity.fetch.failed';


export const humidityReducer = (state = initialState,action) => {

    switch (action.type) {
        // [? 1]
        case FETCH        : return commonFetchActionHandler(state,action);
        case FETCH_DONE   : console.log('FD',action.payload.value);return commonFetchDoneActionHandler(state,action);
        case FETCH_FAILED : return commonFetchFailedActionHandler(state,action);
        // [? *] break!!
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
