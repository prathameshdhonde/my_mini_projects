const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("You must write something in your to do");
        return false;
    }

    if (addBtn.value === "Edit") {
        editLocalTodos(editTodo.target.closest('li').querySelector('p').innerHTML);
        editTodo.target.closest('li').querySelector('p').innerHTML = inputText;
        addBtn.value = "Add";
        inputBox.value = "";
    } else {
        const todoObj = { text: inputText, completed: false };
        createTodoElement(todoObj);
        inputBox.value = "";
        saveLocalTodos(todoObj);
    }
};

const updateTodo = (e) => {
    const item = e.target;
    const li = item.closest('li');

    if (item.classList.contains("deleteBtn")) {
        todoList.removeChild(li);
        deleteLocalTodos(li);
    }

    if (item.classList.contains("editBtn")) {
        inputBox.value = li.querySelector("p").innerText;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }

    if (item.classList.contains("completeCheck")) {
        li.classList.toggle("completed");
        updateCompletionStatus(li);
    }
};

const createTodoElement = (todoObj) => {
    const li = document.createElement("li");
    if (todoObj.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("completeCheck");
    checkbox.checked = todoObj.completed;
    li.appendChild(checkbox);

    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    const p = document.createElement("p");
    p.innerHTML = todoObj.text;
    taskContent.appendChild(p);

    const doneLabel = document.createElement("span");
    doneLabel.classList.add("doneLabel");
    doneLabel.innerText = "Done";
    taskContent.appendChild(doneLabel);

    li.appendChild(taskContent);

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "editBtn");
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("btn", "deleteBtn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
};

const saveLocalTodos = (todoObj) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todoObj);
    localStorage.setItem("todos", JSON.stringify(todos));
};

const getLocalTodos = () => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => createTodoElement(todo));
};

const deleteLocalTodos = (todoElement) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    const text = todoElement.querySelector("p").innerText;
    todos = todos.filter(t => t.text !== text);
    localStorage.setItem("todos", JSON.stringify(todos));
};

const editLocalTodos = (oldText) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    const index = todos.findIndex(t => t.text === oldText);
    if (index > -1) {
        todos[index].text = inputBox.value;
        localStorage.setItem("todos", JSON.stringify(todos));
    }
};

const updateCompletionStatus = (li) => {
    const text = li.querySelector("p").innerText;
    let todos = JSON.parse(localStorage.getItem("todos"));
    const index = todos.findIndex(t => t.text === text);
    if (index > -1) {
        todos[index].completed = li.classList.contains("completed");
        localStorage.setItem("todos", JSON.stringify(todos));
    }
};

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);
