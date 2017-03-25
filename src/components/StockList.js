import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import { get, map } from 'lodash';

import './stockList.css';

import * as stockListActions from '../actions/stock-list-actions';

class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockList: [
        'aapl',
        'amd',
        'brk-b',
        'msft',
        'nflx',
        'fb',
        'googl',
        'adbe',
        'nvda',
        'amd',
        'bac',
        'v',
        'shop'
      ]
    }
  }

  componentWillMount() {
    this.props.actions.fetchStockList(this.state.stockList);
  }

  render() {
    const stockList = get(this.props, 'stockList');
    const columns = [
      { key: 'symbol', name: 'Symbol' },
      { key: 'price', name: 'Price (USD)' },
      { key: 'changeAmt', name: '$ Change' },
      { key: 'changePercent', name: '% Change' },
      { key: 'marketCap', name: 'Market Cap' },
      { key: 'insight', name: 'Insight' }
    ];
    let rows = [];

    if (stockList && stockList.length) {
      rows = map(stockList, (stock) => {
        const gainOrLoss = (stock.Change.indexOf('-') === -1) ? 'gain' : 'loss';
        const stockSymbol = stock.symbol.toUpperCase();
        const price = stock.BidRealtime || stock.LastTradePriceOnly;

        return {
          symbol: <a href={`https://stocktwits.com/symbol/AAPL?q=${stockSymbol}`} target="_blank">{stockSymbol}</a>,
          price: <span className={gainOrLoss}>${price}</span>,
          changeAmt: <span className={gainOrLoss}>{stock.Change}</span>,
          changePercent: <span className={gainOrLoss}>{stock.ChangeinPercent}</span>,
          marketCap: stock.MarketCapitalization,
          insight: <div>
            <a href={`http://www.dataroma.com/m/stock.php?sym=${stock.symbol}`} target="_blank">Ownership</a> <a href={`http://www.dataroma.com/m/activity.php?sym=${stock.symbol}&typ=a`} target="_blank">Activity</a> <a href={`http://www.dataroma.com/m/ins/ins.php?t=y&&sym=${stock.symbol}&o=fd&d=d`} target="_blank">Insider</a>
            </div>
        };
      });
    }

    const rowGetter = rowNumber => rows[rowNumber];
    return (
      <div>
        <ReactDataGrid
        columns={columns}
        rowGetter={rowGetter}
        rowsCount={rows.length}
        minHeight={500} />
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
