import React, { Component } from 'react';
import { Col, Row } from "../Grid";
import BudgetAPI from '../../utils/API-budget';
import "./style.css";

class EditBudget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newMarketingBudget: this.props.marketing,
            newHRBudget: this.props.hr,
            newDesignBudget: this.props.design,
            newEngBudget: this.props.engineering,
            newSalesBudget: this.props.sales,
            newFinanceBudget: this.props.finance, 
            newSecurityBudget: this.props.security
        };

        console.log(this.props.children)
        console.log('this should be projectID', this.props.projectID)
    };

    componentDidMount() {
        BudgetAPI.getBudget(this.props.projectID).then(res => {

            this.setState({
                newMarketingBudget: res.data.Marketing,
                newHRBudget: res.data.HR,
                newDesignBudget: res.data.Design,
                newEngBudget: res.data.Engineering,
                newSalesBudget: res.data.Sales,
                newFinanceBudget: res.data.Finance, 
                newSecurityBudget: res.data.Security,
            });

        });
    };

    componentDidUpdate(prevProps) {
        if (this.props.projectID !== prevProps.projectID) {
            BudgetAPI.getBudget(this.props.projectID).then(res => {

                this.setState({
                    newMarketingBudget: res.data.Marketing,
                    newHRBudget: res.data.HR,
                    newDesignBudget: res.data.Design,
                    newEngBudget: res.data.Engineering,
                    newSalesBudget: res.data.Sales,
                    newFinanceBudget: res.data.Finance, 
                    newSecurityBudget: res.data.Security,
                });
            })
                .catch(err => console.log(err.message));
        }
    }

    handleInputChange = event => {

        const { name, value } = event.target;

        this.setState({
            [name]: value
        })
    }

    updateBudget = event => {
        event.preventDefault();

        const budget = {
            newMarketingBudget: this.state.newMarketingBudget,
            newHRBudget: this.state.newHRBudget,
            newDesignBudget: this.state.newDesignBudget,
            newEngBudget: this.state.newEngBudget,
            newSalesBudget: this.state.newSalesBudget,
            newFinanceBudget: this.state.newFinanceBudget, 
            newSecurityBudget: this.state.newSecurityBudget
        }

        // TaskAPI.updateBudget(budget).then(res => {

        // });

        // TaskAPI.createTask(task).then(res => {
        //     let tasksList = this.state.tasks;
        //     tasksList.push(res.data);
        //     this.setState({
        //         tasks: tasksList,
        //         newTask: "",
        //         newAssignee1: "",
        //         newAssignee2: "",
        //         newAssignee3: "",
        //         newAssignee4: "",
        //         tasksIncomplete: this.state.tasksIncomplete + 1,
        //         counter: this.state.counter + 1
        //     })
        // })
        //     .catch(err => console.log(err.message));
    }

    render(){
        return (
            <div>
                <Row id='editBudget'>
                    <Col className="xl12">
                        <h1 id="nameStyling">Edit Budget</h1>
                        <hr width="80%"/>
                    </Col>
                </Row>
                <Row>
                    <Col className="xl12">
                        <p className='editBudgetLabel'>Total Budget</p>
                        <input required
                            id="inputBudget"
                            type="text"
                            value={this.state.budget}
                            placeholder="Total Budget"
                            onChange={this.handleInputChange}
                            className='budget'
                            name="budget"
                        /><br/>
                        <p className='editBudgetLabel'>Design</p>
                        <input
                            type="text"
                            value={this.state.newDesignBudget}
                            placeholder="Design"
                            onChange={this.handleInputChange}
                            className='budget'
                            name="newDesignBudget"
                        /><br/>
                        <p className='editBudgetLabel'>Engineering</p>
                        <input
                            type="text"
                            value={this.state.newEngBudget}
                            placeholder="Engineering"
                            onChange={this.handleInputChange}
                            className='budget'
                            name="newEngBudget"
                        /><br/>
                        <p className='editBudgetLabel'>Finance</p>
                        <input
                            type="text"
                            value={this.state.newFinanceBudget}
                            placeholder="Finance"
                            onChange={this.handleInputChange}
                            className='budget'
                            name="newFinanceBudget"
                        /><br/>
                        <p className='editBudgetLabel'>HR</p>
                        <input
                            type="text"
                            value={this.state.newHRBudget}
                            placeholder="HR"
                            onChange={this.handleInputChange}
                            className='budget'
                            name="newHRBudget"
                        /><br/>
                        <p className='editBudgetLabel'>Marketing</p>
                        <input
                            type="text"
                            value={this.state.newMarketingBudget}
                            placeholder="Marketing"
                            onChange={this.handleInputChange}
                            className='budget'
                            name="newMarketingBudget"
                        /><br/> 
                        <p className='editBudgetLabel'>Sales</p> 
                        <input
                            type="text"
                            value={this.state.newSalesBudget}
                            placeholder="Sales"
                            onChange={this.handleInputChange}
                            className='budget'
                            name="newSalesBudget"
                        /><br/>
                        <p className='editBudgetLabel'>Security</p>
                        <input
                            type="text"
                            value={this.state.newSecurityBudget}
                            placeholder="Security"
                            onChange={this.handleInputChange}
                            className='budget'
                            name="newSecurityBudget"
                        />   
                    </Col>
                </Row>
                <button id="buttnStyling" onClick={this.updateBudget}> Submit </button>
            </div>
        );
    };
}

export default EditBudget;