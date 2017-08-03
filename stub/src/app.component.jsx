import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Icon } from './common/icon.component';
import { DashboardPanel } from './common/dashboard-panel.component';

import './app.style';


class App extends Component {

    getState() {
        return this.props.state;
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
        const value = state[type].value;
        return value == null ? '--' : value;
    }


    hasError(type) {
        const state = this.getState();
        return state[type].error != null;
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

                            <DashboardPanel
                                error={this.hasError('temperature')}
                                loading={this.isLoading('temperature')}
                                icon="thermometer"
                                value={`${this.getValue('temperature')} °C`}
                            />

                        </div>

                        <div className="col-xs-12 col-sm-4">



                        </div>

                        <div className="col-xs-12 col-sm-4">



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
