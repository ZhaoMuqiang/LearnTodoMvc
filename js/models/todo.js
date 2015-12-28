function createtodo(){
	var todo = new Object;
	todo._title = null,
	todo._complete = false,
	todo.gettitle = function(){
		return _title;
	},
	todo.getcomplete = function(){
		return _complete;
	}
	todo.settitle = function(_title){
		this._title = _title;
	}
	todo.setcomplete = function(_complete){
		this._complete = _complete;
	}
	return todo;
}
