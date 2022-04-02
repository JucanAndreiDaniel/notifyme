import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { UserContext } from './hooks/UserContext';
import PrivateRoute from './pages/PrivateRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import NotificationTab from './pages/NotificationTab'
import NotFound from './pages/NotFound';
import useFindUser from './hooks/useFindUser';


const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#efb66e',
    },
    secondary: {
      main: '#4a73fa',
    },
    background: {
      lighter: '#302f35',
      default: '#2c2c2c',
    },
    divider: '#efb66e',
  },
});

function App() {

  const {
    user,
    setUser,
    isLoading } = useFindUser();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <UserContext.Provider value={{ user, setUser, isLoading }}>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/notifications" component={NotificationTab} />
            <Route component={NotFound} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
