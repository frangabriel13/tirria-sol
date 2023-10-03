const { Router } = require('express');
const productRouter = require('./productRoute');
const categoryRouter = require('./categoryRoute');

const router = Router();

router.use('/products', productRouter);
router.use('/categories', categoryRouter);


module.exports = router;