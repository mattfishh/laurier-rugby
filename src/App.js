import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { Roster } from './Roster';
import { Schedule } from './Schedule';
import { Recruits } from './Recruits';
import { Alumni } from './Alumni';
import { NoMatch } from './NoMatch';
import {Media} from './Media';
import {Sponsors} from './Sponsors';



class App extends Component{
  render(){
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/schedule" component={Schedule} />
            <Route path="/roster" component={Roster} />
            <Route path="/alumni" component={Alumni} />
            <Route path="/recruits" component={Recruits} />
            <Route path="/media" component={Media} />
            <Route path="/sponsors" component={Sponsors}/>
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
