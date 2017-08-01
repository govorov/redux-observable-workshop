// [? 10] state could be scalar value
const initialState = 'na';


export const CALC_CONDITIONS = 'summary.calcConditions';


export const conditionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CALC_CONDITIONS: return calcConditionsActionHandler(state,action);
        default:
            return state;
    }
};


const calcConditionsActionHandler = (state,action) => {

    const {
        temperature,
        precipitation,
        wind,
        humidity,
    } = action.payload.conditions;

    const conditions = composeConditions({
        temperature,
        precipitation,
        wind,
        humidity,
    });

    return conditions;
};


const composeConditions = ({ temperature, precipitation, wind, humidity }) => {

    const strongWindTreshold = 20;
    const fogTreshold        = 90;
    const hotTreshold        = 25;

    if (precipitation) {
        // a little more realistic
        if (temperature > 0 && precipitation === 'snow') {
            return 'rain';
        }
        return precipitation;
    }

    if (wind > strongWindTreshold) {
        return 'windy';
    }

    if (humidity > fogTreshold) {
        return 'fog';
    }

    if (temperature > hotTreshold) {
        return 'hot';
    }

    return 'sunny';

};
