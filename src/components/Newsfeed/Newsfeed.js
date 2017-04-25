import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './Newsfeed.css';

import * as newsfeedActions from '../../actions/newsfeed-actions';

class Newsfeed extends Component {
  componentWillMount() {
    const currentStocks = localStorage.stockList;
    if (!currentStocks) {
      return;
    }

    this.props.actions.fetchNewsfeed(currentStocks.split(','));
  }

  constructNewsFeedListDOM(newsfeed) {
    const newsfeedDOM = newsfeed.map((item, idx) => {
      return (
        <li key={idx}>
          <div className="newsfeed-item" dangerouslySetInnerHTML={{__html: item.description.replace('href=', 'target="blank" href=')}}/>
        </li>
      );
    });

    return newsfeedDOM;
  }

  updateNewsFeed(symbol) {
    const FILTER_BY_SINGLE = true;
    this.props.actions.fetchNewsfeed([symbol], FILTER_BY_SINGLE);
  }

  constructStockList(stockList) {
    return stockList.map((stock, idx) => <li key={idx} onClick={() => {this.updateNewsFeed(stock.Symbol)}}>{stock.Symbol}</li>);
  }

  render() {
    if (!this.props.newsfeed || !this.props.stockList) {
      return null;
    }

    return (
      <div className="newsfeed">
        <ul className="newsfeed-stocklist">
          {this.constructStockList(this.props.stockList)}
        </ul>
        <ul className="newsfeed-list">
          {this.constructNewsFeedListDOM(this.props.newsfeed)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    newsfeed: state.newsfeed.newsfeed,
    stockList: state.stockList.stockList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(newsfeedActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Newsfeed);

