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


//タスク処理（taskController.js）
//仮のtaskデータ
const tasksData = [
  {
    id: 1,
    taskName: "FVにタスクを表示する",
    projectName: "タスク管理webアプリ",
    dueDate: "2024/03/07",
    description: "メモメモ",
    priority: "high"
  },
  {
    id: 2,
    taskName: "FVにタスクを表示する2",
    projectName: "タスク管理webアプリ2",
    dueDate: "2024/03/08",
    description: "メモメモ2",
    priority: "high"
  }
];

//ログイン後、タスク一覧の取得
app.get("/tasks", (req, res) => {
  console.log(tasksData);
  res.render('tasks',{tasksData: tasksData});
});

//タスク追加画面への遷移
app.get('/add', (req, res) => {
  res.render('add');
})

//タスク追加API
app.post('/add', (req, res) => {
  const {taskId, taskName, projectName, dueDate, description, priority} = req.body;
  tasksData.push({taskId, taskName, projectName, dueDate, description, priority});
  console.log(tasksData);
  res.render("tasks", {tasksData: tasksData});
})

//タスク編集
app.get('/editTask/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasksData.find(t => t.id ===taskId);
  if(!task) {
    return res.status(404).send("タスクが見つかりません")
  }
  res.render("editTask", {task});
})

//タスク更新
app.post('/updateTask/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasksData.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).send("タスクが見つかりません")
  }

  //更新処理
  tasksData[taskIndex] = {
    ...tasksData[taskIndex],
    ...req.body
  };
  console.log(tasksData[taskIndex]);
  res.redirect("/tasks");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

