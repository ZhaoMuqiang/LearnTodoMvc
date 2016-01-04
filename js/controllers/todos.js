//document.write("<script language='javascript' src='/../models/todo.js'></script>");
//var todo = createtodo();
var todos = [];
var ENTER_KEY = 13;
window.onload = function(){
	var storage = window.localStorage; 	
	var Liheight = 50; 
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
			todos = storage.getItem('todo').split(',,');
			for(var i = 0 ;i<todos.length;i++){
				//alert(todos[i]);
				addElementLi('todo-list', todos[i].split(',')[0],todos[i].split(',')[1]);
			}
		}
	}
	//持久化删除
	function deletetodoofStorage(title){
		var lengthofall = 0;
		if(storage.getItem('todo') != ''){
			todos = storage.getItem('todo').split(',,');
			for(var i = 0 ;i<todos.length;i++){
				var todos_1 = (todos[i].split(','))[0];
				if(todos_1 == title){
					if(i != 0)
				    	storage.setItem('todo',storage.getItem('todo').substring(0,lengthofall-2)+storage.getItem('todo').substring(lengthofall+todos[i].length,storage.getItem('todo').length));
					else{
						storage.setItem('todo',storage.getItem('todo').substring(0,lengthofall)+storage.getItem('todo').substring(lengthofall+todos[i].length+2,storage.getItem('todo').length));
					}
					break;
				}
				lengthofall +=todos[i].length;
				lengthofall+=2;
			}
		}
	}
	//持久化修改
		function updatetodoofStorage(title,check){
		var lengthofall = 0;
		if(storage.getItem('todo') != ''){
			todos = storage.getItem('todo').split(',,');
			for(var i = 0 ;i<todos.length;i++){
				var todos_1 = (todos[i].split(','))[0];
				if(todos_1 == title){
				    storage.setItem('todo',storage.getItem('todo').substring(0,lengthofall+todos_1.length+1)+check+storage.getItem('todo').substring(lengthofall+todos[i].length,storage.getItem('todo').length));
					break;
				}
				lengthofall +=todos[i].length;
				lengthofall+=2;
			}
		}
	}
	//检验是否有重复的
	function checkrepeat(title){
		if(storage.getItem('todo') != ''){
			todos = storage.getItem('todo').split(',,');
			for(var i = 0 ;i<todos.length;i++){
				var todos_1 = (todos[i].split(','))[0];
				if(todos_1 == title){
					return true;
				}
			}
			return false;
		}
		return false;
	}
	//持久化修改todo
	function updatetodocontentofstorage(title,newtitle){
		var lengthofall = 0;
		if(storage.getItem('todo') != ''){
			todos = storage.getItem('todo').split(',,');
			for(var i = 0 ;i<todos.length;i++){
				var todos_1 = (todos[i].split(','))[0];
				if(todos_1 == title){
				    storage.setItem('todo',storage.getItem('todo').substring(0,lengthofall)+newtitle+',0'+storage.getItem('todo').substring(lengthofall+todos[i].length,storage.getItem('todo').length));
					break;
				}
				lengthofall +=todos[i].length;
				lengthofall+=2;
			}
		}
	}
	//添加todo
	addElementLi = function(obj, todo_title, check) {
		var ul = document.getElementById(obj);
		var li = document.createElement('li');
		var label = document.createElement('label');
		var input = document.createElement('input');
		input.setAttribute('id','newCheckbox');
		input.setAttribute('type','checkbox');
		if(check == '1'){
			input.setAttribute('checked',true);
			li.style.color = 'red';
			clearcompleted.style.display = 'inline';
		}
		input.setAttribute('value',false);
		label.innerHTML = todo_title;
		input.onchange = function(){
			if(input.checked == true){
				li.style.color = 'red';
				clearcompleted.style.display = 'inline';
				updatetodoofStorage(li.childNodes[1].innerHTML,'1');
			}else{	
				li.style.color = 'black';
				updatetodoofStorage(li.childNodes[1].innerHTML,'0');
				if(!havechecked()){
					clearcompleted.style.display = 'none';
				}
			}
		}
		label.ondblclick = function(){
			var changes = prompt('请输入修改后的todo名称：');
			updatetodocontentofstorage(label.innerHTML,changes);
			label.innerHTML = changes;
		}
		li.onmouseover = function(){
			var deleteX = document.createElement('label');
			deleteX.style.color = 'red';
			deleteX.innerHTML = '               delete';
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
	var all = document.getElementById('all');
	var active = document.getElementById('active');
	var completed = document.getElementById('completed');
	//选择Mark All
	toggle_all.onchange = function(){
		if(toggle_all.checked == true){
			all.checked = false;
			active.checked = false;
			completed.checked = false;
			var checkbox_all = document.getElementById('todo-list').childNodes;
			for(var i = 0; i < checkbox_all.length; i++){
				if((checkbox_all[i].childNodes)[0].checked == false){
					(checkbox_all[i].childNodes)[0].checked = true;
					checkbox_all[i].style.color = 'red';

					clearcompleted.style.display = 'inline';
					updatetodoofStorage((checkbox_all[i].childNodes)[1].innerHTML,'1');
				}
			}
		}else{
			var checkbox_all = document.getElementById('todo-list').childNodes;
			for(var i = 0; i < checkbox_all.length; i++){
				if((checkbox_all[i].childNodes)[0].checked == true){
					(checkbox_all[i].childNodes)[0].checked = false;
					checkbox_all[i].style.color = 'black';
					clearcompleted.style.display = 'none';
					updatetodoofStorage((checkbox_all[i].childNodes)[1].innerHTML,'0');
				}
			}
		}
	}
	
	//all active completed三个事件的设定
	all.onchange = function(){
		if(all.checked == true){
			toggle_all.checked = false;
			active.checked = false;
			completed.checked = false;
			var checkbox_all = document.getElementById('todo-list').childNodes;
			for(var i = 0; i < checkbox_all.length; i++){
				(checkbox_all[i].childNodes)[0].style.display = 'inline';
				(checkbox_all[i].childNodes)[1].style.display = 'inline';
				checkbox_all[i].style.height = Liheight+'px';
			}
		}
	}
	active.onchange = function(){
		if(active.checked == true){
			toggle_all.checked = false;
			all.checked = false;
			completed.checked = false;
			var checkbox_all = document.getElementById('todo-list').childNodes;
			for(var i = 0; i < checkbox_all.length; i++){
				if((checkbox_all[i].childNodes)[0].checked == true){
					(checkbox_all[i].childNodes)[0].style.display = 'none';
					(checkbox_all[i].childNodes)[1].style.display = 'none';
					checkbox_all[i].style.height = 0;
				}else{
					(checkbox_all[i].childNodes)[0].style.display = 'inline';
					(checkbox_all[i].childNodes)[1].style.display = 'inline';
					checkbox_all[i].style.height = Liheight+'px';
				}
			}
		}else{
			var checkbox_all = document.getElementById('todo-list').childNodes;
			for(var i = 0; i < checkbox_all.length; i++){
				(checkbox_all[i].childNodes)[0].style.display = 'inline';
				(checkbox_all[i].childNodes)[1].style.display = 'inline';
				checkbox_all[i].style.height = Liheight+'px';
			}
		}
	}
	completed.onchange = function(){
		if(completed.checked == true){
			toggle_all.checked = false;
			active.checked = false;
			all.checked = false;
			var checkbox_all = document.getElementById('todo-list').childNodes;
			for(var i = 0; i < checkbox_all.length; i++){
				if((checkbox_all[i].childNodes)[0].checked == false){
					(checkbox_all[i].childNodes)[0].style.display = 'none';
					(checkbox_all[i].childNodes)[1].style.display = 'none';
					checkbox_all[i].style.height = 0;
				}else{
					(checkbox_all[i].childNodes)[0].style.display = 'inline';
					(checkbox_all[i].childNodes)[1].style.display = 'inline';
					checkbox_all[i].style.height = Liheight+'px';
				}
			}
		}else{
			var checkbox_all = document.getElementById('todo-list').childNodes;
			for(var i = 0; i < checkbox_all.length; i++){
				(checkbox_all[i].childNodes)[0].style.display = 'inline';
				(checkbox_all[i].childNodes)[1].style.display = 'inline';
				checkbox_all[i].style.height = Liheight+'px';
			}
		}
	}
	//监听todo回车事件
	todo_input.onkeypress = function(e){
		var addtodo = function(){
			var todo_title = todo_input.value.trim();
			//todo.settitle(todo_title);
			//todo.setcomplete(false);
			if(checkrepeat(todo_title)){
				alert('您已经添加过该todo，请换一个名称!');
			}else{
				if(storage.getItem('todo')!='')
					storage.setItem('todo',storage.getItem('todo')+',,'+todo_title+','+'0');
				else{
					storage.setItem('todo',todo_title+','+'0');
				}
				addElementLi('todo-list', todo_title,'0');
			}
			
		}
		if(e.which == ENTER_KEY){
			addtodo();
			todo_input.value='';
		}
	}

}


