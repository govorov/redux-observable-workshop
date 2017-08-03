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


export const CALC_STATS = 'stats.calc';


export const statsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CALC_STATS: return calcStatsActionHandler(state,action);
        default:
            return state;
    }
};


const calcStatsActionHandler = (state,action) => {
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
