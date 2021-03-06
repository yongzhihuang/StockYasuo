import React, { Component } from 'react';
import './DataTable.css';

class DataTable extends Component {
  render() {
    if (!this.props.tableBody) {
      return null;
    }

    const tableHeadersDOM = this.props.tableHeaders.map((header, idx) => {
      let hiddenClass = '';
      if (header.indexOf('-hidesm') !== -1) {
        hiddenClass = 'hide-for-small';
      }
      header = header.replace('-hidesm', '');
      return <th className={hiddenClass} key={idx}>{header}</th>;
    });

    const bodyDOM = this.props.tableBody;

    return (
      <table className="data-table">
        <thead>
          <tr>
            {tableHeadersDOM}
          </tr>
        </thead>
        <tbody>
          {bodyDOM}
        </tbody>
      </table>
    );
  }
}

export default DataTable;
