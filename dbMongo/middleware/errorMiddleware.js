
const errorCatcher = (err, req, res, next) => {
    
    console.log(err);

    if(err.code === 11000){
        return res.json({
            message: JSON.stringify(err.keyValue) + " must be unique",
            errorCode: 400
        })
    }

    if(err.code === 66){
        return res.json({
            message: "You tried to update an unchangeable field!"
        })
    }

    res.json({
        errorCode: err.statusCode || 400,
        message: err.message
    })
    
    
    // if(err.name === "CastError"){
    //     res.json({
    //         mesaj: "Please give a valid id."
    //     })
    // }else{
    //     res.status(err.errorCode).json({
    //         mesaj: err.message,
    //         errorCode: err.errorCode
    //     })
    // }
}

module.exports = errorCatcher;