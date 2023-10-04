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

// router.put('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { url } = req.body;
//     const image = await Image.findByPk(id);
//     if(!image) return res.status(404).json({ message: 'Imagen no encontrada' });
//     await cloudinary.uploader.destroy(image.url);
//     await cloudinary.uploader.upload(url, { folder: 'tirria' });
//     await image.update({ url });
//     res.status(200).json(image);
//   } catch(error) {
//     res.status(500).json({ message: 'Error en el servidor', error });
//   }
// });

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findByPk(id);
    if(!image) return res.status(404).json({ message: 'Imagen no encontrada' });
    
    const publicId = `tirria/${image.url.split('/').slice(-1)[0].split('.')[0]}`;
    console.log(publicId)
    await cloudinary.uploader.destroy(publicId);
    await image.destroy();
    res.status(200).json({ message: 'Imagen eliminada' });
  } catch(error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});


module.exports = router;