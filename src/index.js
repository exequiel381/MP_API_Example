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
app.get("/", (req, res) => {
  res.send("<h1>Bienvenido a la API Mercado Pago</h1>");
});

app.get("/success/:idItem", (req, res) => {
  res.send("" + req.params.idItem);
});

app.get("/faileture", (req, res) => {
  res.send("faileture");
});

app.get("/pending", (req, res) => {
  res.send("pending");
});

app.post("/checkout", (req, res) => {
  // PODEMOS HACER PARA UN SOLO ITEM, Y MANDAR SU ID AL SUCCESS , O RECIBIR UNA COLECCION PARA COBRAR , PERO NO SE COMO MANDAR LA LISTA DE ITEMS AL SUCCESS
  var idItem = "5";
  let preference = {
    //items: req.body.itemsBody,

    // items: req.body.itemsBody.map((item) => {
    //   return {
    //     id: item.id,
    //     title: item.title,
    //     unit_price: parseInt(item.unit_price),
    //     quantity: item.quantity,
    //   };
    // }),

    items: [
      {
        id: "34", //req.body.idItem,
        title: "nada", //req.body.title,
        unit_price: parseInt("1"), //parseInt(req.body.unit_price),
        quantity: 1, //req.body.quantity,
      },
    ],
    auto_return: "approved",
    back_urls: {
      success: "http://localhost:3000/success" + idItem, //req.body.back_url.success + req.body.idItem,
      failure: "http://localhost:3000/faileture",
      pending: "http://localhost:3000/pending",
    },
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.redirect(response.body.init_point);
      //res.send(response.body.init_point); // si usamos otro front , podemos pedir la url , para redireccionarlo.
    })
    .catch(function (error) {
      console.log(error);
    });
});
