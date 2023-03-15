const ProductController = require('../controllers/products');
const router = require('express').Router();
const upload = require('../utils/multer');

router.get('/products', ProductController.getAll);
router.post('/products', upload.single('photo'), ProductController.create);
router.put('/products/:id', upload.single('photo'), ProductController.update);
router.delete('/products/:id', ProductController.delete);


module.exports = router;