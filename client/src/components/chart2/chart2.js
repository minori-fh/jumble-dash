import React, { Component } from 'react';
var Chart = require("chart.js")

class Chart2 extends Component {

  constructor(props) {
    super(props);
    this.chart2Ref = React.createRef();
  }

  componentDidMount() {
    this.chart2 = new Chart(this.chart2Ref.current, {
      type: 'bar',
      data: {
        //labels are task names or ids
        labels: [
          "Task 1", "Task 2"
        ],
        //data needs to 
        datasets: [
          {
            label: "Unsolved Problems",
            backgroundColor: "red",
            data: [40, 29]
          },
          {
            label: "Solved Problems",
            backgroundColor: "green",
            data: [26, 50]
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 100
              }
            }
          ]
        }
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.total !== prevProps.total) {
      this.chart2 = new Chart(this.chart2Ref.current, {
        type: 'bar',
        data: {
          labels: [
            "Tasks"
          ],
          datasets: [
            {
              label: "Incomplete",
              backgroundColor: "red",
              data: [40]
            },
            {
              label: "Complete",
              backgroundColor: "green",
              data: [26]
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                  max: 100
                }
              }
            ]
          }
        }
      });
    }
  }

  render() {
    return (
      <canvas className='chart' ref={this.chart2Ref} />
    )
  };

};

export default Chart2;