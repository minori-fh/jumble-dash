import React, { Component } from 'react';
import { Col, Row } from "../Grid";
import Tasks from "../Tasks";
import Budget from "../Budget";
import Problems from "../Problems";


class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.chart2Ref = React.createRef();
        this.state = {
            tasksAdded: 0
        }
    }

    handleUpdateTasks = event => {
        event.preventDefault();
        console.log("tasks added---------------",this.state.tasksAdded)
        this.setState({
            tasksAdded: this.state.tasksAdded + 1
        })
    }

    render() {
        return (
            <div>
                {
                    this.props.projectID !== -1 ?
                        <div>
                            <Row>
                                <Col className="xl6 l6">
                                    <Budget projectID={this.props.projectID} status={this.props.status} chartSwitch={this.props.chartSwitch} />
                                </Col>

                                <Col className="xl6 l6">
                                    <Tasks projectID={this.props.projectID} updateTasks={this.handleUpdateTasks} />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="xl12">
                                    <Problems projectID={this.props.projectID} tasksAdded={this.state.tasksAdded} />
                                </Col>
                            </Row>
                        </div>
                        : <Row>Ok</Row>
                }
            </div>
        );
    }
}

export default Dashboard;