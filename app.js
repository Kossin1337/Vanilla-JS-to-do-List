const addTaskBtn = document.querySelector(".add-task");
const tasksContainer = document.querySelector(".tasks-container");
const taskInput = document.querySelector("#task-name");

/* UI class handling task operations */
class UI {
  static showTasks() {
    const tasks = [
      {
        name: "Shopping",
      },
      {
        name: "Spanish",
      },
    ];

    tasks.forEach((task) => UI.addTask(task.name));
  }

  static addTask(taskName) {
    let newTask = document.createElement("div");
    newTask.className = "task";

    newTask.innerHTML = `
    <h3 class="task-name">${taskName}</h3>
    <div class="task-buttons">
      <button class="task-button complete-task">
        <i class="fas fa-check"></i>
      </button>
      <button class="task-button delete-task">
        <i class="fas fa-times"></i>
      </button>
    </div>
    `;

    // Task add alert
    UI.alert("Task added", "add");

    tasksContainer.appendChild(newTask);
  }

  static deleteTask(task) {
    task.parentNode.parentNode.remove();
  }

  static alert(message, alertType) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${alertType}`;
    alert.textContent = message;

    const alertContainer = document.querySelector(".alert-container");

    alertContainer.appendChild(alert);

    setTimeout(() => {
      alertContainer.innerHTML = ``;
    }, 4000);
  }

  static clearInput() {
    taskInput.value = ``;
  }
}

/* Event: show tasks */
UI.showTasks();

/* Event: add a task */
addTaskBtn.addEventListener("click", (e) => {
  const taskName = document.getElementById("task-name").value;
  if (taskName.length < 1) {
    UI.alert("No task name", "danger");
  } else {
    // Add task
    UI.addTask(taskName);

    // Clear task input
    UI.clearInput();
  }
});

/* Event: remove a task */
tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("complete-task")) {
    UI.deleteTask(e.target);
    UI.alert("Task completed", "complete");
  } else if (e.target.parentNode.classList.contains("complete-task")) {
    UI.deleteTask(e.target.parentNode);
    UI.alert("Task completed", "complete");
  }

  if (e.target.classList.contains("delete-task")) {
    UI.deleteTask(e.target);
    UI.alert("Task deleted", "danger");
  } else if (e.target.parentNode.classList.contains("delete-task")) {
    UI.deleteTask(e.target.parentNode);
    UI.alert("Task deleted", "danger");
  }
});
