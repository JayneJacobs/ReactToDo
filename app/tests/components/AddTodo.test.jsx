var React = require('react');

var React = require('react-dom');
var expect = require('expect');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');
var AddTodo = require('AddTodo');

describe('AddTodo', () => {
  it('should exist', () => {
    expect(AddTodo).toExist();
  });

it('should call onAddTodo prop with valid data', () => {
  var todoText = 'Check mail';
  var spy = expect.createSpy();
  var AddTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);
  var$el = $(ReactDom.findDOMNode(AddTodo));

  addTodo.refs.todoText.value = todoText;
  TestUtils.Simulate.submit($el.find('form')[0]);

  expect('spy').toHaveBeenCalledWith('Check mail');
  });
  it('should not call onAddTodo prop with valid data with invalid input', () => {
    var todoText = '';
    var spy = expect.createSpy();
    var AddTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);
    var$el = $(ReactDom.findDOMNode(AddTodo));

    addTodo.refs.todoText.value = todoText;
    TestUtils.Simulate.submit($el.find('form')[0]);

    expect('spy').toNotSHaveBeenCalled();
    });
});
