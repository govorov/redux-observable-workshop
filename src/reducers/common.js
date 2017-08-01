export const SYNC = 'sync';


export const commonFetchActionHandler = (state,action) => {
    return  {
        ...state,
        loading : true,
    };
};


export const commonFetchDoneActionHandler = (state,action) => {
    const { value } = action.payload;
    return {
        ...state,
        value,
        loading: false,
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
