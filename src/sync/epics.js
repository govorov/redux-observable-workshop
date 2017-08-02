import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

import { Action } from '../common/helpers';
import { appConfig } from '../app.config';

import {
    SYNC_START,
    SYNC_STOP,
    SYNC_PERFORM,
} from './reducer';

import { FETCH  as FETCH_TEMPERATURE } from '../temperature/reducer';
import { FETCH_SPEED as FETCH_WIND_SPEED } from '../wind/reducer';
import { FETCH_DIRECTION as FETCH_WIND_DIRECTION } from '../wind/reducer';
import { FETCH  as FETCH_HUMIDITY } from '../humidity/reducer';
import { FETCH as FETCH_PRECIPITATION} from '../precipitation/reducer';


export const syncStartEpic = (action$) => {
    return action$
        .ofType(SYNC_START)
        .switchMap((action) => {
            return Observable
                .interval(appConfig.syncTick)
                .map(tick => Action(SYNC_PERFORM))
                .takeUntil(action$.ofType(SYNC_STOP));
        })
};


export const syncEpic = (action$) => {
    return action$
        .ofType(SYNC_PERFORM)
        .switchMap((action) => {
            const actionTypes = [
                FETCH_TEMPERATURE,
                FETCH_WIND_SPEED,
                FETCH_WIND_DIRECTION,
                FETCH_HUMIDITY,
                FETCH_PRECIPITATION,
            ];
            const actions = actionTypes.map(type => Action(type));
            return Observable.from(actions);
            // WIP takeUntil
        });

};


// export const
