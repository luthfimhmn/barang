const path = require('path');
const { barang } = require('../models');
const imageValidator = require('../utils/imageValidator');

class barangController {
    static async getAll (req,res,next) {
        try {
            const limitValue = req.query.limit || 2;
            const skipValue = req.query.skip || 0;

            const goods = await barang.findAll({
                limit: limitValue,
                offset: skipValue,
                raw: true
            });
            
            res.status(200).json(goods)
        } catch (error) {
            next(error)
        }
    }

    static async create (req,res,next) {
        try {
            const { 
                nama,
                harga_beli,
                harga_jual,
                stok
            } = req.body;

            const imagePath = imageValidator(req.file);

            const barangBaru = await barang.create({
                foto: imagePath,
                nama,
                harga_beli: parseInt(harga_beli),
                harga_jual: parseInt(harga_jual),
                stok: parseInt(stok)
            }, {returning: true})
        
            res.status(201).json(
                {
                Message: 'Berhasil',
                barangBaru
                }
            )
        } catch (error) {
            next(error);
        }
    }

    static async update (req,res,next) {
         try {
            const id  = req.params.id;
            const satuBarang = await barang.findByPk(id);

            if(!satuBarang) throw ('Barang tidak tersedia');

            const imagePath = imageValidator(req.file);

            const updatedBarang = await barang.update({ 
                foto: imagePath,
                nama: req.body?.nama ,
                harga_beli: req.body?.harga_beli,
                harga_jual: req.body?.harga_jual
            }, {where: { id: satuBarang.id}})

            res.status(200).json(updatedBarang)
        } catch (error) {
            next(error)
        }
    }

    static async delete (req,res,next) {
         try {
            await barang.destroy({where: {id: req.params.id}})
            res.status(200).json({result: `Berhasil Delete ${req.params.id}`})
        } catch (error) {
            next(error)
        }
    }
}


module.exports = barangController;