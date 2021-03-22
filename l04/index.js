var cool = require('cool-ascii-faces');
var express = require(
    "express");
var app = express();

var port = 10000;

app.get('/cool', (request, response) => {
    response.send(cool());
    console.log("New request to /cool has arrived");

});

app.listen(port, () =>{
    console.log("server ready listening on port "+port);
});

//line

//prueba edicion del mago