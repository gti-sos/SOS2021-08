var BASE_API_PATH = "/api/v1"; //tipo de recurso

var DataStore = require("nedb");
var db = new DataStore({ filename: "./src/back/antcarbar1API/usCovid.db", autoload: true });

module.exports.register = (app, BASE_API_PATH

    ) => {
    
    var us_counties_covid19_daily = [];

    app.get("/info/us_counties_covid19_daily", (req, res) =>{
        res.send("<html> <body> <table><thead><tr><th>date</th><th>county</th><th>state</th><th>fips</th><th>cases</th><th>deaths</th></tr></thead><tbody><tr><td>2020-01-21</td><td>Snohomish</td><td>Washington</td><td>53061</td><td>1</td><td>0</td></tr><tr><td>2020-01-22</td><td>Snohomish</td><td>Washington</td><td>53061</td><td>1</td><td>0</td></tr><tr><td>2020-01-23</td><td>Snohomish</td><td>Washington</td><td>53061</td><td>1</td><td>0</td></tr><tr><td>2020-01-24</td><td>Cook</td><td>Illinois</td><td>17031</td><td>1</td><td>0</td></tr><tr><td>2020-01-25</td><td>Snohomish</td><td>Washington</td><td>53061</td><td>1</td><td>0</td></tr></tbody></table> <h6>Por Antonio Carranza</h6> </body> </html>")
        console.log("New request to /info/us_counties_covid19_daily has arrived");

    });

    app.get(BASE_API_PATH
        +"/us_counties_covid19_daily/loadInitialData", (req,res)=>{ 

            var us_counties_covid19_dailyInitial = [
            
                    {
                        "date": "2020-01-21",
                        "county": "Snoomish",
                        "state": "Washington",
                        "fips": 56061.0,
                        "cases":1,
                        "deaths":0
                        },
                        {
                        "date": "2020-01-25",
                        "county": "Orange",
                        "state": "California",
                        "fips": 6059.0,
                        "cases":1,
                        "deaths":0
                    },
                    {
                        "date": "2020-01-26",
                        "county": "Maricopa",
                        "state": "Arizona",
                        "fips": 4013.0,
                        "cases":1,
                        "deaths":0
                    } ,  
                
                    {
                        "date": "2020-01-28",
                        "county": "Los Angeles",
                        "state": "California",
                        "fips": 6037.0,
                        "cases":1,
                        "deaths":0
                    },
                    {
                        "date": "2020-02-28",
                        "county": "Napa",
                        "state": "California",
                        "fips":6055.0,
                        "cases":1,
                        "deaths":0.0
                    },
                    {
                    "date":"2020-03-04",
                    "county": "Washington",
                    "state":"Oregon",
                    "fips":41067.0,
                    "cases":2,
                    "deaths":0.0
                    },   
                {

                    "date":"2020-03-07",
                    "county":"Polk",
                    "state":"Georgia",
                    "fips":13233.0,
                    "cases":1,
                    "deaths":0.0

                }


                ];
        
            
        
            
            db.insert(us_counties_covid19_dailyInitial);
            
            //Lanzamos el código 200 indicando que se han cargado los datos iniciales de forma satisfactoria
            //(Lo indicamos con el 200 por consola, y con un pequeño html para el usuario de forma gráfica)
        
            res.sendStatus(200);
        
        });

        app.get(BASE_API_PATH

            + "/us_counties_covid19_daily", (req,res) => {
               
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
                   if (req.query.county) query["county"] = req.query.county;
                   if (req.query.state) query["state"] = req.query.state;
                   if (req.query.fips) query["fips"] = req.query.fips;
                   if (req.query.cases) query["cases"] = req.query.cases;
                   if (req.query.deaths) query["deaths"] = req.query.deaths;
               
                db.find(query).sort({ state: 1, county: -1}).skip(offset).limit(limit).exec(function (err, resources) {
                       if (err) {
                           console.error(DATABASE_ERR_MSSG + err);
                           res.sendStatus(500);
                       } else {
                           if (resources.length != 0) {
                              
                               var aux = resources.map((c)=>{
                           return {date : c.date, county: c.county, state: c.state, fips: c.fips, cases: c.cases, deaths: c.deaths}
                       
                               res.status(200).send(aux);
                               
                               
                               });
           
                               // res.status(200).send(JSON.stringify(resourcesToSend, null, 2));
                               res.status(200).send(aux);
                           }   else {
                            let mensaje = "No existen datos cargados"
                            res.status(404).send(mensaje);
                        }
        
                       }
           
                   });
               });




    app.post(BASE_API_PATH+"/us_counties_covid19_daily", (req,res)=>{
	
                var data = req.body;
                
                var esta =false;
                var bodyok= true;
                
                
                
                
                db.find({county:String(req.body.county), fips:parseInt(req.body.fips)}, function(err, record) {
                    
                    
                    if (record.length!=0) {
                        esta=true;
                        
                        res.sendStatus(409);
                
                    }else{
                        
                        // -----------------Comprueba body------------------------ 
                            var cantidadDeClaves = Object.keys(data).length;
                        
                            if(cantidadDeClaves!=6){
                                bodyok = false;
                            }
                
                    
                            var aux = Object.keys(data);
                
                            if(aux[0]!="date"|| aux[1]!= "county" || aux[2]!= "state"|| aux[3]!= "fips" || aux[4] != "cases" || aux[5] != "deaths" ){
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

    +"/us_counties_covid19_daily/:county/:fips", (req,res)=>{ 
            
            
        db.find({county:String(req.params.county), fips:parseInt(req.params.fips)}, function(err, record) {
            
            console.log(record);
            
            if (record.length==0) {
                res.sendStatus(404);
        
            }else{
            
                var aux = record.map((c)=>{
                    return {date : c.date, county: c.county, state: c.state, fips: c.fips, cases: c.cases, deaths: c.deaths  }
                });
                res.status(200).send(aux[0]);
            }
            
            });
        
        
        
        
    });



    app.delete(BASE_API_PATH

        +"/us_counties_covid19_daily/:county/:fips", function(req, res) { 
            //Si el 'estado' y 'año' coinciden con los recibidos o dados, se elimina ese recurso
            
            
            db.remove({county:String(req.params.county), fips:parseFloat(req.params.fips)},{},(err, numEvictionsRemoved)=>{
                    
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


    app.put(BASE_API_PATH +"/us_counties_covid19_daily/:county/:fips", function(req,res) { 

        var data = req.body;
        
        var esta = false;
        var bodyok = true;
        
        var aux = Object.keys(data);
        
           
        if(aux[0]!="date"|| aux[1]!= "county" || aux[2]!= "state"|| aux[3]!= "fips" || aux[4] != "cases" || aux[5] != "deaths" ){
            bodyok =false;
            }
        
        db.find({county:String(req.params.county), fips:parseFloat(req.params.fips)}, function(err, record) {
            
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
                        
                        if(String(req.params.county) !=  req.body.county || req.params.fips  !=  req.body.fips  ){
                        
                            
                            res.sendStatus(409);
                            
                        }else{
                        
                            
                            db.update({county:String(req.params.county), fips:req.params.fips}, 
                                {date:String(req.body.date),county:String(req.params.county), state:String(req.body.state), fips:req.params.fips, 
                                     cases:req.body.cases, deaths:req.body.deaths}, {}, function (err, numReplaced) {
                                            
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
     //GET a un recurso concreto ERROR 1
     app.get(BASE_API_PATH+"/us_counties_covid19_daily/:data", (req, res) => {
        console.error("No se puede buscar por el recurso pedido");
        res.sendStatus(400);
    });



//6)POST a un recurso (en concreto), debe de dar un error de método no permitido 
    
    app.post(BASE_API_PATH

    +"/us_counties_covid19_daily/:county/:fips", function(req, res) { 
    
        res.sendStatus(405); 
    });



    app.post(BASE_API_PATH+"/us_counties_covid19_daily/:county", (req,res)=>{
        console.log("NEW POST ...../us_counties_covid19_daily/county");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_API_PATH+"/us_counties_covid19_daily/:state", (req,res)=>{
        console.log("NEW POST ...../us_counties_covid19_daily/state");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_API_PATH+"/us_counties_covid19_daily/:fips", (req,res)=>{
        console.log("NEW POST ...../oil-production-stats/fips");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_API_PATH+"/us_counties_covid19_daily/:cases", (req,res)=>{
        console.log("NEW POST ...../us_counties_covid19_daily/cases");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_API_PATH+"/us_counties_covid19_daily/:deaths", (req,res)=>{
        console.log("NEW POST ...../us_counties_covid19_daily/deaths");
        res.status(405).send("NOT ALLOWED");
    })

    app.post(BASE_API_PATH+"/us_counties_covid19_daily/:county/:fips", (req,res)=>{
        console.log("NEW POST ...../us_counties_covid19_daily/county/fips");
        res.status(405).send("NOT ALLOWED");
    });

    app.put(BASE_API_PATH+"/us_counties_covid19_daily", (req,res)=>{
        console.log("NEW PUT ...../us_counties_covid19_daily");
        res.status(405).send("NOT ALLOWED");
    })

//7)PUT a la lista de recursos (completa) debe dar un error de no permitido

app.put(BASE_API_PATH

    +"/us_counties_covid19_daily", function(req, res) { 
    
        res.sendStatus(405); 
    });


  // DELETE a lista
  app.delete(BASE_API_PATH+"/us_counties_covid19_daily", (req,res)=>{
    db.remove({}, {multi:true}, function (err,numRemoved) {
        if (err) {
            console.error("ERROR deleting DB usCovidDB in DELETE");
            res.sendStatus(500);
        }else{
            if(numRemoved == 0){
                console.error("ERROR usCovidDB not found");
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        }
    });
    
});
             
             
}
    

/*
var BASE_API_PATH = "/api/v1"; //tipo de recurso

var DataStore = require("nedb");
var db = new DataStore();
var path = require('path');
var us_counties_covid19_dailyInitial= [];




module.exports.register = (app) => {

    var us_counties_covid19_dailyInitial = [
        {
            "date": "2020-01-21",
            "county": "Snoomish",
            "state": "Washington",
            "fips": 56061.0,
            "cases":1,
            "deaths":0
            },
            {
            "date": "2020-01-25",
            "county": "Orange",
            "state": "California",
            "fips": 6059.0,
            "cases":1,
            "deaths":0
        },
        {
            "date": "2020-01-26",
            "county": "Maricopa",
            "state": "Arizona",
            "fips": 4013.0,
            "cases":1,
            "deaths":0
        } ,  
    
        {
            "date": "2020-01-28",
            "county": "Los Angeles",
            "state": "California",
            "fips": 6037.0,
            "cases":1,
            "deaths":0
        }
    
    ];


    app.get("/info/us_counties_covid19_daily", (req, res) =>{
        res.send("<html> <body> <table><thead><tr><th>date</th><th>county</th><th>state</th><th>fips</th><th>cases</th><th>deaths</th></tr></thead><tbody><tr><td>2020-01-21</td><td>Snohomish</td><td>Washington</td><td>53061</td><td>1</td><td>0</td></tr><tr><td>2020-01-22</td><td>Snohomish</td><td>Washington</td><td>53061</td><td>1</td><td>0</td></tr><tr><td>2020-01-23</td><td>Snohomish</td><td>Washington</td><td>53061</td><td>1</td><td>0</td></tr><tr><td>2020-01-24</td><td>Cook</td><td>Illinois</td><td>17031</td><td>1</td><td>0</td></tr><tr><td>2020-01-25</td><td>Snohomish</td><td>Washington</td><td>53061</td><td>1</td><td>0</td></tr></tbody></table> <h6>Por Antonio Carranza</h6> </body> </html>")
        });

////////////////////////Antonio Carranza Barroso///////////////////////////////////////

 //GET loadInitialData
		

    app.get(BASE_API_PATH+ "/us_counties_covid19_daily/loadInitialData", (req,res)=>{ 
        
        db.remove({},{multi:true},function(err,numRemoved){});
        db.insert(us_counties_covid19_dailyInitial);
        res.sendStatus(200);
        console.log("Initial data loaded:"+JSON.stringify(us_counties_covid19_dailyInitial,null,2));
        });
    


    //GET a toda la lista de recursos
    app.get(BASE_API_PATH+"/us_counties_covid19_daily", (req, res) =>{
        
        var query = req.query;
        var offset = query.offset;
        var limit = query.limit;
        delete query.offset;
        delete query.limit;

        //Pasamos los atributos de la query a Int
     
        if(query.hasOwnProperty("fips")){
            query.fips = parseFloat(query.fips);
        }

        if(query.hasOwnProperty("cases")){
            query.cases = parseInt(query.cases);
        }
        if(query.hasOwnProperty("deaths")){
            query.deaths = parseInt(query.deaths);
        }

        db.find(query).skip(offset).limit(limit).exec((err, usCovidDB) => {
            if(err){
                console.error("ERROR accesing DB in GET");
                res.sendStatus(500);
            }
            else{
                if(usCovidDB.length == 0){
                    console.error("No data found");
                    res.sendStatus(404);
                }
                else{
                    var dataToSend = usCovidDB.map((c)=>{
                        return {date : c.date, county : c.county, state : c.state, fips : c.fips, cases : c.cases, deaths : c.deaths};
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
     app.get(BASE_API_PATH+"/us_counties_covid19_daily/:county/:fips", (req, res) => {
        var reqCounty = req.params.county;
        var reqFips = parseFloat(req.params.fips);
        
        db.find({county: reqCounty, fips: reqFips}, {_id: 0}, function (err, data) {
            if (err) {
                console.error("ERROR in GET");
                res.sendStatus(500);
            } else {
                if (data.length == 0) {
                    console.error("No data found");
                    res.sendStatus(404);
                } else {
                    var send = data[0];
                    console.log(`NEW GET to <${reqCounty}>, <${reqFips}>`);
                    res.status(200).send(JSON.stringify(send, null, 2));
                }
            }
        });
    });


 





    //GET a un recurso concreto ERROR 1
     app.get(BASE_API_PATH+"/us_counties_covid19_daily/:data", (req, res) => {
        console.error("No se puede buscar por el recurso pedido");
        res.sendStatus(400);
    });


     //POST para crear un nuevo recurso en nuestra lista

     app.post(BASE_API_PATH+"/us_counties_covid19_daily", (req, res) => {
        console.log("New POST .../us_counties_covid19_daily");
        var newData = req.body;
        var county = req.body.county;
        var fips = parseFloat(req.body.fips);
        db.find({"county":county, "fips":fips}).exec((err, data)=>{
            if(err){
                console.error("ERROR in GET");
                res.sendStatus(500);
            }else {
                if(data.length == 0){
                    if (Object.keys(newData).length != 6){
                        console.log("El dato no es correcto");
                        return res.sendStatus(400);
                    }else{
                        console.log("Data imput:"+JSON.stringify(newData, null, 2));
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
//Delete de elementos por county y fips

app.delete(BASE_API_PATH+"/us_counties_covid19_daily/:county/:fips", (req,res)=>{
		console.log("NEW DELETE .....us_counties_covid19_daily/:county/:fips");
			var reqCounty = req.params.county;
            var reqFips = parseFloat(req.params.fips);
		
			db.remove({county:reqCounty, fips:reqFips },{multi:true}, (err, salida) => {
				if(salida==1){
					console.log("Recurso eliminado");
					res.sendStatus(200);
				}else{
					console.log("Recurso no encontrado");
					res.sendStatus(404);
				}
			});
	});


    
    // PUT a county/fips
    app.put( BASE_API_PATH+"/us_counties_covid19_daily/:county/:fips",(req,res)=>{
        console.log("New PUT ...//us_counties_covid19_daily/:county/:fips");

        var county = req.params.county;
	    var fips = parseFloat(req.params.fips);
	    var newData = req.body;
	    var query = {"county":county, "fips":parseFloat(fips)};
            if (!newData['date'] 
            ||!newData.county 
            || !newData['state'] 
            || !newData.fips 
            || !newData['cases'] 
            || !newData['deaths']
            || Object.keys(newData).length != 6){
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
    app.post(BASE_API_PATH+"/us_counties_covid19_daily/:date", (req,res)=>{
        console.log("NEW POST ...../us_counties_covid19_daily/date");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_API_PATH+"/us_counties_covid19_daily/:county", (req,res)=>{
        console.log("NEW POST ...../us_counties_covid19_daily/county");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_API_PATH+"/us_counties_covid19_daily/:state", (req,res)=>{
        console.log("NEW POST ...../us_counties_covid19_daily/state");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_API_PATH+"/us_counties_covid19_daily/:fips", (req,res)=>{
        console.log("NEW POST ...../oil-production-stats/fips");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_API_PATH+"/us_counties_covid19_daily/:cases", (req,res)=>{
        console.log("NEW POST ...../us_counties_covid19_daily/cases");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_API_PATH+"/us_counties_covid19_daily/:deaths", (req,res)=>{
        console.log("NEW POST ...../us_counties_covid19_daily/deaths");
        res.status(405).send("NOT ALLOWED");
    })

    app.post(BASE_API_PATH+"/us_counties_covid19_daily/:county/:fips", (req,res)=>{
        console.log("NEW POST ...../us_counties_covid19_daily/county/fips");
        res.status(405).send("NOT ALLOWED");
    });

    app.put(BASE_API_PATH+"/us_counties_covid19_daily", (req,res)=>{
        console.log("NEW PUT ...../us_counties_covid19_daily");
        res.status(405).send("NOT ALLOWED");
    })



       // DELETE a lista
       app.delete(BASE_API_PATH+"/us_counties_covid19_daily", (req,res)=>{
        db.remove({}, {multi:true}, function (err,numRemoved) {
            if (err) {
                console.error("ERROR deleting DB usCovidDB in DELETE");
                res.sendStatus(500);
            }else{
                if(numRemoved == 0){
                    console.error("ERROR usCovidDB not found");
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                }
            }
        });
        
    });


}*/
/*

var BASE_API_PATH = "/api/v1"; //tipo de recurso
var Datastore = require("nedb");
var db = new Datastore({ filename: "./src/back/antcarbar1API/usCovid.db", autoload: true });

 
 module.exports.register = (app, BASE_API_PATH) => {
	 
	 var us_counties_covid19_dailyInitial = [];
	 
	 //GET para cargar (o meter) los datos iniciales (todo en JSON)
    //(de modo que cree 2 o más elementos)
/*
    app.get(BASE_API_PATH +"/us_counties_covid19_daily/loadInitialData", (req,res)=>{ 

        var us_counties_covid19_dailyInitial = [
            
            {
                "date": "2020-01-21",
                "county": "Snoomish",
                "state": "Washington",
                "fips": 56061.0,
                "cases":1,
                "deaths":0
                },
                {
                "date": "2020-01-25",
                "county": "Orange",
                "state": "California",
                "fips": 6059.0,
                "cases":1,
                "deaths":0
            },
            {
                "date": "2020-01-26",
                "county": "Maricopa",
                "state": "Arizona",
                "fips": 4013.0,
                "cases":1,
                "deaths":0
            } ,  
        
            {
                "date": "2020-01-28",
                "county": "Los Angeles",
                "state": "California",
                "fips": 6037.0,
                "cases":1,
                "deaths":0
            }
        ];

        db.insert(us_counties_covid19_dailyInitial);

        //Lanzamos el código 200 indicando que se han cargado los datos iniciales de forma satisfactoria
        //(Lo indicamos con el 200 por consola, y con un pequeño html para el usuario de forma gráfica)

        res.status(200).send("Initial data loaded succesfully!");

    });



    
/*
    app.get(BASE_API_PATH+ "/us_counties_covid19_daily/loadInitialData", (req,res)=>{ 
        
        [
            
            {
                "date": "2020-01-21",
                "county": "Snoomish",
                "state": "Washington",
                "fips": 56061.0,
                "cases":1,
                "deaths":0
                },
                {
                "date": "2020-01-25",
                "county": "Orange",
                "state": "California",
                "fips": 6059.0,
                "cases":1,
                "deaths":0
            },
            {
                "date": "2020-01-26",
                "county": "Maricopa",
                "state": "Arizona",
                "fips": 4013.0,
                "cases":1,
                "deaths":0
            } ,  
        
            {
                "date": "2020-01-28",
                "county": "Los Angeles",
                "state": "California",
                "fips": 6037.0,
                "cases":1,
                "deaths":0
            }
        ];
        db.remove({},{multi:true},function(err,numRemoved){});
        db.insert(us_counties_covid19_dailyInitial);
        res.sendStatus(200);
        console.log("Initial data loaded:"+JSON.stringify(us_counties_covid19_dailyInitial,null,2));
        });
    
    //1)GET a la lista de recursos devuelve una lista con todos los recursos
    //(GET para cargar el array completo)

   

    app.get(BASE_API_PATH + "/us_counties_covid19_daily", (req,res) => {
        
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
            if (req.query.county) query["county"] = req.query.county;
            if (req.query.state) query["state"] = req.query.state;
            if (req.query.fips) query["fips"] =req.query.fips;
            if (req.query.cases) query["cases"] = req.query.cases;
            if (req.query.deaths) query["deaths"] = req.query.deaths;
           


        
        db.find(query).sort({ state: 1, year: -1 }).skip(offset).limit(limit).exec(function (err, resources) {
                if (err) {
                    console.error(DATABASE_ERR_MSSG + err);
                    res.sendStatus(500);
                } else {
                    if (resources.length != 0) {
                    
                        var aux = resources.map((c)=>{
                    return {state: c.state,year:c.year, homicide_by_firearm: c.homicide_by_firearm,handgun: c.handgun, rifle:c.rifle, shotgun: c.shotgun, type_not_stated: c.type_not_stated  }
                
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



    app.post(BASE_API_PATH+"/us_counties_covid19_daily", (req,res)=>{
	
        var data = req.body;
        
        var esta =false;
        var bodyok= true;
        
        db.find({state:String(req.body.county), year:String(req.body.fips) }, function(err, record) {
            
            
            if (record.length!=0) {
                esta=true;
                
                res.status(409).send("Error. Ya Existe un recurso con el mismo condado y fips.");
        
            }else{
                
                // -----------------Comprueba body------------------------ 
                    var cantidadDeClaves = Object.keys(data).length;
                
                    if(cantidadDeClaves!=7){
                        bodyok = false;
                    }
        
            
                    var aux = Object.keys(data);
        
                    if(aux[0]!="date"|| aux[1]!= "county" || aux[2]!= "state"|| aux[3]!= "fips" || aux[4] != "cases" || aux[5] != "shotgun" || aux[6] != "deaths"){
                        bodyok =false;
                    }
                // ------------------------------------------------------- 
                
                if(bodyok){
            
                    db.insert(data);
                    //"Metemos" en el array de datos para este recurso lo recibido en el POST
                    res.status(201).send("Recurso añadido satisfactoriamente");
            
                }else if(!bodyok){
                 
                    res.status(400).send("Error. El formato del body es Erroneo");
                }
                
                }
            
        
        
        });  
        
    });



    //3) GET a un recurso (en concreto), devuelve ese recurso
    //En nuestro caso, accedemos a los elementos por estado y año (p ej)

    app.get(BASE_API_PATH+"/us_counties_covid19_daily/:county/:fips", (req,res)=>{ 
		
		
        db.find({county:String(req.params.county), fips:String(req.params.fips)  }, function(err, record) {
            
            console.log(record);
            
            if (record.length==0) {
               
                res.status(404).send("No hemos encontrado el recurso");
        
            }else{
                
			var aux = record.map((c)=>{
				return {date: c.date,county:c.county, state: c.state,fips: c.fips, cases:c.cases, deaths: c.deaths }
			});
            if (aux.length == 1) {
                res.status(200).send(aux[0]);
            }else{
                res.status(200).send(aux);
            }

            }
            
            });
        
        
    });
    

    //4) DELETE a un recurso, borra ese recurso (en concreto)
    //En nuestro caso, borramos el recurso por estado y año

    app.delete(BASE_API_PATH+"/us_counties_covid19_daily/:county/:fips", function(req, res) { 
        //Si el 'estado' y 'año' coinciden con los recibidos o dados, se elimina ese recurso
        
        
        db.remove({county:String(req.params.county), fips:String(req.params.fips)},{},(err, numEvictionsRemoved)=>{
                
            console.log(err);
            
            if(err!=null){
                    console.error("ERROR: "+err);
                    res.sendStatus(500);
                }else{
                    if(numEvictionsRemoved==0){
                        res.status(404).send("No hemos encontrado el recurso");
                    }else{
                        res.status(200).send("Recurso eliminado satisfactoriamente");
                    }
                }
            })
        
    });


    //5) PUT a un recurso (en concreto), actualiza ese recurso
    //actualizamos los que coincidan con 'state' y 'year'

    app.put(BASE_API_PATH+"/us_counties_covid19_daily/:county/:fips", function(req,res) { 

        var data = req.body;
        
        var esta = false;
        var bodyok = true;
        
        var aux = Object.keys(data);
        
            if(aux[0]!="date"|| aux[1]!= "county" || aux[2]!= "state"|| aux[3]!= "fips" || aux[4] != "cases" || aux[5] != "deaths" ){
                bodyok =false;
            }
        
        db.find({county:String(req.params.county), fips:String(req.params.fips)  }, function(err, record) {
            
            console.log(record);
            if(err!=null){
                    console.error("ERROR deleting DB evictions in DELETE: "+err);
                    res.sendStatus(500);
            }else{
                
                
                if (record.length==0) {
               
                    res.status(404).send("No hemos encontrado el recurso");
        
                }else{
                
                    if(!bodyok){
                        
                         res.status(400).send("Error. El formato del body es Erroneo");
                        
                    }else{
                        
                        if(String(req.params.county) !=  req.body.county || String(req.params.fips) !=  req.body.fips  ){
                           
                            
                            res.status(409).send("Conflicto. Los identificadores de county y fips deben ser iguales");
                            
                           }else{
                           
                               
                               db.update({county:String(req.params.county), fips:String(req.params.fips)}, 
                                  {date:String(req.params.date), county:String(req.params.county),state: req.body.state, fips: req.body.fips, 
                                    cases: req.body.cases, deaths: req.body.deaths}, {}, function (err, numReplaced) {
                                            
                            if(err) {
                                console.error(err);
                                res.status(500).send("Error en la base de datos");
                            }else{
                                res.status(200).send(String(req.params.county)+" "+String(req.params.fips)+" Ha sido actualizado exitosamente");
                                
                            }
                                    
                        
                        });
                               
                               
                               
                           }
                        
                        
                        
                    }
                    
                }
                
            }
            
            
            });
        
        
        
        
    });
    




    //6)POST a un recurso (en concreto), debe de dar un error de método no permitido 

    app.post(BASE_API_PATH+"/us_counties_covid19_daily/:county/:fips", function(req, res) { 

        res.status(405).send("Metodo no permitido"); 
    });


    //7)PUT a la lista de recursos (completa) debe dar un error de no permitido

    app.put(BASE_API_PATH+"/us_counties_covid19_daily", function(req, res) { 

        res.status(405).send("Metodo no permitido"); 
    });

    //8)DELETE a la lista de recursos (completa) borra todos los recursos
    //En otras palabras, borramos todos los elementos existentes en el array inicial

    app.delete(BASE_API_PATH+"/us_counties_covid19_daily", (req,res)=>{
		
        db.remove({}, { multi: true }, function(err, numDeleted) {
         console.log('Deleted', numDeleted, 'user(s)');
    }); 
        res.status(200).send("Lista de recursos eliminada satisfactoriamente");
    
    });
         
         
     



    
}
*/