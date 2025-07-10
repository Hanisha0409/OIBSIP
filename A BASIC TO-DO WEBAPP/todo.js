function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const timestamp = new Date().toLocaleString();
  createTaskElement(taskText, timestamp);
  input.value = "";
}

function createTaskElement(text, timestamp) {
  const li = document.createElement("li");
  li.className = "task-item";

  const content = document.createElement("div");
  content.innerHTML = `<strong>${text}</strong><span class="timestamp">Added: ${timestamp}</span>`;

  const buttons = document.createElement("div");
  buttons.className = "task-buttons";

  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "done-btn";
  doneBtn.onclick = () => markAsDone(li, text, timestamp);

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.className = "edit-btn";
  editBtn.onclick = () => editTask(li, text);

  const delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.className = "del-btn";
  delBtn.onclick = () => li.remove();

  buttons.append(doneBtn, editBtn, delBtn);
  li.append(content, buttons);

  document.getElementById("pendingList").appendChild(li);
}

function markAsDone(taskElement, text, originalTimestamp) {
  taskElement.remove();

  const li = document.createElement("li");
  li.className = "task-item";

  const content = document.createElement("div");
  content.innerHTML = `<strong>${text}</strong><span class="timestamp">Completed: ${new Date().toLocaleString()}</span>`;

  const delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.className = "del-btn";
  delBtn.onclick = () => li.remove();

  const buttons = document.createElement("div");
  buttons.className = "task-buttons";
  buttons.appendChild(delBtn);

  li.append(content, buttons);
  document.getElementById("completedList").appendChild(li);
}

function editTask(taskElement, oldText) {
  const newText = prompt("Edit your task:", oldText);
  if (newText && newText.trim() !== "") {
    const timestamp = new Date().toLocaleString();
    taskElement.remove();
    createTaskElement(newText.trim(), timestamp);
  }
}
