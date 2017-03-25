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
      { key: 'price', name: 'Price' },
      { key: 'change', name: '% Change' },
      { key: 'marketCap', name: 'Market Cap' },
      { key: 'yearRange', name: 'Year Range' },
      { key: 'insight', name: 'Insight' }
    ];
    let rows = [];

    if (stockList && stockList.length) {
      rows = map(stockList, (stock) => {
        const gainOrLoss = (stock.Change.indexOf('-') === -1) ? 'gain' : 'loss';

        return {
          symbol: stock.symbol.toUpperCase(),
          price: <span className={gainOrLoss}>{stock.LastTradePriceOnly}</span>,
          change: <span className={gainOrLoss}>{stock.Change}</span>,
          marketCap: stock.MarketCapitalization,
          yearRange: stock.YearRange,
          insight: <a href={`http://www.dataroma.com/m/stock.php?sym=${stock.symbol}`} target="_blank">Insight</a>
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
