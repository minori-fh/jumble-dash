import React, { Component } from 'react';
import TaskAPI from '../../utils/API-task';
import Task from '../Task';

class Tasks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newTask: "",
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
            ProjectId: this.props.projectID
        }

        TaskAPI.createTask(task).then(res => {
            console.log("NEWTASK", res.data)
            let tasksList = this.state.tasks
            tasksList.push(res.data)
            this.setState({
                tasks: tasksList,
                newTask: ""
            })
        })
            .catch(err => console.log(err.message));
    }

    render() {
        return (
            <div>
                {this.state.tasks.map((task) => (
                    <div>
                        <Task key={task.updatedAt} task={task.task} assignee1={task.assignee1} 
                        assignee2={task.assignee2} assignee3={task.assignee3} assignee4={task.assignee4}></Task>
                    </div>
                ))}
                <form>
                    <input required
                        id="addTask"
                        type="text"
                        value={this.state.newTask}
                        placeholder="Task Name"
                        onChange={this.handleInputChange}
                        name="newTask"
                    />
                    <button onClick={this.addTask}> Submit </button>
                </form>
            </div>
        );
    }
}

export default Tasks;