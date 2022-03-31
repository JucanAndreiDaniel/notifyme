import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserContext } from './hooks/UserContext';
import PrivateRoute from './pages/PrivateRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import useFindUser from './hooks/useFindUser';
// import RunCode from './pages/RunCode';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    mode: 'dark',
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
            <Route component={NotFound} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
