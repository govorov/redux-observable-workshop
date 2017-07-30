import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './register-service-worker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.scss';
import { App } from './app';
import { reducer } from './reducer';


const store = createStore(reducer);


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);


registerServiceWorker();
