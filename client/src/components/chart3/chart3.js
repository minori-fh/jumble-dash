import React, {Component} from 'react';
var Chart = require("chart.js")

class Chart3 extends Component {

    constructor(props){
        super(props);
        this.chart3Ref = React.createRef(); 
    }

    componentDidMount() {
        this.chart3 = new Chart(this.chart3Ref.current, {
          type: 'doughnut',
          data: {
            labels: ['Red', 'Yellow', 'Blue'],
            datasets: [{
              data: [10, 20, 30],
              backgroundColor: ['#a8e0ff', '#8ee3f5', '#70cad1']
            }]
          }
        });
      }

    render(){
        return(
            <canvas className = 'chart' ref={this.chart3Ref}/>
        )
    };

};

export default Chart3;