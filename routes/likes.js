const { db } = require('../database/db')
const { onlyLogged } = require('../helpers/onlyLogged')

const router = require('express').Router()

router.post('/', onlyLogged, (req, res) => {
    const { author, tweet_id } = req.body
    const user = db.find(ur => ur.username == author)
    const tweet = user.tweets.find(t => t.id == tweet_id)

    if (tweet.likes?.includes(req.user.username)) {
        tweet.likes = tweet.likes.filter(t => t != req.user.username)
        res.send({ msg: 'Ho why ?' })
    } else {
        tweet.likes.push(req.user.username)
        res.send({ msg: 'Great you add a like' })
    }
})

module.exports = router