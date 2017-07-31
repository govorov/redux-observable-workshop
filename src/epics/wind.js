import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Action } from '../app.helpers';

import {
    FETCH_SPEED,
    FETCH_SPEED_DONE,
    FETCH_SPEED_FAILED,
    FETCH_DIRECTION,
    FETCH_DIRECTION_DONE,
    FETCH_DIRECTION_FAILED,
} from '../reducers/wind';

import { fetchTemperature } from '../adapters/temperature';


export const windSpeedFetch = (action$) => {
    return action$
        .ofType(FETCH_SPEED)
        .switchMap((action) => {
            return fetchTemperature();
        })
        .map((response) => {
            const value = response.result;
            return Action(FETCH_SPEED_DONE,{ value });
        })
        .catch((error) => {
            return Observable.of(Action(FETCH_SPEED_FAILED,{ error }));
        });
};
