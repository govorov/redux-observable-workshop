import React, { Component } from 'react';
import './stats-table.style';


export class StatsTable extends Component {

  getValue(period,type) {
    const value = this.props.values[period][type];
    return value == null ? '--' : value;
  }


  render() {
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
              { this.getValue('daily','min') }
            </td>
            <td>
              { this.getValue('daily','max') }
            </td>
            <td>
              { this.getValue('daily','avg') }
            </td>
          </tr>

          <tr>
            <td>
              7d
            </td>
            <td>
              { this.getValue('weekly','min') }
            </td>
            <td>
              { this.getValue('weekly','max') }
            </td>
            <td>
              { this.getValue('weekly','avg') }
            </td>
          </tr>

          <tr>
            <td>
              Total
            </td>
            <td>
              { this.getValue('total','min') }
            </td>
            <td>
              { this.getValue('total','max') }
            </td>
            <td>
              { this.getValue('total','avg') }
            </td>
          </tr>
        </tbody>

      </table>
    );
  }
}
