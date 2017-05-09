var $ = require('jquery');


module.exports = {
  setTodos: function (todos) {
    if ($.isArray(todos)) {
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;
    }
  },
  getTodos: function () {
    var stringTodos = localStorage.getItem('todos');
    var todos = [];
    try {
      todos = JSON.parse(stringTodos);
    } catch (e) {

    }
    return $.isArray(todos) ? todos : [];
//     The above statement is equivalent to:
// if ($.isArray(todos)) {
//       return todos;
//
//     } else {
//       return [];
//     }
 },

 filterTodos: function (todos, showCompleted, searchText) {
    var filteredTodos = todos;

    filteredTodos = filteredTodos.filter((todo) => {
      return !todo.completed || showCompleted;
    });
    return filteredTodos;
 }

 
 };
