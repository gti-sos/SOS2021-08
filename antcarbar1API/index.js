var BASE_API_PATH = "/api/v1"; //tipo de recurso

var DataStore = require("nedb");
var db = new DataStore();

var us_counties_covid19_dailyArray= [];





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
        if(query.hasOwnProperty("date")){
            query.date = query.date;
        }
        if(query.hasOwnProperty("county")){
            query.county = query.county;
        }
        if(query.hasOwnProperty("state")){
            query.state = query.state;
        }
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
                    if (!newData.county 
                        || !newData.fips 
                        || !newData['state'] 
                        || !newData['cases'] 
                        || !newData['deaths']
                        || !newData['date']
                        || Object.keys(newData).length != 6){
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




app.post(BASE_API_PATH+ "/us_counties_covid19_daily", (req,res)=>{  
    var newState = req.body;  
    console.log(`new state added: <${JSON.stringify(newState,null,2)}>`);

    us_counties_covid19_dailyArray.push(newState);
    us_counties_covid19_daily.push(newState);

    res.sendStatus(201);

})//6.3

//Delete de elementos por state

app.delete(BASE_API_PATH+"/us_counties_covid19_daily/:state", function(req, res) { 

    //Se hace un filtrado por pais, eliminando aquellos que coinciden con el pais dado
    us_counties_covid19_dailyArray = us_counties_covid19_dailyArray.filter(function(e){ 
        return e.state!==String(req.params.state);
    });
    res.status(200).send("Eliminacion correcta");
});//6.4


//Put modificar elemento

app.put(BASE_API_PATH+"/us_counties_covid19_daily/:state", function(req, res) { 

    //Recorremos el array en busca del elemento a modificar
    for(var e in us_counties_covid19_dailyArray){
        if(us_counties_covid19_dailyArray[e].state == String(req.params.state)){
                var newData = req.body;
                us_counties_covid19_dailyArray[e] = newData;
                break;
        }
    }

    //Eliminamos repetidos en caso de que se haya realizado un cambio para añadirlo

    us_counties_covid19_dailyArray = us_counties_covid19_dailyArray.map(e => JSON.stringify(e)); //Lo pasamos a JSON para poder compararlos

    us_counties_covid19_dailyArray = new Set(us_counties_covid19_dailyArray); //Lo convertimos a conjunto para eliminar repetidos

    us_counties_covid19_dailyArray = [...us_counties_covid19_dailyArray] //Lo convertimos de nuevo a array

    us_counties_covid19_dailyArray = us_counties_covid19_dailyArray.map(e => JSON.parse(e)) //Lo pasamos de nuevo a objetos

    res.status(200).send("Modificacion correcta");
});//6.5
    

app.post(BASE_API_PATH+"/us_counties_covid19_daily/:totalsamples", function(req, res) { 

    res.status(405).send("Metodo no permitido"); //Method not allowed
});//6.6

//Put ERRONEO array de elementos

app.put(BASE_API_PATH+"/us_counties_covid19_daily", function(req, res) { 

    res.status(405).send("Metodo no permitido"); //Method not allowed
});//6.7

//Delete del array completo

app.delete(BASE_API_PATH+"/us_counties_covid19_daily", (req,res)=>{
		
    us_counties_covid19_dailyArray = []; // vaciamos el array
    res.status(200).send("Se han eliminado todos los registros contenidos en el array");

});//6.8
}