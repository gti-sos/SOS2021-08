var BASE_ANTSILGOR_API_PATH = "/api/v1/";

var covid19_tracking_germanyArray = [];
//prueba push
module.exports.register = (app) => {

    //Get al info (tabla)
    app.get("/info/covid19-tracking-germany", (req, res) =>{
        res.send("<html><header> <style> table, th, td { border: 1px solid black; } </style></header> <body> <h2>Fuente de datos:</h2> <p>covid19-tracking-germany.csv</p> <h2>Descripción</h2> <p>COVID-19 cases and deaths which will be updated daily. The original data are being collected by Germany's Robert Koch Institute and can be download through the National Platform for Geographic Data. The earliest recorded cases are from 2020-01-24.</p> <h2>Tabla con datos de muestra:</h2><table> <thead> <tr> <th>state</th> <th>county</th> <th>age-group</th> <th>gender</th> <th>date</th> <th>case</th> <th>death</th> <th>recovered</th> </tr> </thead> <tbody> <tr> <td>Bayern</td> <td>SK Hof</td> <td>05-14</td> <td>F</td> <td>03/04/2021</td> <td>2</td> <td>0</td> <td>0</td> </tr> <tr> <td>Berlin</td> <td>SK Berlin Mitte</td> <td>35-59</td> <td>M</td> <td>03/04/2021</td> <td>16</td> <td>0</td> <td>0</td> </tr> <tr> <td>Nordrhein-Westfalen</td> <td>SK Solingen</td> <td>80-99</td> <td>F</td> <td>03/04/2021</td> <td>1</td> <td>0</td> <td>0</td> </tr> <tr> <td>Sachsen</td> <td>SK Dresden</td> <td>15-34</td> <td>M</td> <td>09/11/2020</td> <td>19</td> <td>0</td> <td>19</td> </tr> <tr> <td>Berlin</td> <td>SK Berlin Reinickendorf</td> <td>35-59</td> <td>M</td> <td>24/10/2020</td> <td>18</td> <td>0</td> <td>18</td> </tr> </tbody> </table> <h6>Por Antonio Silva Gordillo</h6></body> </html>");
        console.log("New request to /info/covid19-tracking-germany has arrived");
    });


    //GET loadInitialData
    app.get(BASE_ANTSILGOR_API_PATH+"covid19-tracking-germany/loadInitialData", (req, res) =>{
        
        console.log("NEW GET .../covid19-tracking-germany/loadInitialData");

        var covid19_tracking_germanyArrayInitial = [
            {
                "state": "Bayern",
                "county": "SK Hof",
                "age-group": "05-14",
                "gender": "F",
                "date": "03/04/2021",
                "case": 2,
                "death": 0,
                "recovered": 0
              },
              {
                "state": "Berlin",
                "county": "SK Berlin Mitte",
                "age-group": "35-59",
                "gender": "M",
                "date": "03/04/2021",
                "case": 16,
                "death": 0,
                "recovered": 0
              },
              {
                "state": "Nordrhein-Westfalen",
                "county": "SK Solingen",
                "age-group": "80-99",
                "gender": "F",
                "date": "03/04/2021",
                "case": 1,
                "death": 0,
                "recovered": 0
              },
              {
                "state": "Sachsen",
                "county": "SK Dresden",
                "age-group": "15-34",
                "gender": "M",
                "date": "09/11/2020",
                "case": 19,
                "death": 0,
                "recovered": 19
              },
              {
                "state": "Berlin",
                "county": "SK Berlin Reinickendorf",
                "age-group": "35-59",
                "gender": "M",
                "date": "24/10/2020",
                "case": 18,
                "death": 0,
                "recovered": 18
              }
		];

        if(covid19_tracking_germanyArray.length>0){
            for(var j=0;j<covid19_tracking_germanyArray.length;j++){
                covid19_tracking_germanyArray.splice(j);
            }
        }
        for(var i=0;i<covid19_tracking_germanyArrayInitial.length;i++){
            covid19_tracking_germanyArray.push(covid19_tracking_germanyArrayInitial[i]);
        }
        res.send(JSON.stringify(covid19_tracking_germanyArray, null, 2));
    });

    //GET a toda la lista de recursos
    app.get(BASE_ANTSILGOR_API_PATH+"covid19-tracking-germany", (req, res) =>{
        console.log("NEW GET .../covid19-tracking-germany");
        res.send(JSON.stringify(covid19_tracking_germanyArray, null, 2));
    });

    //GET a un recurso
    app.get(BASE_ANTSILGOR_API_PATH+"covid19-tracking-germany/:state/:county", (req, res) =>{
        console.log("NEW GET .../covid19-tracking-germany/state/county");
        var reqstate = req.params.state;
        var reqcounty = req.params.county;
        var sendData = [];
        for(var i=0; i<covid19_tracking_germanyArray.length; i++) {
            if((String(covid19_tracking_germanyArray[i].state) === reqstate) && (covid19_tracking_germanyArray[i].county === parseInt(reqcounty))){
                sendData.push(covid19_tracking_germanyArray[i]);
            }
        }
        res.send(JSON.stringify(sendData, null, 2));
    });

    //POST para crear un nuevo recurso en nuestra lista
    app.post(BASE_ANTSILGOR_API_PATH+"covid19-tracking-germany", (req, res) =>{
        var newstate = req.body;
        console.log(`NEW POST ... state to be added:	<${JSON.stringify(newstate,null,2)}>`);
        covid19_tracking_germanyArray.push(newstate);
        res.sendStatus(201);
    });

    //DELETE a /state/county
    app.delete(BASE_ANTSILGOR_API_PATH+"covid19-tracking-germany/:state/:county", (req,res)=>{
        console.log("NEW DELETE ...../covid19-tracking-germany/state/county");
        var reqstate = req.params.state;
        var reqcounty = parseInt(req.params.county);
        var found = covid19_tracking_germanyArray.find(e => (e.state === reqstate) && (e.county === reqcounty));
        if(!found){
            console.log("DATA NOT FOUND");
            res.sendStatus(404);
        }else{
            for(var i=0; i<covid19_tracking_germanyArray.length; i++) {
                if((String(covid19_tracking_germanyArray[i].state) === reqstate) && (covid19_tracking_germanyArray[i].county === reqcounty)){
                    covid19_tracking_germanyArray.splice(i,1);
                    console.log("DATA REMOVED");
                    res.sendStatus(200);
                }
            }
        }
    });

    // PUT a state/county
    app.put(BASE_ANTSILGOR_API_PATH +"covid19-tracking-germany/:state/:county",(req,res)=>{
        console.log("NEW PUT ...../covid19-tracking-germany/state/county");
        var reqstate=req.params.state;
        var reqcounty=req.params.county;
        var data=req.body;
        
        if(reqstate!=data.state||reqcounty!=data.county){
            res.sendStatus(400).send("BAD Request");
        }else{
            for(var i=0;i<covid19_tracking_germanyArray.length ;i++){
                if((String(covid19_tracking_germanyArray[i].state) === reqstate) && (covid19_tracking_germanyArray[i].county === reqcounty)){
                    covid19_tracking_germanyArray[i] = data;
                    res.sendStatus(200).send("DATA UPDATED");
                }
            }
        }
    });

    // POST a state/county error
    app.post(BASE_ANTSILGOR_API_PATH+"covid19-tracking-germany/:state", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/state/county");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_ANTSILGOR_API_PATH+"covid19-tracking-germany/:county", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/state/county");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_ANTSILGOR_API_PATH+"covid19-tracking-germany/:age-group", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/state/county");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_ANTSILGOR_API_PATH+"covid19-tracking-germany/:gender", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/state/county");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_ANTSILGOR_API_PATH+"covid19-tracking-germany/:date", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/state/county");
        res.status(405).send("NOT ALLOWED");
    })

    app.post(BASE_ANTSILGOR_API_PATH+"covid19-tracking-germany/:case", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/state/county");
        res.status(405).send("NOT ALLOWED");
    })

    app.post(BASE_ANTSILGOR_API_PATH+"covid19-tracking-germany/:death", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/state/county");
        res.status(405).send("NOT ALLOWED");
    })

    app.post(BASE_ANTSILGOR_API_PATH+"covid19-tracking-germany/:recovered", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/state/county");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_ANTSILGOR_API_PATH+"covid19-tracking-germany/:state/:county", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/state/county");
        res.status(405).send("NOT ALLOWED");
    });

    //PUT a lista error
    app.put(BASE_ANTSILGOR_API_PATH+"covid19-tracking-germany", (req,res)=>{
        console.log("NEW PUT ...../covid19-tracking-germany");
        res.status(405).send("NOT ALLOWED");
    })

    // DELETE a lista
    app.delete(BASE_ANTSILGOR_API_PATH+"covid19-tracking-germany", (req,res)=>{
        console.log("NEW DELETE ...../covid19-tracking-germany");
        covid19_tracking_germanyArray = [];
        console.log("Data removed");
        res.sendStatus(200).send("Tabla eliminada");
    });

}

/* CODIGO API V1 ANTSILGOR ORIGINAL

const e = require("express");
var express = require("express");

var app = express();


var port = process.env.PORT || 10000;



var path = require("path");

app.use("/", express.static(path.join(__dirname,"./public"))); 

app.use(express.json());


var BASE_API_PATH = "/api/v1";

	var covid19_tracking_germanyArray = [];

	app.get(BASE_API_PATH+"/covid19-tracking-germany", (req,res)=>{ 
		
		res.send(JSON.stringify(covid19_tracking_germanyArray,null,2));
	});


	app.get(BASE_API_PATH+"/covid19-tracking-germany/loadInitialData", (req,res)=>{ 

		var datosInicialesGermany =  [
            {
                "state": "Bayern",
                "county": "SK Hof",
                "age-group": "05-14",
                "gender": "F",
                "date": "03/04/2021",
                "case": 2,
                "death": 0,
                "recovered": 0
              },
              {
                "state": "Berlin",
                "county": "SK Berlin Mitte",
                "age-group": "35-59",
                "gender": "M",
                "date": "03/04/2021",
                "case": 16,
                "death": 0,
                "recovered": 0
              },
              {
                "state": "Nordrhein-Westfalen",
                "county": "SK Solingen",
                "age-group": "80-99",
                "gender": "F",
                "date": "03/04/2021",
                "case": 1,
                "death": 0,
                "recovered": 0
              },
              {
                "state": "Sachsen",
                "county": "SK Dresden",
                "age-group": "15-34",
                "gender": "M",
                "date": "09/11/2020",
                "case": 19,
                "death": 0,
                "recovered": 19
              },
              {
                "state": "Berlin",
                "county": "SK Berlin Reinickendorf",
                "age-group": "35-59",
                "gender": "M",
                "date": "24/10/2020",
                "case": 18,
                "death": 0,
                "recovered": 18
              }
		];

		

		for(var e in datosInicialesGermany){
			covid19_tracking_germanyArray.push(datosInicialesGermany[e]);
		}

	

		covid19_tracking_germanyArray = covid19_tracking_germanyArray.map(e => JSON.stringify(e)); 

		covid19_tracking_germanyArray = new Set(covid19_tracking_germanyArray);

		covid19_tracking_germanyArray = [...covid19_tracking_germanyArray]

		covid19_tracking_germanyArray = covid19_tracking_germanyArray.map(e => JSON.parse(e))

		

		
		res.status(200).send(`<!DOCTYPE html>
					<html>
						<head>
							<title>CoVid19 Tracking Germany cases & deads</title>
						</head>
						<body>
							<h2>¡Initial data loaded successfully!</h2>
						</body>
					</html>`);
		
		
	});

	
	app.get(BASE_API_PATH+'/covid19-tracking-germany/:state', (req,res)=>{ 
		

		var filtraState = covid19_tracking_germanyArray.filter(function(e){ 
			return e.state==String(req.params.state);
		});
		
	
        if (filtraState != 0){
		    res.status(200).send(JSON.stringify(filtraState,null,2));
        }	
        
        else{
            res.status(404).send("Error no se ha encontrado el elemento");
        }
	});


	

	app.post(BASE_API_PATH+"/covid19-tracking-germany", (req,res)=>{
		
		var newData = req.body; 
		covid19_tracking_germanyArray.push(newData); 

		

		covid19_tracking_germanyArray = covid19_tracking_germanyArray.map(e => JSON.stringify(e)); 

		covid19_tracking_germanyArray = new Set(covid19_tracking_germanyArray); 

		covid19_tracking_germanyArray = [...covid19_tracking_germanyArray] 

		covid19_tracking_germanyArray = covid19_tracking_germanyArray.map(e => JSON.parse(e))

		
		res.sendStatus(201);
	
	});

	

	app.post(BASE_API_PATH+"/covid19-tracking-germany/:state", function(req, res) { 

		res.status(405).send("Metodo no permitido"); 
	});

	

	app.delete(BASE_API_PATH+"/covid19-tracking-germany", (req,res)=>{
		
		covid19_tracking_germanyArray = []; // vaciamos el array
		res.status(200).send("Eliminacion correcta");
	
	});

	

	app.delete(BASE_API_PATH+"/covid19-tracking-germany/:state", function(req, res) { 

		//Se hace un filtrado por pais, eliminando aquellos que coinciden con el pais dado
		covid19_tracking_germanyArray = covid19_tracking_germanyArray.filter(function(e){ 
			return e.state!==String(req.params.state);
		});
		res.status(200).send("Eliminacion correcta");
	});

	

	//Put modificar elemento

	app.put(BASE_API_PATH+"/covid19-tracking-germany/:state", function(req, res) { 

		for(var e in covid19_tracking_germanyArray){
			if(covid19_tracking_germanyArray[e].state == String(req.params.state)){
					var newData = req.body;
					covid19_tracking_germanyArray[e] = newData;
					break;
			}
		}

		

		covid19_tracking_germanyArray = covid19_tracking_germanyArray.map(e => JSON.stringify(e)); 

		covid19_tracking_germanyArray = new Set(covid19_tracking_germanyArray); 

		covid19_tracking_germanyArray = [...covid19_tracking_germanyArray] 

		covid19_tracking_germanyArray = covid19_tracking_germanyArray.map(e => JSON.parse(e)) 

		res.status(200).send("Modificacion correcta");
	});

	
	app.put(BASE_API_PATH+"/covid19-tracking-germany", function(req, res) { 

		res.status(405).send("Metodo no permitido"); 
	});

	//llamada get tabla html

	app.get("/info/covid19-tracking-germany-cases-and-deaths", (req, res) =>{
	res.send("<html><header> <style> table, th, td { border: 1px solid black; } </style></header> <body> <h2>Fuente de datos:</h2> <p>covid19-tracking-germany-cases-and-deaths.csv</p> <h2>Descripción</h2> <p>COVID-19 cases and deaths which will be updated daily. The original data are being collected by Germany's Robert Koch Institute and can be download through the National Platform for Geographic Data. The earliest recorded cases are from 2020-01-24.</p> <h2>Tabla con datos de muestra:</h2><table> <thead> <tr> <th>state</th> <th>county</th> <th>age-group</th> <th>gender</th> <th>date</th> <th>case</th> <th>death</th> <th>recovered</th> </tr> </thead> <tbody> <tr> <td>Bayern</td> <td>SK Hof</td> <td>05-14</td> <td>F</td> <td>03/04/2021</td> <td>2</td> <td>0</td> <td>0</td> </tr> <tr> <td>Berlin</td> <td>SK Berlin Mitte</td> <td>35-59</td> <td>M</td> <td>03/04/2021</td> <td>16</td> <td>0</td> <td>0</td> </tr> <tr> <td>Nordrhein-Westfalen</td> <td>SK Solingen</td> <td>80-99</td> <td>F</td> <td>03/04/2021</td> <td>1</td> <td>0</td> <td>0</td> </tr> <tr> <td>Sachsen</td> <td>SK Dresden</td> <td>15-34</td> <td>M</td> <td>09/11/2020</td> <td>19</td> <td>0</td> <td>19</td> </tr> <tr> <td>Berlin</td> <td>SK Berlin Reinickendorf</td> <td>35-59</td> <td>M</td> <td>24/10/2020</td> <td>18</td> <td>0</td> <td>18</td> </tr> </tbody> </table> <h6>Por Antonio Silva Gordillo</h6></body> </html>")
	});


    app.listen(port, () =>{
        console.log("Server ready to listen on port " + port);
    });

*/

