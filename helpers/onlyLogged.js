const jwt = require('jsonwebtoken')
const { refreshes } = require('../database/refreshes')

module.exports.onlyLogged = function (req, res, next) {
    //IF check if the access token is valid and refresh
    jwt.verify(req.cookies.sid, "Secret", (err, decoded) => {
        if (err) {
            if (err.name == 'TokenExpireError') {
                const dec = jwt.decode(req.cookies.sid)
                jwt.verify(refreshes[dec.username], "Secret", (err, decoded) => {
                    if (err) {
                        return res.status(403).send('You logged out please log in again')
                    }
                    const accessToken = jwt.sign({ username: dec.username, nick: dec.nickname }, "Secret", { expiresIn: '5m' })
                    res.cookie("sid", accessToken, {
                        httpOnly: true,
                        secure: false
                    })
                    req.user = dec
                    next()
                })
            }
        } else {
            jwt.verify(refreshes[decoded.username], "OtherSecret", (err, decoded) => {
                if (err) {
                    return res.status(403).send('you logged out , please log in again')
                }
                req.user = decoded
                next()
            })
        }
    })
}