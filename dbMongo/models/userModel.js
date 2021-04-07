const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi')

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
        trim: true,
    }
}, { collection: 'users', timestamps: true })

const schema = Joi.object({
    name: Joi.string().min(3).max(50).trim(),
    userName: Joi.string().min(3).max(50).trim(),
    email: Joi.string().trim().email(),
    password: Joi.string().trim()
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

//This validation has been used to update a user
UserSchema.statics.joiValidationForUpdate = function (userObject) {
    
    return schema.validate(userObject);
}

const User = mongoose.model('User', UserSchema);


module.exports = User;