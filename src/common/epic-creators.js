import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Action } from './helpers';


export const FetchEpic = ({
    triggerActionType,
    successActionType,
    failedActionType,
    fetchFunction,
    resultKey = 'value',
}) => {
    // [? 8] function returns function!
    return (action$) => {
        return action$
            .ofType(triggerActionType)
            .switchMap((action) => {
                return fetchFunction()
                    .map((response) => {
                        const { result } = response;
                        // [? 9] ES6 dynamic props
                        return Action(successActionType,{ [resultKey]: result });
                    })
                    // .takeUntil(action$.ofType(cancelActionType))
                    .catch((error) => {
                        return Observable.of(Action(failedActionType,{ error }));
                    });
            });
    };
};
