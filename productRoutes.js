// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');

// router.post('/', productController.createProduct);
// router.get('/', productController.getAllProducts);
// router.get('/:productId', productController.getProductById);
// router.patch('/:productId', productController.updateProductById);
// router.delete('/:productId', productController.deleteProductById);

// module.exports = router;


const express = require('express');
const multer  = require('multer')
const router = express.Router();
const productController = require('../controllers/productController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  const upload = multer({ storage: storage })

router.post('/',upload.single('image'), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductById);
router.patch('/:productId', productController.updateProductById);
router.delete('/:productId', productController.deleteProductById);

module.exports = router;