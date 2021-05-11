//Para desplegar la app
var express = require("express");
var app = express();
//Puerto por defecto 
var port = (process.env.PORT || 10000);
//Para modificar y definiar las rutas, modulo 'path'
var path = require("path");


app.use("/", express.static( path.join(__dirname ,"./public")));

app.use(express.json());

//Ruta base de acceso a los recursos, bajo la versión 'v1'
var BASE_API_PATH = "/api/v1";


app.get('/index', (request, response) => {
    response.send(express());
    console.log('New request to /index has arrived, succesfuly');
});

//Mensaje por consola que mostrará el servidor cuando se inicie
app.listen(port, () => {
	console.log("Server ready listening in port " + port)
})




//Acceso a recursos ( MILESTONE F04)


	var juavegsecAPI = require("./src/back/juavegsecAPI");
	juavegsecAPI.register(app,BASE_API_PATH);

	var antsilgorAPI = require("./src/back/antsilgorAPI");
	antsilgorAPI.register(app,BASE_API_PATH);

	




















/*
var cool = require("cool-ascii-faces");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
var port = (process.env.PORT || 10000);
var BASE_API_PATH = "/api/v1";



app.get("/cool", (request,response) => {//request son los datos que me mandan a mi y response es para devolver datos al cliente
	response.send(cool());
	console.log("New request to /cool has arrived");
});

app.use("/", express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
//=========================================== ANTSILGOR =========================================================

var antsilgorAPI = require("./src/back/antsilgorAPI");
antsilgorAPI.register(app,BASE_API_PATH);


//=========================================== JUAVECSEG =========================================================
var juavegsecAPI =  require("./src/back/juavegsecAPI");
juavegsecAPI.register(app);
//=========================================== ANTBARCAR =========================================================
var antcarbar1API =  require("./src/back/antcarbar1API");
antcarbar1API.register(app);

// =======================================Codigo de grupo==========================
app.listen(port, () => {//la segunda parte del listen se ejecuta cuando el servidor esta listo
	console.log("Server ready. Listening on port " + port);
});

*/


