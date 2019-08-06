import React, { Component } from 'react';
import AssigneeAPI from '../../utils/API-assignee';

class Assignees extends Component {
    constructor(props) {
        super(props)
        this.state = {
            assignees: []
        }
    }

    componentDidMount() {
        AssigneeAPI.getAssignees(this.props.projectID).then(res => {
            console.log(res.data),
                this.setState({
                    assignees: res.data
                })
        })
            .catch(err => console.log(err.message));
    }

    render() {
        return (
            <div>
                {this.state.assignees.map((assignee,i) => (
                    <p key={i}>{assignee.name}</p>
                ))}
            </div>
        );
    }
}

export default Assignees;