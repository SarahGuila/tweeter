const { v4 } = require('uuid')
const { db } = require('../database/db')
const { everyone } = require('../helpers/everyone')
const { onlyLogged } = require('../helpers/onlyLogged')

const router = require('express').Router()

router.get('/', everyone, (req, res) => {
    const tweets = []
    if (req.user && db.find(ur => ur.username == req.user.username)?.followers.length) {
        const user = db.find(ur => ur.username == req.user.username)
        db.filter(ur => user.followers.includes(ur.username)).forEach(ur =>
            tweets.push(...ur.tweets))

        tweets.sort((a, b) => b.published - a.published)
    } else {
        db.forEach(ur => tweets.push(...ur.tweets))
        tweets.sort((a, b) => b.likes.length - a.likes.length )
    }
    res.send(tweets)
})
router.post('/', onlyLogged, (req, res) => {
    const {text} = req.body
    if (!text) {
        return res.status(400).send({ err: 'missing text property' })
    }
    const user = db.find(ur => ur.username == req.user.username)
    user.tweets.push({
        id: v4(),
        author: req.user.username,
        text,
        comments:[],
        likes:[],
        published: new Date()
    })
    res.send({msg:'Tweet added succesfuly!'})
})

module.exports = router