const { Router } = require('express');
const productRouter = require('./productRoute');

const router = Router();

router.use('/products', productRouter);


module.exports = router;