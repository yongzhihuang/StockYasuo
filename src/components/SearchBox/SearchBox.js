import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './SearchBox.css';

import * as stockSearchActions from '../../actions/stock-search-actions';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(e) {
    const stockSymbol = e.target.value;
    if (stockSymbol) {
      this.props.actions.setActiveSearchSymbol(stockSymbol);
    }

    this.props.actions.searchSingleStock(stockSymbol);
  }

  render() {
    return (
      <div className="data-blocks-wrapper">
        <input className="search-box" type="text" placeholder="Search stock symbol: aapl, fb" onChange={this.onSearch} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchResult: state.search.searchResult
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...stockSearchActions
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);

