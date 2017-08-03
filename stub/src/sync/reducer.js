export const SYNC_START   = 'sync.start';
export const SYNC_STOP    = 'sync.stop';
export const SYNC_PERFORM = 'sync.perform';


const initialState = {
    enabled: false,
};


export const syncReducer = (state = initialState ,action) => {

    // [? !] all reducers receive ALL actions
    switch (action.type) {
        case SYNC_START:
            return {
                ...state,
                enabled: true,
            };

        case SYNC_STOP:
            return {
                ...state,
                enabled: false,
            };

        default:
            return state;
    }

};

