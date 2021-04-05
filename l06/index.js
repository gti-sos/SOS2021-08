var express = require("express");
var bodyParser = require("body-parser");
var port = process.env.port || 1607;  // port va a valer lo que valga la variable de entorno y sino lo pone en el puero 1607
var BASE_API_PATH = "/api/v1/statewiseTestingDetails"; //tipo de recurso
var app = express(); //generamos aplicacion que va a hacer uso de express

app.use("/", express.static("./public"));
app.use(bodyParser.json()); //todos los json que lleguen en la peticion los transformara en objects

var statewiseTestingDetails = [
    {
        "name": "pablo",
        "phone": 2000
    },
    {
        "name": "pepe",
        "phone": 6890
    },

];


app.get(BASE_API_PATH+ "/loadInitialData", (req,res)=>{ //cuando aquí llamen a /api/v1/contacts voy a devolver el json
    res.send(JSON.stringify(statewiseTestingDetails,null,2)); //hay que pasar el objeto a json con stringfy pasandole el array creado, con 2 le das formato bonito
}) //5

app.get(BASE_API_PATH+ "/stats", (req,res)=>{ //cuando aquí llamen a /api/v1/contacts voy a devolver el json
    res.send(JSON.stringify(statewiseTestingDetails,null,2)); //hay que pasar el objeto a json con stringfy pasandole el array creado, con 2 le das formato bonito
}) //6.1

app.get(BASE_API_PATH+ "/stats/pablo", (req,res)=>{ //cuando aquí llamen a /api/v1/contacts voy a devolver el json
    res.send(JSON.stringify(statewiseTestingDetails[0],null,2)); //hay que pasar el objeto a json con stringfy pasandole el array creado, con 2 le das formato bonito
}) //6.2

app.post(BASE_API_PATH+ "/stats", (req,res)=>{  //en este caso creamos el contacto
    var newContact = [{"name": "Juan", "phone": 722 } ];  
    console.log(`new contact added: <${JSON.stringify(newContact,null,2)}>`);

    statewiseTestingDetails.push(newContact);

    res.sendStatus(201);

})//6.2

app.listen(port, () => { console.log(`Server ready at ${port}`); 

});