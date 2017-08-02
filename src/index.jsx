import React from 'react';
import ReactDOM from 'react-dom';

import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';

import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';

import registerServiceWorker from './register-service-worker';

import './index.scss';
import { App } from './app.component';
import { Action } from './app.helpers';
import { appConfig } from './app.config';

import { SYNC } from './reducers/common';
import { rootReducer } from './reducers/root';
import { rootEpic } from './epics/root';


// http://extension.remotedev.io/#usage
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicsMiddleware  = createEpicMiddleware(rootEpic);

const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(epicsMiddleware),
));


setInterval(() => {
  store.dispatch(Action(SYNC));
},appConfig.syncTick);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


registerServiceWorker();
