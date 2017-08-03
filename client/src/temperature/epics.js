// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/delay';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

// import { Action } from '../app.helpers';
import { FetchEpic } from '../common/epic-creators';

import {
    FETCH,
    FETCH_DONE,
    FETCH_FAILED,
} from './reducer';

import { fetchTemperature } from './adapter';


// [? 4] => refactor -> epicFactory
// export const temperatureFetch = (action$) => {
//     return action$
//         .ofType(FETCH)
//         .switchMap((action) => {
//             return fetchTemperature()
//                 .map((response) => {
//                     const value = response.result;
//                     return Action(FETCH_DONE,{ value });
//                 })
//                 .catch((error) => {
//                     return Observable.of(Action(FETCH_FAILED,{ error }));
//                 });
//         });
//         // [? 5] => в ngrx можно catch
//         // WIP уточнить
// };

export const temperatureFetchEpic = FetchEpic({
    triggerActionType : FETCH,
    successActionType : FETCH_DONE,
    failedActionType  : FETCH_FAILED,
    fetchFunction     : fetchTemperature,
});
