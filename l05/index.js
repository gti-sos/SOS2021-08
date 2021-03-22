var express = require("express");
var path = require("path");

var app = express();
 
var port = 10000;

app.use("/", express.static(path.join( __dirname + "/public"))); //busca en public y ejecuta, el metodo path.join unifica el formato de la url entre sistemas operativos

app.get("/hello", (req,res) => {
res.send("<html><body><h1> GET Hello from this tiny server </h1> </body> </html>");
}); //configuramos la ruta y la respuesta a esa ruta 


app.listen(port, () =>{
    console.log(`server ready listening on port ${port} `);
}); //para arrancar el servidor

app.post("/hello", (req,res) => {
    res.send("<html><body><h1>POST Hello from this tiny server </h1> </body> </html>");
    }); //Esto no se puede ver en en el navegador, pero se puede ver en en el postman