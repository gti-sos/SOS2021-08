<script>
  import { Nav, NavItem, NavLink } from "sveltestrap";
  import Button from "sveltestrap/src/Button.svelte";
  import { pop } from "svelte-spa-router";
  import utils from "antcarbarAPI";
  import bb, {bar} from "billboard.js";

  var countries = [];
  var msg = "";
  var pnt = [];
  var data =[];

async function realizarPeticion(){
    console.log("Obteniendo Datos");
  
    const res = await fetch('https://sos2021-21.herokuapp.com/api/v2/temperature-stats');
    const resData = await fetch("api/v1/us_counties_covid19_daily"); 


    if (res.ok) {
        const json2 = await resData.json();
        data = json2;
        console.log(`We have received ${data.length} entradas.`);
        console.log(data)
        var condados = [];
        for(var i =0; i < data.length; i++)
            condados.push([i],data[i]);
        console.log(condados[i].date);
        
            
      
        const json = await res.json();
        countries = json;
  
        console.log(`We have received ${countries.length} countries.`);
        console.log(countries)
        
        const paises = (JSON.stringify(countries,['country']))
        console.log(paises)


  
        msg = "";
        console.log("Ok");
      } else {
        msg = "Error recuperando datos de rest countries";
  
        console.log("ERROR!" + msg);
      }
    }
  
async function loadChart() {
  await realizarPeticion();
  // for ESM environment, need to import modules as:
   
    var cards={};
    var cardTypes = [];
    const resData = await fetch("https://breakingbadapi.com/api/episodes");
    const cardData = await resData.json(); 


    console.log(cardData);
    /*
    cardData.data.forEach(c =>{
         if(c.title in cards){
                cards[c.title] += 1;
            }
            else{
                cards[c.title]= 1;
            }
        });
    
    for (var key in cards){
        cardTypes.push([key,cards[key]]);
    }
    console.log(cardTypes)
    */
    for (var i=0;i< cardData.length ; i++){

        if(cardData[i].characters in cards){
                    cards[cardData[i].characters] += 1;
                }
                else{
                    cards[cardData[i].characters]= 1;
                }
            }
    for (var key in cards){
        cardTypes.push([key,cards[key]]);
    }

    Highcharts.chart('container', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }
    },
    title: {
        text: 'Tarta con personajes de capitulos de Breaking Bad'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }
    },
    series: [{
        name: 'Nombres de personajes en capitulos',
        data: cardTypes
    }]
});
}
</script>
<svelte:head>
  
  <script src="https://code.highcharts.com/highcharts-3d.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js"></script>
  <script src="https://code.highcharts.com/highcharts.js" on:load={loadChart}></script>
</svelte:head>

<main>
  <figure class="highcharts-figure">
  <div id ="container"></div>
  <p class="highcharts-description">
      Gráfico de tarta 3D que muestra los titulos de los diferentes capitulos de BREAKING BAD
  </p>
  </figure>
    <Button id="back" outline color="secondary" on:click="{pop}"> Atrás</Button>
</main>

<style>
#container {
    height: 600px;
    width: 900px;
}
.highcharts-figure {
    min-width: 350px;
    max-width: 900px;
    margin: 1em auto;
}
</style>