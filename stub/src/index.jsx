import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.scss';
import { App } from './app.component';
import { appStore } from './app.store';

ReactDOM.render(
    <Provider store={appStore}>
        <App />
    </Provider>,
    document.getElementById('root')
);
