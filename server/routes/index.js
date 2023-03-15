const barangController = require('../controllers/barang');
const router = require('express').Router();
const upload = require('../utils/multer');

router.get('/products', barangController.getAll);
router.post('/products', upload.single('foto'), barangController.create);
router.put('/products/:id', upload.single('foto'), barangController.update);
router.delete('/products/:id', barangController.delete);


module.exports = router;