
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



