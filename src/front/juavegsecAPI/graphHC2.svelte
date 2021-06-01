<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    
async function loadChart(){
   
    var data=[];
    var pnt = [];
    const resData = await fetch("api/v1/statewisetestingdetails"); 
  
    
    if(resData.ok){
      const json = await resData.json();
      data = json;
      console.log(`We have received ${data.length} .`);
      console.log(data);
      for(var i = 0; i<data.length; i++){
        pnt.push(data[i].positive);
   
        }
    }  
    
Highcharts.chart('container', {
    chart: {
        renderTo: 'container',
        type: 'column',
        options3d: {
            enabled: true,
            alpha: 10,
            beta: 15,
            depth: 50,
            viewDistance: 20
        }
    },
    title: {
        text: 'Casos totales positivos en los estados de India'
    },
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Positivos en cada estado indio'
        }
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        column: {
            depth: 20
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:12px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>'
    },
        series: [{
            name: 'Casos Positivos',
            colorByPoint: true,
            data: pnt
        }]
    });
}
</script>
<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js" on:load={loadChart}></script>
  <script src="https://code.highcharts.com/modules/series-label.js"></script>
  <script src="https://code.highcharts.com/highcharts-3d.js"></script>
  <script src="https://code.highcharts.com/modules/cylinder.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<main>
  <figure class="highcharts-figure">
  <div id ="container"></div>
  <p class="highcharts-description">
      Gráfico 3D que muestra la cantidad de casos totales de covid, positivos y negativos en Assam.
  </p>
  </figure>
    <Button outline color="secondary" on:click="{pop}"> Atrás</Button>
</main>

<style>

#container {
    height: 600px;
    width: 900px;
}

.highcharts-figure, .highcharts-data-table table {
    min-width: 350px;
    max-width: 900px;
    margin: 1em auto;
}

</style>