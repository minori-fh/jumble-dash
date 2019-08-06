import React, {Component} from 'react';
var Chart = require("chart.js")

class Chart4 extends Component {

    constructor(props){
        super(props);
        this.chart4Ref = React.createRef(); 
    }

    componentDidMount() {
        this.chart4 = new Chart(this.chart4Ref.current, {
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
            <canvas className = 'chart' ref={this.chart4Ref}/>
        )
    };

};

export default Chart4;