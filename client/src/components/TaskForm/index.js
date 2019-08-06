import React, { Component } from "react";

class TaskForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: this.props.tasks
        }
    }

    render() {
        return (
            <div>
                <p>{this.state.task}</p>
                <input required
                    type="text"
                    value={this.state.task}
                    placeholder="Task"
                    onChange={this.handleInputChange}
                    name="task"
                />
                <p>{this.state.assignee}</p>
                <input required
                    type="text"
                    value={this.state.assignee}
                    placeholder="Assignee"
                    onChange={this.handleInputChange}
                    name="Assignee"
                />
            </div>
        )
    }
}

export default TaskForm
