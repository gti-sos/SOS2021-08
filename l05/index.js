var express = require("express");

var path = require("path");

var app = express();

var port = (process.env.PORT || 10000);

//app.use("/", express.static("./public")); //Valido en linux
//app.use("/", express.static( __dirname + "\public")); //Recomendado para windows
app.use("/", express.static(path.join(__dirname,"public"))); //Recomendado para todos los sistemas (usar este)
app.use("/", express.static(path.join(__dirname,"info")));
app.get("/hello", (req, res) =>{
res.send("<html><body><h1>Hello from this tiny server</h1></body></html>")
});

app.listen(port);

console.log('Server listening on port: '+port);

app.post("/hello", (req,res) => {
    res.send("<html><body><h1>Hello from this tiny server </h1> </body> </html>");
    }); //Esto no se puede ver en en el navegador, pero se puede ver en en el postman