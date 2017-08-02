import { Action } from '../app.helpers';

import {
    FETCH_DONE as FETCH_TEMPERATURE_DONE,
} from '../reducers/temperature';

import {
    FETCH_DONE as FETCH_HUMIDITY_DONE,
} from '../reducers/humidity';

import {
    FETCH_SPEED_DONE as FETCH_WIND_SPEED_DONE,
} from '../reducers/wind';

import {
    FETCH_DONE as FETCH_PRECIPITATION_DONE,
} from '../reducers/precipitation';

import { CALC_CONDITIONS } from '../reducers/conditions';


export const calcConditionsEpic = (action$,store) => {
    return action$
        .ofType(
            FETCH_TEMPERATURE_DONE,
            FETCH_HUMIDITY_DONE,
            FETCH_WIND_SPEED_DONE,
            FETCH_PRECIPITATION_DONE,
        )
        // [? 11] withLatestFrom with NgRX
        .map((action) => {
            const conditions = getConditionsFromState(store.getState());
            return Action(CALC_CONDITIONS,{ conditions });
        });

};


const getConditionsFromState = (state) => {
    const conditions = {};

    [
        'temperature',
        'precipitation',
        'humidity',
        'wind',
    ].forEach((key) => {
        conditions[key] = getValueFromState(state,key);
    });

    return conditions;
};


const getValueFromState = (state,key) => {
    if (key === 'wind') {
        return state.wind.speed.value;
    }

    return state[key].value;
};
