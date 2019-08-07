import React, { Component } from 'react';
import TaskAPI from '../../utils/API-task';

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
            console.log("NEWTASK",res.data)
            let tasksList = this.state.tasks
            tasksList.push(res.data)
            this.setState({
                tasks: tasksList,
                newTask: ""
            })

            TaskAPI.getTasks(task.ProjectId).then(res => {
                console.log(res)
                console.log(res.data.length)
            })
        })
        .catch(err => console.log(err.message));
    }

    completeTask = () => {
        // console.log(this.tasks)

        TaskAPI.getTasks(this.props.taskID).then(res => {
            console.log(res.data)
            this.setState({
                tasks: res.data
            })
        })
        
        this.setState({
            complete:true
        })
    }
 

    render() {
        return (
            <div>
                {this.state.tasks.map((task, i) => (
                    <div>
                        <p key={i}>{task.task}</p>
                        <button onClick={this.completeTask}>hello</button>
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