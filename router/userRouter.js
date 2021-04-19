const router = require('express').Router();
const authMiddleware = require('../dbMongo/middleware/authMiddleware')
const adminMiddleware = require('../dbMongo/middleware/adminMiddleware')
const userController = require('../dbMongo/controllers/userController')

router.get('/', [authMiddleware, adminMiddleware] ,userController.listAllUsers)

// router.get('/:id', (req, res) => {
//     res.status(200).json({ mesaj: req.params.id + 'idli kullanıcını getirilecek' })
// })

router.get('/me', authMiddleware, userController.loggedUserInfos)

router.patch('/me', authMiddleware, userController.updateLoggedUser)

router.post('/', userController.createNewUser)

router.post('/login', userController.login)

router.get('/deleteAll', [authMiddleware, adminMiddleware], userController.deleteAllUsers)

router.delete('/me', authMiddleware, userController.deleteItself)

router.delete('/:id', [authMiddleware, adminMiddleware], userController.deleteUserForAdmin)

router.patch('/:id', userController.updateUserForAdmin)



module.exports = router;