import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import {  useSelector } from 'react-redux';

import Navigation from './components/Navigation';
import LoginPanel from './components/LoginPanel';
import SignupPanel from './components/SignupPanel';
import CampaignBrowser from './components/CampaignBrowser';
import CampaignDetail from './components/CampaignDetail';
import CampaignCreate from './components/CampaignCreate';


const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    rest.needLogin === true
      ? <Redirect to='/login' />
      : <Component {...props} />
  )} />
)
const App = () => {  
  const needLogin = useSelector(state => !state.authentication.user.id);
  console.log(needLogin);
  return (
    <BrowserRouter>
      <Navigation needLogin={needLogin}/>
        <Switch>
            <Route exact path="/campaign/create" component={() => <CampaignCreate needLogin={needLogin} />} />
            <Route exact path="/campaign/:id" component={() => <CampaignDetail needLogin={needLogin} />}  />
            <Route path="/login" component={LoginPanel} />
            <Route exact path="/signup" component={SignupPanel} />
            <Route exact path="/" component={CampaignBrowser} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
