import React, { Component } from 'react';


export class StatsTable extends Component {
  render() {
    return (
      <div className="padded">
        <table className="table table-bordered">

          <thead>
            <tr>
              <th>
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
              </td>
              <td>
              </td>
              <td>
              </td>
            </tr>

            <tr>
              <td>
                7d
              </td>
              <td>
              </td>
              <td>
              </td>
              <td>
              </td>
            </tr>

            <tr>
              <td>
                Total
              </td>
              <td>
              </td>
              <td>
              </td>
              <td>
              </td>
            </tr>
          </tbody>

        </table>
      </div>
    );
  }
}
