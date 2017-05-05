import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get, map, toNumber, round } from 'lodash';
import './StockList.css';
import '../../App.css';

// import DataBlocks from '../DataBlocks/DataBlocks';
import DataTable from '../DataTable/DataTable';
import ListPicker from '../ListPicker/ListPicker';
import SearchBox from '../SearchBox/SearchBox';
import StockPreview from '../StockPreview/StockPreview';


import * as stockListActions from '../../actions/stock-list-actions';
import * as listPickerActions from '../../actions/list-picker-actions';

class StockList extends Component {
  constructor(props) {
    super(props);
    this.onAddStock = this.onAddStock.bind(this);
    this.onRemoveStock = this.onRemoveStock.bind(this);
    this.onSearch = this.onSearch.bind(this);
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
    const activeList = this.props.fetchLists.activeList || window.localStorage.selectedList || 'owned';
    this.props.actions.fetchStockList(activeList);
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
      const twoHundredMovingDifference = round(price - stock.TwoHundreddayMovingAverage, 2);
      return (
        <tr key={idx}>
          <td><a href={`http://finance.yahoo.com/quote/${stockSymbol}`} target="_blank">{stock.Name} ({stockSymbol})</a></td>
          <td><span className={gainOrLoss}>${price} ({stock.Change})</span></td>
          <td className="hide-for-small"><span className={gainOrLoss}>{stock.ChangeinPercent}</span></td>
          <td className="hide-for-small">${stock.TwoHundreddayMovingAverage} (${twoHundredMovingDifference}) ({stock.PercentChangeFromTwoHundreddayMovingAverage})</td>
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

  updateNewsfeed(activeList) {
    const currentStocks = localStorage[activeList];

    if (!currentStocks) {
      this.props.actions.fetchNewsfeed();
      return;
    }
    this.props.actions.fetchNewsfeed(currentStocks.split(','));
  }

  onAddStock() {
    const stock = window.prompt('Enter stock symbol');
    const activeList = this.props.fetchLists.activeList || window.localStorage.selectedList || 'owned';
    this.props.actions.addStockSymbolToList(stock, activeList);
    this.updateNewsfeed(activeList);
  }

  onRemoveStock(symbol) {
    const activeList = this.props.fetchLists.activeList || window.localStorage.selectedList || 'owned';
    this.props.actions.removeStockSymbolFromList(symbol, activeList);
    this.updateNewsfeed(activeList);
  }

  onSearch(e) {
    const stockSymbol = e.target.value;
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
            <SearchBox />
            <div className="btn-cta" onClick={this.onAddStock}>Add Stock</div>
            <ListPicker />
          </div>
        </div>
      )
    }
    const tableHeaders = ['Company', 'Price (USD)', '%Change-hidesm', '200 Day Avg-hidesm', 'Year to Year Growth-hidesm', 'Insight-hidesm', 'Actions'];
    const tableBody = this.buildTableBody(stockList);
    const stocksChangeData = this.computeTotalChange(stockList);

    // Change title to reflect stock amount
    const priceDisplay = (stocksChangeData.totalPriceChange >= 0) ? `+$${stocksChangeData.totalPriceChange}` : `-$${stocksChangeData.totalPriceChange}`;
    document.title = `${priceDisplay} Stock Yasuo - PentaTools`;

    return (
      <div className="stocklist-wrapper">
        <div className="App-header">
          <h1 className="App-intro">StockYasuo</h1>
          <h2 className="App-desc">Stock Manager, AI Advisor</h2>
        </div>

        {/*<div className="center-wrap">
          <SearchBox />
          <div className="btn-cta" onClick={this.onAddStock}>Add Stock</div>
        </div>*/}

        {/*<DataBlocks data={stocksChangeData} stockList={stockList} />*/}
        <div className="action-bar">
          <div className="search-box-wrapper">
            <SearchBox />
          </div>

          <div className="list-picker-wrapper">
            <ListPicker />
          </div>
        </div>
        <StockPreview />

        <h2 className="center-wrap">Your Portfolio</h2>
        <DataTable tableHeaders={tableHeaders} tableBody={tableBody} />

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    stockList: state.stockList.stockList,
    fetchLists: state.fetchLists
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...stockListActions,
      ...listPickerActions
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockList);
