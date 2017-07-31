import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Action } from './app.helpers';
import { FETCH } from './reducers/temperature';
import { FETCH_SPEED } from './reducers/wind';
import { Icon } from './icon.component';
import { Loader } from './loader.component';
import { StatsTable } from './stats-table.component';

import './app.style.scss';




class App extends Component {

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
    return 'from-e';
    // HERE
    return ([
      'n',
      'nne',
      'ne',
      'ene',
      'e',
      'ese',
      'se',
      'sse',
      's',
      'ssw',
      'sw',
      'wsw',
      'w',
      'wnw',
      'nw',
      'nnw',
    ])[Math.round(Math.random()*100)];
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

            <div className="panel panel-default" onClick={this.props.handleTestClick} >
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
              </div>

              <div className="col-xs-12 col-sm-4">
                <div className="panel panel-default">
                  <div className="panel-body relative">
                    <div className="corner">
                      <Loader active={this.isLoading('wind')} />
                    </div>
                    <div className="x5">
                    <Icon name={this.getWindDirectionIcon()} type="wi"/>
                    {this.props.state.wind.speed.value || '--'} m/s
                  </div>
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
                    <Icon name="smog"/>
                    {this.props.state.humidity.value || '--'}%
                  </div>
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


const mapDispatchToProps = (dispatch) => {
  return {
    handleTestClick() {
      // WIP--
      dispatch(Action(FETCH));
      dispatch(Action(FETCH_SPEED));
    },
  };
};


const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);


export { connectedApp as App };
