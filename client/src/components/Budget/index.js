import React, { Component } from 'react';
import BudgetAPI from '../../utils/API-budget';
import { Col, Row } from "../Grid";
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
            newBudgetTotal: "",
            newBudgetDesign: "",
            newBudgetEngineering: "",
            newBudgetFinance: "",
            newBudgetHR: "",
            newBudgetMarketing: "",
            newBudgetSales: "",
            newBudgetSecurity: "",
            chartSwitch: false,
            counter: 0,
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
                budgetSecurity: res.data.Security,
                counter: this.state.counter + 1
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
                    newBudgetTotal: "",
                    newBudgetDesign: "",
                    newBudgetEngineering: "",
                    newBudgetFinance: "",
                    newBudgetHR: "",
                    newBudgetMarketing: "",
                    newBudgetSales: "",
                    newBudgetSecurity: "",
                    chartSwitch: false,
                    counter: this.state.counter + 1
                })
            })
                .catch(err => console.log(err.message));
        }
    }

     handleInputChange = event => {

        const { name, value } = event.target
        this.setState({
            [name]: value
        });
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

    updateBudget = event => {

        event.preventDefault();

        const body = {
            total: this.state.newBudgetTotal,
            Marketing: this.state.newBudgetMarketing,
            HR: this.state.newBudgetHR,
            Design: this.state.newBudgetDesign,
            Engineering: this.state.newBudgetEngineering,
            Sales: this.state.newBudgetSales,
            Finance: this.state.newBudgetFinance,
            Security: this.state.newBudgetSecurity
        }

        BudgetAPI.updateBudget(this.props.projectID, body)
            .then(res => {
                console.log("NEW BUDGET EHRE", res)
                this.setState({
                    budgetTotal: this.state.newBudgetTotal,
                    budgetDesign: this.state.newBudgetDesign,
                    budgetEngineering: this.state.newBudgetEngineering,
                    budgetFinance: this.state.newBudgetFinance,
                    budgetHR: this.state.newBudgetHR,
                    budgetMarketing: this.state.newBudgetMarketing,
                    budgetSales: this.state.newBudgetSales,
                    budgetSecurity: this.state.newBudgetSecurity,
                    newBudgetTotal: "",
                    newBudgetDesign: "",
                    newBudgetEngineering: "",
                    newBudgetFinance: "",
                    newBudgetHR: "",
                    newBudgetMarketing: "",
                    newBudgetSales: "",
                    newBudgetSecurity: "",
                    chartSwitch: false,
                    counter: this.state.counter + 1
                })
            })
            .catch(err => console.log(err.message));
    }

    render() {
        return (
            <div>
                <h1 id="nameStyling"> Budget: ${this.state.budgetTotal}</h1>
                <hr width="80%"/>
                {!this.state.chartSwitch ?
                    <Chart1
                        counter={this.state.counter}
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
                        counter={this.state.counter}
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

                    <Row>
                        <Col className='xl12 newProjectHalfCol'>
                            <p>Department Budgets</p>
                            <Row>
                                <Col className='xl12'>
                                    <input required
                                        type="text"
                                        value={this.state.newBudgetTotal}
                                        placeholder="Total Budget"
                                        onChange={this.handleInputChange}
                                        className='budget'
                                        name="newBudgetTotal"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className='xl12'>
                                    <input
                                        type="text"
                                        value={this.state.newBudgetDesign}
                                        placeholder="Design"
                                        onChange={this.handleInputChange}
                                        className='budget'
                                        name="newBudgetDesign"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className='xl12'>
                                    <input
                                        type="text"
                                        value={this.state.newBudgetEngineering}
                                        placeholder="Engineering"
                                        onChange={this.handleInputChange}
                                        className='budget'
                                        name="newBudgetEngineering"
                                    /> 
                                </Col>
                            </Row>
                            <Row>
                                <Col className='xl12'>
                                    <input
                                        type="text"
                                        value={this.state.newBudgetFinance}
                                        placeholder="Finance"
                                        onChange={this.handleInputChange}
                                        className='budget'
                                        name="newBudgetFinance"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className='xl12'>
                                    <input
                                        type="text"
                                        value={this.state.newBudgetHR}
                                        placeholder="HR"
                                        onChange={this.handleInputChange}
                                        className='budget'
                                        name="newBudgetHR"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className='xl12'>
                                    <input
                                        type="text"
                                        value={this.state.newBudgetMarketing}
                                        placeholder="Marketing"
                                        onChange={this.handleInputChange}
                                        className='budget'
                                        name="newBudgetMarketing"
                                    />  
                                </Col>
                            </Row>
                            <Row>
                                <Col className='xl12'>
                                    <input
                                        type="text"
                                        value={this.state.newBudgetSales}
                                        placeholder="Sales"
                                        onChange={this.handleInputChange}
                                        className='budget'
                                        name="newBudgetSales"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className='xl12'>
                                    <input
                                        type="text"
                                        value={this.state.newBudgetSecurity}
                                        placeholder="Security"
                                        onChange={this.handleInputChange}
                                        className='budget'
                                        name="newBudgetSecurity"
                                    />
                                </Col>
                            </Row>
                            <button id="submit" onClick={this.updateBudget} >Submit New Budget</button>
                        </Col>
                </Row>
            </div>
        );
    }
}

export default Budget;