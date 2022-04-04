const todoınput= document.querySelector(".todo-input");
 const todobutton= document.querySelector(".todo-button");
 const todolist= document.querySelector(".todo-list");

 document.addEventListener('DOMContentLoaded',getTodos);

 todobutton.addEventListener("click",addtodo);

 todolist.addEventListener('click',deletecheck);


 function addtodo(event){

	const tododiv=document.createElement('div');
	tododiv.classList.add("todo");

	const newtodo=document.createElement("li");
	newtodo.innerText=todoınput.value;
	newtodo.classList.add("todo-item");
	tododiv.appendChild(newtodo);

	savelocaltodos(todoınput.value);

	const completedbutton=document.createElement("button");
	completedbutton.innerHTML='<i class="fas fa-check"></i>';
	completedbutton.classList.add("completed-btn");
	tododiv.appendChild(completedbutton);

	const trashbutton=document.createElement("button");
	trashbutton.innerHTML='<i class="fas fa-trash"></i>';
	trashbutton.classList.add("trash-btn");
	tododiv.appendChild(trashbutton);

	todolist.appendChild(tododiv);
	
	todoınput.value="";

	event.preventDefault();
 }

 function deletecheck(event){
	const item=event.target;

	if(item.classList[0]==="trash-btn"){
		const todo=item.parentElement;
		todo.classList.add("fall");
		removelocaltodos(todo);
		todo.addEventListener('transitionend', function(){
			todo.remove();
		});
	}

	if(item.classList[0]==="completed-btn"){
		const todo=item.parentElement;
		todo.classList.toggle('completed');
	}
 }

 function savelocaltodos(todo){
	let todos;
	if(localStorage.getItem("todos")===null){
		todos=[];
	}
	else{
		todos=JSON.parse(localStorage.getItem('todos'));
	}
	todos.push(todo);
	localStorage.setItem("todos",JSON.stringify(todos));
 }

 function getTodos(){
	let todos;
	if(localStorage.getItem("todos")===null){
		todos=[];
	}
	else{
		todos=JSON.parse(localStorage.getItem('todos'));
	}
	todos.forEach(function(todo){
		const tododiv=document.createElement('div');
	    tododiv.classList.add("todo");

	    const newtodo=document.createElement("li");
	    newtodo.innerText= todo;
	    newtodo.classList.add("todo-item");
	    tododiv.appendChild(newtodo);

	    const completedbutton=document.createElement("button");
	    completedbutton.innerHTML='<i class="fas fa-check"></i>';
	    completedbutton.classList.add("completed-btn");
	    tododiv.appendChild(completedbutton);

	    const trashbutton=document.createElement("button");
	    trashbutton.innerHTML='<i class="fas fa-trash"></i>';
	    trashbutton.classList.add("trash-btn");
	    tododiv.appendChild(trashbutton);

	    todolist.appendChild(tododiv);
	});
 }

 function removelocaltodos(todo){
	let todos;
	if(localStorage.getItem("todos") === null){
		todos=[];
	}
	else{
		todos=JSON.parse(localStorage.getItem('todos'));
	}
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
 }