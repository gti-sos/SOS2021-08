<script>
    import { onMount } from "svelte";
  
    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  
    const BASE_API_PATH = "/api/v1";
    export let params = {};
    let stat = {};
    let updateDate = "XXXX-XX-XX";
    let updateState = "XXXX";
    let updateTotalsamples = 999;
    let updateNegative = 999;
    let updatePositive = 999;
    let errorMsg = "";
    let okMsg = "";
    
    async function getStat() {
      console.log("Fetching stat..." + params.date + " " + params.state);
      const res = await fetch(
        BASE_API_PATH +"/statewisetestingdetails/" + params.date +"/" + params.state
      );
  
      if (res.ok) {
        console.log("Ok:");
        const json = await res.json();
        stat = json;
        updateDate = stat.date;
        updateState = stat.state;
        updateTotalsamples = stat["totalsamples"];
        updateNegative = stat["negative"];
        updatePositive = stat["positive"];
    
       
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
          JSON.stringify(params.date) +
          JSON.stringify(params.state)
      );
  
      const res = await fetch(
        BASE_API_PATH +
          "/statewisetestingdetails/" +
          params.date +
          "/" +
          params.state,
        {
          method: "PUT",
          body: JSON.stringify({
            "date": params.date,
            "state": params.state,
            "totalsamples": parseInt(updateTotalsamples),
            "negative": parseInt(updateNegative),
            "positive": parseInt(updatePositive)
           
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
        <NavLink href="#/statewisetestingdetails">Volver</NavLink>
      </NavItem>
    </Nav>
  
    <h2>
      Editar campo <strong>{params.date}</strong>
      <strong>{params.state}</strong>
    </h2>
    <Table bordered>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Estado</th>
          <th> Numero de casos</th>
          <th>Negativo</th>
          <th>Positivo</th>
       
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{updateDate}</td>
          <td>{updateState}</td>
          <td><input type="number" placeholder="0"  min="0" bind:value={updateTotalsamples} /></td>
          <td><input type="number" placeholder="0"  min="0" bind:value={updateNegative} /></td>
          <td><input type="number" placeholder="0"  min="0" bind:value={updatePositive} /></td>
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

