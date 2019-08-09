import React from "react";
import { Col, Row } from "../Grid";

function Task(props) {
    return (
        // <Col className="xl3">
        <div>
            <p>{props.task}</p>
            <h1>Assignees</h1>
            <div>{props.assignee1}</div>
            <div>{props.assignee2}</div>
            <div>{props.assignee3}</div>
            <div>{props.assignee4}</div>
        </div>
        
    );
}

export default Task;

