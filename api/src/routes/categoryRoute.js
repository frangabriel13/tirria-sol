const { Router } = require('express');
const { Category } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch(error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, parentId } = req.body;
    const category = await Category.create({ name, parentId });
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
    const { name, parentId } = req.body;
    await category.update({ name, parentId });
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