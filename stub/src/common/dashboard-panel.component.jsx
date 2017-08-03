import React from 'react';

import { Icon } from './icon.component';
import { ErrorIcon } from './error-icon.component';
import { Loader } from './loader.component';
import './dashboard-panel.scss';


export const DashboardPanel = ({
    error,
    loading,
    icon,
    iconClassName,
    iconType,
    value,
    statsValues,
}) => {

    return (
        <div className="dashboard-panel panel panel-default">
            <div className="panel-body relative">

                <ErrorIcon flag={error}/>

                <div className="corner">
                    <Loader active={loading} />
                </div>

                <div className="dashboard-value">
                    <Icon
                        name={icon}
                        className={`${iconClassName || ''} text-center`}
                        type={iconType}
                    />
                    { value }
                </div>

            </div>
        </div>
        );
}
