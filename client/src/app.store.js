import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';

import { createEpicMiddleware } from 'redux-observable';

import { rootReducer } from './app.reducer';
import { rootEpic } from './app.epics';


// http://extension.remotedev.io/#usage
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicsMiddleware  = createEpicMiddleware(rootEpic);

export const appStore = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(epicsMiddleware),
));
