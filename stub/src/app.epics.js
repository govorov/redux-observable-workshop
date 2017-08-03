import { combineEpics } from 'redux-observable';

import { temperatureFetchEpic } from './temperature/epics';
import { windSpeedFetchEpic } from './wind/epics';
import { windDirectionFetchEpic } from './wind/epics';
import { humidityFetchEpic } from './humidity/epics';
import { precipitationFetchEpic } from './precipitation/epics';

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
} from './stats/epics';

import { calcConditionsEpic } from './conditions/epics';
import {
  syncEpic,
  syncStartEpic,
} from './sync/epics';


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

  syncStartEpic,
  syncEpic,
);
