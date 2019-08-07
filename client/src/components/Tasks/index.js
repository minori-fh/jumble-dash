import React, { Component } from 'react';
import TaskAPI from '../../utils/API-task';
import Task from '../Task';
var Chart = require("chart.js")

class Tasks extends Component {
  constructor(props) {
    super(props)
    this.chart3Ref = React.createRef();
    this.state = {
      newTask: "",
      tasks: []
    }
  }

  componentDidMount(id) {
    // TaskAPI.getTasks(this.props.projectID).then(res => {
    //     console.log(res.data)
    //     this.setState({
    //         tasks: res.data
    //     })
    // })
    TaskAPI.getIncompleteTasks(id).then(res => {
      console.log("this should be incomplete tasks", res.data)
      this.setState({
        tasks: res.data
      })
    })

      .catch(err => console.log(err.message));
    this.chart3 = new Chart(this.chart3Ref.current, {
      type: 'bar',
      data: {
        labels: ['A'],
        datasets: [{
          label: 'awldj',
          data: [33.33],
          backgroundColor: ['red']
        },
        {
          label: 'ndjak',
          data: [33.33],
          backgroundColor: ['green']
        },
        {
          label: 'djsad',
          data: [33.33],
          backgroundColor: ['blue']
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

    if (this.props.projectID !== prevProps.projectID) {
      TaskAPI.getIncompleteTasks(this.props.projectID).then(res => {
        console.log(res.data)
        this.setState({
          tasks: res.data
        })
      })
        .catch(err => console.log(err.message));
      this.chart3 = new Chart(this.chart3Ref.current, {
        type: 'bar',
        data: {
          labels: ['A'],
          datasets: [{
            label: 'awldj',
            data: [33.33],
            backgroundColor: ['red']
          },
          {
            label: 'ndjak',
            data: [33.33],
            backgroundColor: ['green']
          },
          {
            label: 'djsad',
            data: [33.33],
            backgroundColor: ['blue']
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

  handleInputChange = event => {

    const { name, value } = event.target
    this.setState({
      [name]: value
    });
  }

  addTask = event => {
    event.preventDefault();

    const task = {
      task: this.state.newTask,
      ProjectId: this.props.projectID
    }

    TaskAPI.createTask(task).then(res => {
      console.log("NEWTASK", res.data)
      let tasksList = this.state.tasks
      tasksList.push(res.data)
      this.setState({
        tasks: tasksList,
        newTask: ""
      })
    })
      .catch(err => console.log(err.message));
  }

  completeTask = id => {


    const com = {
      complete: true
    }
    TaskAPI.updateTask(id, com).then(res => {
      console.log("UPDATED TASK", res.data)
      let tasksList = this.state.tasks;
      for (let i = 0; i < tasksList.length; i++) {
        if (tasksList[i].id === id) {
          //remove it 
          tasksList.splice(i, 1);
        }
      }
      this.setState({
        tasks: tasksList
      })
    })
  };

  render() {
    return (
      <div>
        <canvas className='chart' ref={this.chart3Ref} />
        {this.state.tasks.map((task, i) => (
          console.log("this is task", task),
          <div key={i}>
            <button key={i} onClick={() => this.completeTask(task.id)}>Complete</button>
            <Task key={task.updatedAt} task={task.task} assignee1={task.assignee1}
              assignee2={task.assignee2} assignee3={task.assignee3} assignee4={task.assignee4}></Task>
          </div>
        ))}
        <form>
          <input required
            id="addTask"
            type="text"
            value={this.state.newTask}
            placeholder="Task Name"
            onChange={this.handleInputChange}
            name="newTask"
          />
          <button onClick={this.addTask}> Submit </button>
        </form>
      </div>
    );
  }
}

export default Tasks;