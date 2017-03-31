import React, { Component } from 'react';
import { map, max, min, toNumber, filter, get, sortBy } from 'lodash';
import BarChart from '../BarChart/BarChart';
import './DataBlock.css';

class DataBlock extends Component {

  generateBarChartData(data, status) {
    if (!data) {
      return [];
    }

    return sortBy(map(data, stock => {
        if (!stock.symbol || !stock.ChangeinPercent) {
          return {
            text: 'error',
            value: 0
          }
        }

        const condition = (status === 'gains') ? (toNumber(stock.ChangeinPercent.replace('%', '') < 0)) : (toNumber(stock.ChangeinPercent.replace('%', '') > 0));
        if (condition) {
          return {
            text: 'iono',
            value: 0
          };
        }

        return {
          text: stock.symbol.toUpperCase(),
          value: Math.abs(toNumber(stock.ChangeinPercent.replace('%', '')))
        }
      }
    ), (obj) => -obj.value);
  }

  render() {
    if (!this.props.stockList) {
      return null;
    }

    const data = this.props.data;
    const stockList = this.props.stockList;
    const totalPriceChange = data.totalPriceChange;
    const totalPercentChange = data.totalPercentChange;

    const priceChangeList = map(stockList, stock => toNumber(stock.Change));

    const maxPriceChange = max(priceChangeList);
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
    <span className="gain"><b>{get(maxPriceChangeCompany, '[0].symbol').toUpperCase()}</b> (+${maxPriceChange})</span>
    : <span className="loss"><b>{get(maxPriceChangeCompany, '[0].symbol').toUpperCase()}</b> (-${maxPriceChange})</span>;

    const loserDisplay = (minPriceChange > 0) ?
    <span className="gain"><b>{get(minPriceChangeCompany, '[0].symbol')}</b> (+${minPriceChange})</span>
    : <span className="loss"><b>{get(minPriceChangeCompany, '[0].symbol')}</b> (-${minPriceChange})</span>;

    return (
      <div className="data-blocks-wrapper">
        <ul>
          <li className="data-block">
            <h2>At a glimpse</h2>
          </li>
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

        <ul>
          <li className="data-block">
            <h2>Winners</h2>
          </li>
          <li className="data-block">
             <BarChart data={this.generateBarChartData(stockList, 'gains')} color="green" />
          </li>
        </ul>

        <ul>
          <li className="data-block">
            <h2>Losers</h2>
          </li>
          <li className="data-block">
             <BarChart data={this.generateBarChartData(stockList, 'losses')} color="red" />
          </li>
        </ul>
      </div>
    );
  }
}

export default DataBlock;
