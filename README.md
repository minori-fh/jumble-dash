# Jumble :small_blue_diamond: :small_orange_diamond:

## Description of Site
"Jumble" is a coupled full stack SERN (Sequelize, Express, React, Node) application to help project managers and/or business owners stay on track. 

The motivation came from developing an app that would have a large user-base; regardless of what industry, project management is an integral part of helping businesses achieve their goals. 

**Summary of Technologies Used** <br/>
[Passport](http://www.passportjs.org/docs/) was used for user authentication and [ReactJS](https://reactjs.org/docs/getting-started.html) for reusable components as well as fast rendering on the DOM. 

Here we call on the checkAuth function to see if the user is logged in or not and to save this status as a state. 

```
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }
  
  componentWillMount(){
    this.checkAuth();
  }
```

We then call to different routings based on the user's 'isLoggedIn' state. 

```
render() {
    switch(this.state.isLoggedIn){
      case false:
        return this.guestRouting()
      case true:
        return this.userRouting()
      default:
        return this.guestRouting()
    }
}
```

The data used on this site is gathered from user input (ex: project budgets and tasks). The data is managed by [MySQL](https://dev.mysql.com/doc/) and is brought to life by using [Chart.js](https://www.chartjs.org/) and visualizing the user input in a useful format.

Below is an example of how we pass in budget information using props to populate a doughnut chart. 

```
componentDidMount() {
    this.chart1 = new Chart(this.chart1Ref.current, {
      type: 'doughnut',
      data: {
        labels: this.props.depts,
        datasets: [{
          data: [this.props.marketing, this.props.hr, this.props.design, this.props.engineering, this.props.sales, this.props.finance, this.props.security],
          backgroundColor: ['#e47676', '#ffb01d', '#b0fff4', '#6ec56e', '#9e9e9e', '#47b4b4', '#ffff89']
        }]
      }
    });
  }
```

## Pictures of Site
[Click here to visit site](https://adopt-a-friend.herokuapp.com/)

**Initial home page:**
![Home page](public/style/images/site-images/site1.png)

**Seeing dogs by adoption agency or by breed:**
![By agency](public/style/images/site-images/site2.gif)

**Reading, creating, and deleting comments on dogs:** 
![By breed](public/style/images/site-images/site3.gif)

**Form validation to ensure that comments are not empty:** 
![Comments](public/style/images/site-images/site4.gif)

## Improvements for the Future
Some improvements that I would like to make to this application provided more time: 

1. Mobile responsiveness
2. Drag and drop functionality for dashboard components to enable users to personalize and organize his or her dashboard based on priority
3. Add components to handle project deadlines 


## Getting Started
These instructions will help get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites 
Jumble is a coupled app where the client (React) and server run concurrently. 

What you will need to install before running this application:

1. [NODE](https://nodejs.org/en/download/)
2. [NPM](https://docs.npmjs.com/cli/install)

Install server dependencies: 

```
# open a new shell and navigate to server directory
$ npm i
# this will install all the dependencies for the server portion of this application
# make sure dependencies for the client are installed as well before running the application
```

Install client dependencies: 

```
# open a new shell and navigate to the client directory
$ npm i
# this will install all the dependencies for the react portion of this application
# once the dependencies are installed 
# npm start
```

If running locally, Sequelize does not create the initial database. Please run the lines of code below into MySQL Workbench before running the application: 

```
DROP database if EXISTS database_name
CREATE database_name
USE database_name
```

## Built with: 
1. [HTML](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
2. [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
4. [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
5. [jQuery](https://api.jquery.com/)
6. [MySQL Workbench](https://dev.mysql.com/doc/workbench/en/)
8. [Node*](https://nodejs.org/en/download/)

## *Node Packages Used
1. [Express](https://expressjs.com/)
2. [Cheerio](https://www.npmjs.com/package/cheerio)
3. [Axios](https://www.npmjs.com/package/axios)
5. [Path](https://nodejs.org/api/path.html)
6. [Sequelize](https://www.npmjs.com/package/sequelize)
7. [MySQL2](https://www.npmjs.com/package/mysql2)
8. [Passport](https://www.npmjs.com/package/passport)
9. [Express-session](https://www.npmjs.com/package/express-session)
10. [Passport-local](https://www.npmjs.com/package/passport-local)
11. [Bcrypt](https://www.npmjs.com/package/bcrypt)

## Author(s): 
1. [Minori Hashimoto](https://github.com/minori-fh)
2. Jake Dudum
3. Adam Lehrer
4. Darryl Tolentino 

