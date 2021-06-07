<script>
  import {onMount} from "svelte";
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
import {pop} from "svelte-spa-router";
export let params = {};


onMount(getCrime);


let statewisetestingdetails = {};
let date;
let state; 
let totalsamples
let negative;
let positive;
let type_not_stated;






async function getCrime(){
    console.log("Buscando crimen...");
    const res = await fetch("/api/v1/statewisetestingdetails/"+params.date+"/"+params.state);

    switch(res.status){
    case 200:
        console.log("OK!");
        const json= await res.json();
        statewisetestingdetails = json ;
        date = statewisetestingdetails.date;
        state = statewisetestingdetails.state;
        totalsamples = statewisetestingdetails.totalsamples;
        negative = statewisetestingdetails.negative;
        positive= statewisetestingdetails.positive;
        type_not_stated = statewisetestingdetails.type_not_stated;

        let mensajeaux= "El dato: "+params.date+"/"+params.state+" se encuentra en la Base de Datos"    
        lanzamensaje(res.status,res.statusText,"Se ha encontrado el recurso buscado",mensajeaux,null)
        
       
        console.log("Dato recibido.");
    break;

    case 404:
        let mensajeaux2= "El dato: "+params.date+"/"+params.state+" no se ha encontrado en la Base de datos"    
        lanzamensaje(res.status,res.statusText,"Se ha producido un error al buscar el elemento",mensajeaux2,true)
        console.log("Error, algo ha ido mal");
    break;

    default:
        lanzamensaje(res.status,res.statusText,"Se ha producido un error al buscar el elemento","Vaya... Algo ha salido mal. Probablemente la Base de Datos haya tenido un problema. Vuelva a intentarlo mas adelante",true)
    break;
    }
   


}

async function updateCrime(){
    console.log('Actualizando crimen con '+ JSON.stringify(params.date)+" "+JSON.stringify(params.state));
    const res = await fetch("/api/v1/statewisetestingdetails/"+date+"/"+state,{
        method: "PUT",
        body: JSON.stringify({
            date: date,
            state: state,
            totalsamples: totalsamples,
            negative: negative,
            positive: positive,
            type_not_stated: type_not_stated
            
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function(res){
       
        switch(res.status){

        case 200:
            botontomain=true;
            let mensajeaux= "El dato: "+params.date+"/"+params.state+" ha sido actualizado correctamente"    
        lanzamensaje(res.status,res.statusText,"Actualización exitosa",mensajeaux,null)
        break;
        case 400:

        break;
        case 404:
            let mensajeaux2= "El dato: "+params.date+"/"+params.state+" no se ha encontrado en la Base de datos"    
            lanzamensaje(res.status,res.statusText,"Se ha producido un error al Actualizar",mensajeaux2,true)
            
        break;
        case 409:
        let mensajeaux3= "El dato: "+params.date+"/"+params.state+" ha solicitado actualizar el Estado, Año o Mes. Se ha denegado la actualización para velar por la integridad de la información"    
            lanzamensaje(res.status,res.statusText,"Se ha producido un error al Actualizar",mensajeaux3,true)
        break;
        default:
        lanzamensaje(res.status,res.statusText,"Se ha producido un error al buscar el elemento","Vaya... Algo ha salido mal. Probablemente la Base de Datos haya tenido un problema. Vuelva a intentarlo mas adelante",true)
   
        break;


        }
    });	  

};

let popactualizar = false;
const toggleactualizar = () => (popactualizar = !popactualizar);
const actualiza = () => {updateCrime(); popactualizar = !popactualizar};




function gomain() {
location.href = '#/statewisetestingdetails';
}

let botontomain=false;


//Modal alerta
let rescodigo=0;
let mensaje= "";
let resstatus="";
let mensajeespecifico="";
let error=false;

let alerta=false;
const lanzamensaje=(rc,rs,m,me,err)=>{

rescodigo=rc;
resstatus=rs;
mensaje=m;
mensajeespecifico=me;
error=err;//booleano

alerta=true;
}
const togglealerta=()=>{
    alerta=!alerta;
}


</script>



<main>
  <Table bordered  style="background-color: #F5EEF8 ; width:75% ; text-align: center; ">
     <thead style="background-color: #E8DAEF; color:black">
         <tr>
             <td>Fecha</td>
             <td>Estado</td>
             <td>Casos totales</td>
             <td>Negativos</td>
             <td>Positivos</td>
           


           
         </tr>
     </thead>
     <tbody>
         
              <tr>
  
                <td><input readonly onmousedown="return false;" bind:value="{date}"></td>
                <td><input  readonly onmousedown="return false;" bind:value="{state}"> </td>
                <td><input  bind:value="{totalsamples}"> </td>
                <td><input  bind:value="{negative}"> </td>
                <td><input bind:value="{positive}"> </td>
   
      
            </tr>
         
     </tbody>
 </Table >
 <Button style="background-color: #28B463" on:click={toggleactualizar}> Actualizar</Button>
 <Button style="background-color: darkgray" on:click={pop}> Cancelar</Button>

 <Modal isOpen={popactualizar} toggle={toggleactualizar} transitionOptions>
    <ModalHeader {toggleactualizar}>¿Desea actualizar este dato?</ModalHeader>
    <ModalBody >
           Por favor pulse el botón "Actualizar" para confirmar la acción.       
    </ModalBody>
    <ModalFooter>
        <Button color="primary" on:click={actualiza}>Actualizar</Button>
        <Button color="secondary" on:click={toggleactualizar}>Cancelar</Button>
    </ModalFooter>
</Modal>


<Modal isOpen={alerta} toggle={togglealerta} transitionOptions>
<ModalHeader toggle={togglealerta} style="text-align: center;">{mensaje}

    
</ModalHeader>
<ModalBody style="text-align: center;">
    {#if error!=null}
        {#if error}
        Tras realizar la operación hemos obtenido un codigo de error:
        <p></p>
        <a href="https://docs.google.com/presentation/d/1i79Yihxsynbjtar05xFXLXHChqEbsO44oaxg8mXWL6g/edit#slide=id.g10ecd5ec32_1_14"> 
            {rescodigo} ({resstatus}).
        </a>
        <p>Causa:</p>
         
        <p>{mensajeespecifico}</p>
        
        {/if}
    {:else}
    <p>{mensajeespecifico}</p>
    {/if}

    <div>
        <p></p>
    <Button color="secondary" on:click={togglealerta}>Volver</Button>
    {#if botontomain}
    <Button color="secondary" on:click={gomain}>Volver a la tabla</Button>
    {/if}
</div>
</ModalBody>

</Modal>


</main>


<style>
  
</style>
<!--
<script>
    import { onMount } from "svelte";
  
    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  
    const BASE_API_PATH = "/api/v1";
    export let params = {};
    let stat = {};
    let updateDate = "XXXX-XX-XX";
    let updateState = "XXXX";
    let updateTotalsamples = 999;
    let updateNegative = 999;
    let updatePositive = 999;
    let errorMsg = "";
    let okMsg = "";
    
    async function getStat() {
      console.log("Fetching stat..." + params.date + " " + params.state);
      const res = await fetch(
        BASE_API_PATH +"/statewisetestingdetails/" + params.date +"/" + params.state
      );
  
      if (res.ok) {
        console.log("Ok:");
        const json = await res.json();
        stat = json;
        updateDate = stat.date;
        updateState = stat.state;
        updateTotalsamples = stat["totalsamples"];
        updateNegative = stat["negative"];
        updatePositive = stat["positive"];
    
       
        console.log("Received stat.");
        
      } else {
        if(res.status===404){
          errorMsg = "No se encuentra el dato solicitado";
        }else if(res.status ===500){
          errorMsg = "No se han podido acceder a la base de datos";
        }        
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    }
  
    async function updateStat() {
      console.log(
        "Updating stat..." +
          JSON.stringify(params.date) +
          JSON.stringify(params.state)
      );
  
      const res = await fetch(
        BASE_API_PATH +
          "/statewisetestingdetails/" +
          params.date +
          "/" +
          params.state,
        {
          method: "PUT",
          body: JSON.stringify({
            "date": params.date,
            "state": params.state,
            "totalsamples": parseInt(updateTotalsamples),
            "negative": parseInt(updateNegative),
            "positive": parseInt(updatePositive)
           
          }),
          headers: {
            "Content-Type": "application/json",
          }
        }
      ).then(function (res) {
        if (res.ok) {
          console.log("OK");
          getStat();
          errorMsg = "";
          okMsg = "Operación realizada correctamente";
        } else {
          if(res.status===409){
          errorMsg = "El dato ya se encuentra cargado";
        }else if(res.status ===500){
          errorMsg = "No se han podido acceder a la base de datos";
        }else if(res.status ===404){
          errorMsg = "No se ha encontrado el dato solicitado";
        }
          okMsg = "";
          getStat();
          console.log("ERROR!" + errorMsg);
        }
      });
    }
  
    onMount(getStat);
  </script>
  
  <main>
    <Nav>
      <NavItem>
        <NavLink href="#/statewisetestingdetails">Volver</NavLink>
      </NavItem>
    </Nav>
  
    <h2>
      Editar campo <strong>{params.date}</strong>
      <strong>{params.state}</strong>
    </h2>
    <Table bordered>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Estado</th>
          <th> Numero de casos</th>
          <th>Negativo</th>
          <th>Positivo</th>
       
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{updateDate}</td>
          <td>{updateState}</td>
          <td><input type="number" placeholder="0"  min="0" bind:value={updateTotalsamples} /></td>
          <td><input type="number" placeholder="0"  min="0" bind:value={updateNegative} /></td>
          <td><input type="number" placeholder="0"  min="0" bind:value={updatePositive} /></td>
          <td>
            <Button outline color="primary" on:click={updateStat}>Actualizar</Button>
          </td>
        </tr>
      </tbody>
    </Table>
    {#if errorMsg}
      <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    {#if okMsg}
    <p style="color: green">{okMsg}</p>
    {/if}
  
  </main>
  
  <style>
    main{
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
  </style>

-->