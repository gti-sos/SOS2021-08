<script>
    import {pop} from "svelte-spa-router";
    import { Nav, NavItem, NavLink } from "sveltestrap";
    import Button from "sveltestrap/src/Button.svelte";
   
    let covid19GermanyData = [];
    let ejeX = [];
    let cases = [];
    let death = [];
    let recovered = [];
    
    async function loadGraph(){  
        const covid19Germany = await fetch("/api/v1/covid19-tracking-germany");
        if(covid19Germany.ok){
            covid19GermanyData = await covid19Germany.json();
            console.log(`We have received ${covid19GermanyData.length} data points: `);
            console.log(JSON.stringify(covid19GermanyData,null,2));
            covid19GermanyData.forEach(data => {
                ejeX.push(data.state + " " + data.county + "|" + data.date + "|" + data.agegroup + "|"  + data.gender);
                cases.push(data["cases"]);
                death.push(data["death"]);
                recovered.push(data["recovered"]);
            });
        }else{
            console.log("Error loading covid19Germany");
        }
        Highcharts.chart('container', {
            chart:{
                type: 'area' 
            },
            title: {
                text: 'Gráfico sobre la covid 19 en Alemania'
            },
            yAxis: {
                title: {
                    text: 'Cantidad'
                }
            },
            xAxis: {
                title: {
                    text: 'País | Fecha | Grupo de edad | Género'
                },
                categories: ejeX
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            series: [
            {
                name: 'Casos',
                data: cases
            },
            {
                name: 'Muertes',
                data: death
            },
            {
                name: 'Recuperados',
                data: recovered
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
    <Nav>
        <NavItem>
          <NavLink href="/#/integrations/">volver</NavLink>
        </NavItem>
      </Nav>
</main>