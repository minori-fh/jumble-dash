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
        labels: this.props.tasks.map(task => task.task),
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
    if (this.props.counter !== prevProps.counter) {
      this.chart2.destroy();

      console.log("PROBLEMS WE HAVE", this.props.unsolved.length)
      console.log("counter",this.props.counter)

      this.chart2 = new Chart(this.chart2Ref.current, {
        type: 'bar',
        data: {
          labels: this.props.tasks.map(task => task.task),
          datasets: [
            {
              label: "Incomplete",
              backgroundColor: "red",
              data: this.props.unsolved
            },
            {
              label: "Complete",
              backgroundColor: "green",
              data:  this.props.solved
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