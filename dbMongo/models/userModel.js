const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi')
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { collection: 'users', timestamps: true })

const schema = Joi.object({
    name: Joi.string().min(3).max(50).trim(),
    userName: Joi.string().min(3).max(50).trim(),
    email: Joi.string().trim().email(),
    password: Joi.string().min(6).trim()
});

//This validation has been used for a new user
UserSchema.methods.joiValidation = function (userObject) {
    
    schema.required();
    return schema.validate(userObject);
}

UserSchema.methods.toJSON = function(){
    const user = this.toObject();
    delete user._id;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.password;
    delete user.__v;

    return user;
}

UserSchema.methods.generateToken = async function () {
    const loggedUser = this
    const token = await jwt.sign({_id: loggedUser._id}, 'secretkey', {expiresIn: '1h'})
    return token
}

UserSchema.statics.login = async (email, password) => {

    const {error, value} = schema.validate({email, password})

    if(error){
        throw createError(400, error)
    }

    const user = await User.findOne({email})

    if(!user) {
        throw createError(400, 'The entered email or password is incorrect.')
    }

    const passwordControl = await bcrypt.compare(password, user.password)

    if(!passwordControl){
        throw createError(400, 'The entered email or password is incorrect.')
    }

    return user
}

//This validation has been used to update a user
UserSchema.statics.joiValidationForUpdate = function (userObject) {
    
    return schema.validate(userObject);
}

const User = mongoose.model('User', UserSchema);


module.exports = User;