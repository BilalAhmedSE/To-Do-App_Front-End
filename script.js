// ===============================
// 🌟 Selecting HTML Elements
// ===============================
let taskInput = document.querySelector("#input-task");
let addBtn = document.querySelector(".add");
let taskShow = document.querySelector(".task-board h2");
let respAddBtn = document.querySelector(".responsive-add-btn");

let continueBtn = document.querySelector(".continue");
let nameInput = document.querySelector(".name-input");
let page = document.querySelector(".userIntroPage");
let nameText = document.querySelectorAll(".profileName");
let changeBtnShow = document.querySelector("#event-change-name")
let changeBtn = document.querySelector(".change-name")
let nameText2 = document.querySelector(".responsiveName");
let container = document.querySelector(".container");


let ham = document.querySelector("#hamburger");
let closeNav = document.querySelector("#closeNav");
let nav = document.querySelector(".nav");
let main = document.querySelector(".main-container");
let list = document.querySelector(".container ul");

// ===============================
// 🚀 Initial Setup
// ===============================
window.addEventListener("DOMContentLoaded", loadtask); // Load tasks on page load
let completedtask = 0; // Track completed task count

// ===============================
// 💾 Save Task List to Local Storage
// ===============================
function saveList() {
    const allTasks = [];
    document.querySelectorAll("#list-container li").forEach((li) => {
        const taskText = li.querySelector("span").innerText;
        const isDone = li.querySelector("span").classList.contains("line-throw");
        allTasks.push({ task: taskText, completed: isDone });
    });
    localStorage.setItem("taskList", JSON.stringify(allTasks));
}

// ===============================
// 📥 Load Tasks from Local Storage
// ===============================
function loadtask() {
    const storedTask = JSON.parse(localStorage.getItem("taskList")) || [];
    storedTask.forEach((taskObj) => {
        createTaskFromStorage(taskObj.task, taskObj.completed);
    });
}

// ===============================
// 🔢 Update Task Counter
// ===============================
function updateCounter() {
    let totalTask = document.querySelectorAll("ul li").length;
    taskShow.innerHTML = `Task Completed <br> ${completedtask} / ${totalTask}`;
}

// ===============================
// ➕ Create New Task (from input)
// ===============================
function createTask() {
    let task = taskInput.value.trim();
    if (task === "") {
        taskInput.placeholder = "Write Something Here Please!";
        taskInput.style.border = "2px solid Red";
        return;
    } else {
        taskInput.style.border = "none";
    }

    createTaskFromStorage(task, false);
    saveList();
}

// ===============================
// 📌 Create Task Element (used by input & storage)
// ===============================
function createTaskFromStorage(taskText, isCompleted) {
    // Create elements
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.innerText = taskText;

    let circle = document.createElement("img");
    circle.src = "images/blank-circle.png";
    circle.classList.add("circle");

    let deleteBtn = document.createElement("img");
    deleteBtn.src = "images/delete.png";
    deleteBtn.classList.add("delete");

    let taskLeft = document.createElement("div");
    taskLeft.classList.add("left-task");

    // Assemble task
    taskLeft.appendChild(circle);
    taskLeft.appendChild(span);
    li.appendChild(taskLeft);
    li.appendChild(deleteBtn);
    document.querySelector("ul").appendChild(li);

    // If previously completed
    if (isCompleted) {
        span.classList.add("line-throw");
        circle.src = "images/check-circle.png";
        completedtask++;
    }

    updateCounter();

    // ✅ Toggle Complete
    circle.addEventListener("click", () => {
        let isCompleted = span.classList.toggle("line-throw");
        if (isCompleted) {
            circle.src = "images/check-circle.png";
            completedtask++;
        } else {
            circle.src = "images/blank-circle.png";
            completedtask--;
        }
        updateCounter();
        saveList();
    });

    // ❌ Delete Task
    deleteBtn.addEventListener("click", () => {
        li.remove();
        if (span.classList.contains("line-throw")) {
            completedtask--;
        }
        updateCounter();
        saveList();
    });

    // Reset input
    taskInput.value = "";
    taskInput.placeholder = "Write Anything You Want To Do.....";
}

// ===============================
// 🖱️ Add Task via Click
// ===============================
addBtn.addEventListener("click", createTask);
respAddBtn.addEventListener("click", createTask);

// ===============================
// ⌨️ Add Task via Enter Key
// ===============================
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        createTask();
    }
});

// ===============================
// 📱 Mobile Navigation Toggle
// ===============================
ham.addEventListener("click", () => {
    ham.style.display = "none";
    closeNav.style.display = "block";
    nav.style.display = "block";
    main.style.opacity = "0.2";
    list.style.opacity = "0.2";
    nameText2.style.display = "none";
});

closeNav.addEventListener("click", () => {
    ham.style.display = "block";
    closeNav.style.display = "none";
    nav.style.display = "none";
    main.style.opacity = "1";
    list.style.opacity = "1";
    nameText2.style.display = "block";
});

// ===============================
// 🙋‍♂️ Name Input Logic (Intro Page)
// ===============================
window.addEventListener("DOMContentLoaded", () => {
    let savedName = localStorage.getItem("userName");

    if (!savedName) {
        page.style.display = "block";
        container.style.display = "none";
    } else {
        page.style.display = "none";
        container.style.display = "block";
        nameText.forEach((el) => {
            el.innerHTML = `${savedName} <i class="fa-regular fa-user"></i>`;
        });
    }
});

continueBtn.addEventListener("click", () => {
    if (nameInput.value === "") {
        nameInput.placeholder = "Enter Your Name Please";
        return;
    }

    let finalName = nameInput.value.trim();
    nameText.forEach((el) => {
        el.innerHTML = `${finalName} <i class="fa-regular fa-user"></i>`;
    });

    localStorage.setItem("userName", finalName);
    container.style.display = "block";
    page.style.display = "none";
});


let nameQ = document.querySelector(".nameQuestion")


changeBtn.addEventListener("click", () => {
    container.style.display = 'none'
    page.style.display = 'flex'
    changeBtn.classList.toggle("changeNameDisplayShow")
    nameQ.innerHTML = "What Do You Want To Set Your New Name? <br/> If Not, Reload!"
    nameQ.style.fontSize = "26px"
})

changeBtnShow.addEventListener("click", () => {
    changeBtn.classList.toggle("changeNameDisplayShow")
})


// ===============================
// 📱 Scroll Input into View on Mobile
// ===============================
taskInput.addEventListener("focus", () => {
    setTimeout(() => {
        taskInput.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300); // wait for keyboard to open
});

window.addEventListener("resize", () => {
    if (document.activeElement === taskInput) {
        taskInput.scrollIntoView({ behavior: "smooth", block: "center" });
    }
});


