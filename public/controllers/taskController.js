
//タスク追加処理
const formEl = document.getElementById("addTask");

formEl.addEventListener("submit", async(evt) => {
  evt.preventDefault();
  const formData = new FormData(formEl);
  const entries = Object.fromEntries(formData.entries());

  addTask(entries);
})

async function addTask(entries) {

  const addTaskName = document.getElementById("add-task-name");
  const addProjectName = document.getElementById("add-project-name");
  const addDueDate = document.getElementById("add-due-date");
  const addDescription = document.getElementById("add-description");
  const addPriority = document.getElementById("add-priority");

  //サーバー側のapi呼び出し

  try {
    const response = await fetch('add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({addTaskName, addProjectName, addDueDate, addDescription, addPriority})
    });
    const data = await response.json();
    alert(data.message);
  }catch(err) {
    console.error("Error:", err);
  }

}
