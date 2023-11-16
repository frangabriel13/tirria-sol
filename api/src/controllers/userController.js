const { User, Reserva, Cancha } = require("../db");
const bcryptjs = require("bcryptjs");

const comparePassword = async (password, userPassword) => {
  return await bcryptjs.compare(password, userPassword);
};


module.exports = {
  comparePassword,
};