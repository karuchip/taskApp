const express = require('express')
const app = express()
const port = 3000

//フォーム送信を受け取るためのミドルウェア設定
app.use(express.json()); //JSONリクエストを解析
app.use(express.urlencoded({ extended: true })); //フォームデータを解析

//静的ファイルのルーティング
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

//テンプレートエンジンejsのルーティング
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.get('/', (req, res) => {
  res.render('index')
})
app.get('/login', (req, res) => {
  res.render('login');
})
app.get('/register', (req, res) => {
  res.render('register');
})
app.get('/tasks', (req, res) => {
  res.render('tasks');
})

const users = {
  "userName": "hanako",
  "email": "test@test",
  "password": "password"
}

app.post('/tasks', (req, res) => {
  const {email, password} = req.body;
  console.log(email);
  console.log(password);
  if(email === users.email && password === users.password) {
    console.log("[承認完了]メールアドレスとパスワードが一致");
    res.redirect("/tasks");
  }else {
    res.status(401).send("承認失敗");
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

