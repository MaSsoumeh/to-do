
document.getElementById("taskInput").addEventListener("keypress", onKeyPress);
window.addEventListener("load", loadTasks);

function addNewItem() {
   const taskInput = document.getElementById("taskInput");
   const newTask = taskInput.value.trim();

   if (!newTask) {
      document.querySelector("input").placeholder = "Please enter something to add to the list"
      return;
   }
   const taskList = document.getElementById("taskList");
   const listItem = createListItem(newTask, false);

   taskList.appendChild(listItem);
   saveTask(newTask);
   resetForm();

}

function createListItem(task, isCompleted) {
   const item = document.createElement("div");
   item.className = "listItem";

   const itemDescription = document.createElement("div");
   itemDescription.className = "taskDescription";

   const itemCheckBox = document.createElement("input");
   itemCheckBox.type = "checkbox";
   itemCheckBox.name = "task";
   itemCheckBox.checked = isCompleted;
   if (isCompleted) {
      itemDescription.classList.add("crossout");
   }
   itemCheckBox.addEventListener("click", () => {
      itemDescription.classList.toggle("crossout");
      updateTaskStatus(task, itemCheckBox.checked);
   });

   const descriptionText = document.createTextNode(` \t ${task}`);
   const descriptionElement = document.createElement("div");
   descriptionElement.appendChild(descriptionText)
   descriptionElement.className = "descriptionText"

   const img = document.createElement('img');
   img.src = './images/trash.png';
   img.alt = 'Button Image';
   img.style.width = '24px';
   img.style.height = '24px';

   const itemDeleteBtn = document.createElement("button");
   itemDeleteBtn.className = "deleteButton";
   itemDeleteBtn.addEventListener("click", () => {
      item.remove();
      deleteTask(task);
   });
   itemDeleteBtn.appendChild(img);


   itemDescription.appendChild(itemCheckBox);
   itemDescription.appendChild(descriptionElement);
   item.appendChild(itemDescription);
   item.appendChild(itemDeleteBtn);

   return item;
}


function onKeyPress(event) {
   // 13 is the enter key's keycode, this could also be display by event.keyCode === 13
   if (event.which === 13) {
      addNewItem();
   }
}

function resetForm() {
   const taskInput = document.getElementById("taskInput");
   taskInput.value = "";
   taskInput.placeholder = "New Task...";
}

function saveTask(task, isCompleted) {
   let tasks = getTasksFromStorage()
   tasks.push({ task, isCompleted });
   saveTasksToStorage(tasks)
}

function loadTasks() {
   let tasks = getTasksFromStorage()
   const taskList = document.getElementById("taskList");
   tasks.forEach(({ task, isCompleted }) => {
      const listItem = createListItem(task, isCompleted);
      taskList.appendChild(listItem);
   });
}

function deleteTask(task) {
   let tasks = getTasksFromStorage()
   tasks = tasks.filter(t => t.task !== task);
   saveTasksToStorage(tasks)
}

function updateTaskStatus(task, isCompleted) {
   let tasks = getTasksFromStorage()
   tasks = tasks.map(t => t.task === task ? { task, isCompleted } : t);
   saveTasksToStorage(tasks)
}

function getTasksFromStorage() {
   return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToStorage(tasks) {
   localStorage.setItem("tasks", JSON.stringify(tasks));
}
