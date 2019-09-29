import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/home/homepage.component';
import MainPage from './pages/main/main.component';
import LoginPage from './pages/login/login.component';
import SignupPage from './pages/signup/signup.component';
import RoomInvitationPage from './pages/room-invitation/room-invitation.component';
import RoomPage from './pages/room/room.component';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/main" component={MainPage} />
            <Route exact path="/roominvitation/:id" component={RoomInvitationPage} />
            <Route exact path="/room/:id" component={RoomPage} />
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
