var express = require("express");

var path = require("path");

var app = express();
 
var port = process.env.PORT || 10000 ;

//app.use("/", express.static("./public")); //Valido en linux
//app.use("/", express.static( __dirname + "\public")); //Recomendado para windows
app.use("/", express.static(path.join(__dirname,"public"))); //Recomendado para todos los sistemas (usar este)

app.get("/info/covid19-tracking-germany-cases-and-deaths", (req, res) =>{
res.send("<html><header> <style> table, th, td { border: 1px solid black; } </style></header> <body> <h2>Fuente de datos:</h2> <p>covid19-tracking-germany-cases-and-deaths.csv</p> <h2>Descripción</h2> <p>COVID-19 cases and deaths which will be updated daily. The original data are being collected by Germany's Robert Koch Institute and can be download through the National Platform for Geographic Data. The earliest recorded cases are from 2020-01-24.</p> <h2>Tabla con datos de muestra:</h2><table> <thead> <tr> <th>state</th> <th>county</th> <th>age-group</th> <th>gender</th> <th>date</th> <th>case</th> <th>death</th> <th>recovered</th> </tr> </thead> <tbody> <tr> <td>Bayern</td> <td>SK Hof</td> <td>05-14</td> <td>F</td> <td>03/04/2021</td> <td>2</td> <td>0</td> <td>0</td> </tr> <tr> <td>Berlin</td> <td>SK Berlin Mitte</td> <td>35-59</td> <td>M</td> <td>03/04/2021</td> <td>16</td> <td>0</td> <td>0</td> </tr> <tr> <td>Nordrhein-Westfalen</td> <td>SK Solingen</td> <td>80-99</td> <td>F</td> <td>03/04/2021</td> <td>1</td> <td>0</td> <td>0</td> </tr> <tr> <td>Sachsen</td> <td>SK Dresden</td> <td>15-34</td> <td>M</td> <td>09/11/2020</td> <td>19</td> <td>0</td> <td>19</td> </tr> <tr> <td>Berlin</td> <td>SK Berlin Reinickendorf</td> <td>35-59</td> <td>M</td> <td>24/10/2020</td> <td>18</td> <td>0</td> <td>18</td> </tr> </tbody> </table> <h6>Por Antonio Silva Gordillo</h6></body> </html>")
});

app.get("/info/seguimiento-respuesta-gubernamental-coronavirus", (req, res) =>{
res.send("<html> <body> <table><thead><tr><th>countryname</th><th>countrycode</th><th>date</th><th>c1-school-closing</th><th>c2-workplace-closing</th><th>c3-cancel-public-events</th><th>c4-restricitions-on-gatherings</th><th></th></tr></thead><tbody><tr><td>Aruba</td><td>ABW</td><td>2020-01-01</td><td>0,00</td><td>0,00</td><td>0,00</td><td>0,00</td><td></td></tr><tr><td>Afghanistan</td><td>AFG</td><td>2020-01-29</td><td>1,00</td><td>1,00</td><td>0,00</td><td>0,00</td><td></td></tr><tr><td>Angola</td><td>AGO</td><td>2020-02-01</td><td>3,00</td><td>2,00</td><td>0,00</td><td>1,00</td><td></td></tr><tr><td>Albania</td><td>ALB</td><td>2020-01-03</td><td>0,00</td><td>0,00</td><td>0,00</td><td>2,00</td><td></td></tr><tr><td>Andorra</td><td>AND</td><td>2020-05-25</td><td>0,00</td><td>1,00</td><td>3,00</td><td>5,00</td><td></td></tr><tr><td>United Arab Emirates</td><td>ARE</td><td>2020-05-09</td><td>0,00</td><td>0,00</td><td>0,00</td><td>1,00</td><td></td></tr></tbody></table> <h6>Por Juan Vega Seco</h6> </body> </html>")
});
app.get("/info/county_level_confirmed_cases", (req, res) =>{
    res.send("<html> <body> <table><thead><tr><th>countryname</th><th>countrycode</th><th>date</th><th>c1-school-closing</th><th>c2-workplace-closing</th><th>c3-cancel-public-events</th><th>c4-restricitions-on-gatherings</th><th></th></tr></thead><tbody><tr><td>Aruba</td><td>ABW</td><td>2020-01-01</td><td>0,00</td><td>0,00</td><td>0,00</td><td>0,00</td><td></td></tr><tr><td>Afghanistan</td><td>AFG</td><td>2020-01-29</td><td>1,00</td><td>1,00</td><td>0,00</td><td>0,00</td><td></td></tr><tr><td>Angola</td><td>AGO</td><td>2020-02-01</td><td>3,00</td><td>2,00</td><td>0,00</td><td>1,00</td><td></td></tr><tr><td>Albania</td><td>ALB</td><td>2020-01-03</td><td>0,00</td><td>0,00</td><td>0,00</td><td>2,00</td><td></td></tr><tr><td>Andorra</td><td>AND</td><td>2020-05-25</td><td>0,00</td><td>1,00</td><td>3,00</td><td>5,00</td><td></td></tr><tr><td>United Arab Emirates</td><td>ARE</td><td>2020-05-09</td><td>0,00</td><td>0,00</td><td>0,00</td><td>1,00</td><td></td></tr></tbody></table> <h6>Por Antonio Carranza</h6> </body> </html>")
    });

app.get("/hello", (req, res) =>{
res.send("<html><body><h1>Hello from this tiny server</h1></body></html>")
});

app.listen(port, () =>{
    console.log(`server ready listening on port ${port} `);
}); //para arrancar el servidor

app.post("/hello", (req,res) => {
    res.send("<html><body><h1>POST Hello from this tiny server </h1> </body> </html>");
    }); //Esto no se puede ver en en el navegador, pero se puede ver en en el postman

