const { Router } = require('express');
const { Image } = require('../db');
const upload = require('../utils/multer');
const cloudinary = require('../utils/cloudinary');

const router = Router();

router.get('/', async (req, res) => {
  try{
    const images = await Image.findAll();
    res.status(200).json(images);
  } catch(error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { files } = req;
    const imagesUrl = files.map(file => file.path);
    const images = await Image.bulkCreate(imagesUrl.map(url => ({ url })));
    res.status(201).json(images);
  } catch(error) {
    console.log(error)
    res.status(500).json({ message: 'Error en el servidor', error });
  }
})

router.put('/:id', async (req, res) => {});

router.delete('/:id', async (req, res) => {});


module.exports = router;