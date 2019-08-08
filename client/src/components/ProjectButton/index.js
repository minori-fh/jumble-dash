import React from 'react';
import "./style.css";

function ProjectButton(props) {

    return (
        <button className="menuBtn" onClick={() => props.click(props.id)} id={props.id} className="sideBtn active">{props.name}</button>
    );

} 
export default ProjectButton