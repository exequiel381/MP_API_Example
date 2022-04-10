// Credenciales : https://www.mercadopago.com.ar/developers/panel/credentials

const express = require("express");
const app = express();
const mercadopago = require("mercadopago");
const bodyParser = require("body-parser");

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("server running");
});

mercadopago.configure({
  access_token:
    "APP_USR-4186361912400271-072900-a4e561316429771f117f3d0b5b355e16-160737866",
});

app.get("/", (req, res) => {
  res.send("<h1>Bienvenido a la API Mercado Pago</h1>");
});

const itemsTest = [
  // items de prueba
  {
    id: 1,
    title: "nome",
    unit_price: 2,
    quantity: 1,
  },
  { id: 2, title: "nome", unit_price: 2, quantity: 1 },
];

app.post("/checkout", (req, res) => {
  let preference = {
    //items: req.body.itemsBody,
    items: req.body.itemsBody.map((item) => {
      return {
        id: item.id,
        title: item.title,
        unit_price: parseInt(item.unit_price),
        quantity: item.quantity,
      };
    }),
    // {
    //   // Prueba con boton
    //   id: "34",
    //   title: "nada", //req.body.title,
    //   unit_price: parseInt("1"), //parseInt(req.body.unit_price),
    //   quantity: 1,
    // },
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      //res.redirect(response.body.init_point);
      res.send(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
});
