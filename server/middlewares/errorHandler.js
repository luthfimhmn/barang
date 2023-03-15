const errorHandler = (err,req,res,next) => {
    let errors = [];
    if(err.name === 'SequelizeUniqueConstraintError') {
        err.errors.forEach(element => {
            errors.push(element.message)
        });
    } else if (err.name === 'errorValidation'){ 
        errors.push(err.message)
        console.log(`Error: ${err}`)
    } else { 
        console.log(err)
    }
    res.status(500).json(errors)
}


module.exports= errorHandler;
