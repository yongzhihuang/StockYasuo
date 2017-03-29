import React, { Component } from 'react';
import { map, max, min, toNumber, filter, get } from 'lodash';
import './dataBlock.css';

class DataBlock extends Component {
  render() {
    if (!this.props.stockList) {
      return null;
    }

    const data = this.props.data;
    const stockList = this.props.stockList;
    const totalPriceChange = data.totalPriceChange;
    const totalPercentChange = data.totalPercentChange;
    // console.log(stockList);
    const priceChangeList = map(stockList, stock => toNumber(stock.Change));
    const maxPriceChange = max(priceChangeList);
    // const maxPriceCompany = filter(stockList, (stock) => {
    //   return (toNumber(stock.Change) === maxPriceChange);
    // });
    const maxPriceChangeCompany = filter(stockList, stock => (toNumber(stock.Change) === maxPriceChange));
    const minPriceChange = min(priceChangeList);
    const minPriceChangeCompany = filter(stockList, stock => (toNumber(stock.Change) === minPriceChange));

    const priceChangeDisplay = (totalPriceChange > 0) ?
    <span className="gain">+${totalPriceChange}</span>
    : <span className="loss">-${totalPriceChange}</span>;
    const percentChangeDisplay = (totalPercentChange > 0) ?
    <span className="gain">+{totalPercentChange}%</span>
    : <span className="loss">-${totalPercentChange}%</span>;

    const gainerDisplay = (maxPriceChange > 0) ?
    <span className="gain"><b>{get(maxPriceChangeCompany, '[0].symbol')}</b> (+${maxPriceChange})</span>
    : <span className="loss"><b>{get(maxPriceChangeCompany, '[0].symbol')}</b> (-${maxPriceChange})</span>;

    const loserDisplay = (minPriceChange > 0) ?
    <span className="gain"><b>{get(minPriceChangeCompany, '[0].symbol')}</b> (+${minPriceChange})</span>
    : <span className="loss"><b>{get(minPriceChangeCompany, '[0].symbol')}</b> (-${minPriceChange})</span>;
    return (
      <div className="data-blocks-wrapper">
        <h2>At a glimpse</h2>
        <ul>
          <li className="data-block">
            Total price change for today is {priceChangeDisplay} or a change of {percentChangeDisplay}
          </li>
          <li className="data-block">
            The biggest gainer today comes from {gainerDisplay}
          </li>
          <li className="data-block">
            The biggest loser today comes from {loserDisplay}
          </li>
        </ul>
      </div>
    );
  }
}

export default DataBlock;
