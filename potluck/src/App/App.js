import React, { Component } from 'react';
import './App.css';
import Main from '../Main/Main';
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import Navvy from "../Nav/Nav.js";
import House from "../CreateHouse/CreateHouse.js";
import JoinHouse from "../JoinHouse/JoinHouse.js";
import Timer from "../timer.js";
import {Provider} from "mobx-react"
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import UserStore from "../stores/UserStore";
var axios = require('axios');

class App extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      message: "",
      bool: false,
      currentUser: {
        firstName: "",
      }
    }
  }

  componentDidMount() {
    axios.post('/getUser').then((res) => {
      if (res.data.firstName) {
        this.setState({
          currentUser: res.data
        });
      }
    })
  }

 
  render() {
    return (
      <Provider userStore={new UserStore()}>
          <Router>
            <div className='bg'>
              <Route path='/' render={() => <Navvy   />} />
              <Route path='/Login' render={() => <Login  />} />
              <Route path='/Signup' render={() => <SignUp />} />
              <Route path='/Main' render={() => <Main user={this.statse.currentUser} />} />
              <Route path='/House' render={() => <House />} />
              <Route path='/Join-House' render={() => <JoinHouse />} />
            </div>
          </Router>
      </Provider>
    )
  }
}


export default App;

