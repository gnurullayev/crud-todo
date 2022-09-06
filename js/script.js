let elForm = document.querySelector(".form");
let elInput = document.querySelector(".js-input");
let elList = document.querySelector(".js-list-group");

let todos =JSON.parse(localStorage.getItem("list")) || [];
console.log(todos);

//rendringList
function rendringList (arr) {
    elList.innerHTML = null;

    
    arr.forEach((todo,i)=> {
        elList.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <p class="d-flex align-items-center mb-0 ${todo.isComplid ? "active" : ""}">
                    <input onClick = "checkItem(${i})" class="list-input" type="checkbox" ${todo.isComplid ? "checked" : ""}>
                    <span class=" ms-2 js-list-span">${todo.name}</span>
                </p>
                <button onClick = "deletTodo(${i})" class="btn btn-danger js-list-btn">DELETE</button>
            </li>
        `
    })
}
rendringList(todos)



//DeletTodos
function deletTodo(id) {
    let filterTodos = todos.filter((item,i) => {
        return id !== i
    })
    todos = filterTodos
    rendringList(todos);
    localStorage.setItem("list", JSON.stringify(todos))
}

//checkItem

function checkItem(id) {
    let checkArr = todos.map((item,i) => {
        if(id == i) {
            return {...item, isComplid: item.isComplid ? false : true}
        }else {
            return {...item}
        }
    }) 
    
    todos = checkArr;
    rendringList(todos);
    localStorage.setItem("list", JSON.stringify(todos))
}

//addPost
elForm.addEventListener("submit", (evt) => {

    evt.preventDefault()

    let formInputValue = elInput.value.trim()
    let obj = {
        id: Date.now(),
        name:formInputValue,
        isComplid:  false,
    }
    elInput.value = "";
    todos.push(obj);
    localStorage.setItem("list", JSON.stringify(todos))
    rendringList(todos)
})

