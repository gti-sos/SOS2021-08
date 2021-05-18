<script>
    
    import {
        Nav,
        Modal,
        ModalBody,
        ModalFooter,
        ModalHeader,
        NavItem,
        NavLink,
        Button,
        Table,
        UncontrolledAlert,
        Card,
        CardBody,
        CardFooter,
        CardHeader,
        CardSubtitle,
        CardText,
        CardTitle,
    } from "sveltestrap";
     
    import {
       pop
    } from "svelte-spa-router";
    import {
        onMount
    } from "svelte";
    
    
    let date = "03/04/2021"
    let states = ["Bayern", "Berlin", "Nordrhein-Westfalen", "Sachsen"]	
  
  
   
    let data = [];
    let array = [];
    onMount(buscar)
    async function getData(){
        console.log("Fetching data...");
        const res = await fetch("api/v1/covid19-tracking-germany");
        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            data = json;
            console.log(`We have received ${data.length} data points.`);
            for(let i=0;i<data.length;i++){
                let aux= data[i].covid_19_tracking_germany.replace(".","")
                array[i]=parseInt(aux,10)
            }
            
            console.log(array);
        }else{
            console.log("Error!");
        }
    }   
   
     function datos() {
        
        getData()
        
    }
    function getVisibilidad(n) {
        
        return n.includes("Berlin")||n.includes("Bayern")||n.includes("Nordrhein-Westfalen")||n.includes("Sachsen");
    }
   function loadGraph(){  
    
    //Series para states
    var seriesaux = [],
    len = states.length,
    i = 0;
   
    for(i;i<len;i++){
        let comienzo=i
        let fin=comienzo +5
        let arraytroceada=array.slice(comienzo,fin)
        const arrayoredenada=[]
        //ordenamos la array en funcion de como salen los datos del get
        arrayoredenada[0]=arraytroceada[0]
        arrayoredenada[1]=arraytroceada[1]
        arrayoredenada[2]=arraytroceada[2]
        arrayoredenada[3]=arraytroceada[3]
        arrayoredenada[4]=arraytroceada[4]
        
       seriesaux.push({
        name: states[i],
        data: arrayoredenada,
        visible: getVisibilidad(states[i])
    });
    }
    //SERIES PARA LOS states
    Highcharts.chart('container', {
title: {
    text: 'Ataques por armas personales 2010-2019'
},
yAxis: {
    title: {
        text: 'Tipo de ataque: armas personales'
    }
},
xAxis: {
    accessibility: {
        rangeDescription: 'Range: 2010 to 2019'
    }
},
legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
},
plotOptions: {
    series: {
        label: {
            connectorAllowed: false
        },
        pointStart: 2010
    }
},
series: seriesaux,
responsive: {
    rules: [{
        condition: {
            maxWidth: 500
        },
        chartOptions: {
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
            }
        }
    }]
}
});
  }
  let b=false;
const busqueda=()=>{
    b=!b;
}
async function buscar(){
    b=!b;
   
   getData(date)
   await delay(200);
   recarga()
   
  
   
}
const recarga=()=>{
    loadGraph()
   
}
const delay = ms => new Promise(res => setTimeout(res, ms));
</script>

<svelte:head>
    
    <script src="https://code.highcharts.com/highcharts.src.js" on:load="{loadGraph}"></script>
    
    
       
</svelte:head>

<main>
    
    <figure class="highcharts-figure">
        <div id="container"></div>
        
    </figure>  
    <div>
        <Button color="secondary" on:click={pop}>Volver</Button>
        
    </div>

    <Modal isOpen={b} toggle={busqueda} transitionOptions>
        <ModalHeader {busqueda}>¿Desea cambiar el año?</ModalHeader>
        <ModalBody >
            <p>Introduzaca el año del que quiera obtener los datos.</p>
                    <div style="text-align: center;" >
                        <input type="text" bind:value="{date}">
                    </div>
           
        </ModalBody>
        <ModalFooter>
            <Button color="primary" on:click={buscar}>Vamos allá!</Button>
            <Button color="secondary" on:click={busqueda}>Cancelar</Button>
        </ModalFooter>
    </Modal>
</main>
<style>
    
</style>