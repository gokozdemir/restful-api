const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const auth = async (req, res, next) => {

    try{
        if (req.header('Authorization'))
        {
            const token = req.header('Authorization').replace('Bearer ', '');
            const result = jwt.verify(token, 'secretkey');
          
            const findedUser = await User.findById({ _id: result._id });

            if (findedUser){
                req.user = findedUser;
            }
            else {
                throw new Error('Lütfen giriş yapın');
            }
            next();
        } else {
            throw new Error('Lütfen giriş yapın');
        }

    }catch(err){
        next(err)
    }
    
}

module.exports = auth