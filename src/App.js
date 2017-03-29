import React, { Component } from 'react';
import './App.css';

import StockList from './components/StockList/StockList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img className="App-logo" role="presentation" src="https://pbs.twimg.com/media/CHvYTQOUsAAHMye.png" />
        </div>
        <StockList />
      </div>
    );
  }
}

export default App;
