import React, { Component } from 'react';
import ProblemAPI from '../../utils/API-problem';
import Chart2 from '../chart2';

class Problems extends Component {
    constructor(props) {
        super(props)
        this.chart2Ref = React.createRef();
        this.state = {
            tasks: [],
            problems: []
        }
    }

    componentDidMount() {

        TaskAPI.getIncompleteTasks(this.props.projectID).then(res => {
            this.setState({
                tasks: res.data
            })
        })
            .catch(err => console.log(err.message));

        const problemsArr = [];

        for (let i = 0; i < this.state.tasks.length; i++) {

            ProblemAPI.getproblems(this.state.tasks[i].id).then(res => {
                const taskProblems = [i, res.data];
                problemsArr.push(taskProblems);
            })
                .catch(err => console.log(err.message));
        }

        this.setState({
            problems: problemsArr
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

            const problemsArr = [];

            for (let i = 0; i < this.state.tasks.length; i++) {

                ProblemAPI.getproblems(this.state.tasks[i].id).then(res => {
                    const taskProblems = [i, res.data];
                    problemsArr.push(taskProblems);
                })
                    .catch(err => console.log(err.message));
            }

            this.setState({
                problems: problemsArr
            });
        }
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.problems}
                </div>
                {console.log(this.state.problems)}
                <Chart2 />
            </div>
        );
    }
}

export default Problems;