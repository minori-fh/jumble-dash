import React from "react"
import "./style.css"
// import {Row,Col} from "../Grid/index"
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