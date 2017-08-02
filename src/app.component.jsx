import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import React, { Component } from 'react';
import { connect } from 'react-redux';


import { Icon } from './icon.component';
import { ErrorIcon } from './error-icon.component';
import { Loader } from './loader.component';
import { StatsTable } from './stats-table.component';

import './app.style.scss';



class App extends Component {

  stateUpdate$ = new Subject();
  chartStreams = {};

  isLoading(type) {
    if (type !== 'wind') {
      return this.props.state[type].loading;
    }
    else {
      const { wind } = this.props.state;
      return wind.speed.loading || wind.direction.loading;
    }
  }


  getConditionsIcon() {
    const { conditions } = this.props.state;
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
    const direction = this.props.state.wind.direction.value;
    if (direction == null) {
      return 'na';
    }
    return `wind wi-from-${direction}`;
  }


  getStatsFor(type) {
    return this.props.state.stats[type];
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
                    <a>
                      <Icon type="fa" name="pause" />
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          <div className="container">

            <div className="panel panel-default">
              <div className="panel-body">
                <div className="x8 text-warning text-center">
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
                    <div className="x5">
                      <Icon name="thermometer" className="text-center"/>
                      { this.getValue('temperature') } &deg;C
                    </div>
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
                    <div className="x5">
                    <Icon className="wind-direction-icon" name={this.getWindDirectionIcon()} type="wi"/>
                    { this.getValue('wind.speed') } m/s
                  </div>
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
                    <div className="x5">
                    <Icon name="humidity"/>
                    { this.getValue('humidity') }
                  </div>
                  </div>
                </div>

              </div>

            </div>


            <div className="panel panel-default">
              <div className="row">

                <div className="col-xs-12 col-sm-4">
                  <StatsTable values={this.getStatsFor('temperature')} />
                </div>

                <div className="col-xs-12 col-sm-4">
                  <StatsTable values={this.getStatsFor('wind')} />
                </div>

                <div className="col-xs-12 col-sm-4">
                  <StatsTable values={this.getStatsFor('humidity')} />
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
