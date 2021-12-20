import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LayoutAdmin from "./LayoutAdmin";
import './headadmin.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import store from '../../redux/store/store';


function Admin() {
  return (
    <Provider store= {store}>
    <Router>
      <Switch>
        <Route path="/admin">
          <LayoutAdmin/>
        </Route>
      </Switch>
    </Router>
    </Provider>
  );
}

export default Admin;