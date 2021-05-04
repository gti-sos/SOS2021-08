var BASE_ANTSILGOR_API_PATH = "/api/v1"; //tipo de recurso

var DataStore = require("nedb");
var db = new DataStore();

var covid19_tracking_germanyArray= [];





module.exports.register = (app) => {

    var covid19_tracking_germanyArrayInitial = [
        {
            "state": "Bayern",
            "county": "SK-Hof",
            "agegroup": "05-14",
            "gender": "F",
            "date": "03/04/2021",
            "cases": 2,
            "death": 0,
            "recovered": 0
          },
          {
            "state": "Berlin",
            "county": "SK-Berlin-Mitte",
            "agegroup": "35-59",
            "gender": "M",
            "date": "03/04/2021",
            "cases": 16,
            "death": 0,
            "recovered": 0
          },
          {
            "state": "Nordrhein-Westfalen",
            "county": "SK-Solingen",
            "agegroup": "80-99",
            "gender": "F",
            "date": "03/04/2021",
            "cases": 1,
            "death": 0,
            "recovered": 0
          },
          {
            "state": "Sachsen",
            "county": "SK-Dresden",
            "agegroup": "15-34",
            "gender": "M",
            "date": "09/11/2020",
            "cases": 19,
            "death": 0,
            "recovered": 19
          },
          {
            "state": "Berlin",
            "county": "SK-Berlin-Reinickendorf",
            "agegroup": "35-59",
            "gender": "M",
            "date": "24/10/2020",
            "cases": 18,
            "death": 0,
            "recovered": 18
          }
    ];


    //Get info tablahtml
    app.get("/info/covid19-tracking-germany", (req, res) =>{
        res.send("<html><header> <style> table, th, td { border: 1px solid black; } </style></header> <body> <h2>Fuente de datos:</h2> <p>covid19-tracking-germany.csv</p> <h2>Descripción</h2> <p>COVID-19 death and recovered which will be updated daily. The original data are being collected by Germany's Robert Koch Institute and can be download through the National Platform for Geographic Data. The earliest recorded death are from 2020-01-24.</p> <h2>Tabla con datos de muestra:</h2><table> <thead> <tr> <th>state</th> <th>county</th> <th>agegroup</th> <th>gender</th> <th>date</th> <th>cases</th> <th>death</th> <th>recovered</th> </tr> </thead> <tbody> <tr> <td>Bayern</td> <td>SK Hof</td> <td>05-14</td> <td>F</td> <td>03/04/2021</td> <td>2</td> <td>0</td> <td>0</td> </tr> <tr> <td>Berlin</td> <td>SK Berlin Mitte</td> <td>35-59</td> <td>M</td> <td>03/04/2021</td> <td>16</td> <td>0</td> <td>0</td> </tr> <tr> <td>Nordrhein-Westfalen</td> <td>SK Solingen</td> <td>80-99</td> <td>F</td> <td>03/04/2021</td> <td>1</td> <td>0</td> <td>0</td> </tr> <tr> <td>Sachsen</td> <td>SK Dresden</td> <td>15-34</td> <td>M</td> <td>09/11/2020</td> <td>19</td> <td>0</td> <td>19</td> </tr> <tr> <td>Berlin</td> <td>SK Berlin Reinickendorf</td> <td>35-59</td> <td>M</td> <td>24/10/2020</td> <td>18</td> <td>0</td> <td>18</td> </tr> </tbody> </table> <h6>Por Antonio Silva Gordillo</h6></body> </html>");
        console.log("New request to /info/covid19-tracking-germany has arrived");
    });

////////////////////////Antonio Silva Gordillo///////////////////////////////////////

 //GET loadInitialData
		

    app.get(BASE_ANTSILGOR_API_PATH+ "/covid19-tracking-germany/loadInitialData", (req,res)=>{ 
        
        db.remove({},{multi:true},function(err,numRemoved){});
        db.insert(covid19_tracking_germanyArrayInitial);
        res.sendStatus(200);
        console.log("Initial data loaded:"+JSON.stringify(covid19_tracking_germanyArrayInitial,null,2));
        });
    


    //GET a toda la lista de recursos
    app.get(BASE_ANTSILGOR_API_PATH+"/covid19-tracking-germany", (req, res) =>{
        
        var query = req.query;
        var offset = query.offset;
        var limit = query.limit;
        delete query.offset;
        delete query.limit;

        
     
        if(query.hasOwnProperty("cases")){
            query.cases = parseInt(query.cases);
        }

        if(query.hasOwnProperty("death")){
            query.death = parseInt(query.death);
        }
        if(query.hasOwnProperty("recovered")){
            query.recovered = parseInt(query.recovered);
        }

        db.find(query).skip(offset).limit(limit).exec((err, gerCovidDB) => {
            if(err){
                console.error("ERROR accesing DB in GET");
                res.sendStatus(500);
            }
            else{
                if(gerCovidDB.length == 0){
                    console.error("No data found");
                    res.sendStatus(404);
                }
                else{
                    var dataToSend = gerCovidDB.map((c)=>{
                        return {state : c.state, county : c.county, agegroup : c.agegroup, gender: c.gender, date: c.date, cases : c.cases, death : c.death, recovered : c.recovered};
                    })
                    if(dataToSend.length==1){
                        var objectToSend = dataToSend[0];
                        res.send(JSON.stringify(objectToSend, null, 2));
                        console.log("Data sent:"+JSON.stringify(objectToSend, null, 2));
                    }else{
                        res.send(JSON.stringify(dataToSend, null, 2));
                        console.log("Data sent:"+JSON.stringify(dataToSend, null, 2));
                    }
                    
                 }
            }
        });
    });



	//Get para tomar elementos por estado
	
	 //GET a un recurso
     app.get(BASE_ANTSILGOR_API_PATH+"/covid19-tracking-germany/:state/:county", (req, res) => {
        var reqState = req.params.state;
        var reqCounty = req.params.county;
        
        db.find({state: reqState, county: reqCounty}, {_id: 0}, function (err, data) {
            if (err) {
                console.error("ERROR in GET");
                res.sendStatus(500);
            } else {
                if (data.length == 0) {
                    console.error("No data found");
                    res.sendStatus(404);
                } else {
                    var send = data[0];
                    console.log(`NEW GET to <${reqState}>, <${reqCounty}>`);
                    res.status(200).send(JSON.stringify(send, null, 2));
                }
            }
        });
    });

    //GET a un recurso concreto ERROR 1
     app.get(BASE_ANTSILGOR_API_PATH+"/covid19-tracking-germany/:data", (req, res) => {
        console.error("No se puede buscar por el recurso pedido");
        res.sendStatus(400);
    });


     //POST para crear un nuevo recurso en nuestra lista

     app.post(BASE_ANTSILGOR_API_PATH+"/covid19-tracking-germany", (req, res) => {
        console.log("New POST .../covid19-tracking-germany");
        var newData = req.body;
        var state = req.body.state;
        var county= req.body.county;
        db.find({"state":state, "county":county}).exec((err, data)=>{
            if(err){
                console.error("ERROR in POST");
                res.sendStatus(500);
            }else {
                if(data.length == 0){
                    if (Object.keys(newData).length != 8){
                        console.log("El dato no es correcto");
                        return res.sendStatus(400);
                    }else{
                        console.log("Data input:"+JSON.stringify(newData, null, 2));
                        db.insert(newData);
                        res.sendStatus(201);
                    }

                }else{
                    res.sendStatus(409);
                    console.log("El dato ya existe");
                }
            }
        });

    });


//Delete de elementos por county y cases

app.delete(BASE_ANTSILGOR_API_PATH+"/covid19-tracking-germany/:state/:county", (req,res)=>{
		console.log("NEW DELETE .....covid19-tracking-germany/:state/:county");
			var reqState = req.params.state;
            var reqCounty = req.params.county;
		
			db.remove({state:reqState, county:reqCounty },{multi:true}, (err, salida) => {
				if(salida==1){
					console.log("Recurso eliminado");
					res.sendStatus(200);
				}else{
					console.log("Recurso no encontrado");
					res.sendStatus(404);
				}
			});
	});


    
    // PUT a county/cases
    app.put( BASE_ANTSILGOR_API_PATH+"/covid19-tracking-germany/:state/:county",(req,res)=>{
        console.log("New PUT ...//covid19-tracking-germany/:state/:county");

        var state= req.params.state;
	    var county = req.params.county;
	    var newData = req.body;
	    var query = {"state":state, "county":county};
            if (!newData.state 
            || !newData.county 
            /*
            || !newData['agegroup'] 
            || !newData['gender']  
            || !newData['date']
            || !newData['cases']
            || !newData['death'] 
            || !newData['recovered']*/
            || Object.keys(newData).length != 8){
            console.log("The data is not correct");
            return res.sendStatus(400);
        }
    
        else {
            db.update(query,newData,(err,numReplaced) =>{
                if(err){
                    console.error("ERROR in PUT");
                    res.sendStatus(500);
                }
                else{
                    if(numReplaced == 0){
                        res.sendStatus(404);
                        console.log("The data dont exist in the Database");
    
                    }
                    else{
                        res.sendStatus(200);
                        console.log("Database updated!");
                    }
                }
            });
        }
    });
    
    // POST a country/year error
    app.post(BASE_ANTSILGOR_API_PATH+"/covid19-tracking-germany/:date", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/date");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_ANTSILGOR_API_PATH+"/covid19-tracking-germany/:county", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/county");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_ANTSILGOR_API_PATH+"/covid19-tracking-germany/:state", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/state");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_ANTSILGOR_API_PATH+"/covid19-tracking-germany/:cases", (req,res)=>{
        console.log("NEW POST ...../oil-production-stats/cases");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_ANTSILGOR_API_PATH+"/covid19-tracking-germany/:death", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/death");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_ANTSILGOR_API_PATH+"/covid19-tracking-germany/:recovered", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/recovered");
        res.status(405).send("NOT ALLOWED");
    })

    app.post(BASE_ANTSILGOR_API_PATH+"/covid19-tracking-germany/:county/:agegroup", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/county/agegroup");
        res.status(405).send("NOT ALLOWED");
    });
    app.post(BASE_ANTSILGOR_API_PATH+"/covid19-tracking-germany/:county/:gender", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/county/gender");
        res.status(405).send("NOT ALLOWED");
    });

    app.put(BASE_ANTSILGOR_API_PATH+"/covid19-tracking-germany", (req,res)=>{
        console.log("NEW PUT ...../covid19-tracking-germany");
        res.status(405).send("NOT ALLOWED");
    })

    



       // DELETE a lista
       app.delete(BASE_ANTSILGOR_API_PATH+"/covid19-tracking-germany", (req,res)=>{
        db.remove({}, {multi:true}, function (err,numRemoved) {
            if (err) {
                console.error("ERROR deleting DB gerCovidDB in DELETE");
                res.sendStatus(500);
            }else{
                if(numRemoved == 0){
                    console.error("ERROR gerCovidDB not found");
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                }
            }
        });
        
    });


}






/* INDEX F05 ANTSILGOR
var BASE_ANTSILGOR_API_PATH = "/api/v1/";

var covid19_tracking_germanyArray = [];

module.exports.register = (app) => {

    //Get info tablahtml
    app.get("/info/covid19-tracking-germany", (req, res) =>{
        res.send("<html><header> <style> table, th, td { border: 1px solid black; } </style></header> <body> <h2>Fuente de datos:</h2> <p>covid19-tracking-germany.csv</p> <h2>Descripción</h2> <p>COVID-19 death and recovered which will be updated daily. The original data are being collected by Germany's Robert Koch Institute and can be download through the National Platform for Geographic Data. The earliest recorded death are from 2020-01-24.</p> <h2>Tabla con datos de muestra:</h2><table> <thead> <tr> <th>state</th> <th>county</th> <th>agegroup</th> <th>gender</th> <th>date</th> <th>cases</th> <th>death</th> <th>recovered</th> </tr> </thead> <tbody> <tr> <td>Bayern</td> <td>SK Hof</td> <td>05-14</td> <td>F</td> <td>03/04/2021</td> <td>2</td> <td>0</td> <td>0</td> </tr> <tr> <td>Berlin</td> <td>SK Berlin Mitte</td> <td>35-59</td> <td>M</td> <td>03/04/2021</td> <td>16</td> <td>0</td> <td>0</td> </tr> <tr> <td>Nordrhein-Westfalen</td> <td>SK Solingen</td> <td>80-99</td> <td>F</td> <td>03/04/2021</td> <td>1</td> <td>0</td> <td>0</td> </tr> <tr> <td>Sachsen</td> <td>SK Dresden</td> <td>15-34</td> <td>M</td> <td>09/11/2020</td> <td>19</td> <td>0</td> <td>19</td> </tr> <tr> <td>Berlin</td> <td>SK Berlin Reinickendorf</td> <td>35-59</td> <td>M</td> <td>24/10/2020</td> <td>18</td> <td>0</td> <td>18</td> </tr> </tbody> </table> <h6>Por Antonio Silva Gordillo</h6></body> </html>");
        console.log("New request to /info/covid19-tracking-germany has arrived");
    });


    //GET loadInitialData
    app.get(BASE_ANTSILGOR_API_PATH+"covid19-tracking-germany/loadInitialData", (req, res) =>{
        
        console.log("NEW GET .../covid19-tracking-germany/loadInitialData");

        var covid19_tracking_germanyArrayInitial = [
            {
                "state": "Bayern",
                "county": "SK-Hof",
                "agegroup": "05-14",
                "gender": "F",
                "date": "03/04/2021",
                "cases": 2,
                "death": 0,
                "recovered": 0
              },
              {
                "state": "Berlin",
                "county": "SK-Berlin-Mitte",
                "agegroup": "35-59",
                "gender": "M",
                "date": "03/04/2021",
                "cases": 16,
                "death": 0,
                "recovered": 0
              },
              {
                "state": "Nordrhein-Westfalen",
                "county": "SK-Solingen",
                "agegroup": "80-99",
                "gender": "F",
                "date": "03/04/2021",
                "cases": 1,
                "death": 0,
                "recovered": 0
              },
              {
                "state": "Sachsen",
                "county": "SK-Dresden",
                "agegroup": "15-34",
                "gender": "M",
                "date": "09/11/2020",
                "cases": 19,
                "death": 0,
                "recovered": 19
              },
              {
                "state": "Berlin",
                "county": "SK-Berlin-Reinickendorf",
                "agegroup": "35-59",
                "gender": "M",
                "date": "24/10/2020",
                "cases": 18,
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
        var reqState = req.params.county;
        var sendData = [];
        for(var i=0; i<covid19_tracking_germanyArray.length; i++) {
            if((String(covid19_tracking_germanyArray[i].state) === reqstate) && (covid19_tracking_germanyArray[i].county === (reqState))){
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
        var reqState = req.params.county;
        var found = covid19_tracking_germanyArray.find(e => (e.state === reqstate) && (e.county === reqState));
        if(!found){
            console.log("DATA NOT FOUND");
            res.sendStatus(404);
        }else{
            for(var i=0; i<covid19_tracking_germanyArray.length; i++) {
                if((String(covid19_tracking_germanyArray[i].state) === reqstate) && (covid19_tracking_germanyArray[i].county === reqState)){
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
        var reqState=req.params.county;
        var data=req.body;
        
        if(reqstate!=data.state||reqState!=data.county){
            res.sendStatus(400).send("BAD Request");
        }else{
            for(var i=0;i<covid19_tracking_germanyArray.length ;i++){
                if((String(covid19_tracking_germanyArray[i].state) === reqstate) && (covid19_tracking_germanyArray[i].county === reqState)){
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
    app.post(BASE_ANTSILGOR_API_PATH+"covid19-tracking-germany/:agegroup", (req,res)=>{
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

    app.post(BASE_ANTSILGOR_API_PATH+"covid19-tracking-germany/:cases", (req,res)=>{
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

*/