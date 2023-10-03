const { Router } = require('express');
const { Color } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
  try{
    const colors = await Color.findAll();
    res.status(200).json(colors);
  } catch(error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

router.post('/', async (req, res) => {
  try{
    const { name, hex } = req.body;
    const color = await Color.create({ name, hex });
    res.status(201).json(color);
  } catch(error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

router.put('/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const color = await Color.findByPk(id);
    if(!color) return res.status(404).json({ message: 'Color no encontrado' });
    const { name, hex } = req.body;
    await color.update({ name, hex });
    res.status(200).json(color);
  } catch(error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const color = await Color.findByPk(id);
    if(!color) return res.status(404).json({ message: 'Color no encontrado' });
    await color.destroy();
    res.status(200).json({ message: 'Color eliminado' });
  } catch(error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});


module.exports = router;