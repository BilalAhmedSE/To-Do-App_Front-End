// selecting html elements

let taskInput = document.querySelector("#input-task")
let addBtn = document.querySelector(".add")
let taskShow = document.querySelector(".task-board h2")






window.addEventListener('DOMContentLoaded', loadtask)

// initial value(s)

let completedtask = 0;

// main work 



function saveList() {
    const allTasks = [];

    document.querySelectorAll("#list-container li").forEach((li) => {
        const taskText = li.querySelector("span").innerText
        const isDone = li.querySelector("span").classList.contains("line-throw")
        allTasks.push({ task: taskText, completed: isDone })
    });

    localStorage.setItem("taskList", JSON.stringify(allTasks))
}

function loadtask() {
    const storedTask = JSON.parse(localStorage.getItem("taskList")) || [];

    storedTask.forEach((taskObj) => {
        createTaskFromStorage(taskObj.task, taskObj.completed)
    })
}






function updateCounter() {
    let totalTask = document.querySelectorAll('ul li').length
    taskShow.innerHTML = `Task Completed <br> ${completedtask} / ${totalTask} `
}

function createTask() {
    let task = taskInput.value.trim();

    if (task === '') {
        taskInput.placeholder = 'Write Something Here Please!'
        taskInput.placeholder.style.color = "red"
        return;
    }

    createTaskFromStorage(task, false);
    saveList();

}

function createTaskFromStorage(taskText, isCompleted) {


    // creating li 

    let li = document.createElement('li')
    let span = document.createElement("span")
    span.innerText = taskText



    // creating circle png 

    let circle = document.createElement('img')
    circle.src = "images/blank-circle.png"
    circle.classList.add('circle')

    let deleteBtn = document.createElement("img")
    deleteBtn.src = "images/delete.png"
    deleteBtn.classList.add("delete")

    let taskLeft = document.createElement("div")
    taskLeft.classList.add('left-task')

    // Appending Child And parents

    taskLeft.appendChild(circle)
    taskLeft.appendChild(span)

    li.appendChild(taskLeft)
    li.appendChild(deleteBtn)

    document.querySelector('ul').appendChild(li)
    updateCounter()

    // Events 

    circle.addEventListener("click", () => {

        let isCompleted = span.classList.toggle('line-throw')


        if (isCompleted) {

            circle.src = "images/check-circle.png"
            completedtask++


        } else {
            circle.src = "images/blank-circle.png"
            completedtask--

        }
        updateCounter();
        saveList();

    })

    // Delete Event

    deleteBtn.addEventListener('click', () => {
        li.remove()
        if (span.classList.contains('line-throw')) {
            completedtask--

        }
        updateCounter();
        saveList();
    })
    taskInput.value = ''
    taskInput.placeholder = 'Write Anything You Want To Do.....'
}


addBtn.addEventListener('click', createTask)

// Keyboard "Enter" Event

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        createTask()
    }
})

// mobile screen nav 

let ham = document.querySelector("#hamburger")
let closeNav = document.querySelector("#closeNav")
let nav = document.querySelector(".nav")
let main = document.querySelector(".main-container")
let list = document.querySelector(".container ul")


ham.addEventListener("click", () => {
    ham.style.display = 'none'
    closeNav.style.display = 'block'
    nav.style.display = 'block'
    main.style.opacity = "0.2"
    list.style.opacity = "0.2"


})

closeNav.addEventListener("click", () => {
    ham.style.display = 'block'
    closeNav.style.display = 'none'
    nav.style.display = 'none'
    main.style.opacity = "1"
    list.style.opacity = "1"
})




