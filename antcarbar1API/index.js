var BASE_API_PATH = "/api/v1"; //tipo de recurso
module.exports.register = (app) => {

    app.get("/info/us_counties_covid19_daily", (req, res) =>{
        res.send("<html> <body> <table><thead><tr><th>date</th><th>county</th><th>state</th><th>fips</th><th>cases</th><th>deaths</th></tr></thead><tbody><tr><td>2020-01-21</td><td>Snohomish</td><td>Washington</td><td>53061</td><td>1</td><td>0</td></tr><tr><td>2020-01-22</td><td>Snohomish</td><td>Washington</td><td>53061</td><td>1</td><td>0</td></tr><tr><td>2020-01-23</td><td>Snohomish</td><td>Washington</td><td>53061</td><td>1</td><td>0</td></tr><tr><td>2020-01-24</td><td>Cook</td><td>Illinois</td><td>17031</td><td>1</td><td>0</td></tr><tr><td>2020-01-25</td><td>Snohomish</td><td>Washington</td><td>53061</td><td>1</td><td>0</td></tr></tbody></table> <h6>Por Antonio Carranza</h6> </body> </html>")
        });

////////////////////////Antonio Carranza Barroso///////////////////////////////////////
var us_counties_covid19_dailyArray= [];

		// Incluimos los datos en el array 

/*for(var e in us_counties_covid19_daily){
	us_counties_covid19_dailyArray.push(us_counties_covid19_daily[e]);
	}

	//Eliminamos repetidos en caso de que se hayan cargado previamente

	us_counties_covid19_dailyArray = us_counties_covid19_dailyArray.map(e => JSON.stringify(e)); //Lo pasamos a JSON para poder compararlos

	us_counties_covid19_dailyArray = new Set(us_counties_covid19_dailyArray); //Lo convertimos a conjunto para eliminar repetidos

	us_counties_covid19_dailyArray = [...us_counties_covid19_dailyArray] //Lo convertimos de nuevo a array

	us_counties_covid19_dailyArray = us_counties_covid19_dailyArray.map(e => JSON.parse(e)) //Lo pasamos de nuevo a objetos

	*/
		

app.get(BASE_API_PATH+ "/us_counties_covid19_daily/loadInitialData", (req,res)=>{ 
    console.log("NEW GET ...cargando datos en el array");
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

    if(us_counties_covid19_dailyArray.length>0){
        for(var j=0;j<us_counties_covid19_dailyArray.length;j++){
            us_counties_covid19_dailyArray.splice(j);
        }
    }
    for(var i=0;i<us_counties_covid19_daily.length;i++){
        us_counties_covid19_dailyArray.push(us_counties_covid19_daily[i]);
    }
    res.send(JSON.stringify(us_counties_covid19, null, 2));
});
    

app.get(BASE_API_PATH+ "/us_counties_covid19_daily", (req,res)=>{
    console.log("NEW GET .../us_counties_covid19_daily");           //cuando aquí llamen a /api/v1/contacts voy a devolver el json
    res.send(JSON.stringify(us_counties_covid19_dailyArray,null,2)); //hay que pasar el objeto a json con stringfy pasandole el array creado, con 2 le das formato bonito
}) //6.1

	//Get para tomar elementos por estado
	
	app.get(BASE_API_PATH+'/us_counties_covid19_daily/:state', (req,res)=>{ 
		
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
    });

 /*   //Get para tomar elementos por condado
	
	app.get(BASE_API_PATH+'/us_counties_covid19_daily/:county', (req,res)=>{ 
		
		//Crearemos un nuevo array resultado de filtrar el array completo
		var filtraCounty = us_counties_covid19_dailyArray.filter(function(x){ 
			return x.county==String(req.params.county);
		});
		
		//Debemos enviar el objeto pero pasandolo a JSON
        if (filtraCounty != 0){
		 res.status(200).send(JSON.stringify(filtraCounty,null,2));
        }	
        
        else{
            res.status(404).send("Error no se ha encontrado el elemento");
        }
    });

*/


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