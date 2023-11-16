const { Router } = require('express');
const productRouter = require('./productRoute');
const categoryRouter = require('./categoryRoute');
const sizeRouter = require('./sizeRoute');
const colorRouter = require('./colorRoute');
const imageRouter = require('./imageRoute');
const variationRouter = require('./variationRoute');
const userRoute = require('./userRoute');
const authRoute = require('./authRoute');

const router = Router();

router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/sizes', sizeRouter);
router.use('/colors', colorRouter);
router.use('/images', imageRouter);
router.use('/variations', variationRouter);
router.use('/', userRoute);
router.use('/', authRoute);


module.exports = router;