const User = require('../models/userModel')
const createError = require('http-errors')
const bcrypt = require('bcrypt')

const listAllUsers = async (req, res) => {
    const allUsers = await User.find({});
    res.json(allUsers)
}

const loggedUserInfos = (req, res, next) => {
    res.json(req.user)
}

const updateLoggedUser = async (req, res) => {
    delete req.body.createdAt;
    delete req.body.updatedAt;

    if (req.body.hasOwnProperty('password')) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const { error, value } = User.joiValidationForUpdate(req.body)

    if (error) {
        next(createError(400, error))
    } else {
        try {
            const sonuc = await User.findByIdAndUpdate({ _id: req.user._id }, req.body, { new: true, runValidators: true });
            if (sonuc) {
                return res.json(sonuc);
            } else {
                return res.status(404).json({
                    mesaj: 'Kullanıcı Bulunamadı'
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

const createNewUser = async (req, res, next) => {
    try {
        const userToAdd = new User(req.body);
        userToAdd.password = await bcrypt.hash(userToAdd.password, 10)
        const { error, value } = userToAdd.joiValidation(req.body);

        if (error) {
            next(createError(400, error))
        } else {
            const result = await userToAdd.save();
            res.json(result)
        }

    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.login(req.body.email, req.body.password)
        const token = await user.generateToken()
        res.json({
            user,
            token
        })
    } catch (err) {
        next(err)
    }
}

const updateUserForAdmin = async (req, res, next) => {
    delete req.body.createdAt;
    delete req.body.updatedAt;

    if (req.body.hasOwnProperty('password')) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const { error, value } = User.joiValidationForUpdate(req.body)

    if (error) {
        next(createError(400, error))
    } else {
        try {
            const sonuc = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
            if (sonuc) {
                return res.json(sonuc);
            } else {
                return res.status(404).json({
                    mesaj: 'Kullanıcı Bulunamadı'
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

const deleteAllUsers = async (req, res, next) => {
    try {
        const result = await User.deleteMany({ isAdmin: false });
        if (result) {
            return res.json({
                mesaj: "Tüm kullanıcılar silindi"
            })
        } else {
            throw createError(404, 'User is not found');
        }
    } catch (err) {
        next(createError(400, err))
    }
}

const deleteItself = async (req, res, next) => {
    try {
        console.log(req.user._id)
        const result = await User.findByIdAndDelete({ _id: req.user.id });
        if (result) {
            return res.json({
                mesaj: "Kullanıcı silindi"
            })
        } else {
            throw createError(404, 'User is not found');
        }
    } catch (err) {
        next(createError(400, err))
    }
}

const deleteUserForAdmin = async (req, res, next) => {
    try {
        const result = await User.findByIdAndDelete({ _id: req.params.id });
        if (result) {
            return res.json({
                mesaj: "Kullanıcı silindi"
            })
        } else {
            throw createError(404, 'User is not found');
        }
    } catch (err) {
        next(createError(400, err))
    }
}

module.exports = {
    listAllUsers,
    loggedUserInfos,
    updateLoggedUser,
    createNewUser,
    login,
    updateUserForAdmin,
    deleteAllUsers,
    deleteItself,
    deleteUserForAdmin
}