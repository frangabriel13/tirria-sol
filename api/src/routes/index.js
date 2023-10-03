const { Router } = require('express');
const productRouter = require('./productRoute');
const categoryRouter = require('./categoryRoute');
const sizeRouter = require('./sizeRoute');
const colorRouter = require('./colorRoute');

const router = Router();

router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/sizes', sizeRouter);
router.use('/colors', colorRouter);


module.exports = router;