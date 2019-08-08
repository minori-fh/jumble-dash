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
        labels: this.props.depts,
        datasets: [{
          data: [this.props.marketing, this.props.hr, this.props.design, this.props.engineering, this.props.sales, this.props.finance, this.props.security],
          backgroundColor: ['#df4343', '#ffb01d', '#b0fff4', 'green', '#6d6d6d', 'teal', '#e9ec45']
        }]
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.total !== prevProps.total) {
      this.chart4.destroy();
      this.chart4 = new Chart(this.chart4Ref.current, {
        type: 'polarArea',
        data: {
          labels: this.props.depts,
          datasets: [{
            data: [this.props.marketing, this.props.hr, this.props.design, this.props.engineering, this.props.sales, this.props.finance, this.props.security],
            backgroundColor: ['#df4343', '#ffb01d', '#b0fff4', 'green', '#6d6d6d', 'teal', '#e9ec45']
          }]
        }
      });
    }
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