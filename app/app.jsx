var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var TodoApp = require('TodoApp');
var About = require('About');

// Load foundation
//change to scss//require('style!css!foundation-sites/dist/foundation.min.css')
require('style!css!sass!applicationStyles')

$(document).foundation();
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={TodoApp}/>


      <Route path="about" component={About}/>

    </Route>
  </Router>,
  document.getElementById('app')
);

// require('style!css!sass!applicationStyles')
//
//   ReactDOM.render(
//     <TodoApp/>,
//     document.getElementById('app')
//   );
