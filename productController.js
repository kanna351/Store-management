const Product = require('../models/product');

// exports.createProduct = async (req, res) => {
//   try {
//     const productId = await Product.createProduct(req.body);
//     res.json({ success: true, productId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// };

// exports.createProduct = async (req, res) => {
//   try {
//     // Convert string fields to numbers
//     req.body.price = parseFloat(req.body.price);
//     req.body.distributed_price = parseFloat(req.body.distributed_price);
//     req.body.available_quantity = parseInt(req.body.available_quantity);

//     console.log('Request Body:', req.body); // Add this line to log the request body

//     const productId = await Product.createProduct(req.body);
//     res.json({ success: true, productId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// };

exports.createProduct = async (req, res) => {
  try {
      const {
          title,
          subtitle,
          properties,
          ingredients,
          note,
          howtouse,
          price,
          distributed_price,
          active_status,
          available_quantity
      } = req.body;

      const imagePath = req.file.path; // Access the file path from multer

      const product = {
          title,
          subtitle,
          properties,
          ingredients,
          note,
          howtouse,
          price,
          distributed_price,
          active_status,
          available_quantity,
          image: imagePath
      };

      const productId = await Product.createProduct(product);
      res.json({ success: true, productId });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};




exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.getProductById(req.params.productId);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

exports.updateProductById = async (req, res) => {
  try {
    await Product.updateProductById(req.params.productId, req.body);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    await Product.deleteProductById(req.params.productId);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};