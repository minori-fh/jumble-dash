import React from "react"
import "./style.css"
// import { Col, Row } from "../Grid"
// import Button from "../../components/ProjectButtons"

function Sidenav(props) {
    return (
        <div>
            <nav className="navBar">
                {props.children}
            </nav>
        </div>
    )
}

export default Sidenav;