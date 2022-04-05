const express = require('express');
const app = express();

          
// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: "PROD_ACCESS_TOKEN",
});

app.get('/checkout', (req,res) =>{
    res.send('<h1>Hola desde checkout</h1>')
})

//server

app.listen(3000, () => {
    console.log("server running");
});