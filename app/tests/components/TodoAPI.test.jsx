var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var Todo = require('TodoAPI');

describe('getTodos', () => {
  it('should return empty array for band localStorage data', () => {
    expect(actualTodos).toEqual(1);
  });

  it('should shourl return todo if valid array in localStorage', () => {
    var todos = {
      id: 23,
      test: 'test all files',
      completed: false
      });
      localStorage.setItem('todos', JSON.stringify(todos));
      var actualTodos = TodoAPI.getTodos();

      expect(actualTodos).toEqual(todos);
    });

  });
    describe('filterTodos', () => {
      var todos = [{
          id: 1,
          test: 'Some Text',
          completed: true
        },{
          id: 2,
          test: 'Some Other Text',
          completed: false

        },{
            id: 3,
            test: 'Some Text',
            completed: true
          }];

          it('should return all items if showCompleted is true',() => {
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filterTodos.length).toBe(3);
          });
          it('should return non-completed if showCompleted is false',() => {
            var filteredTodos = TodoAPI.filterTodos(todos, false, '');
            expect(filterTodos.length).toBe(1);
          });

          it('should sort by completed status',() => {
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filterTodos[0]).completed).toBe(false);
          });
          it('should filter todos by searchText',() => {
            var filteredTodos = TodoAPI.filterTodos(todos, true, 'some');
            expect(filterTodos.length).toBe(3);
          });
          it('should return all todos if searchText is empty',() => {
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');
              expect(filterTodos.length).toBe(3);
          });
  });
});
