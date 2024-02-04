const form = document.querySelector('#todo-form')
const input = document.querySelector('#todo')
const outputs = document.querySelector('.outputs')

let value
let complete = false
let eachOutputArr = []
input.addEventListener('change', inputValue)
form.addEventListener('submit', addToDo)

function addToDo(e) {
    e.preventDefault();
    outputs.innerHTML += `<div class='output'>
    <span class ='todo-value'>${value}</span>
    <span class ='close'>✖</span>
    <span class ='complete'>✔</span> 
    </div>`;


    deleteTodo()
    toggleComplete()

}
function inputValue(e) {
    value = e.target.value
}

function deleteTodo() {
    const closeButton = document.querySelectorAll('.close')
    const output = document.querySelectorAll('.output')
    closeButton.forEach((close, index) => {
        close.addEventListener('click', () => {
            output[index].remove()
        })
    });
}
function toggleComplete() {
    const completeButton = document.querySelectorAll('.complete')
    const todo = document.querySelectorAll('.todo-value')
    completeButton.forEach((complete,index)=>{
        complete.addEventListener('click',()=>{
            todo[index].classList.toggle('completed')
        })
    })

}

