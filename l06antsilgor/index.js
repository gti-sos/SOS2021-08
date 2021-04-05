const e = require("express");
var express = require("express");

var app = express();


var port = process.env.PORT || 10000;

var path = require("path");

app.use("/", express.static(path.join(__dirname,"./public"))); 

app.use(express.json());


var BASE_API_PATH = "/api/v1";

	var covid19_tracking_germanyArray = [];

	app.get(BASE_API_PATH+"/covid19-tracking-germany", (req,res)=>{ 
		
		res.send(JSON.stringify(covid19_tracking_germanyArray,null,2));
	});


	app.get(BASE_API_PATH+"/covid19-tracking-germany/loadInitialData", (req,res)=>{ 

		var datosInicialesGermany =  [
            {
                "state": "Bayern",
                "county": "SK Hof",
                "age-group": "05-14",
                "gender": "F",
                "date": "03/04/2021",
                "case": 2,
                "death": 0,
                "recovered": 0
              },
              {
                "state": "Berlin",
                "county": "SK Berlin Mitte",
                "age-group": "35-59",
                "gender": "M",
                "date": "03/04/2021",
                "case": 16,
                "death": 0,
                "recovered": 0
              },
              {
                "state": "Nordrhein-Westfalen",
                "county": "SK Solingen",
                "age-group": "80-99",
                "gender": "F",
                "date": "03/04/2021",
                "case": 1,
                "death": 0,
                "recovered": 0
              },
              {
                "state": "Sachsen",
                "county": "SK Dresden",
                "age-group": "15-34",
                "gender": "M",
                "date": "09/11/2020",
                "case": 19,
                "death": 0,
                "recovered": 19
              },
              {
                "state": "Berlin",
                "county": "SK Berlin Reinickendorf",
                "age-group": "35-59",
                "gender": "M",
                "date": "24/10/2020",
                "case": 18,
                "death": 0,
                "recovered": 18
              }
		];

		

		for(var e in datosInicialesGermany){
			covid19_tracking_germanyArray.push(datosInicialesGermany[e]);
		}

	

		covid19_tracking_germanyArray = covid19_tracking_germanyArray.map(e => JSON.stringify(e)); 

		covid19_tracking_germanyArray = new Set(covid19_tracking_germanyArray);

		covid19_tracking_germanyArray = [...covid19_tracking_germanyArray]

		covid19_tracking_germanyArray = covid19_tracking_germanyArray.map(e => JSON.parse(e))

		

		
		res.status(200).send(`<!DOCTYPE html>
					<html>
						<head>
							<title>CoVid19 Tracking Germany cases & deads</title>
						</head>
						<body>
							<h2>¡Initial data loaded successfully!</h2>
						</body>
					</html>`);
		
		
	});

	
	app.get(BASE_API_PATH+'/covid19-tracking-germany/:state', (req,res)=>{ 
		

		var filtraState = covid19_tracking_germanyArray.filter(function(e){ 
			return e.state==String(req.params.state);
		});
		
	
        if (filtraState != 0){
		    res.status(200).send(JSON.stringify(filtraState,null,2));
        }	
        
        else{
            res.status(404).send("Error no se ha encontrado el elemento");
        }
	});


	

	app.post(BASE_API_PATH+"/covid19-tracking-germany", (req,res)=>{
		
		var newData = req.body; 
		covid19_tracking_germanyArray.push(newData); 

		

		covid19_tracking_germanyArray = covid19_tracking_germanyArray.map(e => JSON.stringify(e)); 

		covid19_tracking_germanyArray = new Set(covid19_tracking_germanyArray); 

		covid19_tracking_germanyArray = [...covid19_tracking_germanyArray] 

		covid19_tracking_germanyArray = covid19_tracking_germanyArray.map(e => JSON.parse(e))

		
		res.sendStatus(201);
	
	});

	

	app.post(BASE_API_PATH+"/covid19-tracking-germany/:state", function(req, res) { 

		res.status(405).send("Metodo no permitido"); 
	});

	

	app.delete(BASE_API_PATH+"/covid19-tracking-germany", (req,res)=>{
		
		covid19_tracking_germanyArray = []; // vaciamos el array
		res.status(200).send("Eliminacion correcta");
	
	});

	

	app.delete(BASE_API_PATH+"/covid19-tracking-germany/:state", function(req, res) { 

		//Se hace un filtrado por pais, eliminando aquellos que coinciden con el pais dado
		covid19_tracking_germanyArray = covid19_tracking_germanyArray.filter(function(e){ 
			return e.state!==String(req.params.state);
		});
		res.status(200).send("Eliminacion correcta");
	});

	

	//Put modificar elemento

	app.put(BASE_API_PATH+"/covid19-tracking-germany/:state", function(req, res) { 

		for(var e in covid19_tracking_germanyArray){
			if(covid19_tracking_germanyArray[e].state == String(req.params.state)){
					var newData = req.body;
					covid19_tracking_germanyArray[e] = newData;
					break;
			}
		}

		

		covid19_tracking_germanyArray = covid19_tracking_germanyArray.map(e => JSON.stringify(e)); 

		covid19_tracking_germanyArray = new Set(covid19_tracking_germanyArray); 

		covid19_tracking_germanyArray = [...covid19_tracking_germanyArray] 

		covid19_tracking_germanyArray = covid19_tracking_germanyArray.map(e => JSON.parse(e)) 

		res.status(200).send("Modificacion correcta");
	});

	
	app.put(BASE_API_PATH+"/covid19-tracking-germany", function(req, res) { 

		res.status(405).send("Metodo no permitido"); 
	});




    app.listen(port, () =>{
        console.log("Server ready to listen on port " + port);
    });

