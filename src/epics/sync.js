import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/switchMap';

import { Action } from '../app.helpers';

import { SYNC } from '../reducers/common';
import { FETCH  as FETCH_TEMPERATURE } from '../reducers/temperature';
import { FETCH_SPEED as FETCH_WIND_SPEED } from '../reducers/wind';
import { FETCH_DIRECTION as FETCH_WIND_DIRECTION } from '../reducers/wind';
import { FETCH  as FETCH_HUMIDITY } from '../reducers/humidity';


export const sync = (action$) => {
    return action$
        .ofType(SYNC)
        .switchMap((action) => {
            const actionTypes = [
                FETCH_TEMPERATURE,
                FETCH_WIND_SPEED,
                FETCH_WIND_DIRECTION,
                FETCH_HUMIDITY,
            ];
            const actions = actionTypes.map(type => Action(type));
            return Observable.from(actions);
            // WIP takeUntil
        })

};


// export const
