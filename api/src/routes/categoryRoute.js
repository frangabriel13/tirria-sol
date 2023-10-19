const { Router } = require('express');
const { Category } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Category,
          as: 'children',
        },
        {
          model: Category,
          as: 'parents',
        }
      ],
    });
    res.status(200).json(categories);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, parentIds } = req.body;
    const category = await Category.create({ name });
    if (parentIds && parentIds.length > 0) {
      await category.addParents(parentIds);
    }
    res.status(201).json(category);
  } catch(error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if(!category) return res.status(404).json({ message: 'Categoría no encontrada' });

    const { name, parentIds } = req.body;
    if(name) {
      await category.update({ name });
    }

    if(parentIds && parentIds.length > 0) {
      await category.setParents(parentIds);
    }

    res.status(200).json(category);
  } catch(error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if(!category) return res.status(404).json({ message: 'Categoría no encontrada' });
    await category.destroy();
    res.status(200).json({ message: 'Categoría eliminada' });
  } catch(error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});


module.exports = router;