import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { round } from 'lodash';
import DataTable from '../DataTable/DataTable';

import './StockPreview.css';

import * as stockSearchActions from '../../actions/stock-search-actions';
import * as stockListActions from '../../actions/stock-list-actions';
import * as listPickerActions from '../../actions/list-picker-actions';

class StockPreview extends Component {
  constructor(props) {
    super(props);
    this.onAddStockToPortfolio = this.onAddStockToPortfolio.bind(this);
  }

  onAddStockToPortfolio() {
    const stock = this.props.activeSearchSymbol;
    const activeList = this.props.fetchLists.activeList || window.localStorage.selectedList || 'owned';
    this.props.actions.addStockSymbolToList(stock, activeList);
  }

  render() {
    const searchResult = this.props.searchResult;
    const activeSearchSymbol = this.props.activeSearchSymbol;

    if (!searchResult || !activeSearchSymbol || activeSearchSymbol === '') {
      return null;
    }

    const stock = searchResult;
    if (!stock.Change || !stock.ChangeinPercent || !stock.symbol || activeSearchSymbol === '') {
      return <tr></tr>;
    }

    const gainOrLoss = (stock.Change.indexOf('-') === -1) ? 'gain' : 'loss';
    const stockSymbol = stock.symbol.toUpperCase();
    const price = stock.BidRealtime || stock.LastTradePriceOnly;
    const twoHundredMovingDifference = round(price - stock.TwoHundreddayMovingAverage, 2);
    const tableHeaders = ['Company', 'Price (USD)', '%Change-hidesm', '200 Day Avg-hidesm', 'Year to Year Growth-hidesm', 'PEG-hidesm', 'Insight-hidesm', 'Actions'];
    const tableBody = (
      <tr>
        <td><a href={`http://finance.yahoo.com/quote/${stockSymbol}`} target="_blank">{stock.Name} ({stockSymbol})</a></td>
        <td><span className={gainOrLoss}>${price} ({stock.Change})</span></td>
        <td className="hide-for-small"><span className={gainOrLoss}>{stock.ChangeinPercent}</span></td>
        <td className="hide-for-small">${stock.TwoHundreddayMovingAverage} (${twoHundredMovingDifference}) ({stock.PercentChangeFromTwoHundreddayMovingAverage})</td>
        <td className="hide-for-small">{stock.ChangeFromYearLow} ({stock.PercentChangeFromYearLow})</td>
        <td className="hide-for-small">{stock.PEGRatio}</td>
        <td className="hide-for-small">
          <div>
          <a href={`http://www.dataroma.com/m/stock.php?sym=${stock.symbol}`} target="_blank">Ownership</a> <a href={`http://www.dataroma.com/m/activity.php?sym=${stock.symbol}&typ=a`} target="_blank">Activity</a> <a href={`http://www.dataroma.com/m/ins/ins.php?t=y&&sym=${stock.symbol}&o=fd&d=d`} target="_blank">Insider</a>
          </div>
        </td>
        <td>
          <div className="btn-normal" onClick={()=>this.onAddStockToPortfolio(stock.symbol)}>+</div>
        </td>
      </tr>
    );
    return (
      <div className="stock-preview-wrapper">
        <DataTable tableHeaders={tableHeaders} tableBody={tableBody} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    stockList: state.stockList.stockList,
    fetchLists: state.fetchLists,
    searchResult: state.search.searchResult,
    activeSearchSymbol: state.search.activeSearchSymbol
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...stockSearchActions,
      ...stockListActions,
      ...listPickerActions
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockPreview);

