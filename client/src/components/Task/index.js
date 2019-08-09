import React from "react";
import { Col, Row } from "../Grid";
import "./style.css"

function Task(props) {
    return (
      
        <div >
              <Col className="xl3">
            <h3 id="nameStyling">{props.task}</h3>
            <p id="nameStyling">Assignees</p>
            <div>{props.assignee1}</div>
            <div>{props.assignee2}</div>
            <div>{props.assignee3}</div>
            <div>{props.assignee4}</div>
            </Col>
        </div>
      
    );
}

export default Task;

