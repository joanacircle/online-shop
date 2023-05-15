const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const bcrypt = require('bcrypt')
const saltRounds = 10

const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())
app.use(cors(
  {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}
))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  key: 'userId',
  secret: 'circle',
  resave: false, // 只有在 session 內容發生改變時才更新 session，不會在每次請求結束時都強制更新 session
  saveUninitialized: false, // 表示每次請求中如果沒有找到相應的 session，就會自動創建一個新的 session
  cookie: {
    expires: 60 * 60 * 1,
  },
}))

require('dotenv').config()

const user = process.env.DATABASEUSER_DEV
const password = process.env.DATABASEPASSWORD_DEV
const database = process.env.DATABASE_DEV
const port = process.env.DATABASE_PORT_DEV
const jwtKey = process.env.JWT_SECRET

const db = mysql.createConnection({
  user,
  host: 'localhost',
  password,
  database,
  port,
})

// jwt middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization
  if(!token){
    return res.send('Unauthorized: No token provided')
  }

  try{
    const decode = jwt.verify(token, jwtKey)
    req.userId = decode.userId
    next()
  } catch (err){
    console.log(err)
    res.send('Unauthorized: Invalid token')
  }
}

app.post('/register', (req, res) => {
  const {username, password} = req.body

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if(err){
      console.log(err)
    }
    
    db.query('INSERT INTO users(username, password) VALUES (?,?)',
    [username, hash],
    (err, result) => {
      console.log(err)
    }
    )
})
})

app.get('/login', authenticate, (req, res) => {
  try{
    res.send({loggedIn: true})
  } catch (err) {
    console.log(err)
    res.send('Error fetching user')
  }
})

// 確認用戶是否存在
app.post('/login', (req, res) => {
  const {username, password} = req.body

  db.query('SELECT * FROM users WHERE username = ?',
  username,
  (err, result) => {
    if(err){
      res.send({err: err})
    } 
    
    if(result.length > 0){
      bcrypt.compare(password, result[0].password, (error, response) =>{
        if(response){
          const token = jwt.sign({userId: result[0].id}, jwtKey)
          console.log(token)
          res.json({token})

        }else{
          res.send({message: 'Wrong username/password combination!'})
        }
     })
    }else{
      res.send({message: "User doesn't exist"})
    }
    }
  )
})

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{
  console.log(`Server is running on http://localhost:${PORT}`)
})