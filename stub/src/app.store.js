import {
  createStore,
  compose,
} from 'redux';

import { rootReducer } from './app.reducer';


// http://extension.remotedev.io/#usage
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const appStore = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    // applyMiddleware(...),
));
