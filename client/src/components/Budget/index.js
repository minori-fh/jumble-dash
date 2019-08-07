import React, { Component } from 'react';
import BudgetAPI from '../../utils/API-budget';
import Chart1 from '../chart1';
var Chart = require("chart.js")

class Budget extends Component {
    constructor(props) {
        super(props)
        this.chart1Ref = React.createRef();
        this.state = {
            budgetTotal: 100,
            budgetDesign: "",
            budgetEngineering: "",
            budgetFinance: "",
            budgetHR: "",
            budgetMarketing: "",
            budgetSales: "",
            budgetSecurity: "",
            budgetDep: ["1", "2", "3", "4", "5", "6", "7", "8"]
        }
    }


    componentDidMount() {
        BudgetAPI.getBudget(this.props.projectID).then(res => {
            console.log(res.data)
            this.setState({
                budgetTotal: parseInt(res.data.total),
                budgetDesign: res.data.Design,
                budgetEngineering: res.data.Engineering,
                budgetFinance: res.data.Finance,
                budgetHR: res.data.HR,
                budgetMarketing: res.data.Marketing,
                budgetSales: res.data.Sales,
                budgetSecurity: res.data.Security
            })
        })
            .catch(err => console.log(err.message));

        this.chart1 = new Chart(this.chart1Ref.current, {
            type: 'doughnut',
            data: {
                labels: this.state.budgetDep,
                datasets: [{
                    data: [this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8],
                    backgroundColor: ['red', 'yellow', 'black', 'blue', 'green', 'purple', 'teal', 'orange']
                }]
            }
        });
    }

    componentDidUpdate(prevProps) {

        if (this.props.projectID !== prevProps.projectID) {
            BudgetAPI.getBudget(this.props.projectID).then(res => {
                console.log(res.data)
                this.setState({
                    budgetTotal: parseInt(res.data.total),
                    budgetDesign: res.data.Design,
                    budgetEngineering: res.data.Engineering,
                    budgetFinance: res.data.Finance,
                    budgetHR: res.data.HR,
                    budgetMarketing: res.data.Marketing,
                    budgetSales: res.data.Sales,
                    budgetSecurity: res.data.Security
                })
            })
                .catch(err => console.log(err.message));

            this.chart1 = new Chart(this.chart1Ref.current, {
                type: 'doughnut',
                data: {
                    labels: this.state.budgetDep,
                    datasets: [{
                        data: [this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8, this.state.budgetTotal / 8],
                        backgroundColor: ['red', 'yellow', 'black', 'blue', 'green', 'purple', 'teal', 'orange']
                    }]
                }
            });
        }
    }

    render() {
        return (
            <div>
                <p>{this.state.budgetTotal}</p>
                <canvas className='chart' ref={this.chart1Ref} />
            </div>
        );
    }
}

export default Budget;