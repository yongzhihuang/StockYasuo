import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img className="App-logo" role="presentation" src="https://pbs.twimg.com/media/CHvYTQOUsAAHMye.png" />
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
