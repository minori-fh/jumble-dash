import React, { Component } from 'react';
import BudgetAPI from '../../utils/API-budget';
import { Col, Row } from "../Grid";

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
    this.chart1 = new Chart(this.chart1Ref.current, {
      type: 'doughnut',
      data: {
        labels: this.props.depts,
        datasets: [{
          data: [this.props.marketing, this.props.hr, this.props.design, this.props.engineering, this.props.sales, this.props.finance, this.props.security],
          backgroundColor: ['red', 'yellow', 'blue', 'green', 'purple', 'teal', 'orange']
        }]
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.total !== prevProps.total) {
      this.chart1.destroy();
      this.chart1 = new Chart(this.chart1Ref.current, {
        type: 'doughnut',
        data: {
          labels: this.props.depts,
          datasets: [{
            data: [this.props.marketing, this.props.hr, this.props.design, this.props.engineering, this.props.sales, this.props.finance, this.props.security],
            backgroundColor: ['red', 'yellow', 'blue', 'green', 'purple', 'teal', 'orange']
          }]
        }
      });
    }
  }

  render() {
    return (
      <div className="Row">
        <canvas className='chart' ref={this.chart1Ref} />
      </div>
    )
  };

};

export default Chart1;