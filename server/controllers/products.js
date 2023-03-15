const path = require('path');
const { product } = require('../models');
const imageValidator = require('../utils/imageValidator');

class ProductController {
    static async getAll (req,res,next) {
        try {
            const limitValue = req.query.limit || 2;
            const skipValue = req.query.skip || 0;

            const dataProducts = await product.findAll({
                limit: limitValue,
                offset: skipValue,
                raw: true
            });
            
            res.status(200).json(dataProducts)
        } catch (error) {
            next(error)
        }
    }

    static async create (req,res,next) {
        try {
            const { 
                name,
                purchase_price,
                selling_price,
                stock
            } = req.body;

            const imagePath = imageValidator(req.file);

            const newProduct = await product.create({
                name,
                purchase_price: parseInt(purchase_price),
                selling_price: parseInt(selling_price),
                stock: parseInt(stock),
                photo: imagePath
            }, {returning: true})
        
            res.status(201).json(
                {
                Message: 'Berhasil',
                newProduct
                }
            )
        } catch (error) {
            next(error);
        }
    }

    static async update (req,res,next) {
         try {
            const id  = req.params.id;
            const foundProduct = await product.findByPk(id);

            if(!foundProduct) throw ('Product tidak tersedia');

            const imagePath = imageValidator(req.file);

            const updatedProduct = await product.update({ 
                name: req.body?.nama ,
                purhcase_price: req.body?.harga_beli,
                selling_price: req.body?.harga_jual,
                stock: req.body?.stock,
                photo: imagePath
            }, {where: { id: foundProduct.id}})

            res.status(200).json(updatedProduct)
        } catch (error) {
            next(error)
        }
    }

    static async delete (req,res,next) {
         try {
            await product.destroy({where: {id: req.params.id}})
            res.status(200).json({result: `Success Delete Product with id:${req.params.id}`})
        } catch (error) {
            next(error)
        }
    }
}


module.exports = ProductController;