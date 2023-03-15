const path = require('path');

const imageValidator = (image) => {
    try {
        const extName = path.extname(image.filename)
        const pathNormal = path.normalize(image.path)
        const requiredExtName = [ '.png','.jpg','.jpeg']
    
        if(!requiredExtName.includes(extName.toLowerCase())) throw({name: 'errorValidation', message: 'File hanya boleh png jpg atau jpeg'})

        return pathNormal
    } catch (error) {
        throw(error)
    }
}

module.exports = imageValidator;