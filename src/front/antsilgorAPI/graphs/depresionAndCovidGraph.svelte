<script>
  import { Nav, NavItem, NavLink } from "sveltestrap";
  var errorMsg = "";
  
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
            chart: {
                type: 'areaspline'
            },
            title: {
                text: 'Capacidades de energía renovable'
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 150,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
            },
            xAxis: {
                categories: etiquetas,
            },
            yAxis: {
                title: {
                    text: 'Megavatios'
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ' units'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5
                }
            },
            series: [{
                name: 'Producción solar en megavatios',
                data: sPIM     
            }, {
                name: 'Podrucción hidráulica en megavatios',
                data: hPIM
            }, {
              name: 'Producción de energía eólica en megavatios',
              data : wPIM
            }]
        });
           
    }
  
    
  </script>
  
  <svelte:head>
      
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/highcharts-more.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadChart}></script>
  </svelte:head>
  
   
  <main> 
    <Nav>
        <NavItem>
        <NavLink href="/">Página Principal</NavLink>
        </NavItem>
        <NavItem>
        <NavLink href="#/integrations">Integraciones</NavLink>
        </NavItem>
        </Nav>          
        
    <h3>Uso de la API del grupo 20 de SOS</h3>
    <h5>Se recogen los datos para 2008</h5> 
    <p>Areaspline chart</p>
  
    <figure class="highcharts-figure">
      <div id="container"></div>
      <p class="highcharts-description">    </p>
    </figure>
  
  
    {#if errorMsg}
    <p>{errorMsg}</p>
    {/if}
  </main>
  
    
  <style>
    main {
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
  
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