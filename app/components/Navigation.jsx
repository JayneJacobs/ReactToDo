var React = require('react');
var {Link, IndexLink} = require('react-router');

var Navigation = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">
            Todo App
          </li>
          <li>
            <IndexLink to="/" activeClassName="active-link">ToDo App</IndexLink>
          </li>
          <li>
            <Link to="/countdown" activeClassName="active-link">AnotherLink</Link>
          </li>
          <li>
            <Link to="/about" activeClassName="active-link">About</Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">
          <li className="menu-text">
            Created by <a href="http://www.jaynejacobs.com" target="_blank">Jayne Jacobs</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

module.exports = Navigation;
