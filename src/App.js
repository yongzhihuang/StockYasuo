import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-intro">StockYasuo</h1>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
