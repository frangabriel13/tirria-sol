require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/tirria`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => modelDefiners.push(require(path.join(__dirname, "/models", file))));

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product, Variation, Size, Color, Image, Category, User } = sequelize.models;

// Aca vendrian las relaciones
Product.hasMany(Variation, { as: "variations", onDelete: "cascade", onUpdate: "cascade" });
Variation.belongsTo(Product, { as: "product", onDelete: "cascade", onUpdate: "cascade", foreignKey: "productId" });

Product.belongsToMany(Category, { through: "product_category", as: "categories", foreignKey: "productId", onDelete: "cascade", onUpdate: "cascade" });
Category.belongsToMany(Product, { through: "product_category", as: "products", foreignKey: "categoryId", onDelete: "cascade", onUpdate: "cascade" });

Variation.belongsTo(Size, { as: "size", onDelete: "cascade", onUpdate: "cascade", foreignKey: "sizeId" });
Size.hasMany(Variation, { as: "variations", onDelete: "cascade", onUpdate: "cascade" });

Variation.belongsTo(Color, { as: "color", onDelete: "cascade", onUpdate: "cascade", foreignKey: "colorId" });
Color.hasMany(Variation, { as: "variations", onDelete: "cascade", onUpdate: "cascade" });

Product.belongsToMany(Image, { through: "product_image", as: "images", foreignKey: "productId", onDelete: "cascade", onUpdate: "cascade" });
Image.belongsToMany(Product, { through: "product_image", as: "products", foreignKey: "imageId", onDelete: "cascade", onUpdate: "cascade" });

Variation.belongsToMany(Image, { through: "variation_image", as: "images", foreignKey: "variationId", onDelete: "cascade", onUpdate: "cascade" });
Image.belongsToMany(Variation, { through: "variation_image", as: "variations", foreignKey: "imageId", onDelete: "cascade", onUpdate: "cascade" });

Category.belongsToMany(
  Category,
  { through: "category_parent", as: "children", foreignKey: "parentId", onDelete: "cascade", onUpdate: "cascade" }
);
Category.belongsToMany(
  Category,
  { through: "category_parent", as: "parents", foreignKey: "categoryId", onDelete: "cascade", onUpdate: "cascade" }
);


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};