const { db } = require('../database/db')
const { onlyLogged } = require('../helpers/onlyLogged')

const router = require('express').Router()


router.get('/:author/:tweet_id', (req, res) => {
    const { author, tweet_id } = req.params
    if (!author || !tweet_id) {
        res.status(400).send({ msg: 'missing some info' })
    }
    const user = db.find(ur => ur.username == author)
    const tweet = user.tweets.find(t => t.id == tweet_id)
    res.send(tweet.comments)
})

router.post('/', onlyLogged, (req, res) => {
    const { author, text, tweet_id } = req.body

    if (!author || !tweet_id || !text) {
        return res.status(400).send({ msg: 'missing some info' })
    }
    const user = db.find(ur => ur.username == author)
    const tweet = user.tweets.find(t => t.id == tweet_id)
    tweet.comments.push({
        text,
        published: new Date(),
        username: req.user.username
    })
    res.send({ msg: 'your comment will be published soon!' })
})

module.exports = router