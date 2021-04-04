var express = require("express");

var path = require("path");

var app = express();
 
var port = process.env.PORT || 10000 ;

//app.use("/", express.static("./public")); //Valido en linux
//app.use("/", express.static( __dirname + "\public")); //Recomendado para windows
app.use("/", express.static(path.join(__dirname,"public"))); //Recomendado para todos los sistemas (usar este)

app.get("/info/owid-covid-data", (req, res) =>{
res.send("<html><header> <style> table, th, td { border: 1px solid black; } </style></header> <body> <h2>Fuente de datos:</h2> <p>covid19-tracking-germany-cases-and-deaths.csv</p> <h2>Descripción</h2> <p>COVID-19 cases and deaths which will be updated daily. The original data are being collected by Germany's Robert Koch Institute and can be download through the National Platform for Geographic Data. The earliest recorded cases are from 2020-01-24.</p> <h2>Tabla con datos de muestra:</h2><table> <thead> <tr> <th>state</th> <th>county</th> <th>age-group</th> <th>gender</th> <th>date</th> <th>case</th> <th>death</th> <th>recovered</th> </tr> </thead> <tbody> <tr> <td>Bayern</td> <td>SK Hof</td> <td>05-14</td> <td>F</td> <td>03/04/2021</td> <td>2</td> <td>0</td> <td>0</td> </tr> <tr> <td>Berlin</td> <td>SK Berlin Mitte</td> <td>35-59</td> <td>M</td> <td>03/04/2021</td> <td>16</td> <td>0</td> <td>0</td> </tr> <tr> <td>Nordrhein-Westfalen</td> <td>SK Solingen</td> <td>80-99</td> <td>F</td> <td>03/04/2021</td> <td>1</td> <td>0</td> <td>0</td> </tr> <tr> <td>Sachsen</td> <td>SK Dresden</td> <td>15-34</td> <td>M</td> <td>09/11/2020</td> <td>19</td> <td>0</td> <td>19</td> </tr> <tr> <td>Berlin</td> <td>SK Berlin Reinickendorf</td> <td>35-59</td> <td>M</td> <td>24/10/2020</td> <td>18</td> <td>0</td> <td>18</td> </tr> </tbody> </table> <h6>Por Antonio Silva Gordillo</h6></body> </html>")
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

