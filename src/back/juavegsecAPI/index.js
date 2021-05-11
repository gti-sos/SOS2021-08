var Datastore = require("nedb");
var db = new Datastore({ filename: "./src/back/juavegsecAPI/statewisetestingdetails.db", autoload: true });
var BASE_API_PATH= "/api/v1";

module.exports.register = (app, BASE_API_PATH) => {
	 
	

var statewisetestingdetails = [];


//GET para cargar (o meter) los datos iniciales (todo en JSON)
//(de modo que cree 2 o más elementos)

app.get(BASE_API_PATH+"/statewisetestingdetails/loadInitialData", (req,res)=>{ 

	
	var statewisetestingdetails_initial_data = [
        {
            "date": "2020-04-17",
            "state": "Andaman and Nicobar Islands",
            "totalsamples": 1403,
            "negative": 1250,
            "positive":12
            },
            {
            "date": "2021-04-02",
            "state": "Andhra Pradesh",
            "totalsamples": 1800,
            "negative": 1175,
            "positive":132
                },
                {
                "date": "2021-04-09",
                "state": "Arunachal Pradesh",
                "totalsamples": 206,
                "negative": 185,
                "positive":1
                    },
                      {
                "date": "2021-04-02",
                "state": "Assam",
                "totalsamples": 962,
                "negative": 819,
                "positive":16
                    },
                     {
                "date": "2021-04-05",
                "state": "Bihar",
                "totalsamples": 3037,
                "negative": 2299,
                "positive":32
                    }
    
    
    
    ];

	
	db.insert(statewisetestingdetails_initial_data);
	
	//Lanzamos el código 200 indicando que se han cargado los datos iniciales de forma satisfactoria
	//(Lo indicamos con el 200 por consola, y con un pequeño html para el usuario de forma gráfica)

	res.sendStatus(200);

});



//1)GET a la lista de recursos devuelve una lista con todos los recursos
//(GET para cargar el array completo)

app.get(BASE_API_PATH + "/statewisetestingdetails", (req,res) => {
	
	let query = {};
        let offset = 0;
        let limit = Number.MAX_SAFE_INTEGER;

        // Pagination
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
            delete req.query.limit;
        }

        if (req.query.offset) {
            offset = parseInt(req.query.offset);
            delete req.query.offset;
        }

        // Search
        if (req.query.date) query["date"] = req.query.date;
        if (req.query.state) query["state"] = req.query.state;
        if (req.query.totalsamples) query["totalsamples"] = req.query.totalsamples;
        if (req.query.negative) query["negative"] =req.query.negative;
        if (req.query.positive) query["positive"] = req.query.positive;
	
	 db.find(query).sort({ date: 1, state: -1}).skip(offset).limit(limit).exec(function (err, resources) {
            if (err) {
                console.error(DATABASE_ERR_MSSG + err);
                res.sendStatus(500);
            } else {
                if (resources.length != 0) {
                   
					var aux = resources.map((c)=>{
				return {date : c.date, state: c.state, totalsamples: c.totalsamples, negative: c.negative, positive: c.positive  }
			
					res.status(200).send(aux);
					
					
                    });

                    // res.status(200).send(JSON.stringify(resourcesToSend, null, 2));
                    res.status(200).send(aux);
                } else {
					var array = [];
                    res.status(200).send(array);
                }

            }

        });
    });
	
	
	
	
		
	




//2)POST  a la lista de recursos (para introducir nuevos arrays de datos)

app.post(BASE_API_PATH+"/statewisetestingdetails", (req,res)=>{
	
	var data = req.body;
	
	var esta =false;
	var bodyok= true;
	
	
	
	
	db.find({date:String(req.body.date), state:String(req.body.state)  }, function(err, record) {
    	
		
		if (record.length!=0) {
       	 esta=true;
			
			res.sendStatus(409);
    
		}else{
			
			// -----------------Comprueba body------------------------ 
				var cantidadDeClaves = Object.keys(data).length;
			
				if(cantidadDeClaves!=5){
					bodyok = false;
				}
	
		
				var aux = Object.keys(data);
	
				if(aux[0]!="date"|| aux[1]!= "state" || aux[2]!= "totalsamples"|| aux[3]!= "negative" || aux[4] != "positive"){
					bodyok =false;
				}
			// ------------------------------------------------------- 
			
			if( bodyok){
		
				db.insert(data);
				//"Metemos" en el array de datos para este recurso lo recibido en el POST
				res.sendStatus(201);
		
			}else if(!bodyok){
			 
				res.sendStatus(400);
			}
			
			}
		
    
	
	});
	
});


	
//3) GET a un recurso (en concreto), devuelve ese recurso
//En nuestro caso, accedemos a los elementos por estado y año (p ej.)

app.get(BASE_API_PATH+"/statewisetestingdetails/:date/:state", (req,res)=>{ 
		
		
	db.find({date:String(req.params.date), state:String(req.params.state)  }, function(err, record) {
		
		console.log(record);
		
		if (record.length==0) {
       	
			res.sendStatus(404);
    
		}else{
		
			var aux = record.map((c)=>{
				return {date : c.date, state: c.state, totalsamples: c.totalsamples, negative: c.negative, positive: c.positive  }
			});
			res.status(200).send(aux[0]);
		}
		
		});
	
	
	
	
});


//4) DELETE a un recurso, borra ese recurso (en concreto)
//En nuestro caso, borramos el recurso por estado y año

app.delete(BASE_API_PATH+"/statewisetestingdetails/:date/:state", function(req, res) { 
	//Si el 'estado' y 'año' coinciden con los recibidos o dados, se elimina ese recurso
	
	
	db.remove({date:String(req.params.date), state:String(req.params.state)},(err, numEvictionsRemoved)=>{
			
		console.log(err);
		
		if(err!=null){
				console.error("ERROR deleting DB evictions in DELETE: "+err);
				res.sendStatus(500);
			}else{
				if(numEvictionsRemoved==0){
					res.sendStatus(404);
				}else{
					res.sendStatus(200);
				}
			}
		})
	
});


//5) PUT a un recurso (en concreto), actualiza ese recurso
//actualizamos los que coincidan con 'state' y 'year'


app.put(BASE_API_PATH+"/statewisetestingdetails/:date/:state", function(req,res) { 

	var data = req.body;
	
	var esta = false;
	var bodyok = true;
	
	var aux = Object.keys(data);
	
		if(aux[0]!="date"|| aux[1]!= "state" || aux[2]!= "totalsamples"|| aux[3]!= "negative" || aux[4] != "positive"){
			bodyok =false;
		}
	
	db.find({date:String(req.params.date), state:String(req.params.state)  }, function(err, record) {
		
		//console.log(record);
		if(err!=null){
				console.error("ERROR deleting DB evictions in DELETE: "+err);
				res.sendStatus(500);
		}else{
			
			
			if (record.length==0) {
       	
				res.sendStatus(404);
    
			}else{
			
				if(!bodyok){
					
					 res.sendStatus(400);
					
				}else{
					
					if(String(req.params.date) !=  req.body.date || String(req.params.state) !=  req.body.state  ){
					   
						
						res.sendStatus(409);
						
					   }else{
					   
						   
						   db.update({date:String(req.params.date), state:String(req.params.state)}, 
							  {date:String(req.params.date), state:String(req.params.state),totalsamples: req.body.totalsamples, negative:  req.body.negative, 
							 	positive: req.body.positive}, {}, function (err, numReplaced) {
										
						if(err) {
							console.error(err);
							res.sendStatus(500);
						}else{
							res.sendStatus(200);
							
						}
								
					
					});
						   
						   
						   
					   }
					
					
					
				}
				
			}
			
		}
		
		
		});
	
});





//6)POST a un recurso (en concreto), debe de dar un error de método no permitido 

app.post(BASE_API_PATH+"/statewisetestingdetails/:date/:state", function(req, res) { 

	res.sendStatus(405); 
});


//7)PUT a la lista de recursos (completa) debe dar un error de no permitido

app.put(BASE_API_PATH+"/statewisetestingdetails", function(req, res) { 

	res.sendStatus(405); 
});

//8)DELETE a la lista de recursos (completa) borra todos los recursos
//En otras palabras, borramos todos los elementos existentes en el array inicial

app.delete(BASE_API_PATH+"/statewisetestingdetails", (req,res)=>{
		
	db.remove({}, { multi: true }, function(err, numDeleted) {
     console.log('Deleted', numDeleted, 'user(s)');
}); 
	res.sendStatus(200);

});
	 
	 
 }
/*
var DataStore = require("nedb");
var db = new DataStore();
var BASE_API_PATH = "/api/v1"; //tipo de recurso

////////////////////////JUAN VEGA SECO///////////////////////////////////////
var statewisetestingdetailsArray= [];

module.exports.register = (app) => {

app.get("/info/statewisetestingdetails", (req, res) =>{
    res.send("<html> <body> <table><thead><tr><th>countryname</th><th>countrycode</th><th>date</th><th>c1-school-closing</th><th>c2-workplace-closing</th><th>c3-cancel-public-events</th><th>c4-restricitions-on-gatherings</th><th></th></tr></thead><tbody><tr><td>Aruba</td><td>ABW</td><td>2020-01-01</td><td>0,00</td><td>0,00</td><td>0,00</td><td>0,00</td><td></td></tr><tr><td>Afghanistan</td><td>AFG</td><td>2020-01-29</td><td>1,00</td><td>1,00</td><td>0,00</td><td>0,00</td><td></td></tr><tr><td>Angola</td><td>AGO</td><td>2020-02-01</td><td>3,00</td><td>2,00</td><td>0,00</td><td>1,00</td><td></td></tr><tr><td>Albania</td><td>ALB</td><td>2020-01-03</td><td>0,00</td><td>0,00</td><td>0,00</td><td>2,00</td><td></td></tr><tr><td>Andorra</td><td>AND</td><td>2020-05-25</td><td>0,00</td><td>1,00</td><td>3,00</td><td>5,00</td><td></td></tr><tr><td>United Arab Emirates</td><td>ARE</td><td>2020-05-09</td><td>0,00</td><td>0,00</td><td>0,00</td><td>1,00</td><td></td></tr></tbody></table> <h6>Por Juan Vega Seco</h6> </body> </html>")
    console.log("New request to /info/statewisetestingdetails");
});

//get loadInitialData

app.get(BASE_API_PATH+ "/statewisetestingdetails/loadInitialData", (req,res)=>{ 
    console.log("NEW GET .../statewisetestingdetails/loadInitialData");
   
    var statewisetestingdetails = [
    {
        "date": "2020-04-17",
        "state": "Andaman and Nicobar Islands",
        "totalsamples": 1403,
        "negative": 1250,
        "positive":12
        },
        {
        "date": "2021-04-02",
        "state": "Andhra Pradesh",
        "totalsamples": 1800,
        "negative": 1175,
        "positive":132
            },
            {
            "date": "2021-04-09",
            "state": "Arunachal Pradesh",
            "totalsamples": 206,
            "negative": 185,
            "positive":1
                },
                  {
            "date": "2021-04-02",
            "state": "Assam",
            "totalsamples": 962,
            "negative": 819,
            "positive":16
                },
                 {
            "date": "2021-04-05",
            "state": "Bihar",
            "totalsamples": 3037,
            "negative": 2299,
            "positive":32
                }



];

//Borarr db y cargar datos
db.remove({}, {multi:true}, function(err,numRemoved){});
db.insert(statewisetestingdetails);
res.sendStatus(200);
console.log("Initial data loaded:" +JSON.stringify(statewisetestingdetails,null,2));
}) 

//GET a toda la lista de recursos
app.get(BASE_API_PATH+"/statewisetestingdetails", (req, res) =>{
        
    var query = req.query;
    var offset = query.offset; 
    var limit = query.limit;
    delete query.offset;
    delete query.limit;

    //Pasamos los atributos de la query a Int
    if(query.hasOwnProperty("totalsamples")){
        query.totalsamples = parseInt(query.totalsamples);
    }
    if(query.hasOwnProperty("negative")){
        query.negative = parseInt(query.negative);
    }
    if(query.hasOwnProperty("positive")){
        query.positive = parseInt(query.positive);
    }

    db.find(query).skip(offset).limit(limit).exec((err, statesInDB) => {
        if(err){
            console.error("ERROR accesing DB in GET");
            res.sendStatus(500);
        }
        else{
            if(statesInDB.length == 0){
                console.error("[]");
                res.sendStatus(404);
            }
            else{
                var dataToSend = statesInDB.map((c)=>{
                    return {date : c.date, state : c.state, totalsamples : c.totalsamples, negative : c.negative, positive : c.positive};
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

    //GET a un recurso concreto
    app.get(BASE_API_PATH+"/statewisetestingdetails/:date/:state", (req, res) => {
        var reqDate = req.params.date;
        var reqState = req.params.state;
        
        db.find({date: reqDate, state: reqState}, {_id: 0}, function (err, data) {
            if (err) {
                console.error("ERROR in GET");
                res.sendStatus(500);
            } else {
                if (data.length == 0) {
                    console.error("No data found");
                    res.sendStatus(404);
                } else {
                    var send = data[0];
                    console.log(`NEW GET to <${reqDate}>, <${reqState}>`);
                    res.status(200).send(JSON.stringify(send, null, 2));
                }
            }
        });
    });	

    //GET a un recurso concreto ERROR 1
    app.get(BASE_API_PATH+"/statewisetestingdetails/:data", (req, res) => {
        console.error("BAD REQUEST");
        res.sendStatus(400).send("Incorrect fields");
    });

//POST para crear un nuevo recurso en nuestra lista
    app.post(BASE_API_PATH+"/statewisetestingdetails", (req, res) => {
        console.log("New POST .../statewisetestingdetails");
        var newData = req.body;
        var date = req.body.date;
        var state =req.body.state;
        db.find({"date":date, "state":state}).exec((err, data)=>{
            if(err){
                console.error("ERROR in GET");
                res.sendStatus(500);
            }else {
                if(data.length == 0){
                    if (Object.keys(newData).length != 5){
                        console.log("The data is not correct");
                        return res.sendStatus(400);
                    }else{
                        console.log("Data imput:"+JSON.stringify(newData, null, 2));
                        db.insert(newData);
                        res.sendStatus(201);
                    }

                }else{
                    res.sendStatus(409);
                    console.log("the data already exist");
                }
            }
        });
    });
    
     //DELETE a /country/year
     app.delete(BASE_API_PATH+"/statewisetestingdetails/:date/:state", (req,res)=>{
		console.log("NEW DELETE .....statewisetestingdetails/:date/:state");
			var reqDate = req.params.date;
			var reqState = req.params.state;
			db.remove({date:reqDate,state:reqState},{multi:true}, (err, salida) => {
				if(salida==1){
					console.log("DATA REMOVED");
					res.sendStatus(200);
				}else{
					console.log("DATA NOT FOUND");
					res.sendStatus(404);
				}
			});
	});

        // PUT a date/state
        app.put(BASE_API_PATH+"/statewisetestingdetails/:date/:state", (req,res) => {
				
            var date = req.params.date;
            var state = req.params.state;
            var body = req.body;
            
            db.find({"date":date, "state":state}, (err, dataFound) => {
                
                if(dataFound.length == 0) {
                    res.sendStatus(404, "DATA NOT FOUND");
                    console.log("Data not found");
                } else if(body.date != date || body.state != state || !body.date || !body.state || !body["totalsamples"] || !body["negative"] || !body["positive"] || Object.keys(body).length != 5){
                    res.sendStatus(400, "FORMAT NOT VALID");
                    console.log("The format is not valid");
                } else {
                    db.update({"date":date,"state":state}, {$set:body});
                    res.sendStatus(200);
                    console.log("Data updated");
                }
            });
            
        });

         // POST a country/year error
    app.post(BASE_API_PATH+"/statewisetestingdetails/:date", (req,res)=>{
        console.log("NEW POST ...../statewisetestingdetails/date/state");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_API_PATH+"/statewisetestingdetails/:state", (req,res)=>{
        console.log("NEW POST ...../statewisetestingdetails/state/date");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_API_PATH+"/statewisetestingdetails/:totalsamples", (req,res)=>{
        console.log("NEW POST ...../statewisetestingdetails/state/date");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_API_PATH+"/statewisetestingdetails/:negative", (req,res)=>{
        console.log("NEW POST ...../statewisetestingdetails/state/date");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_API_PATH+"/statewisetestingdetails/:positive", (req,res)=>{
        console.log("NEW POST ...../statewisetestingdetails/state/date");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_API_PATH+"/statewisetestingdetails/:date/:state", (req,res)=>{
        console.log("NEW POST ...../statewisetestingdetails/state/date");
        res.status(405).send("NOT ALLOWED");
    });

      //PUT a lista error
      app.put(BASE_API_PATH+"/statewisetestingdetails", (req,res)=>{
        console.log("NEW PUT ...../statewisetestingdetails");
        res.status(405).send("NOT ALLOWED");
    })

        // DELETE a lista
        app.delete(BASE_API_PATH+"/statewisetestingdetails", (req,res)=>{
            db.remove({}, {multi:true}, function (err,numRemoved) {
                if (err) {
                    console.error("ERROR deleting DB statesInDB");
                    res.sendStatus(500);
                }else{
                    if(numRemoved == 0){
                        console.error("ERROR statesInDB not found");
                        res.sendStatus(404);
                    } else {
                        res.sendStatus(200);
                        
                    }
                }
            });
            
        });
   
}

/*



/* */
  
