<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
  
    var countries = [];
    var msg = "";
    var pnt = [];
    var data =[];
    /**
     * Obtiene los datos de la API externa
     */
    async function getStats() {
      console.log("Fetching data...");
        
      const res = await fetch("https://restcountries.eu/rest/v2/all");
      const resData = await fetch("api/v1/statewisetestingdetails"); 
      
      
      if (res.ok) {
        const json2 = await resData.json();
        data = json2;
        console.log(`We have received ${data.length} .`);
        
      
        const json = await res.json();
        countries = json;

  
        console.log(`We have received ${countries.length} countries.`);
  
        msg = "";
        console.log("Ok");
      } else {
        msg = "Error recuperando datos de restcountries";
  
        console.log("ERROR!" + msg);
      }
    }
    /**
     * Carga los datos en la grafica
     */
    async function loadChart() {
      await getStats();
  
      var ctx = document.getElementById("myChart").getContext("2d");
  
      var xAxis = [];
    
        for(var i = 0; i<data.length; i++){
            pnt.push(data[i].positive);
    
            }
      for (let index = 0; index < 60; index++) {
        const element = countries[index];
        if (element.regionalBlocs.length != 0) {
          if (element.regionalBlocs[0].acronym == "EU") {
            xAxis.push(element.subregion);
         
          }
        }
      }
  
      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: xAxis,
          datasets: [
            {
              label: "Región europea",
              data: pnt,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
              title: {
                  display: true,
                  text: 'Región europea  por positivos'
              }
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  </script>
  
  <svelte:head>
    <script
      src="https://cdn.jsdelivr.net/npm/chart.js"
      on:load={loadChart}></script>
  </svelte:head>
  
  <main>

      
  
    <div>
      <h2>Integración externa de Regiones europeas con positivos en regiones de India</h2>
    </div>
  
    {#if msg}
      <p>{msg}</p>
    {:else}
      <div>
        <canvas id="myChart" />
      </div>
    {/if}
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
    #myChart{
      width: 400px;
      height: 500px;
    }
  </style>
  