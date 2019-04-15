import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeTopScreen from './pages/HomeTopScreen';
import CreateImageArea from './pages/CreateImageArea';

const AppRoute = () => {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/" component={HomeTopScreen} />
        <Route exact={true} path="/create" component={CreateImageArea} />
      </Switch>
    </Router>
  )
}

export default AppRoute;
