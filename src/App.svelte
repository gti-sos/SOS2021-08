  
<script lang="ts">
	import Router from 'svelte-spa-router';
	  
	  import NotFound from "./Pages/NotFound.svelte";
	  import Home from "./Pages/Home.svelte";
	  import Info from "./Pages/Info.svelte";
	  import covid19TrackingGermanyAPI from "./front/antsilgorAPI/covid19TrackingGermanyAPI.svelte";
	  import EditCovid19TrackingGermanyAPI from "./front/antsilgorAPI/EditCovid19TrackingGermanyAPI.svelte";
	 
	  import statewisetestingdetailsAPI from "./front/juavegsecAPI/statewisetestingdetailsAPI.svelte";
	  import Editstatewisetestingdetails from "./front/juavegsecAPI/Editstatewisetestingdetails.svelte";

	  const routes = {
		  "/":Home,
		  "/info":Info,
		  "/covid19-tracking-germany": covid19TrackingGermanyAPI,
		  "/covid19-tracking-germany/:state/:county":EditCovid19TrackingGermanyAPI,
		  "/statewisetestingdetails": statewisetestingdetailsAPI,
		  "/statewisetestingdetails/:date/:state":Editstatewisetestingdetails,
		  '*': NotFound};
  </script>
  
  <main>
	  <Router {routes}> </Router>
  </main>
  
  <style>
  </style>
