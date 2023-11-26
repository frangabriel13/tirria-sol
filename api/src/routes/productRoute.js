const { Router } = require('express');
const { Product, Variation, Category, Image, Color } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Variation,
          as: 'variations',
          attributes: ['id', 'stock', 'price', 'available', 'sizeId', 'colorId'],
        },
        {
          model: Category,
          as: 'categories',
          attributes: ['id', 'name'],
        },
        {
          model: Image,
          as: 'images',
          attributes: ['id', 'url'],
        }
      ],
    });

    res.status(200).json(products);
  } catch(error) {
    console.log(error)
      res.status(500).json({ message: 'Internal server error', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: [
        {
          model: Variation,
          as: 'variations',
          include: [
            {
              model: Image,
              as: 'images',
              attributes: ['id', 'url'],
            },
            {
              model: Color,
              as: 'color',
              attributes: ['id', 'name'],
            }
          ],
        },
        {
          model: Category,
          as: 'categories',
          attributes: ['id', 'name'],
        },
        {
          model: Image,
          as: 'images',
          attributes: ['id', 'url'],
        }
      ],
    });
    if(!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json(product);
  } catch(error) {
    console.log(error)
      res.status(500).json({ message: 'Internal server error', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, description, price, stock, available, isVariant, image, categories, variations, images } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      available,
      isVariant,
      image,
    });
    // await product.setCategories(categories);
    // await product.setImages(images);

    if(isVariant) {
      await Promise.all(variations.map(async (variation) => {
        const { sizeId, colorId, stock, price, images, available } = variation;
        const createdVariation = await Variation.create({
          sizeId,
          colorId,
          stock,
          price,
          available,
          productId: product.id,
        });

        if(images) {
          await Promise.all(images.map(async (image) => {
            await createdVariation.addImage(image.id);
          }));
        }
      }))
    }

    if(images) {
      await Promise.all(images.map(async (image) => {
        await product.addImage(image.id);
      }));
    }

    if(categories) {
      await Promise.all(categories.map(async (category) => {
        await product.addCategory(category.id);
      }));
    }

    res.status(201).json(product);
  } catch(error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error', error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, available, isVariant, image, categories, variations, images } = req.body;
    const product = await Product.findByPk(id);
    if(!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    await product.update({
      name,
      description,
      price,
      stock,
      available,
      isVariant,
      image,
    });

    if(images) {
      await product.setImages([]);
      await Promise.all(images.map(async (image) => {
        await product.addImage(image.id);
      }));
    }

    if(categories) {
      await product.setCategories([]);
      await Promise.all(categories.map(async (category) => {
        await product.addCategory(category.id);
      }));
    }

    if(isVariant) {
      await Promise.all(variations.map(async (variation) => {
        const { sizeId, colorId, stock, price, images, available } = variation;
        await Variation.create({
          sizeId,
          colorId,
          stock,
          price,
          available,
          productId: product.id,
        });
      }))
    }

    res.status(200).json(product);
  } catch(error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if(!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    await product.destroy();
    res.status(200).json({ message: 'Producto eliminado' });
  } catch(error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});


module.exports = router;