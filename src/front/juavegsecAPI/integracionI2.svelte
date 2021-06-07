<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {
        pop
    } from "svelte-spa-router";
   var CBData= [];
    var yAxe=[];
    async function loadGraph() {
            
        /* Asking for the data to the back */
        const BASE_API_URL = "https://sos2021-07.herokuapp.com/api/v2/unemployment";
        const res_CB_Data = await fetch("/api/v1/statewisetestingdetails");
        CBData = await res_CB_Data.json();
        for (var i=0; i<CBData.length; i++){
            yAxe.push(CBData[i].state);
        }
        const resData = await fetch(BASE_API_URL);
        let MyData = await resData.json();   

        /* Getting the countries */
        let countries = Array.from(new Set(MyData.map((d) => {return d.autonomous_community;})));
       
        MyData = MyData.map((d) => {
            return [countries.indexOf(d.autonomous_community),d["youth_unemployment_rate"], d["unemployment_rate"], d["occupation_variation"]]; 
        });
        /* 
        The following array turn this:
        [0, 2000, 0.0, 0.0, 0.0]

        into this:

        {name: "Country", data: [0, 2000, 0.0, 0.0, 0.0]}
        That is how the chart needs it
         */
        let ChartData = MyData.map(function (set, i) {
            for(var i=0; i<CBData.length; i++){
            return {
                name: "Comunidades y estados",
                data: set,
                shadow: false
            }
        };
    });
        
        /* Setting the chart */
        Highcharts.chart('container', {
            chart: {
                type: 'spline',
                parallelCoordinates: true,
                parallelAxes: {
                    lineWidth: 3
                }
            },
            title: {
                text: 'Unemployment rate'
            },
            plotOptions: {
                series: {
                    animation: false,
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: false
                            }
                        }
                    },
                    states: {
                        hover: {
                            halo: {
                                size: 0
                            }
                        }
                    },
                    events: {
                        mouseOver: function () {
                            this.group.toFront();
                        }
                    }
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span>' +
                    '{series.name}: <b>{point.formattedValue}</b><br/>'
            },
            xAxis: {
                categories: [
                    'Estados',
                    'Variación de ocupación',
                    'Ratio de desempleo joven',
                    'Ratio de desempleo',
                    ''
                ],
                offset: 50
            },
            yAxis: [
            {
                categories: yAxe[2] ,
                tooltipValueFormat: '{value}'
            },
            {
                min: 0,
                tooltipValueFormat: '{value}'
            }, {
                min: 0,
                tooltipValueFormat: '{value} %'
            }, {
                min: 0,
                tooltipValueFormat: '{value} %'
            }],
            colors: ['rgba(129, 131, 202, 0.8)'],
            series: ChartData
        });
    }

    loadGraph();
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"  defer> </script>
    <script src="https://code.highcharts.com/modules/data.js"  defer ></script>
    <script src="https://code.highcharts.com/modules/parallel-coordinates.js"  defer></script>
	<script src="https://code.highcharts.com/modules/exporting.js"  defer ></script>
	
	<!--Highcharts Oil Coal...-->
	<script src="https://code.highcharts.com/highcharts.js" defer  ></script>
    <script src="https://code.highcharts.com/modules/heatmap.js" defer ></script>
    <script src="https://code.highcharts.com/modules/exporting.js" defer  ></script>
    <script src="https://code.highcharts.com/modules/export-data.js" defer ></script>
	<script src="https://code.highcharts.com/modules/accessibility.js" defer ></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js" integrity="sha256-R4pqcOYV8lt7snxMQO/HSbVCFRPMdrhAFMH+vr9giYI=" crossorigin="anonymous"></script>
	
    <script src="https://code.highcharts.com/highcharts.js"  defer> </script>
    <script src="https://code.highcharts.com/modules/data.js"  defer ></script>
    <script src="https://code.highcharts.com/modules/parallel-coordinates.js" defer></script>
    <script src="https://code.highcharts.com/modules/exporting.js" defer ></script>

	<!--Highcharts Oil Coal...-->
    <script src="https://code.highcharts.com/modules/heatmap.js"  defer></script>
    <script src="https://code.highcharts.com/modules/export-data.js"  defer></script>
	<script src="https://code.highcharts.com/modules/accessibility.js"  defer></script>
    
</svelte:head>

<main>
    <h1 class="display-4" style="text-align: center;" > Gráfica con HighChart </h1>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p></p>
        <p class="highcharts-description">
            Gráfica que representa los datos de las energías renovables por países. Los datos de las energías renovables son los porcentajes de: uso de energías renovables sobre el total, uso de energía hidroeléctrica y uso de energía eólica.
            Esta gráfica está hecha con HighChart.
        </p>
    </figure>

    <p></p>
    <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
</main>