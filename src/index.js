import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import Home from './containers/home/Home';
import Genres from './containers/genres/Genres';
import Consoles from './containers/consoles/Consoles';
import Publishers from './containers/publishers/Publishers';
import Ratings from './containers/ratings/Ratings';

import Header from './components/header/Header';
import Navigation from './components/navigation/Navigation';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header title="Evolution of gaming" />

      <div className="container-fluid">
        <div className="row">
            <Navigation />

            <Switch>
              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/genres">
                <Genres />
              </Route>

              <Route path="/consoles">
                <Consoles />
              </Route>

              <Route path="/publishers">
                <Publishers />
              </Route>

              <Route path="/ratings">
                <Ratings />
              </Route>
            </Switch>
        </div>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
