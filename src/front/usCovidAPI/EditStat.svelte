
  
<script>
  import { onMount } from "svelte";
  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  const BASE_CONTACT_API_PATH = "/api/v1";
  export let params = {};
  let stat = {};
  let updateDate = "XXX";
  let updateCounty = 1999;
  let updateState = 999;
  let updateFips = 999;
  let updateCases = 999;
  let updateDeaths = 999.9;
  
  let errorMsg = "";
  let okMsg = "";
  
  async function getStat() {
    console.log("Fetching stat..." + params.county + " " + params.fips);
    const res = await fetch(
      BASE_CONTACT_API_PATH +"/us_counties_covid19_daily/" + params.county +"/" + params.fips
    );
    if (res.ok) {
      console.log("Ok:");
      const json = await res.json();
      stat = json;
      updateCountry = stat.country;
      updateDate = stat.date;
      updateBorn = stat.born;
      updateMenBorn = stat["men-born"];
      updateWomenBorn = stat["women-born"];
      updateNatalityRate = stat["natality-rate"];
      updateFertilityRate = stat["fertility-rate"];
      console.log("Received stat.");
      
    } else {
      if(res.status===404){
          errorMsg = "No se encuentra el dato solicitado";
        }else if(res.status ===500){
          errorMsg = "No se han podido acceder a la base de datos";
        }        
        okMsg = "";
        console.log("ERROR!" + errorMsg);
    }
  }
  async function updateStat() {
    console.log(
      "Updating stat..." +
        JSON.stringify(params.country) +
        JSON.stringify(params.date)
    );
    const res = await fetch(
      BASE_CONTACT_API_PATH +
        "/natality-stats/" +
        params.country +
        "/" +
        params.date,
      {
        method: "PUT",
        body: JSON.stringify({
          "country": params.country,
          "date": parseInt(params.date),
          "born": parseInt(updateBorn),
          "men-born": parseInt(updateMenBorn),
          "women-born": parseInt(updateWomenBorn),
          "natality-rate": parseFloat(updateNatalityRate),
          "fertility-rate": parseFloat(updateFertilityRate),
        }),
        headers: {
          "Content-Type": "application/json",
        }
      }
    ).then(function (res) {
      if (res.ok) {
        console.log("OK");
        getStat();
        errorMsg = "";
        okMsg = `${params.county} ${params.fips} ha sido actualizado correctamente`;
      } else {
         if(res.status ===500){
          errorMsg = "No se han podido acceder a la base de datos";
        }else if(res.status ===404){
          errorMsg = "No se han encontrado el dato solicitado";
        }        
        okMsg = "";
        getStat();
        console.log("ERROR!" + errorMsg);
      }
    });
  }
  onMount(getStat);
</script>

<main>
  <Nav>
    <NavItem>
      <NavLink href="#/natality-stats">Volver</NavLink>
    </NavItem>
  </Nav>

  <h2>
    Editar campo <strong>{params.county}</strong>
    <strong>{params.fips}</strong>
  </h2>
  <Table bordered>
    <thead>
      <tr>
        <th> País </th>
        <th>Año </th>
        <th>Nacimientos </th>
        <th>Hombres nacidos </th>
        <th>Mujeres nacidas </th>
        <th>Tasa de natalidad </th>
        <th>Índice de fecundación </th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{updateCounty}</td>
        <td>{updateFips}</td>
        <td><input type="number" placeholder="2000" min="1"   bind:value={updateDate} /></td>
        <td><input type="number" placeholder="1000" min="1"   bind:value={updateCounty} /></td>
        <td><input type="number" placeholder="1000" min="1"   bind:value={updateState} /></td>
        <td><input type="number" placeholder="10.2" min="1.0" bind:value={updateFips} /></td>
        <td><input type="number" placeholder="2.1" min="1.0"  bind:value={updateCases} /></td>
        <td><input type="number" placeholder="2.1" min="1.0"  bind:value={updateDeaths} /></td>
        <td>
          <Button outline color="primary" on:click={updateStat}>Actualizar</Button>
        </td>
      </tr>
    </tbody>
  </Table>
  {#if errorMsg}
    <p style="color: red">ERROR: {errorMsg}</p>
  {/if}
  {#if okMsg}
  <p style="color: green">{okMsg}</p>
  {/if}

</main>

<style>
  main{
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>