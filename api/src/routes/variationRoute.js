const { Router } = require('express');
const { Variation, Size, Color, Image, Product } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const variations = await Variation.findAll({
      include: [
        {
          model: Size,
          as: 'size',
          attributes: ['id', 'name'],
        },
        {
          model: Color,
          as: 'color',
          attributes: ['id', 'name'],
        },
        {
          model: Image,
          as: 'images',
          attributes: ['id', 'url'],
        },
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'name'],
        },
      ],
    });
    res.status(200).json(variations);
  } catch(error) {
      res.status(500).json({ message: 'Internal server error', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const variation = await Variation.findByPk(id, {
      include: [
        {
          model: Size,
          as: 'size',
          attributes: ['id', 'name'],
        },
        {
          model: Color,
          as: 'color',
          attributes: ['id', 'name'],
        },
        {
          model: Image,
          as: 'images',
          attributes: ['id', 'url'],
        },
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'name'],
        },
      ],
    });
    if(!variation) {
      return res.status(404).json({ message: 'Variación no encontrada' });
    }
    res.status(200).json(variation);
  } catch(error) {
      res.status(500).json({ message: 'Internal server error', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const { sizeId, colorId, stock, price, images, available, productId } = req.body;
    const variation = await Variation.create({
      sizeId,
      colorId,
      stock,
      price,
      available,
      productId,
    });
    await variation.setImages(images);
    res.status(201).json(variation);
  } catch(error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { sizeId, colorId, stock, price, images, available, productId } = req.body;
    const variation = await Variation.findByPk(id);
    if(!variation) {
      return res.status(404).json({ message: 'Variación no encontrada' });
    }
    await variation.update({
      sizeId,
      colorId,
      stock,
      price,
      available,
      productId,
    });
    await variation.setImages(images);
    res.status(200).json(variation);
  } catch(error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const variation = await Variation.findByPk(id);
    if(!variation) {
      return res.status(404).json({ message: 'Variación no encontrada' });
    }
    await variation.destroy();
    res.status(200).json({ message: 'Variación eliminada' });
  } catch(error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});


module.exports = router;