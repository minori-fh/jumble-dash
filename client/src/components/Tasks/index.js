import React, { Component } from 'react';
import TaskAPI from '../../utils/API-task';

class Tasks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: []
        }
    }

    componentDidMount() {
        TaskAPI.getTasks(this.props.projectID).then(res => {
            console.log(res.data),
                this.setState({
                    tasks: res.data
                })
        })
            .catch(err => console.log(err.message));
    }

    render() {
        return (
            <div>
                {this.state.tasks.map((task,i) => (
                    <p key={i}>{task.task}</p>
                ))}
            </div>
        );
    }
}

export default Tasks;