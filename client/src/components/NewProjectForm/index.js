import React, { Component } from 'react';
import "./style.css";
import API from "../../utils/API-project";
import APIBudget from "../../utils/API-budget"
import APITask from "../../utils/API-task";
import TaskForm from "../TaskForm";
import Dashboard from '../Dashboard';

class NewProjectForm extends Component {

    state = {
        title: "",
        savedTitle: false,
        budget: "",
        projectID: 0,
        task: "",
        assignee1: "",
        assignee2: "",
        assignee3: "",
        assignee4: ""
    }

    handleInputChange = event => {

        const { name, value } = event.target
        this.setState({
            [name]: value
        });
    }

    saveProject = event => {
        event.preventDefault();
        const body = {
            name: this.state.title
        }
        this.setState({
            savedTitle: true
        });

        API.createProject(body)
            .then(res => {
                console.log(res.data.id)
                this.setState({
                    projectID: res.data.id
                });
                console.log("--------------" + this.state.projectID)
            })
            .catch(err => console.log(err.message));
    }

    addTask = event => {
        event.preventDefault();
        const newTask = this.state.tasks;
        newTask.push({ name: "", assignees: [""] });
        this.setState({
            tasks: newTask
        });
    }

    saveBudgetTask = event => {
        event.preventDefault();
        const body = {
            total: this.state.budget,
            ProjectId: this.state.projectID
        }
        APIBudget.createBudget(body)
            .then(res => {
                console.log("lets hope this works!!!!!!!!", res);
            })
            .catch(err => console.log(err.message));

        let info = {
            task: this.state.task,
            assignee1: this.state.assignee1,
            assignee2: this.state.assignee2,
            assignee3: this.state.assignee3,
            assignee4: this.state.assignee4,
            ProjectId: this.state.projectID
        }

        APITask.createTask(info)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err.message));

        this.dashboard(this.props)

    }

    dashboard = (props) => {
        (props.edit())
        // window.location.reload(false);
        API.getProject(this.state.projectID)
            .then(result => {
                console.log("this is the result on the of pulling the saved project", result)
            })
        APIBudget.getBudget(this.state.projectID)
            .then(result => {
                console.log("this is the result on the of pulling the saved Budget", result)
            })
        APITask.getTasks(this.state.projectID)
            .then(result => {
                console.log("this is the result on the of pulling the saved Task", result)
            })
    }

    formRender() {
        if (this.state.savedTitle === false) {
            return (
                <div>
                    <form id="styling">
                        <input required
                            id="inputName"
                            type="text"
                            value={this.state.title}
                            placeholder="Project Name"
                            onChange={this.handleInputChange}
                            name="title"
                        />
                        <button id="submitNewProject" onClick={this.saveProject} > Next </button>
                    </form>
                </div>
            )
        }
        else {
            return (
                <div>
                    <form id="styling">
                        <input required
                            id="inputBudget"
                            type="text"
                            value={this.state.budget}
                            placeholder="Budget"
                            onChange={this.handleInputChange}
                            name="budget"
                        />
                        <input required
                            type="text"
                            value={this.state.task}
                            placeholder="Task"
                            onChange={this.handleInputChange}
                            name="task"
                        />
                        <input
                            type="text"
                            value={this.state.assignee1}
                            placeholder="Assignee #1 (Required)"
                            onChange={this.handleInputChange}
                            name="assignee1"
                        />
                        <input
                            type="text"
                            value={this.state.assignee2}
                            placeholder="Assignee #2 (Optional)"
                            onChange={this.handleInputChange}
                            name="assignee2"
                        />
                        <input
                            type="text"
                            value={this.state.assignee3}
                            placeholder="Assignee #3 (Optional)"
                            onChange={this.handleInputChange}
                            name="assignee3"
                        />
                        <input
                            type="text"
                            value={this.state.assignee4}
                            placeholder="Assignee #4 (Optional)"
                            onChange={this.handleInputChange}
                            name="assignee4"
                        />
                        <button id="submit" onClick={this.saveBudgetTask} >Submit</button>
                    </form>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.formRender()}
            </div>
        )
    }
}

export default NewProjectForm