import { commonInitialState } from './common';


const initialSubState = {
    ...commonInitialState
};


const initialState = {
    direction : {
        ...initialSubState,
    },
    speed : {
        ...initialSubState,
    },
};


export const FETCH_SPEED            = 'wind.speed.fetch';
export const FETCH_SPEED_DONE       = 'wind.speed.fetch.done';
export const FETCH_SPEED_FAILED     = 'wind.speed.fetch.failed';
export const FETCH_DIRECTION        = 'wind.direction.fetch';
export const FETCH_DIRECTION_DONE   = 'wind.direction.fetch.done';
export const FETCH_DIRECTION_FAILED = 'wind.direction.fetch.failed';


export const windReducer = (state = initialState,action) => {

    switch (action.type) {
        // [? 1]
        case FETCH_SPEED            : return fetchSpeedActionHandler(state,action);
        case FETCH_SPEED_DONE       : return fetchSpeedDoneActionHandler(state,action);
        case FETCH_SPEED_FAILED     : return fetchSpeedFailedActionHandler(state,action);
        case FETCH_DIRECTION        : return fetchDirectionActionHandler(state,action);
        case FETCH_DIRECTION_DONE   : return fetchDirectionDoneActionHandler(state,action);
        case FETCH_DIRECTION_FAILED : return fetchDirectionFailedActionHandler(state,action);
        default:
            return state;
    }

};


const fetchSpeedActionHandler = (state,action) => {
    const { speed } = state;
    return {
        ...state,
        speed: {
            ...speed,
            loading: true,
        },
    };
};


const fetchSpeedDoneActionHandler = (state,action) => {
    const { value } = action.payload;
    const { tick }  = state.speed;

    return {
        ...state,
        speed: {
            ...commonInitialState,
            value,
            tick: tick + 1,
        },
    };
};


const fetchSpeedFailedActionHandler = (state,action) => {
    const { error } = action.payload;
    const { speed } = state;
    return {
        ...state,
        speed: {
            ...speed,
            loading: false,
            error,
        },
    };
};


const fetchDirectionActionHandler = (state,action) => {
    const { direction } = state;
    return {
        ...state,
        direction: {
            ...direction,
            loading: true,
        },
    };
};


const fetchDirectionDoneActionHandler = (state,action) => {
    const { value } = action.payload;
    const { tick }  = state.direction;
    return {
        ...state,
        direction: {
            ...commonInitialState,
            value,
            tick: tick + 1,
        },
    };
};


const fetchDirectionFailedActionHandler = (state,action) => {
    const { error }     = action.payload;
    const { direction } = state;
    return {
        ...state,
        direction: {
            ...direction,
            loading: false,
            error,
        },
    };
};

