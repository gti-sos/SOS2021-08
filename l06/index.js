var express = require("express");
var bodyParser = require("body-parser");
var port = process.env.port || 1607;  // port va a valer lo que valga la variable de entorno y sino lo pone en el puero 1607
var BASE_API_PATH = "/api/v1"; //tipo de recurso
var app = express(); //generamos aplicacion que va a hacer uso de express

app.use("/", express.static("./public"));
app.use(bodyParser.json()); //todos los json que lleguen en la peticion los transformara en objects

var us_counties_covid19_daily = [
    {
        "date": 2021-08-02,
        "county": "Snohomish",
        "state": "Washington",
        "fips": 53061.0,
        "cases": 1,
        "deaths":0.0
        },
    {
        "date": 2021-08-24,
        "county": "Coock",
        "state": "Illinois",
        "fips": 17031.0,
        "cases": 1,
        "deaths":0.0
    }

];


app.get(BASE_API_PATH+ "/us_counties_covid19_daily/loadInitialData", (req,res)=>{ //cuando aquí llamen a /api/v1/contacts voy a devolver el json
    res.send(JSON.stringify(us_counties_covid19_daily,null,2)); //hay que pasar el objeto a json con stringfy pasandole el array creado, con 2 le das formato bonito
}) //5

app.get(BASE_API_PATH+ "/stats", (req,res)=>{ //cuando aquí llamen a /api/v1/contacts voy a devolver el json
    res.send(JSON.stringify(us_counties_covid19_daily,null,2)); //hay que pasar el objeto a json con stringfy pasandole el array creado, con 2 le das formato bonito
}) //6.1

app.get(BASE_API_PATH+ "/stats/pablo", (req,res)=>{ //cuando aquí llamen a /api/v1/contacts voy a devolver el json
    res.send(JSON.stringify(us_counties_covid19_daily,null,2)); //hay que pasar el objeto a json con stringfy pasandole el array creado, con 2 le das formato bonito
}) //6.2

app.post(BASE_API_PATH+ "/stats", (req,res)=>{  //en este caso creamos el contacto
    var newContact = req.body;  
    console.log(`new contact added: <${JSON.stringify(newContact,null,2)}>`);

    us_counties_covid19_daily.push(newContact);

    res.sendStatus(201);

})//6.2

app.listen(port, () => { console.log(`Server ready at ${port}`); 

});