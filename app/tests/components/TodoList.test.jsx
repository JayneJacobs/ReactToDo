var React = require('react');

var React = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jQuery');


var TodoList = require('TodoList');

describe('TodoList', () => {
  it('should exist', () => {
    expect(TodoList).toExist();
  });
  it('should render one Todo component for each todo item', () => {
      var tools [{
        id:1,
        text: 'Do something'

      }, {
        id:2,
        text: 'Check mail'
      }];
      var TodoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
      var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);

      expect(todosComponents.length).toBe(todos.length);
  });
});
