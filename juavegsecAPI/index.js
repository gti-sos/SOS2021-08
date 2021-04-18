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
                console.error("No data found");
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
/*
//POST para crear un nuevo recurso en nuestra lista
    app.post(BASE_API_PATH+"/statewisetestingdetails", (req, res) => {
        console.log("New POST .../nuts-production-stats");
        var newData = req.body;
        var country = req.body.country;
        var year = parseInt(req.body.year);
        db.find({"country":country, "year":year}).exec((err, data)=>{
            if(err){
                console.error("ERROR in GET");
                res.sendStatus(500);
            }else {
                if(data.length == 0){
                    if (!newData.country 
                        || !newData.year 
                        || !newData['almond'] 
                        || !newData['walnut'] 
                        || !newData['pistachio']
                        || Object.keys(newData).length != 5){
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
    
	//Get para tomar elementos por pais
	
	app.get(BASE_API_PATH+'/statewisetestingdetails/:state', (req,res)=>{ //Cuando llamen a /api/v1/education_expenditures/(pais)
		
		//Crearemos un nuevo array resultado de filtrar el array completo
		var filtraState = statewisetestingdetailsArray.filter(function(e){ 
			return e.state==String(req.params.state);
		});
		
		//Debemos enviar el objeto pero pasandolo a JSON
        if (filtraState != 0){
		    res.status(200).send(JSON.stringify(filtraState,null,2));
        }	
        
        else{
            res.status(404).send("Error no se ha encontrado el elemento");
        }
    });//6.2
    
app.post(BASE_API_PATH+ "/statewisetestingdetails", (req,res)=>{  
    var newCity = req.body;  
    console.log(`new City added: <${JSON.stringify(newCity,null,2)}>`);

    statewisetestingdetailsArray.push(newCity);
    

    res.sendStatus(201);

})//6.3

//Delete de elementos por state

app.delete(BASE_API_PATH+"/statewisetestingdetails/:state", function(req, res) { 

    //Se hace un filtrado por pais, eliminando aquellos que coinciden con el pais dado
    statewisetestingdetailsArray = statewisetestingdetailsArray.filter(function(e){ 
        return e.state!==String(req.params.state);
    });
    res.status(200).send("Eliminacion correcta");
});//6.4


//Put modificar elemento

app.put(BASE_API_PATH+"/statewisetestingdetails/:state", function(req, res) { 

    //Recorremos el array en busca del elemento a modificar
    for(var e in statewisetestingdetailsArray){
        if(statewisetestingdetailsArray[e].state == String(req.params.state)){
                var newData = req.body;
                statewisetestingdetailsArray[e] = newData;
                break;
        }
    }

    //Eliminamos repetidos en caso de que se haya realizado un cambio para añadirlo

    statewisetestingdetailsArray = statewisetestingdetailsArray.map(e => JSON.stringify(e)); //Lo pasamos a JSON para poder compararlos

    statewisetestingdetailsArray = new Set(statewisetestingdetailsArray); //Lo convertimos a conjunto para eliminar repetidos

    statewisetestingdetailsArray = [...statewisetestingdetailsArray] //Lo convertimos de nuevo a array

    statewisetestingdetailsArray = statewisetestingdetailsArray.map(e => JSON.parse(e)) //Lo pasamos de nuevo a objetos

    res.status(200).send("Modificacion correcta");
});//6.5
    

app.post(BASE_API_PATH+"/statewisetestingdetails/:totalsamples", function(req, res) { 

    res.status(405).send("Metodo no permitido"); //Method not allowed
});//6.6

//Put ERRONEO array de elementos

app.put(BASE_API_PATH+"/statewisetestingdetails", function(req, res) { 

    res.status(405).send("Metodo no permitido"); //Method not allowed
});//6.7

//Delete del array completo

app.delete(BASE_API_PATH+"/statewisetestingdetails", (req,res)=>{
		
    statewisetestingdetailsArray = []; // vaciamos el array
    res.status(200).send("Eliminacion correcta");

});//6.8

*/
}



  
