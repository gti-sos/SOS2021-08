  
<script lang="ts">
	import Router from 'svelte-spa-router';
	  
	import NotFound from "./Pages/NotFound.svelte";
	import Home from "./Pages/Home.svelte";
	import Info from "./Pages/Info.svelte";
	import Integration from "./Pages/integration.svelte";
	import Grupal from "./Pages/groupIntegration.svelte";
	import covid19TrackingGermanyAPI from "./front/antsilgorAPI/covid19TrackingGermanyAPI.svelte";
	import EditCovid19TrackingGermanyAPI from "./front/antsilgorAPI/EditCovid19TrackingGermanyAPI.svelte";
	import graficaCovid19TrackingGermany from "./front/antsilgorAPI/graphs/graficaCovid19TrackingGermany.svelte";
	import graficaDygraphCovid19TrackingGermany from "./front/antsilgorAPI/graphs/dygraphCovid19Germany.svelte";
	import graficaDepressionCovid19TrackingGermany from "./front/antsilgorAPI/graphs/depresionAndCovidGraph.svelte";
	import graficaNBA from "./front/antsilgorAPI/graphs/nbagraph.svelte";
	import graficaObesityCovid19TrackingGermany from "./front/antsilgorAPI/graphs/obesityAndCovidGermany.svelte";
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
	import graphintegracionFran from "./front/juavegsecAPI/integracionFran.svelte";
	import us_counties_covid19API  from "./front/antcarbarAPI/us_counties_covid19API.svelte";
	
	import EditUs_counties_covid19 from "./front/antcarbarAPI/EditUs_counties_covid19.svelte";
	import graphicDonut3D from './front/antcarbarAPI/graphicDonut3D.svelte';
	import chartist from './front/antcarbarAPI/chartist.svelte';	
	import highchartBB from './front/antcarbarAPI/highchartBB.svelte';
	import fusionchart1 from './front/antcarbarAPI/fusionchart1.svelte';
	import aleatorio  from "./front/antcarbarAPI/aleatorio.svelte";

	


	  const routes = {
		  "/":Home,
		  "/info":Info,
		  "/integrations":Integration,
		  "/integrations/grupal":Grupal,
		  "/covid19-tracking-germany": covid19TrackingGermanyAPI,
		  "/covid19-tracking-germany/analytics": graficaCovid19TrackingGermany,
		  "/integrations/covid19-tracking-germany/depresionAndCovidGraph":graficaDepressionCovid19TrackingGermany,
		  "/integrations/covid19-tracking-germany/obesityAndCovidGraph":graficaObesityCovid19TrackingGermany,
		  "/integrations/covid19-tracking-germany/agegroupDeathsAndCases":graficaDygraphCovid19TrackingGermany,
		  "/integrations/covid19-tracking-germany/nbaGraph":graficaNBA,
		  "/covid19-tracking-germany/:state/:county":EditCovid19TrackingGermanyAPI,
		  "/statewisetestingdetails": statewisetestingdetailsAPI,
		  "/statewisetestingdetails/:date/:state":Editstatewisetestingdetails,
		  "/us_counties_covid19_daily":  us_counties_covid19API,
		  "/us_counties_covid19_daily/:county/:fips":EditUs_counties_covid19,
		  "/us_counties_covid19_daily/graphicDonut3D":graphicDonut3D,
		  "/us_counties_covid19_daily/chartist":chartist,
		  "/us_counties_covid19_daily/fusionchart1":fusionchart1,
		  "/us_counties_covid19_daily/highchartBB":highchartBB,
		  "/us_counties_covid19_daily/aleatorio":aleatorio,
		  "/statewisetestingdetails/graph2": graph2,
		  "/statewisetestingdetails/amcChart": graphAMC,
		  "/statewisetestingdetails/integrationAnx": graphintegrationAnx,
		  "/statewisetestingdetails/integracionE1": graphintegracionE1,
		  "/statewisetestingdetails/integracionE2": graphintegracionE2,
		  "/statewisetestingdetails/integracionE3": graphintegracionE3,
		  "/statewisetestingdetails/integracionE4": graphintegracionE4,
		  "/statewisetestingdetails/integracionI2": graphintegracionI2,
		  "/statewisetestingdetails/integracionFran": graphintegracionFran,
		

		  '*': NotFound};
  </script>
  <main>
      <Router {routes}> </Router>
  </main>
  <style>
  </style>

