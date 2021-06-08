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
                        "deaths":5
                        },
                        {
                        "date": "2020-01-25",
                        "county": "Orange",
                        "state": "California",
                        "fips": 6059.0,
                        "cases":1,
                        "deaths":3
                    },
                    {
                        "date": "2020-01-26",
                        "county": "Maricopa",
                        "state": "Arizona",
                        "fips": 4013.0,
                        "cases":1,
                        "deaths":12
                    } ,  
                
                    {
                        "date": "2020-01-28",
                        "county": "Los Angeles",
                        "state": "California",
                        "fips": 6037.0,
                        "cases":1,
                        "deaths":2
                    },
                    {
                        "date": "2020-02-28",
                        "county": "Napa",
                        "state": "California",
                        "fips":6055.0,
                        "cases":1,
                        "deaths":8
                    },
                    {
                    "date":"2020-03-04",
                    "county": "Washington",
                    "state":"Oregon",
                    "fips":41067.0,
                    "cases":2,
                    "deaths":20
                    },   
                {

                    "date":"2020-03-07",
                    "county":"Polk",
                    "state":"Georgia",
                    "fips":13233.0,
                    "cases":1,
                    "deaths":40

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
                   if (req.query.fips) query["fips"] = parseInt(req.query.fips);
                   if (req.query.cases) query["cases"] = parseInt(req.query.cases);
                   if (req.query.deaths) query["deaths"] = parseInt(req.query.deaths);
               
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
    
