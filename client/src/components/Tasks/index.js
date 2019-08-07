import React, { Component } from 'react';
import TaskAPI from '../../utils/API-task';
import { Col, Row } from "../Grid";
import Task from '../Task';

class Tasks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newTask: "",
            newAssignee1: "",
            newAssignee2: "",
            newAssignee3: "",
            newAssignee4: "",
            tasks: []
        }
    }

    componentDidMount() {
        TaskAPI.getTasks(this.props.projectID).then(res => {
            console.log(res.data)
            this.setState({
                tasks: res.data
            })
        })
            .catch(err => console.log(err.message));
    }

    componentDidUpdate(prevProps) {

        if (this.props.projectID !== prevProps.projectID) {
            TaskAPI.getTasks(this.props.projectID).then(res => {
                console.log(res.data)
                this.setState({
                    tasks: res.data
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

    addTask = event => {
        event.preventDefault();

        const task = {
            task: this.state.newTask,
            assignee1: this.state.newAssignee1,
            assignee2: this.state.newAssignee2,
            assignee3: this.state.newAssignee3,
            assignee4: this.state.newAssignee4,
            ProjectId: this.props.projectID
        }

        TaskAPI.createTask(task).then(res => {
            console.log("NEWTASK", res.data)
            let tasksList = this.state.tasks
            tasksList.push(res.data)
            this.setState({
                tasks: tasksList,
                newTask: "",
                newAssignee1: "",
                newAssignee2: "",
                newAssignee3: "",
                newAssignee4: ""
            })
        })
            .catch(err => console.log(err.message));
    }

    render() {
        return (
            <div>

                <Row>
                    <Col className="xl12">
                        <h1>Tasks</h1>
                        <hr></hr>
                    </Col>
                </Row>
                <Row>
                    {this.state.tasks.map((task) => (
                        <div key={task.id}>
                            <Task task={task.task} assignee1={task.assignee1}
                                assignee2={task.assignee2} assignee3={task.assignee3} assignee4={task.assignee4}></Task>
                        </div>
                    ))}
                </Row>
                <Row>
                    <form>
                        <input required
                            id="addTask"
                            type="text"
                            value={this.state.newTask}
                            placeholder="Task Name"
                            onChange={this.handleInputChange}
                            name="newTask"
                        />
                        <input
                            type="text"
                            value={this.state.assignee1}
                            placeholder="Assignee #1"
                            onChange={this.handleInputChange}
                            name="newAssignee1"
                        />
                        <input
                            type="text"
                            value={this.state.assignee2}
                            placeholder="Assignee #2"
                            onChange={this.handleInputChange}
                            name="newAssignee2"
                        />
                        <input
                            type="text"
                            value={this.state.assignee3}
                            placeholder="Assignee #3"
                            onChange={this.handleInputChange}
                            name="newAssignee3"
                        />
                        <input
                            type="text"
                            value={this.state.assignee4}
                            placeholder="Assignee #4"
                            onChange={this.handleInputChange}
                            name="newAssignee4"
                        />
                        <button onClick={this.addTask}> Submit </button>
                    </form>
                </Row>
            </div>
        );
    }
}

export default Tasks;