const express = require('express')
const session = require('express-session');
const app = express()
const port = 3000

//フォーム送信を受け取るためのミドルウェア設定
app.use(express.json()); //JSONリクエストを解析
app.use(express.urlencoded({ extended: true })); //フォームデータを解析

//セッション設定
app.use(session({
  secret: 'my_secret_key', //セッションの秘密鍵
  resave: false,
  savaUninitialized: false,
  cookie: { maxAge: 60000 } //セッションの有効期限 60秒
}))

//静的ファイルのルーティング
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))



//テンプレートエンジンejsのルーティング
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')


app.get('/', (req, res) => {
  res.render('index')
})



//ユーザー処理
app.get('/login', (req, res) => {
  res.render('login');
})
app.get('/register', (req, res) => {
  res.render('register');
})

//仮のユーザーデータ
const users = [
  {
    "userName": "hanako",
    "email": "test@test",
    "password": "password"
  },
  {
    "userName": "aaa",
    "email": "aaaa@test",
    "password": "aaaaa"
  }
]

//ログアウト処理
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  })
})

//ログイン処理
// app.post('/tasks', (req, res) => {
//   const {email, password} = req.body;
//   const user = users.find(u => u.email ===email && u.password === password);
//   if(user) {
//     req.session.user = user;
//     console.log("[承認完了]メールアドレスとパスワードが一致");
//     res.redirect("/tasks");
//   }else {
//     res.status(401).send("承認失敗：メールアドレスまたはパスワードが違います");
//   }
// })

//ログイン後のページ遷移
// app.get('/tasks', (req, res) => {
//   if (!req.session.user) {
//     return res.status(401).send("ログインしてください");
//   }
//   res.render('tasks', { userName: req.session.user.userName});
// })

//新規ユーザー登録API
app.post('/register', (req, res) => {
  const {userName, email, password} = req.body;

  if (users.some(user => user.email === email)) {
    return res.status(400).json({message: "このメールアドレスはすでに登録されています"});
  }

  users.push({userName, email, password});
  req.session.user = {userName,email};
  res.redirect("/tasks");
})

//(開発用)一時的に認証をスキップ
app.get("/tasks", async (req, res) => {
  res.render('tasks');
});

//add画面への遷移
app.get('/add', (req, res) => {
  res.render('add');
})

//仮のtaskデータ
const tasksData = [];

//タスク追加API
app.post('/add', (req, res) => {
  const {addTaskName, addProjectName, addDueDate, addDescription, addPriority} = req.body;
  tasksData.push({addTaskName, addProjectName, addDueDate, addDescription, addPriority});
  console.log(tasksData);
  res.redirect("/tasks");
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

