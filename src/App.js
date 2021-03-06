import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles'

import { AuthProvider } from './firebase/auth.context';
import PrivateRoute from './firebase/private-route.component';

import HomePage from './pages/home/homepage.component';
import MainPage from './pages/main/main.component';
import LoginPage from './pages/login/login.component';
import SignupPage from './pages/signup/signup.component';
import RoomInvitationPage from './pages/room-invitation/room-invitation.component';
import RoomPage from './pages/room/room.component';
import SummaryPage from './pages/summary/summary.component';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#808edf',
    }
  },
});

function App() {
  return (
    <AuthProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/signup" component={SignupPage} />
              <PrivateRoute exact path="/main" component={MainPage} />
              <PrivateRoute
                exact
                path="/roominvitation/:id"
                component={RoomInvitationPage}
              />
              <PrivateRoute exact path="/room/:id" component={RoomPage} />
              <PrivateRoute exact path="/room/:id/summary" component={SummaryPage} />
          </Switch>
        </ThemeProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
