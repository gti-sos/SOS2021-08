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
    
    
   onMount(getData);
    
    let stat = {};
    let state;
    let county; 
    let agegroup;
    let gender;
    let date;
    let cases;
    let death;
    let recovered;
    
 
    
    
    async function getData(){
        console.log("Buscando datos covid en alemania...");
        const res = await fetch("api/v1/covid19-tracking-germany/" + params.state +"/" + params.county);
        switch(res.status){
        case 200:
            console.log("OK!");
            const json= await res.json();
            stat = json ;
            state = stat.state;
            county = stat.county;
            agegroup = stat.agegroup;
            gender = stat.gender;
            date= stat.date;
            cases= stat.cases;
            death= stat.death;
            recovered= stat.recovered;
            let mensajeaux= "El dato: "+params.state+"/"+params.county+" se encuentra en la Base de Datos"    
            lanzamensaje(res.status,res.statusText,"Se ha encontrado el recurso buscado",mensajeaux,null)
            
           
            console.log("datos covid en alemania recibido.");
        break;
        case 404:
            let mensajeaux2= "El dato: "+params.state+"/"+params.county+" no se ha encontrado en la Base de datos"    
            lanzamensaje(res.status,res.statusText,"Se ha producido un error al buscar el elemento",mensajeaux2,true)
            console.log("Error, algo ha ido mal");
        break;
        default:
            lanzamensaje(res.status,res.statusText,"Se ha producido un error al buscar el elemento","Vaya... Algo ha salido mal. Probablemente la Base de Datos haya tenido un problema. Vuelva a intentarlo mas adelante",true)
        break;
        }
       
    }
    
    async function updateData(){
        console.log('Actualizando datos covid en alemania con '+ JSON.stringify(params.state)+" "+JSON.stringify(params.county));
		const res = await fetch("api/v1/covid19-tracking-germany/"+state+"/"+county,{
			method: "PUT",
			body: JSON.stringify({
                state: state,
                county: county,
                agegroup: agegroup,
                gender: gender ,
                date: date,
                cases: cases,
                death: death,
                recovered: recovered 
                
				
            }),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(function(res){
           
            switch(res.status){
            case 200:
                botontomain=true;
                let mensajeaux= "El dato: "+params.state+"/"+params.county+" ha sido actualizado correctamente"    
            lanzamensaje(res.status,res.statusText,"Actualización exitosa",mensajeaux,null)
            break;
            case 400:
            break;
            case 404:
                let mensajeaux2= "El dato: "+params.state+"/"+params.county+" no se ha encontrado en la Base de datos"    
                lanzamensaje(res.status,res.statusText,"Se ha producido un error al Actualizar",mensajeaux2,true)
                
            break;
            case 409:
            let mensajeaux3= "El dato: "+params.state+"/"+params.county+" ha solicitado actualizar el Estado, Año o Mes. Se ha denegado la actualización para velar por la integridad de la información"    
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
    const actualiza = () => {updateData(); popactualizar = !popactualizar};
 
   
    function gomain() {
    location.href = '#/covid19-tracking-germany';
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
                 <td>Estado</td>
                 <td>Condado</td>
                 <td>Grupo de edad</td>
                 <td>Sexo</td>
                 <td>Fecha</td>
                 <td>Casos</td>
                 <td>Muertes</td>
                 <td>Recuperados</td>
                 <td>Acciones</td>
               
             </tr>
         </thead>
         <tbody>
             
                  <tr>
                    
                    <td><input  readonly onmousedown="return false;" bind:value="{state}"></td>
                    <td><input  readonly onmousedown="return false;" bind:value="{county}"> </td>
                    <td><input  bind:value="{agegroup}"> </td>
                    <td><input  bind:value="{gender}"> </td>
                    <td><input  bind:value="{date}"> </td>
                    <td><input  bind:value="{cases}"> </td>
                    <td><input  bind:value="{death}"> </td>
                    <td><input  bind:value="{recovered}"> </td>
                    <td><Button style="background-color: #28B463" on:click={toggleactualizar}> Actualizar</Button>
                        <Button style="background-color: darkgray" on:click={pop}> Cancelar</Button></td>
                    
                </tr>
             
         </tbody>
     </Table >
     
 
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