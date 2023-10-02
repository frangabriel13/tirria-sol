const { Router } = require('express');
const { Product } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});


module.exports = router;