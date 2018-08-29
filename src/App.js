import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import OnlineCourses from './components/OnlineCourses';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import TopBar from './components/layout/TopBar';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <TopBar />
          </nav>
          <main style={{ marginTop: 75 }}>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/OnlineCourses" component={OnlineCourses} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
