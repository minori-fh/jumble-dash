import React from "react";
import { Col, Row } from "../Grid";
import Tasks from "../Tasks";
import Budget from "../Budget";
import Assignees from "../Assignees";

function Dashboard(props) {
    return (
        <div>
            {
                props.projectID !== -1 ?
                    <Row>
                        <Col className="xl6 l6">
                            <Budget projectID={props.projectID} status = {props.status} chartSwitch = {props.chartSwitch}/>
                        </Col>

                        <Col className="xl6 l6">
                            <Tasks projectID={props.projectID} />
                        </Col>
                    </Row>
                    : <Row>OK</Row>
            }
            {props.children}
        </div>
    );
}

export default Dashboard;