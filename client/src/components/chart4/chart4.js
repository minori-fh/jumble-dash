import React, { Component } from 'react';
var Chart = require("chart.js")


// const Chart1 = (props) => (
//   <div>
//     <div className="Open Tasks">
//       <p>Open Tasks</p>
//     </div>
//     <div className="Closed Tasks">
//       <p>Closed Tasks</p>
//     </div>
//     <div className="Budget">
//       <p>Budget</p>
//     </div>
//   </div>
// );
class Chart4 extends Component {

  constructor(props) {
    super(props);
    this.chart4Ref = React.createRef();
  }

  componentDidMount() {
    this.chart4 = new Chart(this.chart4Ref.current, {
      type: 'polarArea',
      data: {
        labels: ['Red', 'Yellow', 'Blue'],
        datasets: [{
          data: [10, 20, 30],
          backgroundColor: ['red', 'yellow', 'blue']
        }]
      }
    });
  }

  render() {
    return (
      <div>
        <canvas className='chart' ref={this.chart4Ref} />
      </div>
    )
  };

};

export default Chart4;