<script>
    import { pop }from "svelte-spa-router";
    import { Nav, NavItem, NavLink } from "sveltestrap";
    import { Button } from "sveltestrap";
    var covid19GermanyData = [];
    var errorMsg = "";
    console.log("Cargando página...");
    
    async function getStats() {
      console.log("Fetching data...");
      const res = await fetch("/api/v1/covid19-tracking-germany");
      if (res.ok) {
        console.log("OK");
        covid19GermanyData = await res.json();
        console.log("Datos recibidos satisfactoriamente")
        console.log(covid19GermanyData);
        console.log(`We have received ${covid19GermanyData.length} stats from covid 19 germany API.`);
      } else {
        console.log("Error");
        errorMsg = "Error al cargar los datos de la API";
      }
    }
    async function loadGraph() {
      console.log("Inicio getStats");
      await getStats();
      console.log('Datos recibidos para inicializar el gráfico:');
      console.log(covid19GermanyData);
      
      let arrayDatos = [];
      for (let index = 0; index < covid19GermanyData.length; index++) {
        let spliter = covid19GermanyData[index].agegroup.split('-'); 
        console.log(spliter);
        let parseo = parseInt(spliter[0]);
        console.log(parseo);
        arrayDatos.push([parseo,covid19GermanyData[index].cases,covid19GermanyData[index].death]);
        
      }
      console.log("Array de datos para el gráfico:");
      console.log(arrayDatos);
      new Dygraph(document.getElementById("grafo1"),arrayDatos,
      { 
              labels:["RangoEdad","Casos","Muertes"],
              legend: 'always',
              title: 'Casos y muertes de la covid 19 por rangos de edad en Alemania ',
              titleHeight: 32,
              ylabel: 'Valor',
              xlabel: 'Rango de edad'
    
            });
    };
</script>
  
  <svelte:head>
    
  s<script src="https://cdnjs.cloudflare.com/ajax/libs/dygraph/2.1.0/dygraph.min.js" integrity="sha512-opAQpVko4oSCRtt9X4IgpmRkINW9JFIV3An2bZWeFwbsVvDxEkl4TEDiQ2vyhO2TDWfk/lC+0L1dzC5FxKFeJw==" crossorigin="anonymous" referrerpolicy="no-referrer"on:load={loadGraph}></script>
  </svelte:head>
  
  <main>
    <div>
      <h2>Gráfico</h2>
    </div>
    {#if errorMsg}
      <p>{errorMsg}</p>
    {:else}
    <style>.dygraph-legend { text-align: right; background: none; }
        #grafo1 .dygraph-label { font-family: Georgia, Verdana, serif; }
        #grafo1 .dygraph-title { font-size: 20px; text-shadow: gray 2px 2px 2px; margin: -30px 0px 0px 50px}
        #grafo1 .dygraph-ylabel { font-size: 18px; text-shadow: gray -2px 2px 2px; margin: 0px 0px 0px 90px }
        #grafo1 .dygraph-xlabel { font-size: 18px; text-shadow: gray -2px 2px 2px; margin: 20px 0px 0px 0px }
        .chart { border: 1px hidden black; margin: 50px 5px 5px 400px; padding: 2px; }
    </style>
    <div  id="grafo1" class="chart" style="width:1000px; height:500px;"></div>
    <br>
    <br>
    <h6>Gráfico que muestra la relación entre casos y muertes de la covid 19 por rangos de edad en Alemania</h6>
    {/if}
    <Nav>
      <NavItem>
        <NavLink href="/#/integrations/">volver</NavLink>
      </NavItem>
    </Nav>
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
    div {
      margin-bottom: 15px;
    }
  </style>