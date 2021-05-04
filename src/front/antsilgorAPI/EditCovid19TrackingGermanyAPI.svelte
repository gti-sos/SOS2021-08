<script>
    import { onMount } from "svelte";
  
    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  
    const BASE_API_PATH = "/api/v1";
    export let params = {};
    let stat = {};
    let updateState = "XXXX";
    let updateCounty = "XXXX";
    let updateAgeGroup = "XX-XX";
    let updateGender = "X";
    let updateDate = "XX/XX/XX";
    let updateCases = 999;
    let updateDeaths = 999;
    let updateRecovered = 999;
    let errorMsg = "";
    let okMsg = "";
    
    async function getStat() {
      console.log("Fetching stat..." + params.state + " " + params.county);
      const res = await fetch(
        BASE_API_PATH +"/covid19-tracking-germany/" + params.state +"/" + params.county
      );
  
      if (res.ok) {
        console.log("Ok:");
        const json = await res.json();
        stat = json;
        updateState = stat.state;
        updateCounty = stat.county;
        updateAgeGroup = stat["agegroup"];
        updateGender = stat["gender"];
        updateDate = stat["date"];
        updateCases = stat["cases"];
        updateDeaths = stat["death"];
        updateRecovered = stat["recovered"];
       
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
          JSON.stringify(params.state) +
          JSON.stringify(params.county)
      );
  
      const res = await fetch(
        BASE_API_PATH +
          "/covid19-tracking-germany/" +
          params.state +
          "/" +
          params.county,
        {
          method: "PUT",
          body: JSON.stringify({
            "state": params.state,
            "county": params.county,
            "agegroup": updateAgeGroup,
            "gender": updateGender,
            "date": updateDate,
            "cases": parseInt(updateCases),
            "death": parseInt(updateDeaths),
            "recovered": parseInt(updateRecovered),
            
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
        <NavLink href="#/covid19-tracking-germany">Volver</NavLink>
      </NavItem>
    </Nav>
  
    <h2>
      Editar campo <strong>{params.state}</strong>
      <strong>{params.county}</strong>
    </h2>
    <Table bordered>
      <thead>
        <tr>
          <th>Estado</th>
          <th>Condado</th>
          <th>Grupo de edad</th>
          <th>Sexo</th>
          <th>Fecha</th>
          <th>Casos</th>
          <th>Muertes</th>
          <th>Recuperados</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{updateState}</td>
          <td>{updateCounty}</td>
          <td><input type="text" placeholder="05-15" bind:value={updateAgeGroup} /></td>
          <td><input type="text" placeholder="M o F" bind:value={updateGender} /></td>
          <td><input type="text" placeholder="05/12/2021" bind:value={updateDate} /></td>
          <td><input type="number" placeholder="0"  min="0" bind:value={updateCases} /></td>
          <td><input type="number" placeholder="0"  min="0" bind:value={updateDeaths} /></td>
          <td><input type="number" placeholder="0"  min="0" bind:value={updateRecovered} /></td>
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

