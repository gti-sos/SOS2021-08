<script>

  import {
      Jumbotron,
      Navbar,
      Nav,
      NavItem,
      NavLink,
      NavbarBrand,
      Dropdown,
      DropdownToggle,
      DropdownMenu,
      DropdownItem,
  } from "sveltestrap";
  let isOpen = false;

  var pieKeys = [];

  var death = [];

  var recovered = [];

  var covid19GermanyData = [];

  async function getData() {
      const porsiacaso = await fetch(
          "https://sos2021-11.herokuapp.com/api/integration/depression_stats/loadInitialData"
      ); // La bd no termina de ser consistente, es necesario esto para que funcione siempre.

      const depresionstats = await fetch("https://sos2021-11.herokuapp.com/api/integration/depression_stats");
      let depressionJsons = [];
      depressionJsons = await depresionstats.json();


      let anyos2 = [];
      for (let depYear of depressionJsons) {
          anyos2.push(depYear.year);
      }
      let anyosSet2 = new Set(anyos2);


      for (let anyo of anyosSet2) {
          let anyoActual=anyo;
          let obj = {};
          let obj2 = {};
          let depManAcum=0.;
          let depWomanAcum=0.;

          for (let depLog of depressionJsons) {
              if(depLog.year==anyoActual){
                  depManAcum+=depLog.depression_men;
                  
                  depWomanAcum+=depLog.depression_women;
              }

          }

          obj["name"]="Depresión acumulada en el País (Hombres) y muertes por covid- "+ anyo;
          obj["value"]=Math.round(depManAcum);

          obj2["name"]="Depresión acumulada en el País (Mujeres) y recuperados de covid - "+ anyo;
          obj2["value"]=Math.round(depWomanAcum);

          pieKeys.push(obj);
          pieKeys.push(obj2);
      }

      console.log(pieKeys)

      const covid19Germany = await fetch("/api/v1/covid19-tracking-germany");
        if(covid19Germany.ok){
            covid19GermanyData = await covid19Germany.json();
            console.log(`We have received ${covid19GermanyData.length} data points: `);
            console.log(JSON.stringify(covid19GermanyData,null,2));
            covid19GermanyData.forEach(data => {
               death.push(data["death"]);
              recovered.push(data["recovered"]);
            });
        }else{
            console.log("Error loading covid19Germany");

    
          obj["name"]="Muertes" ;
          obj["value"]=death;

          obj2["name"]="Recuperados";
          obj2["value"]=recovered;

          pieKeys.push(obj);
          pieKeys.push(obj2);

          
      }
  }

  


  async function loadGraph() {
      getData().then(() => {
          var graphdef = {
              categories: [""], // Esta vez no usaré categoria ya que viene implicita en el name.
              dataset: {
                  "": pieKeys,
              },
          };

          var chart = uv.chart("Pie", graphdef, {
              meta: {
                  caption:
                      "",
              },
          });

          console.log("fin");
      });
  }
</script>

<svelte:head>
  <script
      type="text/javascript"
      src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.2.2/d3.v3.min.js"></script>
  <script
      src="https://cdnjs.cloudflare.com/ajax/libs/uvCharts/1.1.5/uvcharts.min.js"
      on:load={loadGraph}></script>
</svelte:head>

<main>
  <body>
      <Jumbotron class="p-3" style="background-color: #FFB833">
          <h1 class="titulo; mainDiv" style="color: white">
              Integración Api Depresión
          </h1>
      </Jumbotron>
  </body>
  <br />
  <h1 class="titulo2">Depresión, muertes y recuperados de covid. </h1>
  <div style="width:800px; margin:0 auto;">
      <figure class="highcharts-figure">
          <div id="container" />
      </figure>
      <div id="uv-div" />
      <br>
      <p style="centrado">
          Gráfica que muestra la depresión acumulada total por sexo de las regiones registradas en un año determinado y las muertes y recuperados por covid 19.
          registradas en un determinado año.
      </p>
  </div>
</main>

<style>
  .titulo2 {
      color: #000000;
      text-align: center;
      font-size: 150%;
  }
  .mainDiv {
      text-align: center;
      margin: 20px;
  }
</style>
