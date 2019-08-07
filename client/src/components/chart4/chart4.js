import React, { Component } from 'react';
var Chart = require("chart.js")

class Chart4 extends Component {

  constructor(props) {
    super(props);
    this.chart4Ref = React.createRef();
  }

  componentDidMount() {
    this.chart4 = new Chart(this.chart4Ref.current, {
      type: 'polarArea',
      data: {
        labels: ['Red', 'Yellow', 'Blue'],
        datasets: [{
          data: [10, 20, 30],
          backgroundColor: ['red', 'yellow', 'blue']
        }]
      }
    });
  }

  render() {
    return (
      <div>
        <canvas className='chart' ref={this.chart4Ref} />
      </div>
    )
  };

};

export default Chart4;