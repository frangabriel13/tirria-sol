const { Router } = require("express");
const { User } = require('../db');
const bcryptjs = require("bcryptjs");

const router = Router();

router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch(error) {
    console.log(error)
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
});

router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if(!user) {
      return res.status(404).json({ message: 'User no encontrado' });
    }
    res.status(200).json(user);
  } catch(error) {
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
});

router.post("/users", async (req, res) => {
  let { name, email, isAdmin, password, phone } = req.body;
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    let createUser = await User.create({
      name,
      email,
      isAdmin,
      password: hashPassword,
      phone,
    });
    res.status(201).send(createUser);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear usuario" });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const { name, email, password, phone, image } = req.body;

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.image = image || user.image;

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      const hashPassword = await bcryptjs.hash(password, salt);
      user.password = hashPassword;
    }

    await user.save();
    res.json(user);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// router.put("/me", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findByPk(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: "Usuario no encontrado" });
//     }

//     const { name, lastName, email, password, phone, image } = req.body;

//     user.name = name || user.name;
//     user.lastName = lastName || user.lastName;
//     user.email = email || user.email;
//     user.phone = phone || user.phone;
//     user.image = image || user.image;

//     if (password) {
//       const salt = await bcryptjs.genSalt(10);
//       const hashPassword = await bcryptjs.hash(password, salt);
//       user.password = hashPassword;
//     }

//     await user.save();

//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error en el servidor" });
//   }
// });

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if(!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch(error) {
    console.log(error)
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
});


module.exports = router;