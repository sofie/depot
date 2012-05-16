var empty = {};
function mixin(/*Object*/target, /*Object*/source) {
	var name, s, i;
	for(name in source) {
		s = source[name];
		if(!( name in target) || (target[name] !== s && (!( name in empty) || empty[name] !== s))) {
			target[name] = s;
		}
	}
	return target;
	// Object
};

Uit.mixin = function(/*Object*/obj, /*Object...*/props) {
	if(!obj) {
		obj = {};
	}
	for(var i = 1, l = arguments.length; i < l; i++) {
		mixin(obj, arguments[i]);
	}
	return obj;
	// Object
};
Uit.combine = function(/*Object*/obj, /*Object...*/props) {
	var newObj = {};
	for(var i = 0, l = arguments.length; i < l; i++) {
		mixin(newObj, arguments[i]);
	}
	return newObj;
};
