const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index.js');
const passport = require("passport");
const session = require("express-session");

require('./db.js');
require("./utils/localAuth.js");
require("./middlewares/authMiddleware.js")

const app = express();

app.name = 'API';

const corsOptions = {
  origin: 'http://tirriasolflores.com/',
  credentials: true
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(
  session({
    secret: "unasecretaclave",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Utilizar sólo en producción true
      maxAge: 24 * 60 * 60 * 1000, // Tiempo de vida de la cookie en milisegundos (24 horas en este caso)
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

// Error catching endware.
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


module.exports = app;