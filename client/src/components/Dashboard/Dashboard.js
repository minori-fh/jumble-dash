import React from "react";
import { Col, Row } from "../Grid";
import Tasks from "../Tasks";
import Budget from "../Budget";
import Problems from "../Problems";


function Dashboard(props) {
    return (
        <div>
            {
                props.projectID !== -1 ?
                    <div>
                        <Row>
                            <Col className="xl6 l6">
                                <Budget projectID={props.projectID} status={props.status} chartSwitch={props.chartSwitch} />
                            </Col>

                            <Col className="xl6 l6">
                                <Tasks projectID={props.projectID} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="xl12">
                                <Problems projectID={props.projectID} />
                            </Col>
                        </Row>
                    </div>
                    :  <Row>Ok</Row>
            }
        </div>
    );
}

export default Dashboard;