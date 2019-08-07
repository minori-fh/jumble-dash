import React, {Component} from 'react';
var Chart = require("chart.js")

class Chart2 extends Component {

    constructor(props){
        super(props);
        this.chart2Ref = React.createRef(); 
    }

    componentDidMount(props) {
        this.chart2 = new Chart(this.chart2Ref.current, {
            type: 'line',
            options: {
              scales: {
                xAxes: [
                  {
                    type: "time",
                    time: {
                      unit: 'day'
                    }
                  }
                ],
                yAxes: [
                  {
                    ticks: {
                      min: 0,
                      max: 100
                    }
                  }
                ]
              }
            },
            data: {
              // labels here need to take in days in specific format
              labels: ["August 6, 2019", "August 7, 2019", "August 8, 2019", "August 9, 2019", "August 10, 2019"],
              datasets: [{
                label: ["Progress (%)"],
                data: [10,20,30,40],
                fill: 'none',
                backgroundColor: "#3E517A",
                pointRadius: 2,
                borderColor: "#3E517A",
                borderWidth: 1,
                lineTension: 0
              }]
            }
          });
      }

    render(){
        return(
            <canvas className = 'chart' ref={this.chart2Ref}/>
        )
    };

};

export default Chart2;