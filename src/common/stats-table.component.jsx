import React from 'react';
import './stats-table.style';


const getValue = (values,period,type) => {
    const value = values[period][type];
    return value == null ? '--' : value;
};


export const StatsTable = ({values}) => {
    return (
        <table className="stats-table table table-bordered">

            <thead>
                <tr>
                    <th className="shrink">
                    </th>
                    <th>
                        Min
                    </th>
                    <th>
                        Max
                    </th>
                    <th>
                        Avg
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>
                        1d
                    </td>
                    <td>
                        { getValue(values,'daily','min') }
                    </td>
                    <td>
                        { getValue(values,'daily','max') }
                    </td>
                    <td>
                        { getValue(values,'daily','avg') }
                    </td>
                </tr>

                <tr>
                    <td>
                        7d
                    </td>
                    <td>
                        { getValue(values,'weekly','min') }
                    </td>
                    <td>
                        { getValue(values,'weekly','max') }
                    </td>
                    <td>
                        { getValue(values,'weekly','avg') }
                    </td>
                </tr>

                <tr>
                    <td>
                        Total
                    </td>
                    <td>
                        { getValue(values,'total','min') }
                    </td>
                    <td>
                        { getValue(values,'total','max') }
                    </td>
                    <td>
                        { getValue(values,'total','avg') }
                    </td>
                </tr>
            </tbody>

        </table>
    );
}
