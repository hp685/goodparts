
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



