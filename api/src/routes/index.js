const { Router } = require('express');
const productRouter = require('./productRoute');
const categoryRouter = require('./categoryRoute');
const sizeRouter = require('./sizeRoute');

const router = Router();

router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/sizes', sizeRouter);


module.exports = router;