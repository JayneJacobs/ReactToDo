var React = require('react');
var moment = require('moment');

var Todo = React.createClass({
  render: function () {
    var {id, text, completed, createdAt} = this.props;
    var renderDate = () => {
      var message = 'Created ';
      var timestamp = createdAt;
      //var space = '  ';
      return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm:ss a');
    };

    return (
      <div onClick={() => {
          this.props.onToggle(id);
        }}>
        <p>

        <input type="checkbox" checked={completed}/>  {text}   {renderDate()}
        </p>
      </div>
    )
  }
});

module.exports = Todo;
