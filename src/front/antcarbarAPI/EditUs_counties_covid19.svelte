<script>
    import { onMount } from "svelte";
  
    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  
    const BASE_API_PATH = "/api/v1";
    export let params = {};
    let stat = {};
    let updateDate = "XXXX-XX-XX";
    let updateCounty = "XXXX";
    let updateState = "XXXX";
    let updateFips = 999;
    let updateCases = 999;
    let updateDeaths = 999;
    let errorMsg = "";
    let okMsg = "";
    
    async function getStat() {
      console.log("Fetching stat..." + params. county + " " + params. fips);
      const res = await fetch(
        BASE_API_PATH +"/us_counties_covid19_daily/" + params. county +"/" + params. fips
      );
  
      if (res.ok) {
        console.log("Ok:");
        const json = await res.json();
        stat = json;
        updateDate = stat.date;
        updateCounty  = stat.county;
        updateState = stat.state;
        updateFips = stat["fips"];
        updateCases = stat["cases"];
        updateDeaths = stat["deaths"];
        

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
          JSON.stringify(params.county) +
          JSON.stringify(params.fips)
      );
  
      const res = await fetch(
        BASE_API_PATH +
          "/us_counties_covid19_daily/" +
          params.county +
          "/" +
          params.fips,
        {
          method: "PUT",
          body: JSON.stringify({
            "date": updateDate,
            "county": params.county,
            "state": updateState,
            "fips":parseFloat(params.fips),
            "cases": parseInt(updateCases),
            "deaths": parseInt(updateDeaths)
           
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
          okMsg = "Operación realizada correctamente";
        } else {
          if(res.status===409){
          errorMsg = "El dato ya se encuentra cargado";
        }else if(res.status ===500){
          errorMsg = "No se han podido acceder a la base de datos";
        }else if(res.status ===404){
          errorMsg = "No se ha encontrado el dato solicitado";
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
        <NavLink href="#/us_counties_covid19_daily">Volver</NavLink>
      </NavItem>
    </Nav>
  
    <h2>
      Editar campo <strong>{params.county}</strong>
      <strong>{params.fips}</strong>
    </h2>
    <Table bordered>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Condado</th>
          <th>Estado</th>
          <th>Fips</th>
          <th>Casos</th>
          <th>Muertes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input type="text" placeholder="20-20-20"  min="0" bind:value={updateDate} /></td>
          <td>{updateCounty}</td>
          <td><input type="text" placeholder=""  min="0" bind:value={updateState} /></td>
          <td>{updateFips}</td>
          <td><input type="number" placeholder="0"  min="0" bind:value={updateCases} /></td>
          <td><input type="number" placeholder="0"  min="0" bind:value={updateDeaths} /></td>
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

