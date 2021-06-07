<script>


    async function realizarPeticion(){
    console.log("Obteniendo Datos");
  
    const res = await fetch('https://sos2021-21.herokuapp.com/api/v2/temperature-stats');
    const resData = await fetch("api/v1/us_counties_covid19_daily"); 


    if (res.ok) {
        const json2 = await resData.json();
        data = json2;
        console.log(`We have received ${data.length} entradas.`);
        console.log(data)
        var condados = [];
   
        
            
      
        const json = await res.json();
        countries = json;
  
        console.log(`We have received ${countries.length} countries.`);
        console.log(countries)
        
       // const paises = (JSON.stringify(countries,['country']))
        console.log(paises)


  
        msg = "";
        console.log("Ok");
      } else {
        msg = "Error recuperando datos de rest countries";
  
        console.log("ERROR!" + msg);
      }
    }


  </script>

<svelte:head>

  <script src="https://code.highcharts.com/highcharts.js" on:load={realizarPeticion}></script>
</svelte:head>
  
  <div id="container">
    <SvelteFC {...chartConfigs} />
  </div>

  