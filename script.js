
// Add, remove, and mark complete and remove it 
const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

// check if there are objects to delete them
// stored as a string, parse it back into an array 
// One
const todos = JSON.parse(localStorage.getItem('todos'))

// Two
if(todos) {
    todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    addTodo()
})

function addTodo(todo) {
    let todoText = input.value

    if(todo) {
        todoText = todo.text
    }

    // console.log(todoText) //text's is getting logged in console
    // construct a list item
    if(todoText) {
        const todoEl = document.createElement('li')
        if(todo && todo.completed) {
            todoEl.classList.add('completed')
        }

        todoEl.innerText = todoText
        
        // delete them, mark them as completed
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            updateLS()
        }) 

        todoEl.addEventListener('contextmenu', (e) => {
            // prevent of happening
            e.preventDefault()

            todoEl.remove()
            updateLS()
        }) 
        // add that to the dom
        todosUL.appendChild(todoEl)

        input.value = ''
        // keep them in local storage
        // Three
        updateLS()
    }
}

// save todos to local storage
// localStorage.setItem('name', JSON.stringify(obj))
// JSON.parse(localStorage.getItem(obj))

function updateLS() {
    // take all the list items
    todosEl = document.querySelectorAll('li')

    const todos = []

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}