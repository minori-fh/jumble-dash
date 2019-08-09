import React, { Component } from 'react';
import TaskAPI from '../../utils/API-task';
import ProblemAPI from '../../utils/API-problem';
import Chart2 from '../chart2';
import { Col, Row } from "../Grid";

class Problems extends Component {
    constructor(props) {
        super(props)
        this.chart2Ref = React.createRef();
        this.state = {
            tasks: [],
            solvedProblems: [],
            unsolvedProblems: [],
            selectedTask: "",
            selectedProblem: "",
            newProblem: "",
            counter: 0,
            unsolved: 0,
            solved: 0
        }
    }

    componentDidMount() {

        TaskAPI.getIncompleteTasks(this.props.projectID).then(res => {
            console.log(res)
            this.setState({
                tasks: res.data
            })
            const unsolvedProblemsArr = [];
            const solvedProblemsArr = [];

            for (let i = 0; i < this.state.tasks.length; i++) {

                ProblemAPI.getUnsolvedProblems(this.state.tasks[i].id).then(res => {
                    console.log("WTF IS GOING ON")
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
                counter: this.state.counter + 1
            });
        })
            .catch(err => console.log(err.message));
    }

    componentDidUpdate(prevProps) {

        if (this.props.projectID !== prevProps.projectID) {
            TaskAPI.getIncompleteTasks(this.props.projectID).then(res => {
                this.setState({
                    tasks: res.data
                });

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

                this.calculateUnsolved();

                this.setState({
                    unsolvedProblems: unsolvedProblemsArr,
                    solvedProblems: solvedProblemsArr,
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

        console.log("HITTING THE BUTTON")
        console.log(this.state.newProblem)
        console.log(this.state.selectedTask)

        const problem = {
            problem: this.state.newProblem,
            TaskId: this.state.selectedTask
        }

        ProblemAPI.createProblem(problem).then(res => {
            console.log("NEWProblem", res.data)
            let problemsList = this.state.unsolvedProblems;
            const newProblem = [res.data.TaskId, res.data];
            problemsList.push(newProblem);
            this.setState({
                unsolvedProblems: problemsList,
                newProblem: "",
                selectedTask: "",
                counter: this.state.counter + 1
            })
            console.log("NANI")
        })
            .catch(err => console.log(err.message));
    }

    calculateUnsolved = () => {

        let unsolved = this.state.unsolvedProblems[0][1].map(problem => problem.length);
        let solved = this.state.solvedProblems.map(problem => problem[1].length);
        this.setState({
            unsolved: unsolved,
            solved: solved
        });
        console.log(this.state.unsolved);
    }

    render() {
        return (
            <div>
                <div>
                    <h1>PROBLEMS</h1>
                    <Chart2 counter={this.state.counter} projectID={this.props.projectID} tasks={this.state.tasks} unsolved={this.state.unsolved} solved={this.state.solved} />
                    <Row>
                        {this.state.unsolvedProblems.map((problem, i) => (
                            <div key={i}>
                                <p>{problem.problem}</p>
                            </div>
                        ))}
                        {/* {this.state.} */}
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
                        <form>
                            <div>{this.state.unsolvedProblems}</div>
                            <select name="selectedProblem" value={this.state.selectedProblem} onChange={this.handleInputChange}>
                                <option>Please Select a Problem</option>
                                {this.state.unsolvedProblems.map((problem, i) => (
                                    <option value={problem.id} key={i}>{problem.task}</option>
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
                        {console.log(this.state.unsolved)}
                    </Row>
                </div>
            </div>
        );
    }
}

export default Problems;