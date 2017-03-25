import React, { Component } from 'react';
import './dataBlock.css';

class DataBlock extends Component {
  render() {
    const data = this.props.data;
    return (
      <div className="data-blocks-wrapper">
        <div className="data-block">
          Total Price Change: $ {data.totalPriceChange}
        </div>
        <div className="data-block">
          Total % Change: {data.totalPercentChange} %
        </div>
      </div>
    );
  }
}

export default DataBlock;
