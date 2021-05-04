var cool = require("cool-ascii-faces");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
var port = (process.env.PORT || 10000);
var BASE_API_PATH = "/api/v1/";


/*
app.get("/cool", (request,response) => {//request son los datos que me mandan a mi y response es para devolver datos al cliente
	response.send(cool());
	console.log("New request to /cool has arrived");
});
*/
app.use("/", express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
//=========================================== ANTSILGOR =========================================================

var antsilgorAPI =  require("./src/back/antsilgorAPI");
antsilgorAPI.register(app);


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




