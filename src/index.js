import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import Home from './pages/home/Home';
import Genres from './pages/genres/Genres';
import Consoles from './pages/consoles/Consoles';
import Publishers from './pages/publishers/Publishers';
import Ratings from './pages/ratings/Ratings';

import Header from './components/header/Header';
import Navigation from './components/navigation/Navigation';

import * as serviceWorker from './serviceWorker';
import ImportData from './importData';

// Promise that returns the video game sales data
const vgsales = ImportData();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header title="Evolution of gaming" />

      <div className="container-fluid">
        <div className="row">
            <Navigation />

            <Switch>
              <Route exact path="/">
                <Home data={vgsales} />
              </Route>

              <Route path="/genres">
                <Genres data={vgsales}  />
              </Route>

              <Route path="/consoles">
                <Consoles data={vgsales}  />
              </Route>

              <Route path="/publishers">
                <Publishers data={vgsales}  />
              </Route>

              <Route path="/ratings">
                <Ratings data={vgsales}  />
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
