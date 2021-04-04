var express = require("express");

var path = require("path");

var app = express();
 
var port = process.env.PORT || 10000 ;

//app.use("/", express.static("./public")); //Valido en linux
//app.use("/", express.static( __dirname + "\public")); //Recomendado para windows
app.use("/", express.static(path.join(__dirname,"public"))); //Recomendado para todos los sistemas (usar este)

app.get("/info/owid-covid-data", (req, res) =>{
res.send("<html><header> <style> table, th, td { border: 1px solid black; } </style></header> <body> <h2>Fuente de datos:</h2> <p>https://data.world/vale123/covid-19-complete-dataset/workspace/file?filename=owid-covid-data.csv</p> <h2>Descripción</h2> <p>Our complete COVID-19 dataset is a collection of the COVID-19 data maintained by Our World in Data. It is updated daily and includes data on confirmed cases, deaths, hospitalizations, testing, and vaccinations as well as other variables of potential interest.</p> <h2>Tabla con datos de muestra:</h2><table> <thead> <tr> <th>iso-code</th> <th>continent</th> <th>location</th> <th>date</th> <th>total-cases</th> <th>new-cases</th> <th>total-deaths</th> <th>new-deaths</th> </tr> </thead> <tbody> <tr> <td>isr</td> <td>asia</td> <td>israel</td> <td>2021-02-24</td> <td>763756,0</td> <td>4184,0</td> <td>5660,0</td> <td>26,0</td> </tr> <tr> <td>col</td> <td>south america</td> <td>colombia</td> <td>2020-06-01</td> <td>30493,0</td> <td>1110,0</td> <td>969,0</td> <td>30,0</td> </tr> <tr> <td>arg</td> <td>south america</td> <td>argentina</td> <td>2021-03-02</td> <td>2118676,0</td> <td>6653,0</td> <td>52192,0</td> <td>115,0</td> </tr> <tr> <td>arm</td> <td>asia</td> <td>armenia</td> <td>2021-03-14</td> <td>178385,0</td> <td>486,0</td> <td>3255,0</td> <td>2,0</td> </tr> <tr> <td>esp</td> <td>europe</td> <td>spain</td> <td>2021-02-17</td> <td>3107172,0</td> <td>10829,0</td> <td>66316,0</td> <td>337,0</td> </tr> </tbody> </table> <h6>Por Antonio Silva Gordillo</h6></body> </html>")
});

app.get("/info/statewiseTestingDetails", (req, res) =>{
res.send("<table><thead><tr><th>date</th><th>state</th><th>totalsamples</th><th>negative</th><th>positive</th></tr></thead><tbody><tr><td>2020-04-17</td><td>Andaman and Nicobar Islands</td><td>1403</td><td>1,210</td><td>12</td></tr><tr><td>2020-04-02</td><td>Andhra Pradesh</td><td>1800</td><td>1,175</td><td>132</td></tr><tr><td>2020-04-09</td><td>Arunachal Pradesh</td><td>206</td><td>185</td><td>1</td></tr><tr><td>2020-04-02</td><td>Assam</td><td>962</td><td>819</td><td>16</td></tr><tr><td>2020-04-05</td><td>Bihar</td><td>3037</td><td>2299</td><td>32</td></tr></tbody></table> <h6>Por Juan Vega Seco</h6> </body> </html>")
});
app.get("/info/us_counties_covid19_daily", (req, res) =>{
    res.send("<table><thead><tr><th>date</th><th>county</th><th>state</th><th>fips</th><th>cases</th><th>deaths</th></tr></thead><tbody><tr><td>2020-01-21</td><td>Snohomish</td><td>Washington</td><td>53061</td><td>1</td><td>0</td></tr><tr><td>2020-01-22</td><td>Snohomish</td><td>Washington</td><td>53061</td><td>1</td><td>0</td></tr><tr><td>2020-01-23</td><td>Snohomish</td><td>Washington</td><td>53061</td><td>1</td><td>0</td></tr><tr><td>2020-01-24</td><td>Cook</td><td>Illinois</td><td>17031</td><td>1</td><td>0</td></tr><tr><td>2020-01-25</td><td>Snohomish</td><td>Washington</td><td>53061</td><td>1</td><td>0</td></tr></tbody></table>")
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

