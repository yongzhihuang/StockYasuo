import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get, map, toNumber, round } from 'lodash';
import './StockList.css';
import '../../App.css';

import DataBlocks from '../DataBlocks/DataBlocks';
import DataTable from '../DataTable/DataTable';

import * as stockListActions from '../../actions/stock-list-actions';

class StockList extends Component {
  constructor(props) {
    super(props);
    this.onAddStock = this.onAddStock.bind(this);
    this.onRemoveStock = this.onRemoveStock.bind(this);
    this.state = {
      stockList: [],
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

  buildTableBody(stockList) {
    return map(stockList, (stock, idx) => {
      if (!stock.Change || !stock.ChangeinPercent || !stock.symbol) {
        return <tr key={idx}></tr>;
      }
      const gainOrLoss = (stock.Change.indexOf('-') === -1) ? 'gain' : 'loss';
      const stockSymbol = stock.symbol.toUpperCase();
      const price = stock.BidRealtime || stock.LastTradePriceOnly;
      return (
        <tr key={idx}>
          <td><a href={`http://finance.yahoo.com/quote/${stockSymbol}`} target="_blank">{stock.Name} ({stockSymbol})</a></td>
          <td><span className={gainOrLoss}>${price} ({stock.Change})</span></td>
          <td className="hide-for-small"><span className={gainOrLoss}>{stock.ChangeinPercent}</span></td>
          <td className="hide-for-small">{stock.ChangeFromYearLow} ({stock.PercentChangeFromYearLow})</td>
          <td className="hide-for-small">
            <div>
            <a href={`http://www.dataroma.com/m/stock.php?sym=${stock.symbol}`} target="_blank">Ownership</a> <a href={`http://www.dataroma.com/m/activity.php?sym=${stock.symbol}&typ=a`} target="_blank">Activity</a> <a href={`http://www.dataroma.com/m/ins/ins.php?t=y&&sym=${stock.symbol}&o=fd&d=d`} target="_blank">Insider</a>
            </div>
          </td>
          <td>
            <div className="btn-normal" onClick={()=>this.onRemoveStock(stock.symbol)}>-</div>
          </td>
        </tr>
      );
    });
  }

  computeTotalChange(stockList) {
    let totalPriceChange = 0;
    let totalPercentChange = 0;
    stockList.forEach((stock) => {
      if (stock.Change && stock.ChangeinPercent) {
        totalPriceChange += toNumber(stock.Change);
        totalPercentChange += toNumber(stock.ChangeinPercent.replace('%', ''));
      }
    });

    totalPriceChange = round(totalPriceChange, 2);
    totalPercentChange = round(totalPercentChange, 2);

    return {
      totalPriceChange,
      totalPercentChange
    };
  }

  onAddStock() {
    const stock = window.prompt('Enter stock symbol');
    this.props.actions.addStockSymbolToList(stock);
  }

  onRemoveStock(symbol) {
    console.log(symbol);
    this.props.actions.removeStockSymbolFromList(symbol)
  }

  render() {
    const stockList = get(this.props, 'stockList');

    if (!stockList || !stockList.length) {
      return (
        <div className="stocklist-wrapper">
          <div className="App-header">
            <h1 className="App-intro">StockYasuo</h1>
          </div>
          <div className="center-wrap">
            <h2>No Stocks available</h2>
            <div className="btn-cta" onClick={this.onAddStock}>Add Stock</div>
          </div>
        </div>
      )
    }
    const tableHeaders = ['Company', 'Price (USD)', '%Change-hidesm', 'Year to Year Growth-hidesm', 'Insight-hidesm', 'Actions'];
    const tableBody = this.buildTableBody(stockList);
    const stocksChangeData = this.computeTotalChange(stockList);

    // Change title to reflect stock amount
    const priceDisplay = (stocksChangeData.totalPriceChange >= 0) ? `+$${stocksChangeData.totalPriceChange}` : `-$${stocksChangeData.totalPriceChange}`;
    document.title = `${priceDisplay} Stock Yasuo - PentaTools`;

    return (
      <div className="stocklist-wrapper">
        <div className="App-header">
          <h1 className="App-intro">StockYasuo</h1>
        </div>
        <div className="center-wrap">
          <div className="btn-cta" onClick={this.onAddStock}>Add Stock</div>
        </div>
        <DataTable tableHeaders={tableHeaders} tableBody={tableBody} />
        {/*<DataBlocks data={stocksChangeData} stockList={stockList} />*/}

      </div>
    );
  }
}

function mapStateToProps(state) {
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
