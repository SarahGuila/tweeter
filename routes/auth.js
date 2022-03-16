const { db } = require('../database/db')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const { refreshes } = require('../database/refreshes')
const { onlyLogged } = require('../helpers/onlyLogged')

const router = require('express').Router()

router.post('/register', async (req, res) => {
    //destructuring the body
    const { username, password, nickname, avatar } = req.body
    //check for missing params
    if (!username || !password || !nickname || !avatar) {
        return res.status(400).send({ msg: "Missing some info" })
    }
    //check for taken usenmane
    if (db.some(user => user.username == username)) {
        return res.status(400).send({ msg: "Username already exist" })
    }

    //hash the password
    const hash = await bcrypt.hash(password, 10)

    //add new user to the database
    db.push({
        username,
        password: hash,
        nickname,
        avatar,
        tweets: [],
        followers: []
    })
    res.send({ msg: 'user added succesfuly! Welcome ' + username })
})

router.post('/login', async (req, res) => {

    //destructuring the body
    const { username, password } = req.body
    //check for missing params
    if (!username || !password) {
        return res.status(400).send({ msg: "Missing some info" })
    }
    //select the user
    const user = db.find(ur => ur.username == username)
    if (!user) {
        res.status(401).send({ msg: 'User not found!' })
    }
    //compare the hashes
    const matchPasswords = await bcrypt.compare(password, user.password)
    if (!matchPasswords) {
        res.status(401).send({ msg: 'Wrong password!' })
    }
    //creat tokens
    const accessToken = jsonwebtoken.sign({ username, nick: user.nickname }, process.env.ACCESS_TOKEN, { expiresIn: '5m' })
    const refreshToken = jsonwebtoken.sign({ username, nick: user.nickname }, process.env.REFRESH_TOKEN, { expiresIn: '100d' })
    
    //save the refresh token in the valut(db of refresh tokens)
    refreshes[username] = refreshToken

    //save the access token in the client cookie
    res.cookie("sid", accessToken, {
        httpOnly:true,
        secure: false
    } )
    res.send({msg:'Welcome ' + username})
})

router.delete('/logout', onlyLogged, (req, res) => {
    refreshes[req.user.username] = undefined
    res.clearCookie("sid")
    res.send({msg:"By by"})
})

module.exports = router
