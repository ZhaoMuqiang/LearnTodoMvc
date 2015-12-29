document.write("<script language='javascript' src='/../models/todo.js'></script>");
var todo = createtodo();
var todos = [];
var ENTER_KEY = 13;
window.onload = function(){
	var todo_input = document.getElementById('new-todo');
    var markall = document.getElementById('main');
	markall.style.display = 'none';
	var toggle_all = document.getElementById('toggle-all');
	toggle_all.onchange = function(){
		if(toggle_all.checked == true){
			var checkbox_all = document.getElementById('todo-list').childNodes;
			for(var i = 0; i < checkbox_all.length; i++){
				if((checkbox_all[i].childNodes)[0].checked == false){
					(checkbox_all[i].childNodes)[0].checked = true;
					checkbox_all[i].style.color = 'red';
				}
			}
		}else{
			var checkbox_all = document.getElementById('todo-list').childNodes;
			for(var i = 0; i < checkbox_all.length; i++){
				if((checkbox_all[i].childNodes)[0].checked == true){
					(checkbox_all[i].childNodes)[0].checked = false;
					checkbox_all[i].style.color = 'black';
				}
			}
		}
	}
	addElementLi = function(obj, todo_title) {
		var ul = document.getElementById(obj);
		var li = document.createElement('li');
		var label = document.createElement('label');
		var input = document.createElement('input');
		input.setAttribute('id','newCheckbox');
		input.setAttribute('type','checkbox');
		input.setAttribute('value',false);
		label.setAttribute('for','newCheckbox');
		label.innerHTML = todo_title;
		input.onchange = function(){
			if(input.checked == true){
				li.style.color = 'red';
			}else{	
				li.style.color = 'black';
			}
		}
		li.appendChild(input);
		li.appendChild(label);
		ul.appendChild(li);
		markall.style.display = 'inline';
	　　}
	todo_input.onkeypress = function(e){
		var addtodo = function(){
			var todo_title = todo_input.value;
			todo.settitle(todo_title);
			todo.setcomplete(false);
			todos.push(todo);
			addElementLi('todo-list', todo_title);
		}
		if(e.which == ENTER_KEY){
			addtodo();
		}
	}

}


