<script lang="ts">
   
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

   
   const BASE_API_URL = "/api/v1/statewisetestingdetails"; //tiene que llamar a la API para tratar los datos
 
   let cargados = false;
   let data = [];

   let isOpen = false;

   let limit =10;
   let ofset =0;
   let pagina = (ofset/10)+1;
   let num_paginas=0;
   let flags ="";
   let filtros_act= false;

   getData();

   let newData = {
           date:"",
           state:"",
           totalsamples:"",
           negative:"",
        positive:"",
      
       }
  let databusqueda = {
          date:"",
           state:"",
           totalsamples:"",
           negative:"",
           positive:"",
       }
       
    //funcion asincrona para cargar (get) los recursos existentes
    async function getNumPaginas() {
           console.log("Fetching covid resourcers...");
           const res = await fetch(BASE_API_URL);
           let datos=[]
           if(res.ok){
               const json = await res.json();
               datos = json;
               num_paginas=(datos.length/10)+1|0;
               if(datos.length%10==0&&num_paginas!==1){
                   num_paginas--;
               }

           }else{
               console.log("ERROR!");
           }

       }


    async function getData() {
           getNumPaginas()
           console.log(num_paginas)
           console.log("Fetching covid resourcers...");
         
           const res = await fetch(BASE_API_URL+"?limit="+limit+"&offset="+ofset+flags);
           if(res.status==200){
               const json = await res.json();
               data = json;
               console.log(`Received ${data.length} resources`);
               pagina = (ofset/10)+1

               let mes="Hemos encontrado "+ data.length +" elementos que concuerden con la busqueda";
               if(filtros_act) lanzamensaje(res.status,res.statusText,"Advertencia",mes,null)
           }else if(res.status == 404){
               console.log("Error 404!");
               lanzamensaje(res.status,res.statusText,"No sde ha encontrado el elemento buscado","El dato no ha sido encontrado en la base de datos haya tenido un .",true)
           }

       }

       async function insertData() { //insertar un recurso en concreto
           console.log("Inserting new resource " + JSON.stringify(newData));
           newData.state=newData.state.replace(" ","_")
           const res = await fetch(BASE_API_URL, {
               method: "POST",
               
               body: JSON.stringify(newData),
               headers: {
                   "Content-Type": "application/json",
               }
           }
           ).then( (res) => {
               getData();
               switch (res.status){
                   case 409:
                   lanzamensaje(res.status,res.statusText,"Se ha producido un error en el Insert","Ya existe un dato que con los mismos creedenciales",true)
                   break

                   case 400:
                   lanzamensaje(res.status,res.statusText,"Se ha producido un error en el Insert","Ha habido un problema con el cuerpo de la petición",true)
                   break

                   case 201:
                       let mensajeaux= "El dato: "+newData.date+"/"+newData.state+" ya forma parte de la base de datos." 
                   lanzamensaje(res.status,res.statusText,"El dato se ha insertado satisfactoriamente",mensajeaux,null)
                   break

                   default:
                   lanzamensaje(res.status,res.statusText,"Se ha producido un error en el Insert","Vaya... Algo ha salido mal. Probablemente la Base de Datos haya tenido un problema. Vuelva a intentarlo mas adelante",true)
                   break
               }
           })
           
       }

       async function deleteData(a, b) { //elimina un recurso en concreto
           
           console.log("Deleting resource " + JSON.stringify(data));
           const res = await fetch(BASE_API_URL+"/"+a+"/"+b, {
               method: "DELETE",
             
           })
           switch(res.status){
           case 200:
           let mensajeaux= "El dato: "+a+"/"+b+" ya forma no parte de la base de datos." 
                   lanzamensaje(res.status,res.statusText,"El dato se ha eliminado satisfactoriamente",mensajeaux,null)
                   if(data.length==1&&num_paginas>1){
                       ofset-=10; getData()
                    }else{
                       getData();
                   }
           break;
           case 404:
           let mensajeaux2= "El dato: "+a+"/"+b+" no se ha encontrado"    
           lanzamensaje(res.status,res.statusText,"Se ha producido un error al intentar borrar el elemento",mensajeaux2,true)

           break;
           default:
           lanzamensaje(res.status,res.statusText,"Se ha producido un error al intentar borrar el elemento","Vaya... Algo ha salido mal. Probablemente la Base de Datos haya tenido un problema. Vuelva a intentarlo mas adelante",true)
           break;
           
       }
       }

       async function loadStats(){
       deleteStats();
       console.log("Loading data...");
       const carga =  await fetch(BASE_API_URL + "/loadInitialData");
       cargados = true;
       if (carga.ok){
           console.log("Ok.");
           const res = await fetch(BASE_API_URL);
           if(res.ok){
               console.log("Ok. Obtaining data...")
               const json = await res.json();
               data = json;
               console.log('Received ${data.length}  stats.');
               let mensajeaux = " Se han cargado un total de " + data.length+ " elementos."
               getData()
               lanzamensaje(res.status,res.statusText,"Los datos se han cargado satisfactoriamente",mensajeaux,null)
           }else{
               lanzamensaje(res.status,res.statusText,"Se ha producido un error al intentar cargar los datos",
               "Vaya... Algo ha salido mal. Probablemente la Base de Datos haya tenido un problema. Vuelva a intentarlo mas adelante",
               true)
                  
               console.log("Error, there is no data.")
           }
       }else{
           lanzamensaje(carga.status,carga.statusText,"Se ha producido un error al intentar cargar los datos","Vaya... Algo ha salido mal al inicializar los datos",true)
                  
           console.log("Error loading data.");
       }
   }
  
   async function deleteStats() {
   console.log("Deleting life stats...");
       cargados=false;
   const res = await fetch(BASE_API_URL, {
     method: "DELETE"
   }).then(function (res) {
     if (res.status==200){
       console.log("Ok.");
               let mensajeespecifico ="Se han eliminado "+data.length+" elementos."
               data = [];
               lanzamensaje(res.status,res.statusText,"Los datos se han eliminado satisfactoriamente",mensajeespecifico ,null)
     } else if (res.status==404){ //no data found
               console.log("No data found");
               lanzamensaje(res.status,res.statusText,"Fallo al eliminar los datos","No existen datos que eliminar" ,true)
     } else  { 
       console.log("Error deleting DB stats");
               lanzamensaje(res.status,res.statusText,"Fallo al eliminar los datos",
               "Vaya... Algo ha salido mal. Probablemente la Base de Datos haya tenido un problema. Vuelva a intentarlo mas adelante" 
               ,true)
     }
     
   });
        
    
 }

    //Insert
   let open1 = false;
   const toggle1 = () => (open1 = !open1);
   const toggle1P = () => {
       open1 = !open1;
       console.log("Imprimo: "+newData.state.length)
       if(newData.date.replace(' ', '').length!=0 
       && newData.state.replace(' ', '').length!=0 
       && newData.totalsamples.replace(' ', '').length!=0 
       && newData.negative.replace(' ', '').length!=0 
   && newData.positive.replace(' ', '').length!=0  ){

       insertData()
       getData();
       }
       else{

           console.log("Nada añadido")
           popinsert=true;
       }

   };

   let popinsert = false;
   const togglepop = () => (popinsert = !popinsert);
   const togglepopok = () => {
       popinsert = !popinsert;
       open1=true}
   
   function gotoupdate(a,b) {
   location.href = '#/statewisetestingdetails/'+a+'/'+b;
}
//paginacion

const siguiente= () => {ofset+=10; getData()}
const anterior= () => {ofset-=10; getData()}

//Busqueda especifica



   let popbusqueda = false;
   const cancelarbusqueda = () => (popbusqueda = !popbusqueda);
   const buscar = () => {
       popbusqueda = !popbusqueda
      
       if(databusqueda.date.replace(" ","").length!=0){
           flags= flags+"&date="+databusqueda.date;
       }
       if(databusqueda.state.replace(" ","").length!=0){
           flags= flags+"&state="+databusqueda.state;
       }
       if(databusqueda.totalsamples.replace(" ","").length!=0){
           flags= flags+"&totalsamples="+databusqueda.totalsamples;
       }
       if(databusqueda.negative.replace(" ","").length!=0){
           flags= flags+"&negative="+databusqueda.negative;
       }
      if(databusqueda.positive.replace(" ","").length!=0){
           flags= flags+"&positive="+databusqueda.positive;
       }
       
       filtros_act=true
       getData()
   }

       const quitafiltros =() => {
           flags="";
           filtros_act=false;
           getData();
       }

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
 

<!-- svelte-ignore missing-declaration -->
<main>
   <div>
      
       <Button style="background-color: #f3ca12" on:click={deleteStats}> Eliminar datos</Button> 
       {#if cargados}  
       <Button style="background-color: #f31255;" disabled> Cargar datos</Button>
       {:else}
       <Button style="background-color: #f31255;" on:click={loadStats}> Cargar datos</Button>
       {/if}
       <p></p>
       <Button style="background-color: #f33012" on:click={toggle1}> Insertar</Button>
       
       {#if !filtros_act} 
       <Button style="background-color: #12f3e4" on:click={cancelarbusqueda}> Busqueda específica </Button>
       {:else}
       <Button style="background-color: #12f3e4" on:click={quitafiltros}> Quitar filtros </Button>
       <p style="text-align: rigth; background-color: antiquewhite;">↑(!) Existen filtros activos, para realizar otro filtrado desactivelos.</p>
       {/if}


             <!-- Modal para insertar -->
           <div id="modal">
           <Modal isOpen={open1} toggle={toggle1} transitionOptions>
               <ModalHeader {toggle1}>¿Quieres insertar un nuevo dato?</ModalHeader>
               <ModalBody >
                   Por favor, rellene el formulario, es necesario que todos los campos tengan un valor.
                   <tr>
                       <Table >
                           
                           <tbody>
                                    <tr>
                                       <td>Fecha</td>
                                       <td><input   bind:value="{newData.date}"></td>
                                       </tr>
                                       <tr>
                                       <td>Estado</td>
                                       <td><input   bind:value="{newData.state}"> </td>
                                        </tr>
                                        <tr>
                                       <td>Casos totales</td>
                                       <td><input  bind:value="{newData.totalsamples}"> </td>
                                        </tr>
                                      <tr>
                                       <td>Negativos</td>
                                       <td><input  bind:value="{newData.negative}"> </td>
                                       </tr>
                                       <tr>
                                       <td>Postivos</td>
                                       <td><input  bind:value="{newData.positive}"> </td>
                                        </tr>

                           </tbody>
                       </Table >
                   </tr>
               </ModalBody>
               <ModalFooter>
                   <Button color="primary" on:click={toggle1P}>Insertar</Button>
                   <Button color="secondary" on:click={toggle1}
                       >Cancelar</Button
                   >
               </ModalFooter>
           </Modal>

           <!-- Modal para la busqueda -->

           <Modal isOpen={popbusqueda} toggle={cancelarbusqueda} transitionOptions>
               <ModalHeader {cancelarbusqueda}>¿Desea hacer una busqueda especifica?</ModalHeader>
               <ModalBody >
                  Por favor introduzca los valores exactos que desea que contengan los objetos filtrados.
                   <tr>
                       <Table >
                           
                           <tbody>
                                       
                                       
                                  <tr>
                                       <td>Fecha</td>
                                       <td><input  bind:value="{databusqueda.date}"></td>
                                       
                                       
                                   </tr><tr>
                                       <td>Estado</td>
                                       <td><input bind:value="{databusqueda.state}"> </td>
                                  
                                       
                                   </tr><tr>
                                       <td>Casos totales</td>
                                       <td><input   bind:value="{databusqueda.totalsamples}"> </td>
                                      
                                   </tr><tr>
                                       <td>Negativos</td>
                                       <td><input   bind:value="{databusqueda.negative}"> </td>
                                       
                                       
                                   </tr><tr>
                                       <td>Positivos</td>
                                       <td><input   bind:value="{databusqueda.positive}"> </td>

                                    </tr>


                           </tbody>
                       </Table >
                   </tr>
               </ModalBody>
               <ModalFooter>
                   <Button color="primary" on:click={buscar}>Buscar</Button>
                   <Button color="secondary" on:click={cancelarbusqueda}
                       >Cancelar</Button
                   >
               </ModalFooter>
           </Modal>

           <Modal isOpen={popinsert} toggle={togglepop} transitionOptions>
               <ModalHeader {togglepop}>Se ha producido un error</ModalHeader>
               <ModalBody >
                   No se ha podido insertar el dato. Existe(n) algun(os) campo(s) vacío(s).
                  
               </ModalBody>
               <ModalFooter>
                   <Button color="primary" on:click={togglepopok}>Probaré de nuevo!</Button>
                   <Button color="secondary" on:click={togglepop}>Cancelar</Button>
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
                       <p>Causa posible:</p>
                        
                       <p>{mensajeespecifico}</p>
                       
                       {/if}
                   {:else}
                   <p>{mensajeespecifico}</p>
                   {/if}

                   <div>
                       <p></p>
                   <Button color="secondary" on:click={togglealerta}>Volver</Button>
               </div>
               </ModalBody>
               
           </Modal>
       </div>


   </div>
   
 
   {#if data.length != 0}
       <br/>
       <Table bordered  style="background-color: #bcb9bd ; width:100% ; text-align: center; ">
       <thead style="background-color: #abc5ff; color:black">
           <tr>
               <td>Fecha</td>
                <td>Estado</td>
               <td>Casos totales </td>
               <td>Negativos</td>
               <td> Positivos</td>
               <td>Acciones</td>
           </tr>
       </thead>
       <tbody>
           {#each data as data}
               <tr>
                   <td><a href="#/statewisetestingdetails/{data.date}/{data.state}">{data.date}</a></td>
                   <td>{data.state}</td>
                   <td>{data.totalsamples}</td>
                   <td>{data.negative}</td>
                   <td>{data.positive}</td>
                   
           
                   
                  <td>
                       <Button style="background-color: #000000" on:click={() =>deleteData(data.date,data.state)}> Eliminar</Button>
                       <Button style="background-color: #bd2020" on:click={() =>gotoupdate(data.date,data.state) }> Actualizar</Button>
                   </td>
                 



               </tr>
           {/each}
       </tbody>
   </Table >

       
   <div style="text-align: center; " >
       {#if pagina != 1}
       <Button style="background-color: #7A05B5 " on:click={anterior}>Anterior</Button>
       {/if}
       <Button style="background-color: #2081bd " >Pag. Nº: {pagina} / {num_paginas}</Button>    
       {#if num_paginas-pagina!=0 }
        <Button style="background-color: #7A05B5 " on:click={siguiente}>Siguiente</Button>
        {/if}
   </div>


       <Button color="dark" on:click={pop}>Volver</Button>
       
   {:else}
   <br/>
   <p style="text-align: center; background-color: antiquewhite;">Lo sentimos, no existe ningun dato</p>
   
       <Button style="background-color: #2081bd " on:click={pop}>Volver</Button>
   {/if}

</main>


<style>
  
   a:hover {
       color:white;
   }

</style>