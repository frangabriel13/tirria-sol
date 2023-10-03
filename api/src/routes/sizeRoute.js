const { Router } = require('express');
const { Size } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
  try{
    const sizes = await Size.findAll();
    res.status(200).json(sizes);
  } catch(error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

router.post('/', async (req, res) => {
  try{
    const { name } = req.body;
    const size = await Size.create({ name });
    res.status(201).json(size);
  } catch(error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

router.put('/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const size = await Size.findByPk(id);
    if(!size) return res.status(404).json({ message: 'Talle no encontrado' });
    const { name } = req.body;
    await size.update({ name });
    res.status(200).json(size);
  } catch(error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const size = await Size.findByPk(id);
    if(!size) return res.status(404).json({ message: 'Talle no encontrado' });
    await size.destroy();
    res.status(200).json({ message: 'Talle eliminado' });
  } catch(error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});


module.exports = router;