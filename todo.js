const form=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");



eventListeners();

function eventListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadedAllTodoUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);

}

function clearAllTodos(e){
     if(confirm("Hamsini silmek istirsiz?")){
     	// todoList.innerHTML="";
     	while(todoList.firstElmentChild !=null){
            todoList.removeChild(todoList.firstElmentChild);
     	}
     	localStorage.removeItem("todos");
     } 

}


function filterTodos(e){
	let filterValues=e.target.value.toLowerCase();
	let listItem=document.querySelectorAll(".list-group-item");

	listItem.forEach(function(listItem){
		const text=listItem.textContent.toLowerCase();
        
        if(text.indexOf(filterValues)===-1){
            
            listItem.setAttribute("style","display:none !important");
        }
        else{
        	listItem.setAttribute("style","display:block");

        }
	});
}

function deleteTodoFromStorage(deleteTodo){
	let todos=getTodosFromStorage();
	todos.forEach(function(todo,index){
        if(todo===deleteTodo){
        	todos.splice(index,1);
        }
	});
     localStorage.setItem("todos",JSON.stringify(todos));

}

function deleteTodo(e){
	if(e.target.className==="fa fa-remove")
		e.target.parentElement.parentElement.remove();
	    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
	    showAlert("success","Todo silindi");

}

function loadedAllTodoUI(){
	let todos=getTodosFromStorage();
	todos.forEach(function(todo){
		addTodoToUI(todo);
	})
}



function addTodo(e){
    const newTodo=todoInput.value.trim();
    
    if(newTodo===""){
    	showAlert("danger","Todo elave edin");
    }    
    else{
    	addTodoToUI(newTodo);
    	addTodoToStorage(newTodo);
    	showAlert("success","Todo elave edildi");
    }


    
    // addTodoToUI(newTodo); 
    e.preventDefault();
}

function getTodosFromStorage(newTodo) {
	let todos;
	if(localStorage.getItem("todos")===null){
		todos=[];
	}
	else{
		todos=JSON.parse(localStorage.getItem("todos"));
	}
	return todos;
}

function addTodoToStorage(newTodo){

	let todos=getTodosFromStorage();
	todos.push(newTodo);
	localStorage.setItem("todos",JSON.stringify(todos));
	
}



function showAlert(type,message){
	const alert=document.createElement("div");
	alert.className=`alert alert-${type}`;
	alert.textContent= message;
	// console.log(alert);
	firstCardBody.appendChild(alert);

    setTimeout(function(){
    	alert.remove();
    },1000);
	

}

function addTodoToUI(newTodo){
	const listItem=document.createElement("li");

	const link=document.createElement("a");
	link.href="#";
	link.className="delete-item";
	link.innerHTML="<i class = 'fa fa-remove'></i>";

	listItem.className="list-group-item d-flex justify-content-between";

	listItem.appendChild(document.createTextNode(newTodo));
	listItem.appendChild(link);

	todoList.appendChild(listItem);

	todoInput.value="";
}




