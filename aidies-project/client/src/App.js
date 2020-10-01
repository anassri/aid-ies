import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import {  useSelector } from 'react-redux';

import Navigation from './components/Navigation';
import LoginPanel from './components/LoginPanel';
import SignupPanel from './components/SignupPanel';
import CampaignBrowser from './components/CampaignBrowser';

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    rest.needLogin === true
      ? <Redirect to='/login' />
      : <Component {...props} />
  )} />
)
const App = () => {  
  // const [loaded, setLoaded] = useState(false);
  const needLogin = useSelector(state => !state.authentication.user);
  return (
    <BrowserRouter>
      <Navigation needLogin={needLogin}/>
        <Switch>
            <Route path="/" component={CampaignBrowser} />
            <Route path="/login" component={LoginPanel} />
            <Route path="/signup" component={SignupPanel} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
