import React from "react";
import { Col, Row } from "../Grid";
import "./style.css";

function Task(props) {
    return (
        <Col className="xl12 l12">
            <p>{props.task}</p>
            <h1 id="test">Assignees </h1>
            <div>{props.assignee1}</div>
            <div>{props.assignee2}</div>
            <div>{props.assignee3}</div>
            <div>{props.assignee4}</div>
        </Col>
    );
}

export default Task;

