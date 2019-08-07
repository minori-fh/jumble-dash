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
                        <Col className="xl4 l3">
                            <Budget projectID={props.projectID} />
                        </Col>

                        <Col className="xl4 l3">
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