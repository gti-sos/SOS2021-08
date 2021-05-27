  
<script lang="ts">
	import Router from 'svelte-spa-router';
	  
	  import NotFound from "./Pages/NotFound.svelte";
	  import Home from "./Pages/Home.svelte";
	  import Info from "./Pages/Info.svelte";
	  import covid19TrackingGermanyAPI from "./front/antsilgorAPI/covid19TrackingGermanyAPI.svelte";
	  import EditCovid19TrackingGermanyAPI from "./front/antsilgorAPI/EditCovid19TrackingGermanyAPI.svelte";
	 
	  import statewisetestingdetailsAPI from "./front/juavegsecAPI/statewisetestingdetailsAPI.svelte";
	  import Editstatewisetestingdetails from "./front/juavegsecAPI/Editstatewisetestingdetails.svelte";
		import graph from "./front/juavegsecAPI/graphHC.svelte";
		import graph2 from "./front/juavegsecAPI/graphHC2.svelte";
	   
	  import us_counties_covid19API  from "./front/antcarbarAPI/us_counties_covid19API.svelte";
	  import EditUs_counties_covid19 from "./front/antcarbarAPI/EditUs_counties_covid19.svelte";

	


	  const routes = {
		  "/":Home,
		  "/info":Info,
		  "/covid19-tracking-germany": covid19TrackingGermanyAPI,
		  "/covid19-tracking-germany/:state/:county":EditCovid19TrackingGermanyAPI,
		  "/statewisetestingdetails": statewisetestingdetailsAPI,
		  "/statewisetestingdetails/:date/:state":Editstatewisetestingdetails,
		  "/us_counties_covid19_daily":  us_counties_covid19API,
		  "/us_counties_covid19_daily/:county/:fips":EditUs_counties_covid19,
		  "/statewisetestingdetails/graph": graph,
		  "/statewisetestingdetails/graph2": graph2,
		  '*': NotFound};
  </script>
  <main>
	  <Router {routes}> </Router>
  </main>
  
  <style>
  </style>
