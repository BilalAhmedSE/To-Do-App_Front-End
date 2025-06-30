// selecting html elements

let taskInput = document.querySelector("#input-task")
let addBtn = document.querySelector(".add")
let taskShow = document.querySelector(".task-board h2")


// initial value(s)

let completedtask = 0;

// main work 

function updateCounter() {
    let totalTask = document.querySelectorAll('ul li').length
    taskShow.innerHTML = `Task Completed <br> ${completedtask} / ${totalTask} `
}

function createTask() {
    let task = taskInput.value.trim();

    if (task === '') {
        taskInput.placeholder = 'Write Something'
        return;
    }

    // creating li 

    let li = document.createElement('li')
    let span = document.createElement("span")
    span.innerText = task



    // creating circle png 

    let circle = document.createElement('img')
    circle.src = "images/blank-circle.png"
    circle.classList.add('circle')

    let deleteBtn = document.createElement("img")
    deleteBtn.src = "images/delete.png"
    deleteBtn.classList.add("delete")

    let taskLeft = document.createElement("div")
    taskLeft.classList.add('left-task')
    taskLeft.appendChild(circle)
    taskLeft.appendChild(span)

    li.appendChild(taskLeft)
    li.appendChild(deleteBtn)

    document.querySelector('ul').appendChild(li)
    updateCounter()

    circle.addEventListener("click", () => {

        let isCompleted = span.classList.toggle('line-throw')

        if (isCompleted) {
            circle.src = "images/check-circle.png"
            completedtask++


        } else {
            circle.src = "images/blank-circle.png"
            completedtask--

        }
        updateCounter()


    })

    deleteBtn.addEventListener('click', () => {
        li.remove()
        if (span.classList.contains('line-throw')) {
            completedtask--

        }
        updateCounter()
    })
    taskInput.value = ''
    taskInput.placeholder = 'Write Anything You Want To Do.....'




}

addBtn.addEventListener('click', createTask)


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




