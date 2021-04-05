
const errorCatcher = (err, req, res, next) => {
    if(err.name === "CastError"){
        res.json({
            mesaj: "Please give a valid id."
        })
    }else{
        res.status(err.errorCode).json({
            mesaj: err.message,
            errorCode: err.errorCode
        })
    }
}

module.exports = errorCatcher;