import React, { Component } from 'react';
import TaskAPI from '../../utils/API-task';
import ProblemAPI from '../../utils/API-problem';
import { Col, Row } from "../Grid";
// import Chart2 from '../chart2';

class Problems extends Component {
    constructor(props) {
        super(props)
        this.chart2Ref = React.createRef();
        this.state = {
            tasks: [],
            solvedProblems: [],
            unsolvedProblems: [],
            selectedTask: "",
            newProblem: ""
        }
    }

    componentDidMount() {

        TaskAPI.getIncompleteTasks(this.props.projectID).then(res => {
            this.setState({
                tasks: res.data
            })
        })
            .catch(err => console.log(err.message));

        const unsolvedProblemsArr = [];
        const solvedProblemsArr = [];

        for (let i = 0; i < this.state.tasks.length; i++) {

            ProblemAPI.getUnsolvedProblems(this.state.tasks[i].id).then(res => {
                const taskProblems = [this.state.tasks[i].id, res.data];
                unsolvedProblemsArr.push(taskProblems);
            })
                .catch(err => console.log(err.message));

            ProblemAPI.getUnsolvedProblems(this.state.tasks[i].id).then(res => {
                const taskProblems = [this.state.tasks[i].id, res.data];
                solvedProblemsArr.push(taskProblems);
            })
                .catch(err => console.log(err.message));
        }

        this.setState({
            unsolvedProblems: unsolvedProblemsArr,
            solvedProblems: solvedProblemsArr
        });
    }

    componentDidUpdate(prevProps) {

        if (this.props.projectID !== prevProps.projectID) {
            TaskAPI.getIncompleteTasks(this.props.projectID).then(res => {
                this.setState({
                    tasks: res.data
                })
            })
                .catch(err => console.log(err.message));

            const unsolvedProblemsArr = [];
            const solvedProblemsArr = [];

            for (let i = 0; i < this.state.tasks.length; i++) {

                ProblemAPI.getUnsolvedProblems(this.state.tasks[i].id).then(res => {
                    const taskProblems = [this.state.tasks[i].id, res.data];
                    unsolvedProblemsArr.push(taskProblems);
                })
                    .catch(err => console.log(err.message));

                ProblemAPI.getSolvedProblems(this.state.tasks[i].id).then(res => {
                    const taskProblems = [this.state.tasks[i].id, res.data];
                    solvedProblemsArr.push(taskProblems);
                })
                    .catch(err => console.log(err.message));
            }

            this.setState({
                unsolvedProblems: unsolvedProblemsArr,
                solvedProblems: solvedProblemsArr,
                selectedTask: "",
                newProblem: ""
            });
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

        console.log("HITTING THE BUTTON")
        console.log(this.state.newProblem)
        console.log(this.state.selectedTask)

        const problem = {
            Problem: this.state.newProblem,
            TaskId: this.state.selectedTask
        }

        ProblemAPI.createProblem(problem).then(res => {
            console.log("NEWProblem", res.data)
            let problemsList = this.state.unsolvedProblems;
            const newProblem = [res.data.TaskId, res.data];
            problemsList.push(newProblem)
            this.setState({
                unsolvedProblems: problemsList,
                newProblem: "",
                selectedTask: ""
            })
            console.log("NANI")
        })
            .catch(err => console.log(err.message));
    }

    render() {
        return (
            <div>
                <div>
                    <h1>PROBLEMS</h1>
                    <div>{this.state.problems}</div>
                    <Row>
                        {this.state.unsolvedProblems.map((problem, i) => (
                            <div key={i}>
                                <p>{problem.problem}</p>
                            </div>
                        ))}
                    </Row>
                    <Row>
                        <form>
                            <div>{this.state.selectedTask}</div>
                            <select name="selectedTask" value={this.state.selectedTask} onChange={this.handleInputChange}>
                                <option>Please Select a Task</option>
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
                            />
                            <button onClick={this.addProblem}> Submit </button>
                        </form>
                    </Row>
                </div>
                {console.log("unsolved", this.state.unsolvedProblems)}
                {console.log("solved", this.state.solvedProblems)}
                {/* <Chart2 /> */}
            </div>
        );
    }
}

export default Problems;