const barangController = require('../controllers/barang');
const router = require('express').Router();
const upload = require('../utils/multer');

router.get('/goods', barangController.getAll);
router.post('/goods', upload.single('foto'), barangController.create);
router.put('/goods/:id', upload.single('foto'), barangController.update);
router.delete('/goods/:id', barangController.delete);


module.exports = router;