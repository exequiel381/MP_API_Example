// Credenciales : https://www.mercadopago.com.ar/developers/panel/credentials

const express = require("express");
const app = express();
const mercadopago = require("mercadopago");
const bodyParser = require("body-parser");

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(3000, () => {
  console.log("server running");
});

mercadopago.configure({
  access_token:
    "APP_USR-4186361912400271-072900-a4e561316429771f117f3d0b5b355e16-160737866",
});

app.post("/checkout", (req, res) => {
  let preference = {
    items: [
      {
        id: "34",
        title: req.body.title,
        unit_price: parseInt(req.body.unit_price),
        quantity: 1,
      },
    ],
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.redirect(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
});
