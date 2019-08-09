import React, { Component } from 'react';
import BudgetAPI from '../../utils/API-budget';
import Chart1 from '../chart1';
import Chart4 from '../chart4';
import "./style.css"

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
        })
            .catch(err => console.log(err.message));
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
            })
                .catch(err => console.log(err.message));
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
<<<<<<< HEAD
                <h2 id="nameStyling">Budget: {this.state.budgetTotal}</h2>
=======
                <h1 id="nameStyling"> Budget: ${this.state.budgetTotal}</h1>
                <hr width="80%"/>
>>>>>>> 20fbdde76879f1f4fcc32405a0e43392e6e2bdde
                {!this.state.chartSwitch ?
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