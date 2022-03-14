//imports
const express = require('express')
const cookieParser = require('cookie-parser')

//inits
const app = express()

//middleware 
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/tweets', require('./routes/tweets'))
app.use('/api/comments', require('./routes/comments'))
app.use('/api/likes', require('./routes/likes'))

// listen
app.listen(8080, () => console.log("server is up and rungning in port 8080"))
