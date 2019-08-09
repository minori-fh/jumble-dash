import React from "react";
import { Col, Row } from "../Grid";
import "./style.css"

function Task(props) {
    return (
        // <Col className="xl3">
        <div>
            <p id='newTask'>{props.task}</p>
            <p>Assignees</p>
            <div>{props.assignee1}</div>
            <div>{props.assignee2}</div>
            <div>{props.assignee3}</div>
            <div>{props.assignee4}</div>
        </div>
        
    );
}

export default Task;

