
const errorCatcher = (err, req, res, next) => {
    
    console.log(err);

    if(err.code === 11000){
        return res.json({
            message: 'The ' + Object.values(err.keyValue) + ' value you entered for ' + Object.keys(err.keyValue) + ' cannot be updated or added because it is already in the database. It must be unique.',
            errorCode: 400
        })
    }

    if(err.code === 66){
        return res.json({
            message: "You tried to update an unchangeable field!"
        })
    }

    res.status(err.statusCode || 500)
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