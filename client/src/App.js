import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import {  useSelector, useDispatch } from 'react-redux';

import { setLocation} from './store/campaign';

import Navigation from './components/Navigation';
import LoginPanel from './components/LoginPanel';
import SignupPanel from './components/SignupPanel';
import CampaignBrowser from './components/CampaignBrowser';
import CampaignDetail from './components/CampaignDetail';
import CampaignCreate from './components/CampaignCreate';
import Dashboard from './components/Dashboard';


const PrivateRoute = ({component: Component, ...rest}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(()=>{
    dispatch(setLocation(location.pathname));
  }, [location.pathname])
   

return  <Route {...rest} render={(props) => (
    rest.needLogin === true
      ? <Redirect to='/login' />
      : <Component {...props} />
  )} />
  }
const App = () => {  
  const needLogin = useSelector(state => !state.authentication.user.id);
  return (
    <BrowserRouter>
      <Navigation needLogin={needLogin}/>
        <Switch>
            <PrivateRoute exact path="/campaign/create" needLogin={needLogin} component={CampaignCreate} />
            <PrivateRoute exact path="/dashboard" needLogin={needLogin} component={Dashboard} />
            <Route exact path="/campaign/:id" component={CampaignDetail}  />
            <Route path="/login" component={LoginPanel} />
            <Route exact path="/signup" component={SignupPanel} />
            <Route exact path="/" component={CampaignBrowser} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
