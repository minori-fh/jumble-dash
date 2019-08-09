import React, { Component } from 'react';
var Chart = require("chart.js");

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
        labels: ["Task"],
        //data needs to 
        datasets: [
          {
            label: "Unsolved Problems",
            backgroundColor: "#df4343",
            data: [this.props.unsolved]
          },
          {
            label: "Solved Problems",
            backgroundColor: "#379937",
            data: [this.props.solved]
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 10
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

      this.chart2 = new Chart(this.chart2Ref.current, {
        type: 'bar',
        data: {
          labels: ["Task"],
          datasets: [
            {
              label: "Incomplete",
              backgroundColor: "#df4343",
              data: [this.props.unsolved]
            },
            {
              label: "Complete",
              backgroundColor: "#379937",
              data: [this.props.solved]
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                  max: this.props.unsolved + this.props.solved
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
      <div>
        
        <canvas className='chart' ref={this.chart2Ref} />
      </div>
    )
  };

};

export default Chart2;