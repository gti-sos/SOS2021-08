<script>

    let array = [];
    let arrayLabel = [];
    let datosDegrees = [];
    let datosAux = [];
    let datosAux1 = [];
    let datosAux2 = [];
    async function loadGraph() {
        let res2 = await (await fetch("/juavegsec/proxyRequest/degrees"));
        

        let res1 = await fetch('/api/v1/statewisetestingdetails');

        console.log(res1)

        let res_data1 = await res1.json()
        let res_data2 = await res2.json()

        console.log(res_data1)

        res_data2.forEach((data) => {
            datosDegrees.push(data.year);
            datosDegrees.push(data.cut_off_mark)
            datosAux.push(datosDegrees);
            datosDegrees = [];
        });

        datosAux2.push(res_data1.totalsamples)
        datosAux2.push(res_data1.positive)
        datosAux1.push(datosAux2)
        console.log(datosAux1)

        Highcharts.chart('container', {
    chart: {
        type: 'scatter',
        zoomType: 'xy'
    },
    title: {
        text: 'Gráfica que contiene las notas de corte del grado de ingeniería informática de la US en distintos años y los casos y positivos en diferentes estados de la India'
    },
    xAxis: {
        title: {
            enabled: true,
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
        }
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
        borderWidth: 1
    },
    plotOptions: {
        scatter: {
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x}, {point.y}'
            }
        }
    },
    series: [{
        name: 'Año y nota de corte de grados',
        color: 'rgba(223, 83, 83, .5)',
        data: datosAux
    },
    {
        name: res_data1.first_name + ' ' + res_data1.last_name,
        color: 'rgba(250, 83, 83, .5)',
        data: datosAux1
    }]
});
    }
</script>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            
        </p>
    </figure>
</main>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"on:load="{loadGraph}"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    
</svelte:head>