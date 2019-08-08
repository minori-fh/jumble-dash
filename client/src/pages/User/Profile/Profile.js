import React, { Component } from 'react';
import Actions from "../../../utils/API";
import Dashboard from '../../../components/Dashboard';
import { Col, Row } from "../../../components/Grid";
// import Navbar from "../../../components/Navbar";
import Sidenav from "../../../components/Sidenav";
import CreateProject from '../../../components/CreateProject';
import ProjectButton from '../../../components/ProjectButton';
import NewProjectForm from '../../../components/NewProjectForm';
import ProjectAPI from '../../../utils/API-project';
import LogoutButton from '../../../components/LogoutButton';
import MenuLogoutButton from '../../../components/MenuLogoutButton';
import MenuButton from '../../../components/MenuButtons/menuButtons';
import "./Profile.css";

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userAccount: false,
            edit: false,
            selectedProject: -1,
            projects: [],
            loggedIn: true,
            showDash: false
        }
    }

    animation(){
        let left = document.getElementById("menu-left-col")
        left.classList.toggle("animation")
        setTimeout(this.handleRightAnimation(), 2000)
    }

    handleRightAnimation(){
        let right = document.getElementById("menu-right-col")
        right.classList.toggle("show")
    }


    componentDidMount() {
        ProjectAPI.findProjects().then((res) => {
            console.log("this is res dot data!!!!!!!!!!!!!!!", res.data)
            this.setState({ projects: res.data })
            console.log(this.state.loggedIn)
        });

        requestAnimationFrame(()=> {this.animation()})
    }

    handlelogout() {
        Actions.handlelogout()
            .then(data => { return data.json() })
            .then(response => {
                this.setState({
                    isLoggedIn: response
                })

                if (!response) {
                    window.location.href = "/"
                }
            })
            .catch(err => console.log("err", err))
    }

    loadProject = id => {

        this.setState({
            selectedProject: id
        });
    }

    handleEdit = () => {
        if (this.state.edit === false) {
            this.setState({
                edit: true
            })
        }
        else {
            ProjectAPI.findProjects().then((res) => {
                this.setState({ projects: res.data, edit: false })
            });
        }
    }

    loadDash = id => {
        this.setState({
            selectedProject: id,
            showDash: true
        });

        let menu = document.getElementById("home-form-grid")
        menu.classList.toggle("hide")
    }

    render() {
        return (
            <div>
                {!this.state.showDash ?
                <Row id='home-form-grid'>
                    <Col className='xl6 menu-left-col' id='menu-left-col'>
                    
                    </Col>
                    <Col className='xl6 menu-right-col' id='menu-right-col'>
                        <p id='menuHeader'>What can we help you manage today?</p>
                        <div>
                        {this.state.projects.map(project => (
                            <MenuButton click={this.loadDash} id={project.id} name={project.name} key={project.id} />
                        ))}
                        </div>
                        <MenuLogoutButton logout={this.handlelogout.bind(this)} />
                    </Col>
                </Row>
                :
                <Row>
                    <Col className="xl2 l3">
                        <Sidenav>
                            <div className="centerButtons">
                                {this.state.projects.map(project => (
                                    <ProjectButton click={this.loadProject} id={project.id} name={project.name} key={project.id} />
                                ))}
                                <CreateProject edit={this.handleEdit} />
                                <LogoutButton logout={this.handlelogout.bind(this)} />
                            </div>
                        </Sidenav>
                    </Col>
                    <Col className="xl10 l9">
                        {
                            !this.state.edit ?
                                <Dashboard projectID={this.state.selectedProject}>
                                </Dashboard>
                                : <NewProjectForm edit={this.handleEdit} />
                        }
                    </Col>
                </Row>
                }
            </div>
            
                // <Row>
                //     <Navbar />
                // </Row>
                // <Row>
                //     <Col className="xl2 l3">
                //         <Sidenav>
                //             <div className="centerButtons">
                //                 {this.state.projects.map(project => (
                //                     <ProjectButton click={this.loadProject} id={project.id} name={project.name} key={project.id} />
                //                 ))}
                //                 <CreateProject edit={this.handleEdit} />
                //                 <LogoutButton logout={this.handlelogout.bind(this)} />
                //             </div>
                //         </Sidenav>
                //     </Col>
                //     <Col className="xl10 l9">
                //         {
                //             !this.state.edit ?
                //                 <Dashboard projectID={this.state.selectedProject}>
                //                 </Dashboard>
                //                 : <NewProjectForm edit={this.handleEdit} />
                //         }
                //     </Col>
                // </Row >
        )
    }
}

export default Profile;