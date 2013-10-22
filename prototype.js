
var stooge = {
    "first-name" : "Jerome",
    "last-name" : "Howard" ,
};

document.write("Prototypes: </br>");

//Prototype creation
if(typeof Object.create !== 'function'){
    Object.create = function(o){
	var F = function(){};
	F.prototype = o;
	return new F();
    };
}

//Prototype for another stooge is a stooge
var another_stooge = Object.create(stooge);

another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';

another_stooge.nickname = 'Moe';

document.write("Another stooge's nickname: " + another_stooge.nickname + "</br>");
stooge.profession = 'actor';
document.write("Another stooge's profession: " + another_stooge.profession + "</br>");


document.write("Reflection: </br>");

document.write(typeof another_stooge.nickname + "<br/>");

document.write(another_stooge.hasOwnProperty('toString') + "</br>");

// No filtering -- 

var name;

for(name in another_stooge){
   document.writeln(name + ':' + another_stooge[name] + '</br>');
}

//With filtering -- would have the same output as above in this case

// for(name in another_stooge){
//     if(typeof another_stooge[name] !== 'function'){
// 	document.writeln(name + ':' + another_stooge[name] + '</br>');
//     }
// }


//For a deterministic ordering
var i; 
var properties = [
    'first-name',
    'middle-name',
    'last-name',
    'profession'
];

for(i = 0; i < properties.length; i += 1){
    document.writeln(properties[i] + ':' + another_stooge[properties[i]] + '<br/>');
}

//Deleting a property using the delete operator


document.write("Nickname: " + another_stooge.hasOwnProperty('nickname') + '</br>');

delete another_stooge.nickname;

document.write("Nickname: " + another_stooge.hasOwnProperty('nickname') + '</br>');

var add = function(a,b) {
    return a + b;
}

// Method -- Function stored as a property of an object in js

var myObject = {
    value : 0,
    increment : function(inc){
	this.value += typeof inc === 'number' ? inc : 1;
    }
};

myObject.increment();
document.write(myObject.value + '<br/>');

myObject.increment(18);
document.write("Incrementing the previous value by 18 := " + myObject.value + '<br/>');

//standalone functions

myObject.double = function(){
    var that = this;
    var helper = function(){
	that.value = add(that.value, that.value);
    };
    helper(); //Standalone
};

myObject.double();
document.write(myObject.value + '<br/>');


//Invocation patterns 
//Method invocation pattern
//Function invocation pattern
//constructor invocation pattern
//Apply invocation pattern

//Constructor invocation pattern
var Quo = function(string){
    this.status = string;
};

Quo.prototype.get_status = function(){
    return this.status;
}

var myQuo = new Quo("confused");

document.write(myQuo.get_status() + '<br/>');
//try this out!
document.write((new Quo("foo").get_status()) + '<br/>');

//Apply invocation pattern

var array = [3,5];

var sum = add.apply(null, array);

var statusObject = {
    status : 'A-OK'
};

var status = Quo.prototype.get_status.apply(statusObject);
document.write(status + '<br/>');

//The arguments array

var sum = function(){
    var i, sum = 0;
    for(i = 0; i < arguments.length; i += 1){ // arguments array 
	sum += arguments[i]; //array access
    }
    return sum;
};

document.write(sum(23,4,23,435,623,34,52,34,23,45,6,7,3,345) + '<br/>');
document.write(sum(223,52,3) + '<br/>');
document.write(sum(2, -43, 4,4) + '<br/>');

//Exceptions

var add = function(a,b){
    if(typeof a !== 'number' || typeof b !== 'number'){
	throw{
	    name : 'TypeError',
	    message : 'add needs numbers' 
	};
    }
return a + b;
}

//define erroneously
var try_it = function(){
    try{
	add("seven");
    }catch(e){
	document.write(e.name + ':' + e.message);
    }
}

try_it();

//Augmenting types


Function.prototype.method = function(name, func){
    this.prototype[name] = func;
    return this;
}


//Augmenting javascript's Number.prototype 
// Number.method('integer', function() {
//     return Math[this < 0 ? 'ceiling' : 'floor'](this);
// });

// document.writeln((-10 / 3).integer() + '<br/>'); 
// document.write("foo");
 

// Function.prototype.method = function(name, func){
//     if(!this.prototype[name]){
// 	this.prototype[name] = func;
//     }
// };

//hanoi using recursion in js

var hanoi = function(disc, src, aux, dst){
    if(disc > 0){
	hanoi(disc - 1, src, dst, aux);
	document.writeln('Move disc ' + disc + ' from ' + src + ' to ' + dst + '<br/>');
	hanoi(disc - 1, aux, src, dst);
    }
};

hanoi(10, 'Src', 'Aux', 'Dst');

//Walk the DOM
//DFS
var walk_the_DOM = function walk(node, func){
    func(node);
    node = node.firstChild;
    while(node){
	walk(node, func);
	node = node.nextSibling;
    }
};

//JS does not provide tail recursion optimiztion; Functions that recurse deeply can fail by exhausting the return stack

var myObject = function() {
    var value = 0;
    
    return {
		increment : function(inc){
	    value += typeof inc === 'number' ? inc : 1;
	},
	    
	getValue : function(){
	    return value;
	}
    };
}();

//Not assigning a function to myObject here, instead the result of invoking that function is being assigned here

//The functions increment and getValue have access to the value variable

var quo = function (status) {
    return {
	get_status : function(){
	    return status;
	}
    };
};

var myQuo = quo("amazed");

document.writeln(myQuo.get_status() + '<br/>');

var fade = function(node) {
    var level = 1;
    var step = function(){
	var hex = level.toString(16);
	node.style.backgroundColor = '#FFFF' + hex + hex;
	if(level < 15) {
	    level += 1;
	    setTimeout(step, 100);
	}
    };
    setTimeout(step, 100);
};

fade(document.body);

