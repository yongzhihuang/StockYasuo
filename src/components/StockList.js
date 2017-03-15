import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';

import * as stockListActions from '../actions/stock-list-actions';

class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount() {
    this.props.actions.fetchStockList();
  }

  render() {
    const columns = [{ key: 'symbol', name: 'Symbol' }, { key: 'price', name: 'Price' }];
    const rows = [
      { symbol: 'AAPL', price: '145' },
      { symbol: 'AMD', price: '13' },
      { symbol: 'NVDA', price: '103' }
    ];

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
      stockList: state.stockList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(stockListActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockList);
