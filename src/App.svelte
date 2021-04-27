<script>


	import usCovidTable from './usCovidTable.svelte';
	import gerCovidTable from './gerCovidTable.svelte';
	import indCovidTable from './indCovidTable.svelte';

	import Router from 'svelte-spa-router';
	const routes = {
		
		"/us_counties_covid19_daily": usCovidTable,
		"/covid19-tracking-germany": gerCovidTable,
		"/statewisetestingdetails": indCovidTable};
  
</script>
<body>
	<main>
		<h1>GRUPO 08 SOS</h1>
		<a href="old_static_index.html"><h2>INFO DESARROLLADORES</h2></a>
			<div class="row enlaces">
				<div class="col">
					<h3>API CASOS COVID US</h3>
					<a href="/#/us_counties_covid19_daily">
						<button type="button"  class="btn btn-danger">Datos covid estados unidos</button></a>
					<a href="https://documenter.getpostman.com/view/14969056/TzJshe8k">
						<button type="button" class="btn btn-warning">Documentación de Postman</button></a>
						<button type="button" class="btn btn-success" id="BotonUS" onclick="loadInitialDataUS()">LOAD INITIAL DATA US</button>

						<script>
						async function loadInitialDataUS(){
							console.log("Load Initial data us...");
							const res1 = await fetch("/api/v1/us_counties_covid19_daily/loadInitialData");
							if(res1.ok){
								getData();
							};
						}
						</script>
				</div>
				<div class="col">
					<h3>API CASOS COVID ALEMANIA</h3>
					<a href="/#/covid19-tracking-germany">
						<button type="button" class="btn btn-danger">Datos covid alemania</button></a>
					<a href="https://documenter.getpostman.com/view/14969395/TzJoE1Zm">
						<button type="button" class="btn btn-warning">Documentación de Postman</button></a>
						<button type="button" class="btn btn-success" id="BotonGer" onclick="loadInitialDataGER()">LOAD INITIAL DATA Alemania</button>
				
						<script>
						async function loadInitialDataGER(){
							console.log("Load Initial data alemania...");
							const res1 = await fetch("https://sos2021-08.herokuapp.com/api/v1/covid19-tracking-germany/loadInitialData");
							if(res1.ok){
								getData();
							};
						}
						</script>
				</div>
				<div class="col">
					<h3>API CASOS COVID INDIA</h3>
					<a href="/#/statewisetestingdetails"> 
						<button type="button" class="btn btn-danger">Datos covid india</button></a>
					<a href="https://documenter.getpostman.com/view/14947979/TzJsgyZ1">
						<button type="button"  class="btn btn-warning">Documentación de Postman</button></a>
					<button type="button" class="btn btn-success" id="BotonIND" onclick="loadInitialDataIND()">LOAD INITIAL DATA India</button>
				
					<script>
					async function loadInitialDataIND(){
						console.log("Load Initial data India...");
						const res1 = await fetch("/api/v1/statewisetestingdetails/loadInitialData");
						if(res1.ok){
							getData();
						};
					}
				</script>
				</div>
		</div>

			<Router {routes}> </Router>
	</main>
</body>
<style>
	body{
		background: url("https://moreraasesores.com/wp-content/uploads/2020/03/corona-4901880_1920-980x551.jpg") no-repeat center center fixed;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
		background-size: cover;
		}

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	.enlaces{
		margin-top: 3%;
		margin-bottom: 5%;
	}

	button{
		margin: 2%;
		width: fit-content;
	}

	h1 {
		color: #ff7b00da;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	h2{
		color: blueviolet;
	}

	h3{
		color: antiquewhite;
	}


	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	
</style>