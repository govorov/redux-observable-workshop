import { combineReducers } from 'redux';

// [? 3] file structure ./type/domain vs ./domain/type(reducer,adapter,...)
import { temperatureReducer } from './temperature/reducer';
import { windReducer } from './wind/reducer';
import { humidityReducer } from './humidity/reducer';
import { precipitationReducer } from './precipitation/reducer';
import { conditionsReducer } from './conditions/reducer';
import { statsReducer } from './stats/reducer';
import { syncReducer } from './sync/reducer';


export const rootReducer = combineReducers({
    temperature   : temperatureReducer,
    wind          : windReducer,
    humidity      : humidityReducer,
    conditions    : conditionsReducer,
    precipitation : precipitationReducer,
    stats         : statsReducer,
    sync          : syncReducer,
});
