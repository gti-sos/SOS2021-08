<script type="text/javascript">
      import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    async function loadGraph2() {
        let CBData = [];
        let HostelryData =[];

        let CB_Res_Data = [];
        let Hostelry_Res_Data = [];
        let xAxis_years = [];
        let b;

        const res_CB_Data = await fetch("/api/v1/statewisetestingdetails");
        CBData = await res_CB_Data.json();

        const res_HostelryData = await fetch("https://sos2021-11.herokuapp.com/api/v2/anxiety_stats");
        HostelryData = await res_HostelryData.json();

        for(var i = 0; i<CBData.length; i++){
        CB_Res_Data.push(CBData[i].positive);
   
        }

        for(var i = 0; i<HostelryData.length; i++){
           
            Hostelry_Res_Data.push(HostelryData[i].anxiety_population);
   
        }
       
          console.log(b);
        /*
        HostelryData.forEach((x) => {
            DataGraph_H.push({name: x.district + " " + x.year, data: [parseInt(x.employee_staff),  parseInt(x.traveler_numer),parseInt(x.establishment_open)], pointPlacement: 'on'})
        });
        */

        /*
        //Estructura: [ {"name" : "Andalucia 2019", "data" : [CB.capos,.., Hostelry.campos ],...}]
        CBData.forEach( (x) => {
            HostelryData.forEach( (y) => {
                if(x.district == y.district && x.year == y.year){
                    DataGraph.push({name: x.district + " " + x.year, 
                                    data: [parseInt(x.fundraising), parseInt(x.spectator), parseInt(x.spending_per_view),
                                        ,parseInt(y.employee_staff),  parseInt(y.traveler_numer),parseInt(y.establishment_open)]
                                    , pointPlacement: 'on'})

                }else if(x.district == y.district && x.year != y.year){

                }else{

                }

            })
        })
        */

        Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Número de casos positivos y el número de población con ansiedad Integración con anxiety stats'
            },

            subtitle: {
            text: 'Representación del número de casos positivos y el número de población con ansiedad Integración con Anxiety Stats'
            },
            
            xAxis: {
                categories: Array.from(xAxis_years).sort()
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ' units'
            },
            credits: {
                enabled: false
            },
            series: [
                {
                    name: 'Casos positivos (Covid India stats)',
                    data: CB_Res_Data
                },
                {
                    name: 'Población con ansiedad (Anxiety stats)',
                    data:  Hostelry_Res_Data
                }
            ]
        });
    }

</script>


<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <!--<script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}" ></script>-->
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph2}" ></script>

</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>

    </figure>
    
    <div id="chartdiv"></div>
    <Button outline color="secondary" on:click="{pop}"> Atrás</Button>
</main>


