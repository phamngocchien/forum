import AdminLayout from "layout/admin";
import MessengerLayout from "pages/home/messenger";
import Login from "pages/login";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  PATH_ADMIN,
  PATH_MESSENGER,
  PATH_TAG,
  PATH_UPDATE_POST,
  PATH_USER_DETAIL,
  PATH_WRITE_POST
} from "routes/routes.paths";
import UserLayout from "./layout/home";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path={PATH_ADMIN} component={AdminLayout} />
          <Route exact={true} path="/login" component={Login} />
          <Route path={PATH_WRITE_POST}>
            <UserLayout mode="FormPost" />
          </Route>
          <Route path={PATH_UPDATE_POST}>
            <UserLayout mode="FormPost" />
          </Route>
          <Route path={PATH_USER_DETAIL}>
            <UserLayout mode="UserDetail" />
          </Route>
          <Route path={PATH_MESSENGER}>
            <MessengerLayout />
          </Route>
          <Route path={PATH_TAG}>
            <UserLayout mode="Tag" />
          </Route>
          <Route path="/" component={UserLayout} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
