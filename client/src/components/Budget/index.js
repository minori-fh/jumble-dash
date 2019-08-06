import React, { Component } from 'react';
import BudgetAPI from '../../utils/API-budget';

class Budget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            budgetTotal: "",
            budgetDesign: "",
            budgetEngineering: "",
            budgetFinance: "",
            budgetHR: "",
            budgetMarketing: "",
            budgetSales: "",
            budgetSecurity: ""
        }
    }


    componentDidMount() {
        BudgetAPI.getBudget(this.props.projectID).then(res => {
            console.log(res.data)
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

    render() {
        return (
            <div>
                <p>{this.state.budgetTotal}</p>
            </div>
        );
    }
}

export default Budget;