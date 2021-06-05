<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    
async function loadChart(){

    var data=[];
    var pnt = [];
    const resData = await fetch("api/v1/us_counties_covid19_daily"); 
  
    
    if(resData.ok){
      const json = await resData.json();
      data = json;
      console.log(`We have received ${data.length} .`);
      console.log(data);
      for(var i = 0; i<data.length; i++){
        pnt.push(data[i].positive);
   
        }
    }  

    let arrayDatos = [['Arizona', 1] ,
                      ['California',3],
                      ['Georgia',1],
                      ['Oregon',1],
                      ['Washington',1]
                    ]
    
    Highcharts.chart('container', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45
        }
    },
    title: {
        text: 'Proporción de condados segun aparicion'
    },
    subtitle: {
        text: '3D donut in Highcharts'
    },
    plotOptions: {
        pie: {
            innerSize: 100,
            depth: 45
        }
    },
    series: [{
        name: 'Delivered amount',
        data: arrayDatos
      }]
})
;}
    

</script>
<svelte:head>

<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-3d.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadChart}></script>


</svelte:head>

<main>
  <figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
        Número de veces que aparecen los diferentes condados en nuestro JSON
    </p>
  </figure>
    <Button outline color="secondary" on:click="{pop}"> Atrás</Button>
</main>

<style>

#container {
  height: 400px; 
}
.highcharts-figure, .highcharts-data-table table {
  min-width: 310px; 
  max-width: 800px;
  margin: 1em auto;
}

.highcharts-data-table table {
  font-family: Verdana, sans-serif;
  border-collapse: collapse;
  border: 1px solid #EBEBEB;
  margin: 10px auto;
  text-align: center;
  width: 100%;
  max-width: 500px;
}
.highcharts-data-table caption {
  padding: 1em 0;
  font-size: 1.2em;
  color: #555;
}
.highcharts-data-table th {
  font-weight: 600;
  padding: 0.5em;
}
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
  padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
  background: #f8f8f8;
}
.highcharts-data-table tr:hover {
  background: #f1f7ff;
}

</style>