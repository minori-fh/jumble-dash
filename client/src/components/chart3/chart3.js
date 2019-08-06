import React, { Component } from 'react';
var Chart = require("chart.js")

class Chart3 extends Component {

  constructor(props) {
    super(props);
    this.chart3Ref = React.createRef();
  }

  componentDidMount() {
    this.chart3 = new Chart(this.chart3Ref.current, {
      type: 'bar',
      data: {
        labels: ['A'],
        datasets: [{
          label: 'awldj',
          data: [33.33],
          backgroundColor: ['red']
        },
        {
          label: 'ndjak',
          data: [33.33],
          backgroundColor: ['green']
        },
        {
          label: 'djsad',
          data: [33.33],
          backgroundColor: ['blue']
        }
      ]
      },
      options: {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    });
  }

  render() {
    return (
      <canvas className='chart' ref={this.chart3Ref} />
    )
  };

};

export default Chart3;