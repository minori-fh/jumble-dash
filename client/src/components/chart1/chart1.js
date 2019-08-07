import React, { Component } from 'react';
import BudgetAPI from '../../utils/API-budget';
var Chart = require("chart.js")

class Chart1 extends Component {

  constructor(props) {
    super(props);
    console.log("shuahd",props);
    this.chart1Ref = React.createRef();
    this.state = {
      id: props.projectID,
      budgetTotal: "",
      budgetDep: []
    }

  }

  componentWillMount() {
    // if (this.state.id !== -1) {
    BudgetAPI.getBudget(this.state.id).then(res => {
      console.log("dis be res dot data", res.data)
      console.log(Object.keys(res.data));
      var arr = Object.keys(res.data);
      var deptNames = [];
      for (var i = 2; i < arr.length; i++) {
        deptNames.push(arr[i]);
      }
      this.setState({
        budgetTotal: res.data.total,
        budgetDep: deptNames
      })
      console.log("fghjhgfdfghjk",deptNames)
      console.log("helllllow",this.state.budgetTotal)
    })
  // }
  }

  componentWillUpdate() {
    this.chart1 = new Chart(this.chart1Ref.current, {
      type: 'doughnut',
      data: {
        labels: this.state.budgetDep,
        datasets: [{
          data: [this.state.budgetTotal/8,this.state.budgetTotal/8,this.state.budgetTotal/8,this.state.budgetTotal/8, this.state.budgetTotal/8, this.state.budgetTotal/8, this.state.budgetTotal/8, this.state.budgetTotal/8],
          backgroundColor: ['red','yellow', 'black', 'blue', 'green', 'purple', 'teal', 'orange']
        }]
      }
    });
  }

  render() {
    return (
      <canvas className='chart' ref={this.chart1Ref} />
    )
  };

};

export default Chart1;