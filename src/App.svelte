<script>


	import usCovidTable from './usCovidTable.svelte';
	import gerCovidTable from './gerCovidTable.svelte';
	import indCovidTable from './indCovidTable.svelte';
	import {
    Button,
    
  } from "sveltestrap";
  import Router from 'svelte-spa-router';
  const routes = {
		
		"/us_counties_covid19_daily": usCovidTable,
		"/covid19-tracking-germany": gerCovidTable,
		"/statewisetestingdetails": indCovidTable};
  
</script>

<main>
	<h1>SOS2021-02</h1>
	<a href="old_static_index.html"> INTEGRANTES DEL GRUPO</a>

		<p>API CASOS COVID US</p>
		<a href="/#/us_counties_covid19_daily"
            ><Button color="primary">Datos covid estados unidos</Button></a
          >
		  <a href="https://documenter.getpostman.com/view/14969056/TzJshe8k"
            ><Button color="primary">Documentación de Postman</Button></a
          >

		<p>API CASOS COVID ALEMANIA</p>
		<a href="/#/covid19-tracking-germany"
            ><Button color="primary">Datos covid alemania</Button></a
          >
		  <a href="https://documenter.getpostman.com/view/14969395/TzJoE1Zm"
		  ><Button color="primary">Documentación de Postman</Button></a
		>

		<p>API CASOS COVID INIDA</p>
		<a href="/#/statewisetestingdetails"
            ><Button color="primary">Datos covid india</Button></a
          >
		  <a href="https://documenter.getpostman.com/view/14947979/TzJsgyZ1"
            ><Button color="primary">Documentación de Postman</Button></a
          >

		<Router {routes}> </Router>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #51ff0056;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	
</style>