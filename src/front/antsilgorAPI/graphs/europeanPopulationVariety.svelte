<script>
  import { Nav, NavItem, NavLink } from "sveltestrap";
  var capitals = [];
  var errorMsg = "";
  var okMsg = "";
  async function getStats() {
    console.log("Fetching data...");
    const res = await (await fetch("/antsilgor/proxyRequest/population"));
    if (res.ok) {
      const json = await res.json();
      capitals = json;
      console.log(Object.keys(json));
      console.log(`We have received ${capitals.length} capitales.`);
      console.log("Ok");
    } else {
      errorMsg = "Error al obtener los  datos ";
      okMsg = "";
      console.log("ERROR!" + errorMsg);
    }
  }
  async function onLoad() {
    await getStats();
    var array = [];
   
    for (let index = 0; index < 10; index++) { 
      const element = capitals[index]
      var point ={x: "name", y: null}
      point.x = element.nuts_name
      point.y = parseFloat(element.nat_grw0111_pc)
      array.push(point) 
      
    }  
    const chart = new JSC.Chart("chartDiv", {
      type: 'Step', 
      // Pass points to the series
      series: [{ points: array }],
    });
  }
</script>

<svelte:head>
  <script
    src="https://code.jscharting.com/latest/jscharting.js"
    on:load={onLoad}></script>
</svelte:head>

<main>
  <Nav>
    <NavItem>
      <NavLink href="/#/integrations/">volver</NavLink>
    </NavItem>
  </Nav>

  <div>
    <h2>Variación de la Poblaciones en Capitales Europeas</h2>
  </div>

  {#if errorMsg}
    <p>{errorMsg}</p>
  {:else}
    <div id="chartDiv" />
  {/if}
</main>

<style>
  #chartDiv {
    width: 100%;
    height: 400px;
  }
</style><s></s>