import { combineReducers } from 'redux';

// [? 3] file structure ./type/domain vs ./domain/type(reducer,adapter,...)
import { temperatureReducer } from './temperature';
import { windReducer } from './wind';
import { humidityReducer } from './humidity';
import { precipitationReducer } from './precipitation';
import { conditionsReducer } from './conditions';

export const rootReducer = combineReducers({
  temperature   : temperatureReducer,
  wind          : windReducer,
  humidity      : humidityReducer,
  conditions    : conditionsReducer,
  precipitation : precipitationReducer,
});
