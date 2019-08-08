import React, { Component } from "react";
import { Col, Row } from "../Grid";
import Tasks from "../Tasks";
import Budget from "../Budget";
// import Problems from "../Problems";
import MuuriGrid from 'react-muuri';
import './style.css';


class Dashboard extends Component {

    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
        this.grid = new MuuriGrid({
            node: this.gridElement,
            defaultOptions: {
                dragEnabled: true // See Muuri's documentation for other option overrides.
            },
        });

        // An example of how to use `getEvent()` to make `synchronize()` update the grid.
        this.grid.getEvent('dragEnd');
    }

    componentWillUnmount() {
        this.grid.getMethod('destroy'); // Required: Destroy the grid when the component is unmounted.
    }

    render() {
        return (
            <div>
                {/* Assign a ref to the grid container so the virtual DOM will ignore it for now (WIP). */}
                {
                    this.props.projectID !== -1 ?
                <div ref={gridElement => this.gridElement = gridElement}>
                    {/* Required: `item` and `item-content` classNames */}
                    <Row>
                        <Col className="xl6 l6">
                            <div className="item budget">
                                <div className="item-content">
                                    <Budget projectID={this.props.projectID} status={this.props.status} chartSwitch={this.props.chartSwitch} />
                                </div>
                            </div>
                        </Col>
                        <Col className="xl6 l6">
                            <div className="item tasks">
                                <div className="item-content">
                                    <Tasks projectID={this.props.projectID} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div> : 
                <Row>OK</Row>
            }
            </div>
            // <div>
            //     {
            //         props.projectID !== -1 ?
            //             <div>
            //                 <Row>
            //                     <Col className="xl6 l6">
            //                         <Budget projectID={props.projectID} status={props.status} chartSwitch={props.chartSwitch} />
            //                     </Col>

            //                     <Col className="xl6 l6">
            //                         <Tasks projectID={props.projectID} />
            //                     </Col>
            //                 </Row>
            //                 <Row>
            //                     <Col className="xl12">
            //                         {/* <Problems projectID={props.projectID} /> */}
            //                     </Col>
            //                 </Row>
            //             </div>
            //             : <Row>OK</Row>
            //     }
            // </div>
                );
    }
}

export default Dashboard;