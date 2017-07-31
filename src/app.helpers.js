import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import { appConfig } from './app.config';


export const Action = (type,payload) => {
	return {
		type,
		payload,
	};
};


export const request = (path) => {
    // [? 2] - rxjs/dom/fromAjax
    return Observable.fromPromise(
        fetch(`http://${appConfig.apiHost}${path}`)
            .then(response => response.json())
    );
};
