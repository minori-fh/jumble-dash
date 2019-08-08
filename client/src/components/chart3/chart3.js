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
            data: [this.props.taskIncomplete],
            backgroundColor: ['Red'],
            hoverBackgroundColor:['Red']
        },
        {
            label: 'Complete',
            data:[this.props.tasksComplete] ,
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
            stacked: true
          }]
        }
      }
    });
  }

  componentDidUpdate(prevProps) {
      if(this.props.tasksComplete !== prevProps.taskIncomplete){
        this.chart3 = new Chart(this.chart3Ref.current, {
            type: 'bar',
            data: {
              labels: ['Total Tasks'],
              datasets: [{
                  label: 'Incomplete',
                  data: [this.props.taskIncomplete],
                  backgroundColor: ['Red']
              },
              {
                  label: 'Complete',
                  data:[this.props.tasksComplete] ,
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