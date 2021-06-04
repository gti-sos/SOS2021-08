<script>
    import {
        onMount
    } from "svelte";

    import {Jumbotron, Navbar, Nav, NavItem, NavLink, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'sveltestrap';
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    let isOpen = false;

    var CBData = [];
    var europe=[];
    var europe_deaths=[];
    
    async function getData(){

        const covidData= await fetch("https://covid-193.p.rapidapi.com/statistics", {
                "method":"GET",
                "headers":{
                    "x-rapidapi-key": "b8725c41c3msh1a6b8216d9f4f17p1fa8dcjsn85cd61011197",
	                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                    "useQueryString": true

                }

        });


        let covidJsons=[];
        covidJsons=await covidData.json();
        const res_CB_Data = await fetch("/api/v1/statewisetestingdetails");
        CBData = await res_CB_Data.json();
        
    
        for(var i =0; i<CBData.length; i++){
            let obj={}
            obj["name"]=CBData[i].state;
            obj["value"]=CBData[i].negative;
            europe.push(obj);
            
            
        }

        for(let x of covidJsons.response){
            let obj={}
            if(x.continent=="Europe"){

                if(x.country!="Europe" && x.population>10000000){ 
                    obj["name"]=x.country;
                    obj["value"]=x.deaths.total;
                    europe_deaths.push(obj);
                }
            }
            
        }

    }   
    
  async function loadGraph(){  
    getData().then(()=>{
        var graphdef={
            categories: ['Casos','Muertes'],
            dataset:{

                'Casos': europe,
                'Muertes':europe_deaths


            }
        }

        var chart = uv.chart ('Bar', graphdef,{
            meta:{
                caption:'Negativos en India y muertes en los principales paises europeos',

            }
        });
	

  });
}
  
</script>



<main>
  <body>
  <Jumbotron class="p-3" style="">
      <h1 class="titulo; mainDiv" style="color: white">Integración externa de negativos en India y muertes en los principales paises europeos</h1>
  </Jumbotron>
     
  </body>
  <br>
  <h1 class="titulo2"> Gráfica de datos </h1>
  <div style="width:800px; margin:0 auto;">
     
      <div id='uv-div' ></div>
    </div>
    <Button outline color="secondary" on:click="{pop}"> Atrás</Button>
</main>



<svelte:head>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.2.2/d3.v3.min.js"  ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/uvCharts/1.1.5/uvcharts.min.js" on:load={loadGraph}></script>
</svelte:head>



<style>

  
  .titulo2 {
      color: #000000;
      text-align: center;
      font-size: 150%;
  }
  .mainDiv{
      text-align: center;
      margin: 20px;
  }

</style>