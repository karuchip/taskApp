//タスク更新処理
document.getElementById("editTaskForm").addEventListener("submit", async (evt) => {
  evt.preventDefault();
  console.log("フォームの送信イベントが発生！"); // ← これが表示されるか確認

  const formDataUpdate = new FormData(evt.target);
  const updateEntries = Object.fromEntries(formDataUpdate.entries());

  await updateTask(updateEntries);

})
async function updateTask(entries) {
  try {
    const response = await fetch(`/updateTask/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(entries),
    });
    const data = await response.json();
    alert(data.message);

    if (response.ok) {
      console.log("フロントレスポンスok!!")
      window.location.href = response.url;
    }
  }catch(err) {
    console.error("Error:", err);
  }
}
