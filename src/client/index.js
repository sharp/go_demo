import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route, IndexRoute} from 'react-router';
import Root from './components/Root';
import Home from './components/Home';
import Builder from './components/Builder';

ReactDOM.render((
  <Router>
    <Route path="/" component={Root}>
      <IndexRoute component={Home} />
      <Route path="/form/:id" component={Builder} />
    </Route>
  </Router>
), document.getElementById('root'));
