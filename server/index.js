const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

require('dotenv').config()

const user = process.env.DATABASEUSER_DEV
const password = process.env.DATABASEPASSWORD_DEV
const database = process.env.DATABASE_DEV
const port = process.env.DATABASE_PORT_DEV

const db = mysql.createConnection({
  user,
  host: 'localhost',
  password,
  database,
  port,
})

app.post('/register', (req, res) => {
  const {username, password} = req.body
  db.query('INSERT INTO users(username, password) VALUES (?,?)',
  [username, password],
  (err, result) => {
    console.log(err)
  }
  )
})

app.post('/login', (req, res) => {
  const {username, password} = req.body
  db.query('SELECT * FROM users WHERE username = ? AND password = ?',
  [username, password],
  (err, result) => {
    if(err){
      res.send({err: err})
    } 
    
    if(result.length > 0){
      res.send(result)
    }
    // else{
    //   res.send({message: 'Wrong username/password combination!'})
    // }
    }
  )
})

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{
  console.log(`Server is running on http://localhost:${PORT}`)
})