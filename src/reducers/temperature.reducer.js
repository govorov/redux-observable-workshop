const initialState = {
  loading : true,
  value   : 1,
};


export const FETCH        = 'temperature.fetch';
export const FETCH_DONE   = 'temperature.fetch.done';
export const FETCH_FAILED = 'temperature.fetch.failed';


export const temperatureReducer = (state = initialState,action) => {
    console.log('reducer',action);

    switch (action.type) {
        case FETCH:
            return  {
                ...state,
                value: state.value + 1,
            };
        default:
            return state;
    }

};
