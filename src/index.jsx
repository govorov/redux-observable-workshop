import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './register-service-worker';

import {
  createStore,
  combineReducers
} from 'redux';

import { Provider } from 'react-redux';

import './index.scss';
import { App } from './app.component';

import { temperatureReducer } from './reducers/temperature.reducer';
import { windReducer } from './reducers/wind.reducer';
import { humidityReducer } from './reducers/humidity.reducer';


const reducer = combineReducers({
  temperature : temperatureReducer,
  wind        : windReducer,
  humidity    : humidityReducer,
  // total       :
});


const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


registerServiceWorker();
