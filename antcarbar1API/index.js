var BASE_API_PATH = "/api/v1"; //tipo de recurso
module.exports.register = (app) => {

    app.get("/info/us_counties_covid19_daily", (req, res) =>{
        res.send("<html> <body> <table><thead><tr><th>countryname</th><th>countrycode</th><th>date</th><th>c1-school-closing</th><th>c2-workplace-closing</th><th>c3-cancel-public-events</th><th>c4-restricitions-on-gatherings</th><th></th></tr></thead><tbody><tr><td>Aruba</td><td>ABW</td><td>2020-01-01</td><td>0,00</td><td>0,00</td><td>0,00</td><td>0,00</td><td></td></tr><tr><td>Afghanistan</td><td>AFG</td><td>2020-01-29</td><td>1,00</td><td>1,00</td><td>0,00</td><td>0,00</td><td></td></tr><tr><td>Angola</td><td>AGO</td><td>2020-02-01</td><td>3,00</td><td>2,00</td><td>0,00</td><td>1,00</td><td></td></tr><tr><td>Albania</td><td>ALB</td><td>2020-01-03</td><td>0,00</td><td>0,00</td><td>0,00</td><td>2,00</td><td></td></tr><tr><td>Andorra</td><td>AND</td><td>2020-05-25</td><td>0,00</td><td>1,00</td><td>3,00</td><td>5,00</td><td></td></tr><tr><td>United Arab Emirates</td><td>ARE</td><td>2020-05-09</td><td>0,00</td><td>0,00</td><td>0,00</td><td>1,00</td><td></td></tr></tbody></table> <h6>Por Antonio Carranza</h6> </body> </html>")
        });

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

app.get(BASE_API_PATH+ "/us_counties_covid19_daily", (req,res)=>{ //cuando aquí llamen a /api/v1/contacts voy a devolver el json
    res.send(JSON.stringify(us_counties_covid19_dailyArray,null,2)); //hay que pasar el objeto a json con stringfy pasandole el array creado, con 2 le das formato bonito
}) //6.1

	//Get para tomar elementos por pais
	
	app.get(BASE_API_PATH+'/us_counties_covid19_daily/:state', (req,res)=>{ //Cuando llamen a /api/v1/education_expenditures/(pais)
		
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
    res.status(200).send("Eliminacion correcta");

});//6.8
}