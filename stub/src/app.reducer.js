import { combineReducers } from 'redux';

// [? 3] file structure ./type/domain vs ./domain/type(reducer,adapter,...)
import { temperatureReducer } from './temperature/reducer';
import { conditionsReducer } from './conditions/reducer';


export const rootReducer = combineReducers({
    temperature   : temperatureReducer,
    conditions    : conditionsReducer,
});
