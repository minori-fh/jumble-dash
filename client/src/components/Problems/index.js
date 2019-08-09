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
            newProblem: "",
            counter: 0,
            unsolved: [],
            solved: [],
            test: 5,
            test2: 9
        }
    }

    componentDidMount() {

        TaskAPI.getIncompleteTasks(this.props.projectID).then(res => {
            console.log(res)
            this.setState({
                tasks: res.data
            })
        })
            .catch(err => console.log(err.message));

        this.loadProblems();
    }

    loadProblems = () => {
        const unsolvedProblemsArr = [];
        const unsolved = [];

        for (let i = 0; i < this.state.tasks.length; i++) {

            ProblemAPI.getUnsolvedProblems(this.state.tasks[i].id).then(res => {
                console.log("WTF IS GOING ON")
                const taskProblems = [this.state.tasks[i].id, res.data];
                unsolvedProblemsArr.push(taskProblems);
                unsolved.push(parseInt(res.data.length));
            })
                .catch(err => console.log(err.message));
        }

        this.setState({
            unsolvedProblems: unsolvedProblemsArr,
            unsolved: unsolved,
            counter: this.state.counter + 1
        });

        this.loadProblems2();
    }

    loadProblems2 = () => {
        const solvedProblemsArr = [];
        const solved = [];

        for (let i = 0; i < this.state.tasks.length; i++) {
            ProblemAPI.getSolvedProblems(this.state.tasks[i].id).then(res => {
                const taskProblems = [this.state.tasks[i].id, res.data];
                solvedProblemsArr.push(taskProblems);
                solved.push(parseInt(res.data.length));
            })
                .catch(err => console.log(err.message));
        }


        this.setState({
            solvedProblems: solvedProblemsArr,
            solved: solved,
            counter: this.state.counter + 1
        });
    }

    componentDidUpdate(prevProps) {

        if (this.props.projectID !== prevProps.projectID) {
            TaskAPI.getIncompleteTasks(this.props.projectID).then(res => {
                this.setState({
                    tasks: res.data
                });

                const unsolvedProblemsArr = [];
                const solvedProblemsArr = [];
                const unsolved = [];
                const solved = [];

                for (let i = 0; i < this.state.tasks.length; i++) {

                    ProblemAPI.getUnsolvedProblems(this.state.tasks[i].id).then(res => {
                        const taskProblems = [this.state.tasks[i].id, res.data];
                        unsolvedProblemsArr.push(taskProblems);
                        unsolved.push(parseInt(res.data.length));

                        ProblemAPI.getSolvedProblems(this.state.tasks[i].id).then(res => {
                            const taskProblems = [this.state.tasks[i].id, res.data];
                            solvedProblemsArr.push(taskProblems);
                            solved.push(parseInt(res.data.length));
                        })
                            .catch(err => console.log(err.message));

                    })
                        .catch(err => console.log(err.message));
                }

                console.log("UNSOLVED PROBLEMS HERE", unsolvedProblemsArr);

                console.log("THESE ARE UNSOLVED PROBLEMS", unsolved);
                console.log("WHAT ARE THOSE", unsolved);


                this.setState({
                    unsolvedProblems: unsolvedProblemsArr,
                    solvedProblems: solvedProblemsArr,
                    selectedTask: "",
                    newProblem: "",
                    solved: solved,
                    unsolved: unsolved,
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
            problemsList.push(newProblem)
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

    render() {
        return (
            <div>
                <div>
                    <h1>PROBLEMS</h1>
                    <Chart2 counter={this.state.counter} projectID={this.props.projectID} tasks={this.state.tasks} unsolved={this.state.test} solved={this.state.test2} />
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
            </div>
        );
    }
}

export default Problems;