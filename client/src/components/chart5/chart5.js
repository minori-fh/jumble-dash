import React, { Component } from 'react';
// var Chart = require("chart.js")

function Chart5(props){
    return(
        <div>
            <div className="Open Tasks">
            <p>Open Tasks: </p>
            </div>
            <div className="Closed Tasks">
            <p>Closed Tasks: </p>
            </div>
            <div className="Budget">
            <p>Budget: </p>
            </div>
            <div className="Budget">
            <p>Deadline: </p>
            </div>
        </div>
    );
};
// const Chart5 = (props) => (

//     render(
//     <div>
//         <div className="Open Tasks">
//         <p>Open Tasks</p>
//         </div>
//         <div className="Closed Tasks">
//         <p>Closed Tasks</p>
//         </div>
//         <div className="Budget">
//         <p>Budget</p>
//         </div>
//     </div>
//     )
// );

export default Chart5;