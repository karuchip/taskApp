
//タスク追加処理
const formEl = document.getElementById("addTask");

formEl.addEventListener("submit", async(evt) => {
  evt.preventDefault();
  const formData = new FormData(formEl);
  const entries = Object.fromEntries(formData.entries());

  addTask(entries);
})

async function addTask(entries) {

  //サーバー側のapi呼び出し
  try {
    const response = await fetch('add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(entries)
    });
    const data = await response.json();
    alert(data.message);
  }catch(err) {
    console.error("Error:", err);
  }
}
