const { db } = require('../database/db')
const { onlyLogged } = require('../helpers/onlyLogged')

const router = require('express').Router()

router.get('/', (req, res) => {
    const { username } = req.query
    const user = db.find(ur => ur.username == username)
    res.status(user ? 200 : 404).send(user || { err: "profile not found" })
})
router.put('/avatar', onlyLogged, (req, res) => {
    const user = db.find(ur => ur.username == req.user.username)
    user.avatar = req.body.avatar
    res.send({ msg: 'Avatar updated!' })
})
router.put('/nickname',onlyLogged, (req, res) => {
    const user = db.find(ur => ur.username == req.user.username)
    user.nickname = req.body.nickname
    res.send({ msg: 'nickname updated!' })
})
router.post('/follow',onlyLogged, (req, res) => {
    if (!db.some(user => user.username == req.body.username)) {
        res.send({ msg: 'Its a virtual person!' })
    }
    const user = db.find(ur => ur.username == req.body.username)
    if (user.followers.includes(req.body.username)) {
        user.followers = user.followers.filter(un => un != req.body.username)
        res.send({ msg: "unfollowing " + req.body.username })

    } else {
        user.following.push(req.body.username)
        res.send({ msg: "now you're following " + req.body.username })
    }
})

module.exports = router