  
<script lang="ts">
	import Router from 'svelte-spa-router';
	  
	import NotFound from "./Pages/NotFound.svelte";
	import Home from "./Pages/Home.svelte";
	import Info from "./Pages/Info.svelte";
	import covid19TrackingGermanyAPI from "./front/antsilgorAPI/covid19TrackingGermanyAPI.svelte";
	import EditCovid19TrackingGermanyAPI from "./front/antsilgorAPI/EditCovid19TrackingGermanyAPI.svelte";
	import graficaCovid19TrackingGermany from "./front/antsilgorAPI/graphs/graficaCovid19TrackingGermany.svelte"
	
	import statewisetestingdetailsAPI from "./front/juavegsecAPI/statewisetestingdetailsAPI.svelte";
	import Editstatewisetestingdetails from "./front/juavegsecAPI/Editstatewisetestingdetails.svelte";
	
	import graph2 from "./front/juavegsecAPI/graphHC2.svelte";
	import graphAMC from "./front/juavegsecAPI/amcChart.svelte";
	import graphintegrationAnx from "./front/juavegsecAPI/integrationAnx.svelte";
	import graphintegracionE1 from "./front/juavegsecAPI/integracionE1.svelte";
	import graphintegracionE2 from "./front/juavegsecAPI/integracionE2.svelte";
	import graphintegracionE3 from "./front/juavegsecAPI/integracionE3.svelte";
	import graphintegracionE4 from "./front/juavegsecAPI/integracionE4.svelte";
	import graphintegracionI2 from "./front/juavegsecAPI/integracionI2.svelte";
	
	import us_counties_covid19API  from "./front/antcarbarAPI/us_counties_covid19API.svelte";
	import EditUs_counties_covid19 from "./front/antcarbarAPI/EditUs_counties_covid19.svelte";

	


	  const routes = {
		  "/":Home,
		  "/info":Info,
		  "/covid19-tracking-germany": covid19TrackingGermanyAPI,
		  "/covid19-tracking-germany/analytics": graficaCovid19TrackingGermany,
		  "/covid19-tracking-germany/:state/:county":EditCovid19TrackingGermanyAPI,
		  "/statewisetestingdetails": statewisetestingdetailsAPI,
		  "/statewisetestingdetails/:date/:state":Editstatewisetestingdetails,
		  "/us_counties_covid19_daily":  us_counties_covid19API,
		  "/us_counties_covid19_daily/:county/:fips":EditUs_counties_covid19,
		 
		  "/statewisetestingdetails/graph2": graph2,
		  "/statewisetestingdetails/amcChart": graphAMC,
		  "/statewisetestingdetails/integrationAnx": graphintegrationAnx,
		  "/statewisetestingdetails/integracionE1": graphintegracionE1,
		  "/statewisetestingdetails/integracionE2": graphintegracionE2,
		  "/statewisetestingdetails/integracionE3": graphintegracionE3,
		  "/statewisetestingdetails/integracionE4": graphintegracionE4,
		  "/statewisetestingdetails/integracionI2": graphintegracionI2,

		  '*': NotFound};
  </script>
  <main>
      <Router {routes}> </Router>
  </main>
  <style>
  </style>

