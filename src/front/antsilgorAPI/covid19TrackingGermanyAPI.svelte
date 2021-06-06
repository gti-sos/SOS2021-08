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
    
    const BASE_API_PATH
 = "/api/v1/covid19-tracking-germany"; //tiene que llamar a la API para tratar los datos
	
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
            state:"",
            county:"",
            agegroup: "" ,
            gender:"",
            date:"",
            cases: "",
            death: "",
            recovered: ""
        }
        let databusqueda = {
            state:"",
            county:"",
            agegroup: "" ,
            gender:"",
            date:"",
            cases: "",
            death: "",
            recovered: ""
        }
        
     //funcion asincrona para cargar (get) los recursos existentes
     async function getNumPaginas() {
        if(!filtros_act){
        console.log("Fetching germany covid data...");
            const res = await fetch(BASE_API_PATH
);
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
            }else{
                console.log("Fetching germany covid data...");
            const res = await fetch(BASE_API_PATH
+"?limit="+limit+"&offset="+ofset+flags);
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
            
        }
     async function getData() {
            getNumPaginas()
            console.log(num_paginas)
            console.log("Fetching germany covid data...");
          
            const res = await fetch(BASE_API_PATH+"?limit="+limit+"&offset="+ofset+flags);
            if(res.status==200){
                const json = await res.json();
                data = json;
                console.log(`Received ${data.length} resources`);
                pagina = (ofset/10)+1
                let mes="Hemos encontrado "+ data.length +" elementos que concuerden con la busqueda";
                if(filtros_act) lanzamensaje(res.status,res.statusText,"Advertencia",mes,null)
            }else{
                console.log("ERROR!");
                lanzamensaje(res.status,res.statusText,"Error al obtener los elementos","Vaya... Algo ha salido mal. Probablemente la Base de Datos haya tenido un problema. Vuelva a intentarlo",true)
            }
        }
        async function insertData() { //insertar un recurso en concreto
            console.log("Inserting new resource " + JSON.stringify(newData));
            newData.state=newData.state.replace(" ","_")
            const res = await fetch(BASE_API_PATH
, {
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
                    lanzamensaje(res.status,res.statusText,"Se ha producido un error al insertar los datos","Ya existe un dato que con los mismos creedenciales",true)
                    break
                    case 400:
                    lanzamensaje(res.status,res.statusText,"Se ha producido un error al insertar los datos","Ha habido un problema con el cuerpo de la petición",true)
                    break
                    case 201:
                        let mensajeaux= "El dato: "+newData.state+"/"+newData.county+" ya forma parte de la base de datos." 
                    lanzamensaje(res.status,res.statusText,"El dato se ha insertado satisfactoriamente",mensajeaux,null)
                    break
                    default:
                    lanzamensaje(res.status,res.statusText,"Se ha producido un error al insertar los datos","Vaya... Algo ha salido mal. Probablemente la Base de Datos haya tenido un problema. Vuelva a intentarlo",true)
                    break
                }
            })
            
        }
        async function deleteData( a, b) { //elimina un recurso en concreto
            
            console.log("Deleting resource " + JSON.stringify(data));
            const res = await fetch(BASE_API_PATH
+"/"+a+"/"+b, {
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
            lanzamensaje(res.status,res.statusText,"Se ha producido un error al intentar borrar el elemento","Vaya... Algo ha salido mal. Probablemente la Base de Datos haya tenido un problema. Vuelva a intentarlo",true)
            break;
            
        }
        }
        
        async function loadStats(){
        deleteStats();
        console.log("Loading data...");
        const carga =  await fetch(BASE_API_PATH+"/loadInitialData");
        cargados = true;
        if (carga.ok){
            console.log("Ok.");
            const res = await fetch(BASE_API_PATH
);
            if(res.ok){
                console.log("Ok. Obtaining data...")
                const json = await res.json();
                data = json;
                console.log('Received ${data.length} germany covid stats.');
                let mensajeaux = " Se han cargado un total de " + data.length+ " elementos."
                getData()
                lanzamensaje(res.status,res.statusText,"Los datos se han cargado satisfactoriamente",mensajeaux,null)
            }else{
                lanzamensaje(res.status,res.statusText,"Se ha producido un error al intentar cargar los datos",
                "Vaya... Algo ha salido mal. Probablemente la Base de Datos haya tenido un problema. Vuelva a intentarlo",
                true)
                   
                console.log("Error, there is no data.")
            }
        }else{
            lanzamensaje(carga.status,carga.statusText,"Se ha producido un error al intentar cargar los datos","Vaya... Algo ha salido mal al inicializar los datos",true)
                   
            console.log("Error loading data.");
        }
    }
   
    async function deleteStats() {
		console.log("Deleting germany covid stats...");
        cargados=false;
		const res = await fetch(BASE_API_PATH
, {
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
                "Vaya... Algo ha salido mal. Probablemente la Base de Datos haya tenido un problema. Vuelva a intentarlo" 
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
        if(newData.state.replace(' ', '').length!=0 
        &&newData.county.replace(' ', '').length!=0 
        && newData.agegroup.length!=0 
        && newData.gender.length!=0
        && newData.date.length!=0 
        && newData.cases.length!=0 
        && newData.death.length!=0 
        && newData.recovered.length!=0){
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
    location.href = '#/covid19-tracking-germany/'+a+'/'+b;
}
//paginacion
const siguiente= () => {ofset+=10; getData()}
const anterior= () => {ofset-=10; getData()}
//Busqueda especifica
    let popbusqueda = false;
    const cancelarbusqueda = () => (popbusqueda = !popbusqueda);
    const buscar = () => {
        popbusqueda = !popbusqueda
       
        if(databusqueda.state.replace(" ","").length!=0){
            flags= flags+"&state="+databusqueda.state;
        }
        if(databusqueda.county.replace(" ","").length!=0){
            flags= flags+"&county="+databusqueda.county;
        }
        if(databusqueda.agegroup.replace(" ","").length!=0){
            flags= flags+"&agegroup="+databusqueda.agegroup;
        }
        if(databusqueda.gender.replace(" ","").length!=0){
            flags= flags+"&gender="+databusqueda.gender;
        }
        if(databusqueda.date.replace(" ","").length!=0){
            flags= flags+"&date="+databusqueda.date;
        }
        if(databusqueda.cases.replace(" ","").length!=0){
            flags= flags+"&cases="+databusqueda.cases;
        }
        if(databusqueda.death.replace(" ","").length!=0){
            flags= flags+"&death="+databusqueda.death;
        }
        if(databusqueda.recovered.replace(" ","").length!=0){
            flags= flags+"&recovered="+databusqueda.recovered;
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
        {#if cargados}  
        <Button style="background-color: #F39C12;" disabled> Cargar datos</Button>
        {:else}
        <Button style="background-color: #F39C12;" on:click={loadStats}> Cargar datos</Button>
        {/if}
        <Button style="background-color: #F08080" on:click={deleteStats}> Eliminar datos</Button>
        <Button style="background-color: #28B463" on:click={toggle1}> Insertar</Button>
        <p></p>
        {#if !filtros_act} 
        <Button style="background-color: #B833FF" on:click={cancelarbusqueda}> Buscar específica </Button>
        {:else}
        <Button style="background-color: #B833FF" on:click={quitafiltros}> Quitar filtros </Button>
        <p style="text-align: rigth; background-color: antiquewhite;">↑(!) Existen filtros activos, para realizar otro filtrado desactivelos primero.</p>
        {/if}

              <!-- Modal para insertar -->
            <div id="modal">
            <Modal isOpen={open1} toggle={toggle1} transitionOptions>
                <ModalHeader {toggle1}>¿Quieres insertar un nuevo dato?</ModalHeader>
                <ModalBody >
                    Por favor, rellene el formulario. Todos los campos tienen que tener un valor. De lo contrario no se añadirá nada.
                    <tr>
                        <Table >
                            
                            <tbody>
                                  <tr>
                                        <td>Estado</td>
                                        <td><input  bind:value="{newData.state}"></td>
                                        
                                        
                                    </tr><tr>
                                        <td>Condado</td>
                                        <td><input  bind:value="{newData.county}"> </td>
                                   
                                        
                                    </tr><tr>
                                        <td>Grupo de edad</td>
                                        <td><input  bind:value="{newData.agegroup}"> </td>
                                       
                                    </tr><tr>
                                        <td>Sexo</td>
                                        <td><input  bind:value="{newData.gender}"> </td>

                                    </tr><tr>
                                        <td>Fecha</td>
                                        <td><input  bind:value="{newData.date}"> </td>

                                    </tr><tr>
                                       <td>Casos</td>
                                       <td><input  bind:value="{newData.cases}"> </td>

                                    </tr><tr>
                                       <td>Muertes</td>
                                       <td><input  bind:value="{newData.death}"> </td>
                                       
                                      </tr><tr>
                                        <td>Recuperados</td>
                                        <td><input  bind:value="{newData.recovered}"> </td>
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
                                  <td>Estado</td>
                                  <td><input  bind:value="{databusqueda.state}"></td>
                                  
                                  
                              </tr><tr>
                                  <td>Condado</td>
                                  <td><input  bind:value="{databusqueda.county}"> </td>
                             
                                  
                              </tr><tr>
                                  <td>Grupo de edad</td>
                                  <td><input  bind:value="{databusqueda.agegroup}"> </td>
                                 
                              </tr><tr>
                                  <td>Sexo</td>
                                  <td><input  bind:value="{databusqueda.gender}"> </td>

                              </tr><tr>
                                  <td>Fecha</td>
                                  <td><input  bind:value="{databusqueda.date}"> </td>

                              </tr><tr>
                                 <td>Casos</td>
                                 <td><input  bind:value="{databusqueda.cases}"> </td>

                              </tr><tr>
                                 <td>Muertes</td>
                                 <td><input  bind:value="{databusqueda.death}"> </td>
                                 
                                </tr><tr>
                                  <td>Recuperados</td>
                                  <td><input  bind:value="{databusqueda.recovered}"> </td>
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
            {#each data as data}
                <tr>
                    <td><a href="#/covid19-tracking-germany/{data.state}/{data.county}">{data.state}</a></td>
                    <td>{data.county}</td>
                    <td>{data.agegroup}</td>
                    <td>{data.gender}</td>
                    <td>{data.date}</td>
                    <td>{data.cases}</td>
                    <td>{data.death}</td>
                    <td>{data.recovered}</td>
                    <td>
                        <Button style="background-color: #F08080" on:click={() =>deleteData(data.state,data.county)}> Eliminar</Button>
                        <Button style="background-color: #28B463" on:click={() =>gotoupdate(data.state,data.county) }> Actualizar</Button>
                    </td>
                  



                </tr>
            {/each}
        </tbody>
    </Table >

        
    <div style="text-align: center; " >
        {#if pagina != 1}
        <Button style="background-color: #7A05B5 " on:click={anterior}>Anterior</Button>
        {/if}
        <Button color="dark" >Pag. Nº: {pagina} / {num_paginas}</Button>    
        {#if num_paginas-pagina!=0 }
         <Button style="background-color: #7A05B5 " on:click={siguiente}>Siguiente</Button>
         {/if}
    </div>


        <Button color="dark" on:click={pop}>Volver</Button>
        
    {:else}
    <br/>
    <p style="text-align: center; background-color: antiquewhite;">Lo sentimos, no existe ningun dato</p>
    
        <Button color="dark" on:click={pop}>Volver</Button>
    {/if}

</main>


<style>
   
    a:hover {
        color:white;
    }
</style>
