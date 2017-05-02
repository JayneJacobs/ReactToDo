// function add (a,b) {
//
//   return a+b;
//
// }
//
//
//
// var toAdd =[9,5];
//
// console.log(add(...toAdd));

// var groupA = ['Jim','jayne'];
// var groupB = ['Rich', 'Scott', 'Elvis'];
// var final = [3, ...groupA, ...groupB];
// console.log(final);
var person = ['Jayne', 25];
var personTwo = ['Jen', 29];


// Hi Jayne you are 25
function greet (name, age) {
  console.log('Hi ' + name + ', you are ' + age);
}
greet(...person);
greet(...personTwo);

var names = ['Jayne', 'Ken'];
var final = ['JayneJacobs', ...names];

final.forEach(function (name) {
  console.log('Hi ' + name);
});
