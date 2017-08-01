import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Smoothie from 'react-smoothie';

import { Icon } from './icon.component';
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


  getWindDirectionIcon() {
    const direction = this.props.state.wind.direction.value;
    if (direction == null) {
      return 'na';
    }
    return `wind wi-from-${direction}`;
  }


  setChartSubscription(type) {
    // WIP - несколько срабатываний
    const subjectName = `${type}Update$`;
    // [? 10] - hash mode
    this[subjectName] = this.stateUpdate$
      .map((state) => {

        const value = type === 'wind' ?
          state.wind.speed.value :
          state[type].value;

        return value;
      })

    this.chartStreams[type] = this.refs[`${type}Chart`]
      .addTimeSeries(
        {},
        this.chartLineOptions[type]
      );

    this[`${type}UpdateSubscription$`] = this[subjectName].subscribe((value) => {
      this.chartStreams[type].append(new Date().getTime(),value);
    });

  }


  unsetChartSubscription(type) {
    this[`${type}UpdateSubscription$`].unsubscribe();
  }


  chartLineOptions = {
    temperature: {
      strokeStyle : 'rgba(255, 135, 0, 1)',
      fillStyle   : 'rgba(255, 135, 0, 0.2)',
      lineWidth   : 2
    },
    wind: {
      strokeStyle : 'rgba(225, 255, 0, 1)',
      fillStyle   : 'rgba(225, 255, 0, 0.2)',
      lineWidth   : 2
    },
    humidity: {
      strokeStyle : 'rgba(0, 225, 255, 1)',
      fillStyle   : 'rgba(0, 225, 255, 0.2)',
      lineWidth   : 2
    },
  };


  chartGridOptions = {
    sharpLines: true,
  }


  chartTypes = [
    'temperature',
    'wind',
    'humidity',
  ];


  componentDidMount() {
    this.chartTypes.forEach((type) => {
      this.setChartSubscription(type);
    });
  }


  componentWillUnmount() {
    this.chartTypes.forEach((type) => {
      this.unsetChartSubscription(type);
    });
  }


  componentWillReceiveProps(props) {
    this.stateUpdate$.next(props.state);
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
                  <Icon name="day-snow-thunderstorm" />
                </div>
              </div>
            </div>


            <div className="row">

              <div className="col-xs-12 col-sm-4">

                <div className="panel panel-default">
                  <div className="panel-body relative">
                    <div className="corner">
                      <Loader active={this.isLoading('temperature')} />
                    </div>
                    <div className="x5">
                      <Icon name="thermometer" className="text-center"/>
                      {this.props.state.temperature.value || '--'} &deg;C
                    </div>
                  </div>
                </div>

                <div className="panel panel-default">
                  <div className="panel-body chart-wrapper">

                    <Smoothie ref="temperatureChart" interpolation='step' grid={this.chartGridOptions} width={768} height={100} minValue={10} maxValue={40} />

                  </div>
                </div>

              </div>

              <div className="col-xs-12 col-sm-4">

                <div className="panel panel-default">
                  <div className="panel-body relative">
                    <div className="corner">
                      <Loader active={this.isLoading('wind')} />
                    </div>
                    <div className="x5">
                    <Icon className="wind-direction-icon" name={this.getWindDirectionIcon()} type="wi"/>
                    {this.props.state.wind.speed.value || '--'} m/s
                  </div>
                  </div>
                </div>

                <div className="panel panel-default">
                  <div className="panel-body chart-wrapper">

                    <Smoothie ref="windChart" interpolation='step' grid={this.chartGridOptions} width={768} height={100} minValue={0} maxValue={30} />

                  </div>
                </div>

              </div>

              <div className="col-xs-12 col-sm-4">

                <div className="panel panel-default">
                  <div className="panel-body relative">
                    <div className="corner">
                      <Loader active={this.isLoading('humidity')} />
                    </div>
                    <div className="x5">
                    <Icon name="humidity"/>
                    {this.props.state.humidity.value || '--'}
                  </div>
                  </div>
                </div>

                <div className="panel panel-default">
                  <div className="panel-body chart-wrapper">

                    <Smoothie ref="humidityChart" interpolation='step' grid={this.chartGridOptions} width={768} height={100} minValue={0} maxValue={100} />

                  </div>
                </div>

              </div>

            </div>


            <div className="panel panel-default">
              <div className="row">

                <div className="col-xs-12 col-sm-4">
                  <StatsTable/>
                </div>

                <div className="col-xs-12 col-sm-4">
                  <StatsTable/>
                </div>

                <div className="col-xs-12 col-sm-4">
                  <StatsTable/>
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
