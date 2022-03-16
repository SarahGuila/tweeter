const jsonwebtoken = require("jsonwebtoken")

module.exports.everyone = function(req, res, next){
    try {
        const dec = jsonwebtoken.decode(req.cookies.sid)
        if (dec) {
        req.user = dec            
        } else {
            req.user = false
        }
        next()
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}