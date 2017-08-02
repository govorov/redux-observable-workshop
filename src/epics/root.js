import { combineEpics } from 'redux-observable';

import { temperatureFetchEpic } from './temperature';
import { windSpeedFetchEpic } from './wind';
import { windDirectionFetchEpic } from './wind';
import { humidityFetchEpic } from './humidity';
import { precipitationFetchEpic } from './precipitation';

import {
    temperatureStatsDailyEpic,
    temperatureStatsWeeklyEpic,
    temperatureStatsTotalEpic,

    windStatsDailyEpic,
    windStatsWeeklyEpic,
    windStatsTotalEpic,

    humidityStatsDailyEpic,
    humidityStatsWeeklyEpic,
    humidityStatsTotalEpic,
} from './stats';

import { calcConditionsEpic } from './conditions';
import { syncEpic } from './sync';


export const rootEpic = combineEpics(
  temperatureFetchEpic,
  windSpeedFetchEpic,
  windDirectionFetchEpic,
  humidityFetchEpic,
  precipitationFetchEpic,

  calcConditionsEpic,

  temperatureStatsDailyEpic,
  temperatureStatsWeeklyEpic,
  temperatureStatsTotalEpic,

  windStatsDailyEpic,
  windStatsWeeklyEpic,
  windStatsTotalEpic,

  humidityStatsDailyEpic,
  humidityStatsWeeklyEpic,
  humidityStatsTotalEpic,

  syncEpic,
);
