//document.write("<script language='javascript' src='/../models/todo.js'></script>");
//var todo = createtodo();
var todos = [];
var ENTER_KEY = 13;
window.onload = function(){
	var storage = window.localStorage; 	
	var count = document.getElementById('count');
	var lastcount = document.getElementById('lastcount');
	lastcount.style.display = 'none';
	var todo_input = document.getElementById('new-todo');
    var markall = document.getElementById('main');
	markall.style.display = 'none';
	var clearcompleted = document.getElementById('clearcompleted');
	clearcompleted.style.display = 'none';
	//clearstorage();
	function clearstorage(){
		storage.setItem('todo','');
	}
	function onStart(){
		if(storage.getItem('todo') != null)
		if(storage.getItem('todo') != ''){
			todos = storage.getItem('todo').split(',');
			for(var i = 0 ;i<todos.length;i++){
				//alert(todos[i]);
				addElementLi('todo-list', todos[i]);
			}
		}
	}
	function deletetodoofStorage(title){
		var lengthofall = 0;
		if(storage.getItem('todo') != ''){
			todos = storage.getItem('todo').split(',');
			for(var i = 0 ;i<todos.length;i++){
				//alert(todos[i]+'------'+title);
				if(todos[i] == title){
					//alert('@@@'+storage.getItem('todo').substring(0,lengthofall)+':::'+storage.getItem('todo').substring(lengthofall+todos[i].length,storage.getItem('todo').length));
					if(i != 0)
				    	storage.setItem('todo',storage.getItem('todo').substring(0,lengthofall-1)+storage.getItem('todo').substring(lengthofall+todos[i].length,storage.getItem('todo').length));
					else{
						storage.setItem('todo',storage.getItem('todo').substring(0,lengthofall)+storage.getItem('todo').substring(lengthofall+todos[i].length+1,storage.getItem('todo').length));
					}
					break;
				}
				lengthofall +=todos[i].length;
				lengthofall++;
			}
		}
	}
		//添加todo
	addElementLi = function(obj, todo_title) {
		var ul = document.getElementById(obj);
		var li = document.createElement('li');
		var label = document.createElement('label');
		var input = document.createElement('input');
		input.setAttribute('id','newCheckbox');
		input.setAttribute('type','checkbox');
		input.setAttribute('value',false);
		label.innerHTML = todo_title;
		input.onchange = function(){
			if(input.checked == true){
				li.style.color = 'red';
				clearcompleted.style.display = 'inline';
			}else{	
				li.style.color = 'black';
				if(!havechecked()){
					clearcompleted.style.display = 'none';
				}
			}
		}
		li.onmouseover = function(){
			var deleteX = document.createElement('label');
			deleteX.style.color = 'red';
			deleteX.innerHTML = '               XXXXXX';
			deleteX.onmousedown = function(){
				//alert('删除该项目');
				deletetodoofStorage(li.childNodes[1].innerHTML);
				ul.removeChild(li);
				count.innerHTML = ul.childNodes.length + ' items';
				if(ul.childNodes.length == 0){
					markall.style.display = 'none';
	        	}
			}
			li.appendChild(deleteX);
		}
		li.onmouseout = function(){
			li.removeChild((li.childNodes)[2]);
		}
		li.appendChild(input);
		li.appendChild(label);
		ul.appendChild(li);
		markall.style.display = 'inline';
		lastcount.style.display = 'inline';
		count.innerHTML = ul.childNodes.length + ' items';
		var havechecked = function(){
			var checkbox_all = document.getElementById('todo-list').childNodes;
			var i,temp;
			for(i = 0,temp = 0; i < checkbox_all.length; i++){
				if((checkbox_all[i].childNodes)[0].checked == false){
					temp ++;
				}		
			}
			if(i == temp)
				return false;
			else return true;
		}
	　　} 
	onStart();
	//删除选择的项目
	clearcompleted.onclick = function(){
		var todo_list = document.getElementById('todo-list');
		var checkbox_all = todo_list.childNodes;
		for(var i = 0; i < checkbox_all.length; i++){
			if((checkbox_all[i].childNodes)[0].checked == true){
				deletetodoofStorage((checkbox_all[i].childNodes)[1].innerHTML);
				todo_list.removeChild(checkbox_all[i--]);
				clearcompleted.style.display = 'none';
				count.innerHTML = todo_list.childNodes.length + ' items';
			}
		}
		if(todo_list.childNodes.length == 0){
			markall.style.display = 'none';
		}
	}
	
	var toggle_all = document.getElementById('toggle-all');
	//选择Mark All
	toggle_all.onchange = function(){
		if(toggle_all.checked == true){
			var checkbox_all = document.getElementById('todo-list').childNodes;
			for(var i = 0; i < checkbox_all.length; i++){
				if((checkbox_all[i].childNodes)[0].checked == false){
					(checkbox_all[i].childNodes)[0].checked = true;
					checkbox_all[i].style.color = 'red';
					clearcompleted.style.display = 'inline';
				}
			}
		}else{
			var checkbox_all = document.getElementById('todo-list').childNodes;
			for(var i = 0; i < checkbox_all.length; i++){
				if((checkbox_all[i].childNodes)[0].checked == true){
					(checkbox_all[i].childNodes)[0].checked = false;
					checkbox_all[i].style.color = 'black';
					clearcompleted.style.display = 'none';
				}
			}
		}
	}
	var all = document.getElementById('all');
	var active = document.getElementById('active');
	var completed = document.getElementById('completed');
	//all active completed三个事件的设定
	all.onchange = function(){
		if(all.checked == true){
			active.checked = false;
			completed.checked = false;
			var checkbox_all = document.getElementById('todo-list').childNodes;
			for(var i = 0; i < checkbox_all.length; i++){
				(checkbox_all[i].childNodes)[0].style.display = 'inline';
				(checkbox_all[i].childNodes)[1].style.display = 'inline';
			}
		}
	}
	active.onchange = function(){
		if(active.checked == true){
			all.checked = false;
			completed.checked = false;
			var checkbox_all = document.getElementById('todo-list').childNodes;
			for(var i = 0; i < checkbox_all.length; i++){
				if((checkbox_all[i].childNodes)[0].checked == true){
					(checkbox_all[i].childNodes)[0].style.display = 'none';
					(checkbox_all[i].childNodes)[1].style.display = 'none';
				}
			}
		}else{
			var checkbox_all = document.getElementById('todo-list').childNodes;
			for(var i = 0; i < checkbox_all.length; i++){
				(checkbox_all[i].childNodes)[0].style.display = 'inline';
				(checkbox_all[i].childNodes)[1].style.display = 'inline';
			}
		}
	}
	completed.onchange = function(){
		if(completed.checked == true){
			active.checked = false;
			all.checked = false;
			var checkbox_all = document.getElementById('todo-list').childNodes;
			for(var i = 0; i < checkbox_all.length; i++){
				if((checkbox_all[i].childNodes)[0].checked == false){
					(checkbox_all[i].childNodes)[0].style.display = 'none';
					(checkbox_all[i].childNodes)[1].style.display = 'none';
				}
			}
		}else{
			var checkbox_all = document.getElementById('todo-list').childNodes;
			for(var i = 0; i < checkbox_all.length; i++){
				(checkbox_all[i].childNodes)[0].style.display = 'inline';
				(checkbox_all[i].childNodes)[1].style.display = 'inline';
			}
		}
	}
	//监听todo回车事件
	todo_input.onkeypress = function(e){
		var addtodo = function(){
			var todo_title = todo_input.value.trim();
			//todo.settitle(todo_title);
			//todo.setcomplete(false);
			if(storage.getItem('todo')!='')
		    	storage.setItem('todo',storage.getItem('todo')+','+todo_title);
		    else{
		    	storage.setItem('todo',todo_title);
		    }
			addElementLi('todo-list', todo_title);
		}
		if(e.which == ENTER_KEY){
			addtodo();
			todo_input.value='';
		}
	}

}


