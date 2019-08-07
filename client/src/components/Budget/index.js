import React, { Component } from 'react';
import BudgetAPI from '../../utils/API-budget';
import Chart1 from '../chart1';
import Chart4 from '../chart4';
var Chart = require("chart.js")

class Budget extends Component {
    constructor(props) {
        super(props)
        console.log(this.props);
        this.chart1Ref = React.createRef();
        this.state = {
            budgetTotal: "",
            budgetDesign: "",
            budgetEngineering: "",
            budgetFinance: "",
            budgetHR: "",
            budgetMarketing: "",
            budgetSales: "",
            budgetSecurity: "",
            chartSwitch: false,
            budgetDept: ["Marketing", "HR", "Design", "Engineering", "Sales", "Finance", "Security"]
        }
    }


    componentDidMount() {
        BudgetAPI.getBudget(this.props.projectID).then(res => {
            console.log(res.data)
            console.log(res.data.total);
            this.setState({
                budgetTotal: res.data.total,
                budgetDesign: res.data.Design,
                budgetEngineering: res.data.Engineering,
                budgetFinance: res.data.Finance,
                budgetHR: res.data.HR,
                budgetMarketing: res.data.Marketing,
                budgetSales: res.data.Sales,
                budgetSecurity: res.data.Security
            })

            // this.chart1 = new Chart(this.chart1Ref.current, {
            //     type: 'doughnut',
            //     data: {
            //         labels: this.state.budgetDept,
            //         datasets: [{
            //             data: [res.data.total / 7, res.data.total / 7, res.data.total / 7, res.data.total / 7, res.data.total / 7, res.data.total / 7, res.data.total / 7],
            //             backgroundColor: ['red', 'yellow', 'blue', 'green', 'purple', 'teal', 'orange']
            //         }]
            //     }
            // });
        })
            .catch(err => console.log(err.message));

        // this.chart1 = new Chart(this.chart1Ref.current, {
        //     type: 'doughnut',
        //     data: {
        //         labels: this.state.budgetDep,
        //         datasets: [{
        //             data: [this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8],
        //             backgroundColor: ['red', 'yellow', 'black', 'blue', 'green', 'purple', 'teal', 'orange']
        //         }]
        //     }
        // });
    }

    componentDidUpdate(prevProps) {

        if (this.props.projectID !== prevProps.projectID) {
            BudgetAPI.getBudget(this.props.projectID).then(res => {
                console.log(res.data)
                var arr = Object.keys(res.data);
                var deptNames = [];
                for (var i = 2; i < arr.length; i++) {
                    deptNames.push(arr[i]);
                }
                console.log(deptNames);
                this.setState({
                    budgetTotal: res.data.total,
                    budgetDesign: res.data.Design,
                    budgetEngineering: res.data.Engineering,
                    budgetFinance: res.data.Finance,
                    budgetHR: res.data.HR,
                    budgetMarketing: res.data.Marketing,
                    budgetSales: res.data.Sales,
                    budgetSecurity: res.data.Security,
                    chartSwitch: false
                })

                // this.chart1 = new Chart(this.chart1Ref.current, {
                //     type: "doughnut",
                //     data: {
                //         labels: this.state.budgetDept,
                //         datasets: [{
                //             data: [res.data.total / 7, res.data.total / 7, res.data.total / 7, res.data.total / 7, res.data.total / 7, res.data.total / 7, res.data.total / 7],
                //             backgroundColor: ['red', 'yellow', 'blue', 'green', 'purple', 'teal', 'orange']
                //         }]
                //     }
                // });
            })
                .catch(err => console.log(err.message));

            // this.chart1 = new Chart(this.chart1Ref.current, {
            //     type: 'doughnut',
            //     data: {
            //         labels: this.state.budgetDep,
            //         datasets: [{
            //             data: [this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8],
            //             backgroundColor: ['red', 'yellow', 'black', 'blue', 'green', 'purple', 'teal', 'orange']
            //         }]
            //     }
            // });
        }
    }

    handleChartSwitch = event => {
        event.preventDefault();

        console.log("SWITCH NOW");
        if (this.state.chartSwitch === false) {
            this.setState({
                chartSwitch: true
            })
        }
        else {
            this.setState({
                chartSwitch: false
            })
        }
    }

    render() {
        return (
            <div>
                <p>{this.state.budgetTotal}</p>
                {!this.state.chartSwitch ?
                    // <canvas className='chart' ref={this.chart1Ref} /> :
                    <Chart1
                        total={this.state.budgetTotal}
                        depts={this.state.budgetDept}
                        marketing={this.state.budgetMarketing}
                        hr={this.state.budgetHR}
                        design={this.state.budgetDesign}
                        engineering={this.state.budgetEngineering}
                        sales={this.state.budgetSales}
                        finance={this.state.budgetFinance}
                        security={this.state.budgetSecurity}
                    /> :
                    <Chart4
                        total={this.state.budgetTotal}
                        depts={this.state.budgetDept}
                        marketing={this.state.budgetMarketing}
                        hr={this.state.budgetHR}
                        design={this.state.budgetDesign}
                        engineering={this.state.budgetEngineering}
                        sales={this.state.budgetSales}
                        finance={this.state.budgetFinance}
                        security={this.state.budgetSecurity}
                    />}
                <button onClick={this.handleChartSwitch}>Switch</button>
            </div>
        );
    }
}

export default Budget;