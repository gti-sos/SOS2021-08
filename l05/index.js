var express = require("express");

var path = require("path");

var app = express();

var port = (process.env.PORT || 10000);

//app.use("/", express.static("./public")); //Valido en linux
//app.use("/", express.static( __dirname + "\public")); //Recomendado para windows
app.use("/", express.static(path.join(__dirname,"public"))); //Recomendado para todos los sistemas (usar este)
app.get("/info/owid-covid-data", (req, res) =>{
res.send("<html><header> <style> table, th, td { border: 1px solid black; } </style></header> <body> <h2>Fuente de datos:</h2> <p>https://data.world/vale123/covid-19-complete-dataset/workspace/file?filename=owid-covid-data.csv</p> <h2>Descripción</h2> <p>Our complete COVID-19 dataset is a collection of the COVID-19 data maintained by Our World in Data. It is updated daily and includes data on confirmed cases, deaths, hospitalizations, testing, and vaccinations as well as other variables of potential interest.</p> <h2>Tabla con datos de muestra:</h2><table> <thead> <tr> <th>iso-code</th> <th>continent</th> <th>location</th> <th>date</th> <th>total-cases</th> <th>new-cases</th> <th>total-deaths</th> <th>new-deaths</th> </tr> </thead> <tbody> <tr> <td>isr</td> <td>asia</td> <td>israel</td> <td>2021-02-24</td> <td>763756,0</td> <td>4184,0</td> <td>5660,0</td> <td>26,0</td> </tr> <tr> <td>col</td> <td>south america</td> <td>colombia</td> <td>2020-06-01</td> <td>30493,0</td> <td>1110,0</td> <td>969,0</td> <td>30,0</td> </tr> <tr> <td>arg</td> <td>south america</td> <td>argentina</td> <td>2021-03-02</td> <td>2118676,0</td> <td>6653,0</td> <td>52192,0</td> <td>115,0</td> </tr> <tr> <td>arm</td> <td>asia</td> <td>armenia</td> <td>2021-03-14</td> <td>178385,0</td> <td>486,0</td> <td>3255,0</td> <td>2,0</td> </tr> <tr> <td>esp</td> <td>europe</td> <td>spain</td> <td>2021-02-17</td> <td>3107172,0</td> <td>10829,0</td> <td>66316,0</td> <td>337,0</td> </tr> </tbody> </table> <h6>Por Antonio Silva Gordillo</h6></body> </html>")
});

app.get("/info/seguimiento-respuesta-gubernamental-coronavirus", (req, res) =>{
    res.send("<html> <body> <table><thead><tr><th>countryname</th><th>countrycode</th><th>date</th><th>c1-school-closing</th><th>c2-workplace-closing</th><th>c3-cancel-public-events</th><th>c4-restricitions-on-gatherings</th><th></th></tr></thead><tbody><tr><td>Aruba</td><td>ABW</td><td>2020-01-01</td><td>0,00</td><td>0,00</td><td>0,00</td><td>0,00</td><td></td></tr><tr><td>Afghanistan</td><td>AFG</td><td>2020-01-29</td><td>1,00</td><td>1,00</td><td>0,00</td><td>0,00</td><td></td></tr><tr><td>Angola</td><td>AGO</td><td>2020-02-01</td><td>3,00</td><td>2,00</td><td>0,00</td><td>1,00</td><td></td></tr><tr><td>Albania</td><td>ALB</td><td>2020-01-03</td><td>0,00</td><td>0,00</td><td>0,00</td><td>2,00</td><td></td></tr><tr><td>Andorra</td><td>AND</td><td>2020-05-25</td><td>0,00</td><td>1,00</td><td>3,00</td><td>5,00</td><td></td></tr><tr><td>United Arab Emirates</td><td>ARE</td><td>2020-05-09</td><td>0,00</td><td>0,00</td><td>0,00</td><td>1,00</td><td></td></tr></tbody></table> <h6>Por Juan Vega Seco</h6> </body> </html>")
    });

app.get("/hello", (req, res) =>{
res.send("<html><body><h1>Hello from this tiny server</h1></body></html>")
});

app.listen(port);

console.log('Server listening on port: '+port);

app.post("/hello", (req,res) => {
    res.send("<html><body><h1>Hello from this tiny server with post </h1> </body> </html>");
    }); //Esto no se puede ver en en el navegador, pero se puede ver en en el postman
