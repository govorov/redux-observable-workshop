export const SYNC = 'sync';


export const commonInitialState = {
    loading : false,
    value   : null,
    error   : null,
    tick    : 0,
};


export const commonFetchActionHandler = (state,action) => {
    return  {
        ...state,
        loading : true,
        error   : null,
    };
};


export const commonFetchDoneActionHandler = (state,action) => {
    const { value } = action.payload;
    const { tick } = state;
    return {
        ...state,
        value,
        tick    : tick + 1,
        loading : false,
    };
};


export const commonFetchFailedActionHandler = (state,action) => {
    const { error } = action.payload;
    return {
        ...state,
        loading: false,
        error,
    };
};
