var express = require("express");
var bodyParser = require("body-parser");
var port = process.env.port || 1607;  // port va a valer lo que valga la variable de entorno y sino lo pone en el puero 1607
var BASE_API_PATH = "/api/v1"; //tipo de recurso
var app = express(); //generamos aplicacion que va a hacer uso de express

app.use("/", express.static("./public"));
app.use(bodyParser.json()); //todos los json que lleguen en la peticion los transformara en objects


////////////////////////JUAN VEGA SECO///////////////////////////////////////
var us_counties_covid19_dailyArray= [];
var us_counties_covid19_daily = [
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
            }

];
		// Incluimos los datos en el array 

		for(var e in us_counties_covid19_daily){
			us_counties_covid19_dailyArray.push(us_counties_covid19_daily[e]);
		}

		//Eliminamos repetidos en caso de que se hayan cargado previamente

		us_counties_covid19_dailyArray = us_counties_covid19_dailyArray.map(e => JSON.stringify(e)); //Lo pasamos a JSON para poder compararlos

		us_counties_covid19_dailyArray = new Set(us_counties_covid19_dailyArray); //Lo convertimos a conjunto para eliminar repetidos

		us_counties_covid19_dailyArray = [...us_counties_covid19_dailyArray] //Lo convertimos de nuevo a array

		us_counties_covid19_dailyArray = us_counties_covid19_dailyArray.map(e => JSON.parse(e)) //Lo pasamos de nuevo a objetos

	
		
	
		

app.get(BASE_API_PATH+ "/us_counties_covid19_daily/loadInitialData", (req,res)=>{ 
    res.send(JSON.stringify(us_counties_covid19_daily,null,2)); 
}) //5

app.get(BASE_API_PATH+ "/stats", (req,res)=>{ //cuando aquí llamen a /api/v1/contacts voy a devolver el json
    res.send(JSON.stringify(us_counties_covid19_dailyArray,null,2)); //hay que pasar el objeto a json con stringfy pasandole el array creado, con 2 le das formato bonito
}) //6.1

	//Get para tomar elementos por pais
	
	app.get(BASE_API_PATH+'/stats/:state', (req,res)=>{ //Cuando llamen a /api/v1/education_expenditures/(pais)
		
		//Crearemos un nuevo array resultado de filtrar el array completo
		var filtraState = us_counties_covid19_dailyArray.filter(function(e){ 
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

app.post(BASE_API_PATH+ "/stats", (req,res)=>{  
    var newState = req.body;  
    console.log(`new state added: <${JSON.stringify(newState,null,2)}>`);

    us_counties_covid19_dailyArray.push(newState);
    us_counties_covid19_daily.push(newState);

    res.sendStatus(201);

})//6.3

//Delete de elementos por state

app.delete(BASE_API_PATH+"/stats/:state", function(req, res) { 

    //Se hace un filtrado por pais, eliminando aquellos que coinciden con el pais dado
    us_counties_covid19_dailyArray = us_counties_covid19_dailyArray.filter(function(e){ 
        return e.state!==String(req.params.state);
    });
    res.status(200).send("Eliminacion correcta");
});//6.4


//Put modificar elemento

app.put(BASE_API_PATH+"/stats/:state", function(req, res) { 

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
    

app.post(BASE_API_PATH+"/stats/:totalsamples", function(req, res) { 

    res.status(405).send("Metodo no permitido"); //Method not allowed
});//6.6

//Put ERRONEO array de elementos

app.put(BASE_API_PATH+"/stats", function(req, res) { 

    res.status(405).send("Metodo no permitido"); //Method not allowed
});//6.7

//Delete del array completo

app.delete(BASE_API_PATH+"/stats", (req,res)=>{
		
    us_counties_covid19_dailyArray = []; // vaciamos el array
    res.status(200).send("Eliminacion correcta");

});//6.8




app.listen(port, () => { console.log(`Server ready at ${port}`); 

});
