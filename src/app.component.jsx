import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Action } from './common/helpers';
import { Icon } from './common/icon.component';
import { ErrorIcon } from './common/error-icon.component';
import { Loader } from './common/loader.component';
import { StatsTable } from './common/stats-table.component';

import {
  SYNC_START,
  SYNC_STOP,
} from './sync/reducer';

import './app.style.scss';


class App extends Component {

  componentDidMount() {
    this.props.dispatch(Action(SYNC_START));
  }


  getState() {
    return this.props.state;
  }


  getToggleSyncBtnIcon() {
    return this.isSyncEnabled() ? 'pause' : 'play';
  }


  handleToggleSyncBtnClick() {
    // [? *] alternative - SYNC_TOGGLE => epic => start/stop
    const action  = this.isSyncEnabled() ? SYNC_STOP : SYNC_START;
    this.props.dispatch(Action(action));
  }


  isSyncEnabled() {
    return this.getState().sync.enabled;
  }


  isLoading(type) {
    if (type !== 'wind') {
      return this.getState()[type].loading;
    }
    else {
      const { wind } = this.getState();
      return wind.speed.loading || wind.direction.loading;
    }
  }


  getConditionsIcon() {
    const { conditions } = this.getState();
    const notPrefixedIcons = ['na','hot','meteor'];
    return notPrefixedIcons.includes(conditions) ? conditions : `day-${conditions}`;
  }


  getValue(type) {
    const { state } = this.props;
    const pathSegments = type.split('.');

    let value;

    if (pathSegments[0] === 'wind') {
      value = state.wind[pathSegments[1]].value;
    }
    else {
      value = state[pathSegments[0]].value;
    }

    return value == null ? '--' : value;
  }


  hasError(type) {
    // this.hasError('temperature')
    const { state } = this.props;
    if (type === 'wind') {
      const windState = state.wind;
      return windState.speed.error != null || windState.direction.error != null;
    }
    else {
      return state[type].error != null;
    }
  }


  getWindDirectionIcon() {
    const direction = this.getState().wind.direction.value;
    if (direction == null) {
      return 'na';
    }
    return `wind wi-from-${direction}`;
  }


  getStatsFor(type) {
    return this.getState().stats[type];
  }


  render() {
    return (
      <div className="App">
        <div className="navbar navbar-default">
          <div className="container">

            <div className="navbar-header">
              <div className="navbar-brand">
                Weather monitor X9000
              </div>
            </div>

            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a id="sync-toggle-btn" onClick={this.handleToggleSyncBtnClick.bind(this)}>
                    <Icon type="fa" name={this.getToggleSyncBtnIcon()} />
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <div className="container">

          <div className="panel panel-default">
            <div className="panel-body">
              <div className="conditions-icon text-warning text-center">
                <Icon name={this.getConditionsIcon()} />
              </div>
            </div>
          </div>


          <div className="row">

            <div className="col-xs-12 col-sm-4">

              <div className="panel panel-default">
                <div className="panel-body relative">

                  <ErrorIcon flag={this.hasError('temperature')}/>

                  <div className="corner">
                    <Loader active={this.isLoading('temperature')} />
                  </div>

                  <div className="dashboard-value">
                    <Icon name="thermometer" className="text-center"/>
                    { this.getValue('temperature') } &deg;C
                  </div>

                  <StatsTable values={this.getStatsFor('temperature')} />

                </div>
              </div>

            </div>

            <div className="col-xs-12 col-sm-4">

              <div className="panel panel-default">
                <div className="panel-body relative">

                  <ErrorIcon flag={this.hasError('wind')}/>

                  <div className="corner">
                    <Loader active={this.isLoading('wind')} />
                  </div>

                  <div className="dashboard-value">
                    <Icon className="wind-direction-icon" name={this.getWindDirectionIcon()} type="wi"/>
                    { this.getValue('wind.speed') } m/s
                  </div>

                  <StatsTable values={this.getStatsFor('wind')} />

                </div>
              </div>

            </div>

            <div className="col-xs-12 col-sm-4">

              <div className="panel panel-default">
                <div className="panel-body relative">

                  <ErrorIcon flag={this.hasError('humidity')}/>

                  <div className="corner">
                    <Loader active={this.isLoading('humidity')} />
                  </div>

                  <div className="dashboard-value">
                    <Icon name="humidity"/>
                    { this.getValue('humidity') }
                  </div>

                  <StatsTable values={this.getStatsFor('humidity')} />

                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }
};


const mapStateToProps = (state) => {
  return { state };
};


const connectedApp = connect(
  mapStateToProps,
)(App);


export { connectedApp as App };
