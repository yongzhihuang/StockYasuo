import React, { Component } from 'react';
import BarChart from 'react-bar-chart';
import './BarChart.css';

class BarChartViz extends Component {
  render() {
    if (!this.props.data) {
      return null;
    }

    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    return (
      <div className="barchart-viz">
        <BarChart
          ylabel='Price Change'
          width={400}
          height={200}
          margin={margin}
          data={this.props.data}
        />
      </div>
    );
  }
}

export default BarChartViz;
