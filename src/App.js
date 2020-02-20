import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import Life from './learn/life'
import Router from './learn/router/home'
function App() {
  return (
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/admin" component={Admin}/>
      <Route path='/life' component={Life} />
      <Route path="/router" component={Router} />
      <Redirect to="/login" />
    </Switch>
  );
}

export default App;
