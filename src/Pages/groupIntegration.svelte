<script>
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    let usData = [];
    let indiaData = [];
    let gerData = [];
    let usGeneral = [];
    let indiaGeneral = [];
    let gerGerneral = [];
    let ejeX = [];
    var mapa = new Map();


    function filtraElementos(value, key, map) {
      //  if(value.length == 3){
            ejeX.push(key);
            usGeneral.push(value);
            indiaGeneral.push(value);
            gerGerneral.push(value);
       // }
    }
    
    async function loadGraph(){  
        
        const nuts = await fetch("api/v1/us_counties_covid19_daily");
        if(nuts.ok){
            usData = await nuts.json();
            console.log(`We have received ${usData.length} data points: `);
            console.log(JSON.stringify(usData,null,2));
            usData.forEach(data => {
                if(mapa.has(data.state)){
                    let aux = mapa.get(data.state);
                    aux.push(data["deaths"]);
                    mapa.set(data.state,aux);
                }else{
                    
                    console.log(data["deaths"]);
                    let aux = [];
                    aux.push(data["deaths"]);
                    console.log(aux);
                    mapa.set(data.state, aux);
                }
            });
        }else{
            console.log("Error loading us_counties_covid19_daily");
        }
        
        const oil = await fetch("/api/v1/statewisetestingdetails/");
        if(oil.ok){
            indiaData = await oil.json();
            console.log(`We have received ${indiaData.length} data points: `);
            console.log(JSON.stringify(indiaData,null,2));
            indiaData.forEach(data => {
                if(mapa.has(data.state )){
                    let aux = mapa.get(data.state );
                    console.log(aux);
                    aux.push(data["totalsamples"]);
                    mapa.set(data.state,aux);
                }else{
                    let aux = [];
                    aux.push(data["totalsamples"]);
                    console.log(aux);
                    mapa.set(data.state, aux);
                }
            });
        }else{
            console.log("Error loading datos de covid en India");
        }


        
        const wine = await fetch("/api/v1/covid19-tracking-germany");
        if(wine.ok){
            gerData = await wine.json();
            console.log(`We have received ${gerData.length} data points: `);
            console.log(JSON.stringify(gerData,null,2));
            gerData.forEach(data => {
                if(mapa.has(data.state)){
                    let aux = mapa.get(data.state);
                    aux.push(data["cases"]);
                    console.log(aux);
                    mapa.set(data.state, aux);
                }else{
                    let aux = [];
                    aux.push(data["cases"]);
                    console.log(aux);
                    mapa.set(data.cases, aux);
                }
            });
        }else{
            console.log("Error loading casos covid germany");
        }

        console.log(mapa);

        mapa.forEach(filtraElementos);

        
        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Gráfico General'
            },
            yAxis: {
                title: {
                    text: 'Muertes'
                }
            },
            xAxis: {
                title: {
                    text: 'Estado'
                },
                categories: ejeX
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            series: [{
                name: 'statewisetestingdetails',
                data: usGeneral
            },
            {
                name: ' us_counties_covid19_daily',
                data: indiaGeneral
            },
            {
                name: 'covid19trackingGermany',
                data: gerGerneral
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        });
  }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        
    </figure> 
    <Button outline color="secondary" on:click="{pop}">Atrás</Button> 
</main>