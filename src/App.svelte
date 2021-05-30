  
<script lang="ts">
	import Router from 'svelte-spa-router';
<<<<<<< HEAD
	  
	  import NotFound from "./Pages/NotFound.svelte";
	  import Home from "./Pages/Home.svelte";
	  import Info from "./Pages/Info.svelte";
	  import covid19TrackingGermanyAPI from "./front/antsilgorAPI/covid19TrackingGermanyAPI.svelte";
	  import EditCovid19TrackingGermanyAPI from "./front/antsilgorAPI/EditCovid19TrackingGermanyAPI.svelte";
	 
	  import statewisetestingdetailsAPI from "./front/juavegsecAPI/statewisetestingdetailsAPI.svelte";
	  import Editstatewisetestingdetails from "./front/juavegsecAPI/Editstatewisetestingdetails.svelte";
		import graph from "./front/juavegsecAPI/graphHC.svelte";
		import graph2 from "./front/juavegsecAPI/graphHC2.svelte";
		import graphQ from "./front/juavegsecAPI/graphQ.svelte";
	   
	  import us_counties_covid19API  from "./front/antcarbarAPI/us_counties_covid19API.svelte";
	  import EditUs_counties_covid19 from "./front/antcarbarAPI/EditUs_counties_covid19.svelte";

	

=======
	import NotFound from "./Pages/NotFound.svelte";
	import Home from "./Pages/Home.svelte";
	import Info from "./Pages/Info.svelte";
	import covid19TrackingGermanyAPI from "./front/antsilgorAPI/covid19TrackingGermanyAPI.svelte";
	import EditCovid19TrackingGermanyAPI from "./front/antsilgorAPI/EditCovid19TrackingGermanyAPI.svelte";
	import GraficaCovid19TrackingGermany from './front/antsilgorAPI/graphs/graficaCovid19TrackingGermany.svelte';
	import statewisetestingdetailsAPI from "./front/juavegsecAPI/statewisetestingdetailsAPI.svelte";
	import Editstatewisetestingdetails from "./front/juavegsecAPI/Editstatewisetestingdetails.svelte";
	import us_counties_covid19API  from "./front/antcarbarAPI/us_counties_covid19API.svelte";
	import EditUs_counties_covid19 from "./front/antcarbarAPI/EditUs_counties_covid19.svelte";
    
>>>>>>> d4e2eecc840a745b141919ff97b53c3aed6fa116

	  const routes = {
		  "/":Home,
		  "/info":Info,
		  "/covid19-tracking-germany": covid19TrackingGermanyAPI,
		  "/covid19-tracking-germany/analytics": GraficaCovid19TrackingGermany,
		  "/covid19-tracking-germany/:state/:county":EditCovid19TrackingGermanyAPI,
		  "/statewisetestingdetails": statewisetestingdetailsAPI,
		  "/statewisetestingdetails/:date/:state":Editstatewisetestingdetails,
		  "/us_counties_covid19_daily":  us_counties_covid19API,
		  "/us_counties_covid19_daily/:county/:fips":EditUs_counties_covid19,
<<<<<<< HEAD
		  "/statewisetestingdetails/graph": graph,
		  "/statewisetestingdetails/graph2": graph2,
		  "/statewisetestingdetails/graphQ": graphQ,
		  '*': NotFound};
=======
		  '*': NotFound
		};
>>>>>>> d4e2eecc840a745b141919ff97b53c3aed6fa116
  </script>
  <main>
      <Router {routes}> </Router>
  </main>
  <style>
  </style>

