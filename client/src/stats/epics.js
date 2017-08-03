import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/map';

import { Action } from '../common/helpers';

import {
    FETCH_DONE as FETCH_TEMPERATURE_DONE,
} from '../temperature/reducer';

import {
    FETCH_SPEED_DONE as FETCH_WIND_DONE
} from '../wind/reducer';

import {
    FETCH_DONE as FETCH_HUMIDITY_DONE
} from '../humidity/reducer';

import { SET_STATS } from '../stats/reducer';
import { appConfig } from '../app.config';


// [? 14] ** how to combine weekly/daily in one epic with 2 bufferCount
// export const temperatureStatsDailyEpic = (action$) => {
//     return action$
//         .ofType(FETCH_TEMPERATURE_DONE)
//         // .map(action => action.payload.value)
//         .map((action) => {
//             const { value } = action.payload;
//             console.log('temperature received: ',value);
//             return value;
//         })
//         // [? 12] without rxjs => very sad
//         .bufferCount(appConfig.ticksInDay)
//         .map((values) => {
//             console.log('tempareture buffered:', values);
//             // [? 13] any string is a valid action
//             // reducers use `default: return state;` so no changes will be made
//             // return Action('please do nothing');
//             const sum = values.reduce((s,v) => s+v, 0);
//             const avg = Math.round(sum/appConfig.ticksInDay*100)/100;
//             const min = Math.min(...values);
//             const max = Math.max(...values);

//             return Action(SET_STATS,{
//                 period: 'daily',
//                 type: 'temperature',
//                 min, // min: min (ES5)
//                 max,
//                 avg,
//             });
//         })
// };


// export const temperatureStatsWeeklyEpic = (action$) => {
//     return action$
//         .ofType(FETCH_TEMPERATURE_DONE)
//         .map()
// };
// the same => refactor


// periodic stats
const PeriodicStatsEpic = ({
    triggerAction,
    ticks,
    period,
    type,
}) => {
    return (action$) => {
        return action$
            .ofType(triggerAction)
            .map(action => action.payload.value)
            .bufferCount(ticks)
            .map((values) => {
                const sum = values.reduce((s,v) => s+v, 0);
                const avg = Math.round(sum/ticks*100)/100;
                const min = Math.min(...values);
                const max = Math.max(...values);
                return Action(SET_STATS,{ period, type, min, max, avg });
            })
    };
};


export const temperatureStatsDailyEpic = PeriodicStatsEpic({
    triggerAction : FETCH_TEMPERATURE_DONE,
    ticks         : appConfig.ticksInDay,
    period        : 'daily',
    type          : 'temperature',
});


export const temperatureStatsWeeklyEpic = PeriodicStatsEpic({
    triggerAction : FETCH_TEMPERATURE_DONE,
    ticks         : appConfig.ticksInDay*appConfig.daysInWeek,
    period        : 'weekly',
    type          : 'temperature',
});


export const windStatsDailyEpic = PeriodicStatsEpic({
    triggerAction : FETCH_WIND_DONE,
    ticks         : appConfig.ticksInDay,
    period        : 'daily',
    type          : 'wind',
});


export const windStatsWeeklyEpic = PeriodicStatsEpic({
    triggerAction : FETCH_WIND_DONE,
    ticks         : appConfig.ticksInDay*appConfig.daysInWeek,
    period        : 'weekly',
    type          : 'wind',
});


export const humidityStatsDailyEpic = PeriodicStatsEpic({
    triggerAction : FETCH_HUMIDITY_DONE,
    ticks         : appConfig.ticksInDay,
    period        : 'daily',
    type          : 'humidity',
});


export const humidityStatsWeeklyEpic = PeriodicStatsEpic({
    triggerAction : FETCH_HUMIDITY_DONE,
    ticks         : appConfig.ticksInDay*appConfig.daysInWeek,
    period        : 'weekly',
    type          : 'humidity',
});


// total stats
const TotalStatsEpic = ({
    triggerAction,
    type,
}) => {
    return (action$,store) => {
        return action$
            .ofType(triggerAction)
            .map((action) => {
                const state = store.getState();
                const typeState = (type === 'wind' ? state.wind.speed : state[type]);
                const { tick } = typeState;
                const currentValue = typeState.value;

                const statsState = state.stats[type];
                const prevs = statsState.total;

                const prevAvg = prevs.avg;
                const prevMin = prevs.min;
                const prevMax = prevs.max;

                const sum = prevAvg*(tick-1) + currentValue;
                const avg = Math.round(sum/tick*100)/100;

                const min = prevMin == null ? currentValue : Math.min(prevMin,currentValue);
                const max = Math.max(prevMax,currentValue);

                return Action(SET_STATS,{ period: 'total', type, min, max, avg });
            });
    };
};


export const temperatureStatsTotalEpic = TotalStatsEpic({
    triggerAction: FETCH_TEMPERATURE_DONE,
    type: 'temperature',
});


export const windStatsTotalEpic = TotalStatsEpic({
    triggerAction: FETCH_WIND_DONE,
    type: 'wind',
});


export const humidityStatsTotalEpic = TotalStatsEpic({
    triggerAction: FETCH_HUMIDITY_DONE,
    type: 'humidity',
});
