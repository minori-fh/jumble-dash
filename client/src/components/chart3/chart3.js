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
                labels: ['Total Tasks (in %)'],
                datasets: [{
                    label: 'Incomplete',
                    data: [(this.props.incomplete / (this.props.complete + this.props.incomplete)) * 100],
                    backgroundColor: ['Red']
                },
                {
                    label: 'Complete',
                    data: [(this.props.complete / (this.props.complete + this.props.incomplete)) * 100],
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
                        stacked: true,
                        ticks: {
                            min: 0,
                            max: ((this.props.complete + this.props.incomplete)/ (this.props.complete + this.props.incomplete)) * 100 
                        }
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
                    labels: ['Total Tasks (in %)'],
                    datasets: [{
                        label: 'Incomplete',
                        data: [(this.props.incomplete / (this.props.complete + this.props.incomplete)) * 100],
                        backgroundColor: ['Red'],
                        hoverBackgroundColor: ['Red']
                    },
                    {
                        label: 'Complete',
                        data: [(this.props.complete / (this.props.complete + this.props.incomplete)) * 100],
                        backgroundColor: ['Green'],
                        hoverBackgroundColor: ['Green']
                    }
                    ]
                },
                options: {
                    scales: {
                        xAxes: [{
                            stacked: true
                        }],
                        yAxes: [{
                            stacked: true,
                            ticks: {
                                min: 0,
                                max: 100 
                            }
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