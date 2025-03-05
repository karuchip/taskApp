
//新規ユーザー登録処理
const formEl = document.getElementById("userRegister");

formEl.addEventListener("submit", async(evt) => {
  evt.preventDefault();
  const formData = new FormData(formEl);
  const entries = Object.fromEntries(formData.entries());

  userRegister(entries);
})

async function userRegister(entries) {

  const userName = entries.userName;
  const email = entries.email;
  const password = entries.password;

  //サーバー側のapi呼び出し
  try {
    const response = await fetch('register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({userName, email, password}),
    });
    const data = await response.json();
    alert(data.message);
    //成功したらリダイレクト
    if (response.ok) {
      window.location.href = response.url;
      }
  }catch (err){
    console.error("Error:", err);
  }
}
