import React, { Component } from 'react';
import TaskAPI from '../../utils/API-task';
import ProblemAPI from '../../utils/API-problem';
import { Col, Row } from "../Grid";
import Chart2 from '../chart2';

class Problems extends Component {
    constructor(props) {
        super(props)
        this.chart2Ref = React.createRef();
        this.state = {
            tasks: [],
            solvedProblems: [],
            unsolvedProblems: [],
            selectedTask: ""
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

            ProblemAPI.getunsolvedproblems(this.state.tasks[i].id).then(res => {
                const taskProblems = [this.state.tasks[i].id, res.data];
                unsolvedProblemsArr.push(taskProblems);
            })
                .catch(err => console.log(err.message));

            ProblemAPI.getsolvedproblems(this.state.tasks[i].id).then(res => {
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

                ProblemAPI.getunsolvedproblems(this.state.tasks[i].id).then(res => {
                    const taskProblems = [this.state.tasks[i].id, res.data];
                    unsolvedProblemsArr.push(taskProblems);
                })
                    .catch(err => console.log(err.message));

                ProblemAPI.getsolvedproblems(this.state.tasks[i].id).then(res => {
                    const taskProblems = [this.state.tasks[i].id, res.data];
                    solvedProblemsArr.push(taskProblems);
                })
                    .catch(err => console.log(err.message));
            }

            this.setState({
                unsolvedProblems: unsolvedProblemsArr,
                solvedProblems: solvedProblemsArr,
                selectedTask: ""
            });
        }
    }

    handleInputChange = event => {

        this.setState({
            selectedTask: event.target.value
        })
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
                            <select value={this.state.selectedTask} onChange={this.handleInputChange}>
                                    <option></option>
                                {this.state.tasks.map((task,i) => (
                                    <option value={task.id} key={i}>{task.task}</option>
                                ))}
                            </select>
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