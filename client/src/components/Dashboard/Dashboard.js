import React from "react";
import Tasks from "../Tasks";
import Budget from "../Budget";
import Assignees from "../Assignees";

function Dashboard(props) {
    return (
        <div>
            {
                props.projectID != -1 ?
                    <div>
                        <Tasks projectID={props.projectID} />
                        <Assignees projectID={props.projectID} />
                        <Budget projectID={props.projectID}/>
                    </div>
                    : <div>OK</div>
            }
            {props.children}
        </div>
    );
}

export default Dashboard;