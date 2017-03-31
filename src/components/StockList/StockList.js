import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get, map, toNumber, round } from 'lodash';
import './StockList.css';

import DataBlocks from '../DataBlocks/DataBlocks';
import DataTable from '../DataTable/DataTable';

import * as stockListActions from '../../actions/stock-list-actions';

class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockList: [
        'amzn',
        'aapl',
        'amd',
        'mo',
        'brk-b',
        'msft',
        'nflx',
        'fb',
        'gs',
        'googl',
        'adbe',
        'nvda',
        'amd',
        'bac',
        'v'
      ],
      exchangeList: [
        '%5EGSPC',
        '',
        '%5EIXIC'
      ]
    }
  }

  componentWillMount() {
    this.fetchStockPrices();
  }

  componentDidMount() {
    this.updateStockPricesInterval = setInterval(() => {
      this.fetchStockPrices();
    }, 60000);
  }

  fetchStockPrices() {
    this.props.actions.fetchStockList(this.state.stockList);
  }

  componentWillUnmount() {
    clearInterval(this.updateStockPricesInterval);
  }

  render() {
    const stockList = get(this.props, 'stockList');

    if (!stockList || !stockList.length) {
      return <h1>Loading...</h1>
    }

    let totalPriceChange = 0;
    let totalPercentChange = 0;

    const tableHeaders = ['Company', 'Price (USD)', '%Change', 'One Year Growth', 'Insight'];
    let tableBody = null;

    tableBody = map(stockList, (stock, idx) => {
      if (!stock.Change || !stock.ChangeinPercent) {
        return <tr key={idx}></tr>;
      }
      const gainOrLoss = (stock.Change.indexOf('-') === -1) ? 'gain' : 'loss';
      const stockSymbol = stock.symbol.toUpperCase();
      const price = stock.BidRealtime || stock.LastTradePriceOnly;
      totalPriceChange += toNumber(stock.Change);
      totalPercentChange += toNumber(stock.ChangeinPercent.replace('%', ''));
      return (
        <tr key={idx}>
          <td><a href={`http://finance.yahoo.com/quote/${stockSymbol}`} target="_blank">{stock.Name} ({stockSymbol})</a></td>
          <td><span className={gainOrLoss}>${price} ({stock.Change})</span></td>
          <td><span className={gainOrLoss}>{stock.ChangeinPercent}</span></td>
          <td>{stock.ChangeFromYearLow} ({stock.PercentChangeFromYearLow})</td>
          <td>
            <div>
            <a href={`http://www.dataroma.com/m/stock.php?sym=${stock.symbol}`} target="_blank">Ownership</a> <a href={`http://www.dataroma.com/m/activity.php?sym=${stock.symbol}&typ=a`} target="_blank">Activity</a> <a href={`http://www.dataroma.com/m/ins/ins.php?t=y&&sym=${stock.symbol}&o=fd&d=d`} target="_blank">Insider</a>
            </div>
          </td>
        </tr>
      );
    });

    totalPriceChange = round(totalPriceChange, 2);
    totalPercentChange = round(totalPercentChange, 2);

    const priceDisplay = (totalPriceChange >= 0) ? `+$${totalPriceChange}` : `-$${totalPriceChange}`;
    document.title = `${priceDisplay} Stock Yasuo - PentaTools`;

    const blocksData = {
      totalPriceChange,
      totalPercentChange
    };

    return (
      <div className="stocklist-wrapper">
        <DataBlocks data={blocksData} stockList={stockList} />
        <DataTable tableHeaders={tableHeaders} tableBody={tableBody} />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    stockList: state.stockList.stockList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(stockListActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockList);
