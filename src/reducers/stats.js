const emptyRow = { min: null, max: null, avg: null };

const emptyTable = {
    daily  : { ...emptyRow, },
    weekly : { ...emptyRow, },
    total  : { ...emptyRow, },
};

const initialState = {
    temperature : { ...emptyTable, },
    wind        : { ...emptyTable, },
    humidity    : { ...emptyTable, },
};


export const SET_STATS = 'stats.set';


export const statsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STATS: return setStatsActionHandler(state,action);
        default:
            return state;
    }
};


const setStatsActionHandler = (state,action) => {
    const { period, type, min, max, avg } = action.payload;

    const oldTypeValues = state[type];
    const newTypeValues = {
        ...oldTypeValues,
        [period]: { min, max, avg },
    };

    return {
        ...state,
        [type]: newTypeValues,
    };

    // [? *]
    // even shorter
    // return {
    //     ...state,
    //     [type]: {
    //         ...state[type],
    //         [period]: { min, max, avg },
    //     },
    // };

    // ES5 - very sad
};
