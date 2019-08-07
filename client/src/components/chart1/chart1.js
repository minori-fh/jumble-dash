import React, { Component } from 'react';
import BudgetAPI from '../../utils/API-budget';
var Chart = require("chart.js")

class Chart1 extends Component {

  constructor(props) {
    super(props);
    console.log("shuahd", props);
    this.chart1Ref = React.createRef();
    this.state = {
      id: props.projectID,
      budgetTotal: "",
      budgetDep: []
    }

  }

  componentDidMount() {
    if (this.props.total === "") {
      var total = 100;
      this.chart1 = new Chart(this.chart1Ref.current, {
        type: 'doughnut',
        data: {
          labels: this.props.depts,
          datasets: [{
            data: [total / 7, total / 7, total / 7, total / 7, total / 7, total / 7, total / 7],
            backgroundColor: ['red', 'yellow', 'blue', 'green', 'purple', 'teal', 'orange']
          }]
        }
      });
    }
    else {
      this.chart1 = new Chart(this.chart1Ref.current, {
        type: 'doughnut',
        data: {
          labels: this.props.depts,
          datasets: [{
            data: [this.props.marketing || this.props.total / 7, this.props.hr || this.props.total / 7, this.props.design || this.props.total / 7, this.props.engineering || this.props.total / 7, this.props.sales || this.props.total / 7, this.props.finance || this.props.total / 7, this.props.security || this.props.total / 7],
            backgroundColor: ['red', 'yellow', 'blue', 'green', 'purple', 'teal', 'orange']
          }]
        }
      });
    }
  }

  render() {
    return (
      <div>
        <canvas className='chart' ref={this.chart1Ref} />
      </div>
    )
  };

};

export default Chart1;