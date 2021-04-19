const admin = (req, res, next) => {
    if(!req.user.isAdmin){
        return res.status(403).json({
            message: 'Erişim engellendi. Admin yetkilerine sahip değilsiniz.'
        })
    }

    next()
}

module.exports = admin