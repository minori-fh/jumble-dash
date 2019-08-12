import React, { Component } from 'react';
import TaskAPI from '../../utils/API-task';
import ProblemAPI from '../../utils/API-problem';
import Chart2 from '../chart2';
import { Col, Row } from "../Grid";
import "./style.css";

class Problems extends Component {
    constructor(props) {
        super(props)
        this.chart2Ref = React.createRef();
        this.state = {
            tasks: [],
            viewUnsolvedProblems: [],
            selectedTask: "",
            selectedProblem: "",
            newProblem: "",
            counter: 0,
            unsolved: 0,
            solved: 0,
            problemsList: []
        }
    }

    componentDidMount() {

        TaskAPI.getIncompleteTasks(this.props.projectID).then(res => {
            console.log(res)
            this.setState({
                tasks: res.data,
                counter: this.state.counter + 1
            })
        })
            .catch(err => console.log(err.message));
    }

    componentDidUpdate(prevProps) {

        if (this.props.projectID !== prevProps.projectID || this.props.tasksAdded !== prevProps.tasksAdded) {
            TaskAPI.getIncompleteTasks(this.props.projectID).then(res => {
                this.setState({
                    tasks: res.data,
                    selectedTask: "",
                    newProblem: "",
                    counter: this.state.counter + 1
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

    addProblem = event => {
        event.preventDefault();

        const problem = {
            problem: this.state.newProblem,
            TaskId: this.state.selectedTask
        }

        ProblemAPI.createProblem(problem).then(res => {
            let problemsList = this.state.unsolvedProblems;
            const newProblem = [res.data.TaskId, res.data];
            problemsList.push(newProblem);
            this.setState({
                unsolvedProblems: problemsList,
                newProblem: "",
                selectedTask: "",
                counter: this.state.counter + 1
            })
        })
            .catch(err => console.log(err.message));
    }

    viewProblem = event => {
        event.preventDefault();

        ProblemAPI.getUnsolvedProblems(this.state.viewTaskProblem).then(res => {
            this.setState({
                problemsList: res.data,
                unsolved: res.data.length
            });
            ProblemAPI.getSolvedProblems(this.state.viewTaskProblem).then(res => {
                this.setState({
                    solved: res.data.length,
                    counter: this.state.counter + 1
                })
            })
                .catch(err => console.log(err.message));
        })
            .catch(err => console.log(err.message));
    }

    completeProblem = id => {

        const solve = {
            solved: true
        }

        ProblemAPI.updateProblem(id, solve).then(res => {
            let list = this.state.problemsList;

            for (let i = 0; i < list.length; i++) {
                if (list[i].id === id) {
                    list.splice(i, 1);
                }
            }
            this.setState({
                problemsList: list,
                solved: this.state.solved + 1,
                unsolved: this.state.unsolved - 1,
                counter: this.state.counter + 1
            });
        })
    }

    render() {
        return (
            <div>
                <div>
                    <h1 id='name-styling'>Task Issues</h1>
                    <hr width="80%"/>
                    <Chart2 counter={this.state.counter} unsolved={this.state.unsolved} solved={this.state.solved} />
                        <Row>
                            <Col className='xl6 newIssue'>
                                <p className='taskIssueHeader'>Submit a New Issue:</p>
                                <form id='newIssue'>
                                    <select name="selectedTask" value={this.state.selectedTask} onChange={this.handleInputChange}>
                                        <option id='selectedTask'>Please Select a Task</option>
                                        {this.state.tasks.map((task, i) => (
                                            <option value={task.id} key={i}>{task.task}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        value={this.state.newProblem}
                                        placeholder="What seems to be the problem?"
                                        onChange={this.handleInputChange}
                                        name="newProblem"
                                        className='newProblem'
                                    />
                                    <button id='taskIssuebtn1' onClick={this.addProblem}> Submit </button>
                                </form>
                            </Col>
                            <Col className='xl6 viewIssue'>
                                <p className='taskIssueHeader'>View Issues by Task:</p>
                                <form id='viewIssue'>
                                    <select name="viewTaskProblem" value={this.state.viewTaskProblem} onChange={this.handleInputChange}>
                                        <option id='viewTaskProblem' >Please Select a Task</option>
                                        {this.state.tasks.map((task, i) => (
                                            <option value={task.id} key={i}>{task.task}</option>
                                        ))}
                                    </select>
                                    <button id='taskIssuebtn2' onClick={this.viewProblem}> View </button>
                                </form>

                                <div className='taskIssueHeader'>{this.state.problemsList.map((problem) => (
                                    <Row key={problem.id}>
                                        <p>Issues:</p>
                                        <Col id='completeIssueCol' className='xl12'> 
                                            {problem.problem}
                                            <button id='taskIssuebtn3' key={problem.id} onClick={() => this.completeProblem(problem.id)}>Complete</button>
                                        </Col>
                                    </Row>
                                ))}</div>
                            </Col>
                        </Row>
                </div>
            </div>
        );
    }
}

export default Problems;