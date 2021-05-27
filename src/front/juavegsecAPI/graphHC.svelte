<script>
import{ 
  onMount } from "svelte";
  

        let positivos = [];
        let negativos = [];
        let data = [];
        let a;
        let b;
   
async function getData(){

     const resData = await fetch ("api/v1/statewisetestingdetails?state=Assam");
     console.log("data fetched");

    if(resData.ok){
      const json = await resData.json();
      data = json;
      console.log(`We have received ${data.length} .`);
      console.log(data);
      for(var i = 0; i<data.length; i++){
        positivos.push(data[i].positive);
        negativos.push(data[i].negative);
        }
    }  
  
    }
    onMount(getData); 
    
    async function loadGraph (){
        a = positivos[0];
        b = negativos[0];
        Highcharts.chart('container', {
        chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
        },
        title: {
        text: 'Covid balance cases in Assam'
        },
        tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}</b>'
        },
        accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Positivos',
            y: a,
            sliced: true,
            selected: true
        }, {
            name: 'Negativos',
            y: b,
            sliced: true,
            selected: true
        }]
    }]
});

}


// Create the chart
    
    
</script>

<svelte:head>  


    <script src="https://code.highcharts.com/highcharts.src.js" on:load="{loadGraph}"></script>
 
</svelte:head>

 


    

<main>


<figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
        Pie charts are very popular for showing a compact overview of a
        composition or comparison. While they can be harder to read than
        column charts, they remain a popular choice for small datasets.
    </p>
</figure>
</main>
<style>
    
   
</style>
