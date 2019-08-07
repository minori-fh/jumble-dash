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
          backgroundColor: ['red', 'yellow', 'blue', 'green', 'purple', 'teal', 'orange']
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