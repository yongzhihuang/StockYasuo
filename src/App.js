import React, { Component } from 'react';
import './App.css';

import StockList from './components/StockList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Stock Yasuo</h2>
        </div>
        <StockList />
      </div>
    );
  }
}

export default App;
