var DataStore = require("nedb");
var db = new DataStore({ filename: "./src/back/antsilgorAPI/covid19TrackingGermany.db", autoload: true });
console.log("E");module.exports.register = (app, BASE_API_PATH
) => {

var covid19_tracking_germanyArray = [];

//Get info tablahtml
app.get("/info/covid19-tracking-germany", (req, res) =>{
    res.send("<html><header> <style> table, th, td { border: 1px solid black; } </style></header> <body> <h2>Fuente de datos:</h2> <p>covid19-tracking-germany.csv</p> <h2>Descripción</h2> <p>COVID-19 death and recovered which will be updated daily. The original data are being collected by Germany's Robert Koch Institute and can be download through the National Platform for Geographic Data. The earliest recorded death are from 2020-01-24.</p> <h2>Tabla con datos de muestra:</h2><table> <thead> <tr> <th>state</th> <th>county</th> <th>agegroup</th> <th>gender</th> <th>date</th> <th>cases</th> <th>death</th> <th>recovered</th> </tr> </thead> <tbody> <tr> <td>Bayern</td> <td>SK Hof</td> <td>05-14</td> <td>F</td> <td>03/04/2021</td> <td>2</td> <td>0</td> <td>0</td> </tr> <tr> <td>Berlin</td> <td>SK Berlin Mitte</td> <td>35-59</td> <td>M</td> <td>03/04/2021</td> <td>16</td> <td>0</td> <td>0</td> </tr> <tr> <td>Nordrhein-Westfalen</td> <td>SK Solingen</td> <td>80-99</td> <td>F</td> <td>03/04/2021</td> <td>1</td> <td>0</td> <td>0</td> </tr> <tr> <td>Sachsen</td> <td>SK Dresden</td> <td>15-34</td> <td>M</td> <td>09/11/2020</td> <td>19</td> <td>0</td> <td>19</td> </tr> <tr> <td>Berlin</td> <td>SK Berlin Reinickendorf</td> <td>35-59</td> <td>M</td> <td>24/10/2020</td> <td>18</td> <td>0</td> <td>18</td> </tr> </tbody> </table> <h6>Por Antonio Silva Gordillo</h6></body> </html>");
    console.log("New request to /info/covid19-tracking-germany has arrived");
});


//GET para cargar (o meter) los datos iniciales (todo en JSON)
//(de modo que cree 2 o más elementos)

app.get(BASE_API_PATH+"/covid19-tracking-germany/loadInitialData", (req,res)=>{ 

	
	var covid19_tracking_germanyArray_initial_data = [
		{
            "state": "Bayern",
            "county": "SK-Hof",
            "agegroup": "05-14",
            "gender": "F",
            "date": "03/04/2021",
            "cases": 83,
            "death": 41,
            "recovered": 50
          },
          {
            "state": "Berlin",
            "county": "SK-Berlin-Mitte",
            "agegroup": "35-59",
            "gender": "M",
            "date": "03/04/2021",
            "cases": 93,
            "death": 19,
            "recovered": 30
          },
          {
            "state": "Nordrhein-Westfalen",
            "county": "SK-Solingen",
            "agegroup": "80-99",
            "gender": "F",
            "date": "03/04/2021",
            "cases": 176,
            "death": 56,
            "recovered": 74
          },
          {
            "state": "Sachsen",
            "county": "SK-Dresden",
            "agegroup": "15-34",
            "gender": "M",
            "date": "09/11/2020",
            "cases": 207,
            "death": 87,
            "recovered": 253
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

	db.remove({}, { multi: true });
	
	db.insert(covid19_tracking_germanyArray_initial_data);
	
	//Lanzamos el código 200 indicando que se han cargado los datos iniciales de forma satisfactoria
	//(Lo indicamos con el 200 por consola, y con un pequeño html para el usuario de forma gráfica)

	res.sendStatus(200);

});



//1)GET a la lista de recursos devuelve una lista con todos los recursos
//(GET para cargar el array completo)

app.get(BASE_API_PATH + "/covid19-tracking-germany", (req,res) => {
	
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

	// Búsqueda por campos
	if (req.query.state) query["state"] = req.query.state;
	if (req.query.county) query["county"] = req.query.county;
	if (req.query.agegroup) query["agegroup"] = req.query.agegroup;
	if (req.query.gender) query["gender"] = req.query.gender;
	if (req.query.date) query["date"] = req.query.date;
	if (req.query.cases) query["cases"] = parseInt(req.query.cases);
	if (req.query.death) query["death"] = parseInt(req.query.death);
	if (req.query.recovered) query["recovered"] = parseInt(req.query.recovered);

	db.find(query).sort({ state: 1, county: -1}).skip(offset).limit(limit).exec(function (err, resources) {
		if (err) {
			console.error(DATABASE_ERR_MSSG + err);
			res.sendStatus(500);
		} else {
			if (resources.length != 0) {
				
				var aux = resources.map((c)=>{
				return {state : c.state, county: c.county, agegroup: c.agegroup, gender: c.gender, date: c.date, cases: c.cases, death: c.death, recovered: c.recovered}
				
				});
				res.status(200).send(aux);

			

			} else {
				var array = [];
				res.status(404).send("Elemento(s) no encontrado(s)");
			}

		}

	});
});
	

//2)POST  a la lista de recursos (para introducir nuevos arrays de datos)

app.post(BASE_API_PATH+"/covid19-tracking-germany", (req,res)=>{
	
	var data = req.body;
	
	var esta =false;
	var bodyok= true;
	
	
	
	
	db.find({state:String(req.body.state), county:String(req.body.county)}, function(err, record) {
    	
		
		if (record.length!=0) {
       	 esta=true;
			
			res.sendStatus(409);
    
		}else{
			
			// -----------------Comprueba body------------------------ 
				var cantidadDeClaves = Object.keys(data).length;
			
				if(cantidadDeClaves!=8){
					bodyok = false;
				}
	
		
				var aux = Object.keys(data);
	
				if(aux[0]!="state"|| aux[1]!= "county" || aux[2]!= "agegroup"|| aux[3]!= "gender" || aux[4] != "date" || aux[5] != "cases" || aux[6] != "death" || aux[7] != "recovered"){
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


app.get(BASE_API_PATH

+"/covid19-tracking-germany/:state/:county", (req,res)=>{ 
		
		
	db.find({state:String(req.params.state), county:String(req.params.county)}, function(err, record) {
		
		console.log(record);
		
		if (record.length==0) {
       	
			res.sendStatus(404);
    
		}else{
		
			var aux = record.map((c)=>{
				return {state : c.state, county: c.county, agegroup: c.agegroup, gender: c.gender, date: c.date, cases: c.cases, death: c.death, recovered: c.recovered  }
			});
			res.status(200).send(aux[0]);
		}
		
		});
	
	
	
	
});


//4) DELETE a un recurso, borra ese recurso (en concreto)
//En nuestro caso, borramos el recurso por estado y año

app.delete(BASE_API_PATH

+"/covid19-tracking-germany/:state/:county", function(req, res) { 
	//Si el 'estado' y 'año' coinciden con los recibidos o dados, se elimina ese recurso
	
	
	db.remove({state:String(req.params.state), county:String(req.params.county)},{},(err, numEvictionsRemoved)=>{
			
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
//actualizamos los que coincidan con 'state' y 'county'


console.log("G");app.put(BASE_API_PATH+"/covid19-tracking-germany/:state/:county", function(req,res) { 

	console.log("H");	var data = req.body;
	
	var esta = false;
	var bodyok = true;
	
	var aux = Object.keys(data);
	
		if(aux[0]!="state"|| aux[1]!= "county" || aux[2]!= "agegroup"|| aux[3]!= "gender" || aux[4] != "date" || aux[5] != "cases" || aux[6] != "death" || aux[7] != "recovered"){
			bodyok =false;
		}
	
		console.log("I");db.find({state:String(req.params.state), county:String(req.params.county)}, function(err, record) {
		
			console.log("J");	//console.log(record);
		if(err!=null){
				console.error("ERROR deleting DB evictions in DELETE: "+err);
				res.sendStatus(500);
		}else{
			
			if (record.length==0) {
       	
				res.sendStatus(404);
    
			}else{
			
				if(!bodyok){
					
					console.log("K"); res.sendStatus(400);
					
				}else{
					
					if(String(req.params.state) !=  req.body.state || String(req.params.county) !=  req.body.county  ){
					   
						
						res.sendStatus(409);
						
					   }else{
					   
						   
						   db.update({state:String(req.params.state), county:String(req.params.county)}, 
							  {state:String(req.params.state), county:String(req.params.county), agegroup:String(req.body.agegroup), gender:  req.body.gender, 
							 	date: req.body.date, cases: req.body.cases, death: req.body.death, recovered: req.body.recovered}, {}, function (err, numReplaced) {
										
						if(err) {
							console.error(err);
							res.sendStatus(500);
						}else{
							res.sendStatus(200);
							
							console.log("L");}
								
					
					});
						   
						   
						   
					   }
					
					
					
				}
				
			}
			
		}
		
		
		console.log("l");});
	
});
console.log("M");
console.log("N");

//6)POST a un recurso (en concreto), debe de dar un error de método no permitido 
    
app.post(BASE_API_PATH +"/covid19-tracking-germany/:county/:fips", function(req, res) { 
    
        res.sendStatus(405); 
    });



    app.post(BASE_API_PATH+"/covid19-tracking-germany/:state", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/state");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_API_PATH+"/covid19-tracking-germany/:county", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/county");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_API_PATH+"/covid19-tracking-germany/:agegroup", (req,res)=>{
        console.log("NEW POST ...../oil-production-stats/agegroup");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_API_PATH+"/covid19-tracking-germany/:gender", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/gender");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_API_PATH+"/covid19-tracking-germany/:deaths", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/deaths");
        res.status(405).send("NOT ALLOWED");
    })

	app.post(BASE_API_PATH+"/covid19-tracking-germany/:date", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/date");
        res.status(405).send("NOT ALLOWED");
    })


	app.post(BASE_API_PATH+"/covid19-tracking-germany/:cases", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/cases");
        res.status(405).send("NOT ALLOWED");
    })

	app.post(BASE_API_PATH+"/covid19-tracking-germany/:death", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/death");
        res.status(405).send("NOT ALLOWED");
    })

	app.post(BASE_API_PATH+"/covid19-tracking-germany/:recovered", (req,res)=>{
        console.log("NEW POST ...../covid19-tracking-germany/recovered");
        res.status(405).send("NOT ALLOWED");
    })

  

//6)POST a un recurso (en concreto), debe de dar un error de método no permitido 

app.post(BASE_API_PATH+"/covid19-tracking-germany/:state/:county", function(req, res) { 

	res.sendStatus(405); 
});


//7)PUT a la lista de recursos (completa) debe dar un error de no permitido

app.put(BASE_API_PATH+"/covid19-tracking-germany", function(req, res) { 

	res.sendStatus(405); 
});

//8)DELETE a la lista de recursos (completa) borra todos los recursos
//En otras palabras, borramos todos los elementos existentes en el array inicial

app.delete(BASE_API_PATH

+"/covid19-tracking-germany", (req,res)=>{
		
	db.remove({}, { multi: true }, function(err, numDeleted) {
     console.log('Deleted', numDeleted, 'user(s)');
}); 
	res.sendStatus(200);

});
	 
	 
 }

 console.log("O");