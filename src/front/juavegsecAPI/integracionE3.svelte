<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    //Uso de API externa coincap.io
    var sabor = [];
    var pnt = [];
    var data =[];
    var data1 =[];
    var msg = "";
    
    /**
     * Obtiene los datos de la API externa
     */
    async function getStats() {
      console.log("Fetching data...");
  
      const res = await fetch("https://api.coincap.io/v2/assets");
      const resData = await fetch("api/v1/statewisetestingdetails"); 

      if (res.ok & resData.ok) {
        const json2 = await resData.json();
        const json = await res.json();
        data = json2;
        data1 = json;
        console.log(data1);
        
        console.log(`We have received ${data.length} .`);
     
        
        for(var i = 0; i<data.length; i++){
            pnt.push(data[i].totalsamples);
            }
        
        json.data.forEach((element) => {
            if(element.symbol.match("BTC") || element.symbol.match("ETH") || element.symbol.match("XLM"))
            sabor.push(element.symbol);
        });
       
        
  
        msg = "";
        console.log("Ok");
      }
       else {
        msg = "Error recuperando datos";
  
        console.log("ERROR!" + msg);
      }
    }
    /**
     * Carga los datos en la grafica
     */
    async function loadChart() {
       
        await getStats();
  
      var ctx = document.getElementById("myChart").getContext("2d");
  
      var myChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: sabor,
          datasets: [
            {
              label: "Casos totales en la India",
              data: pnt,
              backgroundColor: [
                "rgba(10,255,29, 0.7)",
                "rgba(0, 205, 255, 0.22)",
                "rgba(255, 0, 0, 0.8)",
                "rgba(245, 255, 0, 05)",
                "rgba(0, 0, 0, 0.7)",
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
                  text: 'Muestra de simbolos de criptomonedas y casos totalles de covid en India'
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
      <h2>Integración externa de símbolos de criptomonedas con casos totales en regiones de India</h2>
   
    </div>
  
    {#if msg}
      <p>{msg}</p>
    {:else}
      <div class="chart-container">
        <canvas id="myChart" />
      </div>
    {/if}  
    <Button outline color="secondary" on:click="{pop}"> Atrás</Button>
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
  