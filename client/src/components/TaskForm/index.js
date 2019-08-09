import React, { Component } from "react";
import {Col,Row} from "../Grid/Col"

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
                <Col>
                <p>{this.state.task} </p>
                <input required
                    type="text"
                    value={this.state.task}
                    placeholder="Task"
                    onChange={this.handleInputChange}
                    name="task"
                />
                </Col>
                <Col>
                <p>{this.state.assignee}</p>
                <input required
                    type="text"
                    value={this.state.assignee}
                    placeholder="Assignee"
                    onChange={this.handleInputChange}
                    name="Assignee"
                />
                </Col>
            </div>
        )
    }
}

export default TaskForm
