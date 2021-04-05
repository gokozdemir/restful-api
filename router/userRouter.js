const router = require('express').Router();
const User = require('../dbMongo/models/userModel')

router.get('/', async (req, res) => {
    const allUsers = await User.find({});
    res.json(allUsers)
})

router.get('/:id', (req, res) => {
    res.status(200).json({ mesaj: req.params.id + 'idli kullanıcını getirilecek' })
})

router.post('/', async (req, res) => {
    try {
        const userToAdd = new User(req.body);
        const result = await userToAdd.save();
        res.json(result)
    } catch (err) {
        console.log('Kaydederken hata : ' + err)
    }
})

router.patch('/:id', async (req, res) => {
    try{
        const sonuc = await User.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators:true});
        if(sonuc){
            return res.json(sonuc);
        }else{
            return res.status(404).json({
                mesaj : 'Kullanıcı Bulunamadı'
            })
        }
    }catch(err){
        console.log("Güncellerken Hata: " + err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const result = await User.findByIdAndDelete({ _id: req.params.id });
        if (result) {
            return res.json({
                mesaj: "Kullanıcı silindi"
            })
        } else {
            const errorObject = new Error('User is not found!')
            errorObject.errorCode = 404;
            throw errorObject;
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router;