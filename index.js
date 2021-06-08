//Para desplegar la app
var express = require("express");
var request = require('request');
var app = express();

//Puerto por defecto 
var port = (process.env.PORT || 10000);
//Para modificar y definiar las rutas, modulo 'path'
var path = require("path");
var cors = require("cors");

app.use("/", express.static( path.join(__dirname ,"./public")));

app.use(express.json());

app.use(cors());

var juavegsecAPIAllowList ={"degrees": "https://sos2021-09.herokuapp.com/api/v2/cut-off-marks-by-degrees-us/cuts"};
app.use("/juavegsec/proxyRequest/:api", function(req,res){
        let NameApi = req.params.api;
        if(NameApi in juavegsecAPIAllowList){
            let url = juavegsecAPIAllowList[NameApi] + req.url;
           
            console.log(juavegsecAPIAllowList[NameApi]);
            console.log(req.url)
            console.log(url);
            req.pipe(request(url)).pipe(res);
        }
        else{
            res.sendStatus(400);
        }
    }); 

<<<<<<< HEAD
app.use("/antsilgorAPI/proxyRequestExt2/love-calculator/:sname/:fname", function(req, res) {
    var sname = req.params.sname;
    var fname = req.params.fname;
    var url2 = "https://love-calculator.p.rapidapi.com/getPercentage?rapidapi-key=" 
        + RAPIDAPI_KEY + "&sname="+sname+"&fname=" + fname;

    console.log(req.url);
    console.log("url" + url2);
    req.pipe(request(url2)).pipe(res);
});
=======


//PROXY ANTCARBAR 
var antcarbar1APIAllowList ={"tourism": "https://sos2021-03.herokuapp.com/api/v2/international-tourisms"};
app.use("/antcarbar1/proxyRequest/:api", function(req,res){
        let NameApi = req.params.api;
        if(NameApi in antcarbar1APIAllowList){
            let url =  antcarbar1APIAllowList[NameApi] + req.url;
           
            console.log( antcarbar1APIAllowList[NameApi]);
            console.log(req.url)
            console.log(url);
            req.pipe(request(url)).pipe(res);
        }
        else{
            res.sendStatus(400);
        }
    });
>>>>>>> 84e004195597e3d652b9c080a8e42d3d1325055a
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

	var antsilgorAPIIntegration = require("./src/back/antsilgorAPI/integration");
	antsilgorAPIIntegration.register(app,BASE_API_PATH);

	var antcarbar1API = require("./src/back/antcarbar1API");
	antcarbar1API.register(app,BASE_API_PATH);

	




















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


