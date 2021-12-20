import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LayoutAdmin from "./LayoutAdmin";
import './headadmin.css';


function Admin() {
  return (

    <Router>
      <Switch>
        <Route path="/admin">
          <LayoutAdmin />
        </Route>
      </Switch>
    </Router>

  );
}

export default Admin;