<script lang="ts">
	import Router from 'svelte-spa-router';
	  
	  import NotFound from "./Pages/NotFound.svelte";
	  import Home from "./Pages/Home.svelte";
	  import Info from "./Pages/Info.svelte";
	  import covidUsAPI from "./front/usCovidAPI/usCovidAPI.svelte";
	  import EditCovidUsAPI from "./front/usCovidAPI/EditStat.svelte";
	//  import LifeAPI  from "./front/lifeStatsAPI/App.svelte";
	//  import LifeStatEdit from "./front/lifeStatsAPI/LifeEdit.svelte"
	//  import DivorceAPI from "./front/DivorceStatsAPI/DivorceAPI.svelte";
	//  import EditDivorceAPI from "./front/DivorceStatsAPI/EditStat.svelte";


	  const routes = {
		  "/":Home,
		  "/info":Info,
		  "/us_counties_covid19_daily": covidUsAPI,
		  "/:county/:fips":EditCovidUsAPI, 
		//  "/natality-stats": NatalityAPI,
		// "/natality-stats/:country/:date":EditNatalityAPI,
		//  "/life-stats": LifeAPI, 		
		//  "/life-stats/:country/:date": LifeStatEdit,
		  '*': NotFound};
  </script>
  
  <main>
	  <Router {routes}> </Router>
  </main>
  
  <style>
  </style>