import React, { Component } from 'react';
var Chart = require("chart.js")

class Chart3 extends Component {

    constructor(props) {
        super(props);
        this.chart3Ref = React.createRef();
    }

    componentDidMount() {
        this.chart3 = new Chart(this.chart3Ref.current, {
            type: 'bar',
            data: {
                labels: ['Total Tasks'],
                datasets: [{
                    label: 'Incomplete',
                    data: [this.props.incomplete],
                    backgroundColor: ['Red'],
                    hoverBackgroundColor: ['red']
                },
                {
                    label: 'Complete',
                    data: [this.props.complete],
                    backgroundColor: ['Green'],
                    hoverBackgroundColor: ['green']
                }
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.counter !== prevProps.counter) {
            this.chart3.destroy();
            this.chart3 = new Chart(this.chart3Ref.current, {
                type: 'bar',
                data: {
                    labels: ['Total Tasks'],
                    datasets: [{
                        label: 'Incomplete',
                        data: [this.props.incomplete],
                        backgroundColor: ['Red']
                    },
                    {
                        label: 'Complete',
                        data: [this.props.complete],
                        backgroundColor: ['Green']
                    }
                    ]
                },
                options: {
                    scales: {
                        xAxes: [{
                            stacked: true
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    }
                }
            });
        }
    }

    render() {
        return (
            
            <canvas className='chart' ref={this.chart3Ref} />
        )
    };

};

export default Chart3;