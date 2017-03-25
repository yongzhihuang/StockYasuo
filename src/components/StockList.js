import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import { get, map } from 'lodash';

import * as stockListActions from '../actions/stock-list-actions';

class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockList: [
        'aapl',
        'amd',
        'nvda'
      ]
    }
  }

  componentWillMount() {
    this.props.actions.fetchStockList(this.state.stockList);
  }

  render() {
    const stockList = get(this.props, 'stockList');
    const columns = [{ key: 'symbol', name: 'Symbol' }, { key: 'price', name: 'Price' }];
    let rows = [];

    if (stockList && stockList.length) {
      rows = map(stockList, (stock) => {
        return {
          symbol: stock.symbol,
          price: stock.LastTradePriceOnly
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
