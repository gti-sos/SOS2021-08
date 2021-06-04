<script>
	import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
	import {
        onMount
    } from "svelte";
    

import { create_bidirectional_transition } from "svelte/internal";

        const url = "https://covid19-api.com/country/code?code=US&format=json";
       const url2 = "https://covid19-api.com/country/code?code=ES&format=json";
		const url3 = "https://covid19-api.com/country/code?code=IT&format=json";
		const url4 = "https://covid19-api.com/country/code?code=IN&format=json";
        const url5 = "https://covid19-api.com/country/code?code=BR&format=json";
        const url6 = "https://covid19-api.com/country/code?code=FR&format=json";
        const url7 = "https://covid19-api.com/country/code?code=AR&format=json";

        let EEUU = [];
        let Spain = [];
        let Italia = [];

        let India = [];
        let Indiastats=[];
        let Brasil = [];
        let Francia = [];
        let Argentina = [];

        let criticos =[];
        let positivos =[];
        let casosTotales =[];

async function inicio(){
   
   await getData()
   delay(2000);
  recarga()
  
}
const recarga=()=>{

   loadGraph()
  
}
const delay = ms => new Promise(res => setTimeout(res, ms));


        async function getData(){
        const resData = await fetch("api/v1/statewisetestingdetails"); 
  
    
        if(resData.ok){
        const json = await resData.json();
        Indiastats = json;
        console.log(`We have received ${Indiastats.length} .`);
       
    }  
            
        const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok");
            EEUU = await res.json();
            console.log(EEUU[0]);
		} else {
			console.log("Error al cargar API externa");
        }
        const res1 = await fetch(url2); 
		if (res1.ok) {
			console.log("Peticion realizada");
            Spain = await res1.json();
            console.log(Spain[0]);
		} else {
			console.log("Error al cargar API externa");
        }
        const res2 = await fetch(url3); 
		if (res2.ok) {
			console.log("Peticion realizada");
            Italia = await res2.json();
            console.log(Italia[0]);
		} else {
			console.log("Error al cargar API externa");
        }

        const res3 = await fetch(url4); 
		if (res3.ok) {
			console.log("Peticion realizada");
            India = await res3.json();
            console.log(India[0]);
		} else {
			console.log("Error al cargar API externa");
        }

        const res4 = await fetch(url5); 
		if (res4.ok) {
			console.log("Peticion realizada");
            Brasil = await res4.json();
            console.log(Brasil[0]);
		} else {
			console.log("Error al cargar API externa");
        }

        const res5 = await fetch(url6); 
		if (res5.ok) {
			console.log("Peticion realizada");
            Francia = await res5.json();
            console.log(Francia[0]);
		} else {
			console.log("Error al cargar API externa");
        }

        const res6 = await fetch(url7); 
		if (res6.ok) {
			console.log("Peticion realizada");
            Argentina = await res6.json();
            console.log(Argentina[0]);
		} else {
			console.log("Error al cargar API externa");
        }



        //Cargar casos totales criticos
        criticos.push(EEUU[0].critical)
        criticos.push(Spain[0].critical)
        criticos.push(Italia[0].critical)
        criticos.push(Brasil[0].critical)
        criticos.push(Francia[0].critical)
        criticos.push(Argentina[0].critical)

         for(var i = 0; i<Indiastats.length; i++){
        positivos.push(Indiastats[i].positive);
    
        }
        for(var i = 0; i<Indiastats.length; i++){
        casosTotales.push(Indiastats[i].totalsamples);
        
        }
        
    }
	
    async function loadGraph(){
        let anchoa=criticos;
    var data = {
  labels: ['EEUU', 'España', 'Italia', 'India', 'Brasil', 'Francia', 'Argentina'],
    series: [
    criticos,
    positivos,
    casosTotales
    

    
    
  ]
};

var options = {
  seriesBarDistance: 15
};

var responsiveOptions = [
  ['screen and (min-width: 641px) and (max-width: 1024px)', {
    seriesBarDistance: 10,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value;
      }
    }
  }],
  ['screen and (max-width: 640px)', {
    seriesBarDistance: 5,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  }]
];

new Chartist.Bar('.ct-chart', data, options, responsiveOptions);

    }
</script>

<svelte:head>

   
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
    <script src="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js" on:load="{inicio}"></script>
</svelte:head>

<main style=" background-color:#479BCB;" >

    <h5 id = "titulo" class = "titulo" >
        Integración Covid India con API externa <a href="https://covid19-api.com/"> covid19-api</a>.
    </h5>
             
        
    <div id = "todo" class = "todo">
       
        <div   id = "chart" class = "chart">
            <div class="ct-chart ct-perfect-fourth" ></div>
        </div>
        <p style="font-size: 120%;">La tabla muestra:</p>
        <div id= "criticos">
            <p>Casos críticos API externa</p>
        </div>
        <div id= "positivos">
            <p>Positivos de API personal</p>
        </div>
        <div id= "casosTotales">
            <p>Casos totales de API personal</p>
        </div>

    </div> 
    <Button outline color="secondary" on:click="{pop}"> Atrás</Button>

    <div id = "muestra" class = "muestra">
       
    </div>
    
   
      
</main>

<style>
    
	    div#chart { 
        padding-left: 4%;
        padding-right: 4%;
        padding-top: 2%;
         border: 4px solid rgb(27, 27, 27);
         background-color: #fff;
         width: 60%;
         border-radius: 10px;

         
         }


         div#todo { 
            padding-left: 10%;
            padding-top: 3%;
            padding-bottom: 10%;
         }

         h5#titulo{
            width: 28%;
            border-radius: 6px;
            border: 3px solid rgb(27, 27, 27);
         background-color: #ffffff;
           font-size: 200%;

         }
         div#criticos { 
          color: #A20707;
         }
         div#positivos { 
          color: #E55D5D;
         }
         div#casosTotales{
            color: #FBF962;
         }

</style>