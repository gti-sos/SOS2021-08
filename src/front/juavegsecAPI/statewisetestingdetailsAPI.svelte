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
      Pagination,
      PaginationItem,
      PaginationLink,
    } from "sveltestrap";
    import { onMount } from "svelte";
    // Nav
    //Load stats
    let open1 = false;
    const toggle1 = () => (open1 = !open1);
    const toggle1P = () => {
      open1 = !open1;
      loadStats();
    };
    //Delete stats
    let open2 = false;
    const toggle2 = () => (open2 = !open2);
    const toggle2P = () => {
      open2 = !open2;
      deleteAllStats();
    };
    //API
    //Alerts
    let visible = true;
    let errorMsg = "";
    let okMsg = "";
    let fullQuery = "";
    const BASE_API_PATH = "/api/v1";
    let statewisetestingdetails = [];
    let error = null;
    let newStat = {
        date: "",
        state: "",
        "totalsamples": "",
        "negative": "",
        "positive": "",
       
    };
    //Pagination
    let current_offset = 0;
    let limit = 10;
    let current_page = 1;
    let last_page = 1;
    let total = 0;
    //Functions
    async function loadStats() {
      console.log("Loading data...");
      const res = await fetch(
        BASE_API_PATH + "/statewisetestingdetails/loadInitialData"
      ).then(function (res) {
        if (res.ok) {
          console.log("OK");
          getStats();
          errorMsg = "";
          okMsg = "Operación realizada con éxito";
        } else {
          if(res.status===404){
            errorMsg = "No existen datos que borrar";
          }else if(res.status ===500){
            errorMsg = "No se han podido acceder a la base de datos";
          }        
          okMsg = "";
          console.log("ERROR!" + errorMsg);
        }
      });
    }
    async function searchStat() {
      console.log("Searching data...");
      var campos = new Map(
        Object.entries(newStat).filter((o) => {
          return o[1] != "";
        })
      );
      let querySymbol = "?";
      for (var [clave, valor] of campos.entries()) {
        querySymbol += clave + "=" + valor + "&";
      }
      fullQuery = querySymbol.slice(0, -1);
      if (fullQuery != "") {
        const res = await fetch(
          BASE_API_PATH + "/statewisetestingdetails/" + fullQuery
        );
        if (res.ok) {
          console.log("OK");
          const json = await res.json();
          statewisetestingdetails = json;
          okMsg = "Búsqueda realizada con éxito";
        } else {
          statewisetestingdetails = [];
          if (res.status === 404) {
            errorMsg = "No se encuentra el dato solicitado";
          } else if (res.status === 500) {
            errorMsg = "No se han podido acceder a la base de datos";
          }
          okMsg = "";
          console.log("ERROR!" + errorMsg);
        }
      } else {
        errorMsg = "";
        okMsg = "Búsqueda realizada con éxito";
        getStats();
      }
    }
    async function getStats() {
      console.log("Fetching data...");
      const res = await fetch(
        BASE_API_PATH +
          "/statewisetestingdetails?limit=" +
          limit +
          "&offset=" +
          current_offset
      );
      if (res.ok) {
        console.log("Ok");
        const json = await res.json();
        statewisetestingdetails = json;
        console.log(`We have received ${statewisetestingdetails.length} stats.`);
        errorMsg = "";
        //getNumStats()
      } else {
        if (statewisetestingdetails.length != 0) {
          okMsg = "";
          errorMsg = res.status + ": " + res.statusText;
          console.log("ERROR! 404");
        }
      }
    }
    //contador de stats de BD
    async function getNumStats() {
      const res = await fetch(BASE_API_PATH + "/statewisetestingdetails");
      if (res.ok) {
        const json = await res.json();
        total = json.length;
        console.log("Number of stats : " + total);
        changePage(current_page, current_offset);
      } else {
        errorMsg = "No se han encontrado datos.";
      }
    }
    //Calcula el rango entre dos valores
    function range(size, startAt = 0) {
      return [...Array(size).keys()].map((i) => i + startAt);
    }
    //Cambio de pagina
    function changePage(page, offset) {
      console.log("------Change page------");
      console.log("Params page: " + page + " offset: " + offset);
      last_page = Math.ceil(total / 10);
      console.log("new last page: " + last_page);
      if (page !== current_page) {
        console.log("enter if");
        current_offset = offset;
        current_page = page;
        console.log("page: " + page);
        console.log("current_offset: " + current_offset);
        console.log("current_page: " + current_page);
        getStats();
      }
      console.log("---------Exit change page-------");
    }
    async function deleteAllStats() {
      console.log("Deleting data...");
      const res = await fetch(BASE_API_PATH + "/statewisetestingdetails/", {
        method: "DELETE",
      }).then(function (res) {
        if (res.ok) {
          console.log("OK");
          statewisetestingdetails = [];
          errorMsg = "";
          okMsg = "Operación realizada con éxito";
        } else {
          errorMsg = res.status + ": " + res.statusText;
          okMsg = "";
          console.log("ERROR!" + errorMsg);
        }
      });
    }
    async function deleteStat(date, state) {
      console.log(`Deleting data with date ${date} and state ${state}`);
      const res = await fetch(
        BASE_API_PATH + "/statewisetestingdetails/" + date + "/" + state,
        {
          method: "DELETE",
        }
      ).then(function (res) {
        if (res.ok) {
          console.log("OK");
          if (statewisetestingdetails.length === 0) {
            statewisetestingdetails = [];
            currentPage = 1;
          }
          errorMsg = "";
          okMsg = "Operación realizada con éxito";
          getStats();
        } else {
          if(res.status===404){
            errorMsg = `No existe el dato con fecha ${date} y estado ${state} para borrar`;
          }else if(res.status ===500){
            errorMsg = "No se han podido acceder a la base de datos";
          }        
          okMsg = "";
          console.log("ERROR!" + errorMsg);
        }
      });
    }
    async function insertStat() {
      console.log("Inserting stat: " + JSON.stringify(newStat));

      newStat["totalsamples"] = parseInt(newStat["totalsamples"]);
      newStat["negative"] = parseInt(newStat["negative"]);
      newStat["positive"] = parseInt(newStat["positive"]);
      const res = await fetch(BASE_API_PATH + "/statewisetestingdetails/", {
        method: "POST",
        body: JSON.stringify(newStat),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(function (res) {
        if (res.ok) {
          console.log("OK");
          getStats();
          errorMsg = "";
          okMsg = "Operación realizada con éxito";
        } else {
          errorMsg = res.status + ": " + res.statusText;
          console.log("ERROR!" + errorMsg);
          okMsg = "";
        }
      });
    }
    onMount(getStats);
    getNumStats();
  </script>
  
  <main>
    <Nav>
      <NavItem>
        <NavLink href="/">Volver</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#" on:click={toggle1}>Cargar datos inciales</NavLink>
        <Modal isOpen={open1} {toggle1}>
          <ModalHeader {toggle1}>¿Cargar los datos iniciales?</ModalHeader>
          <ModalBody>
            Esta acción cargará los datos siempre y cuando no existan anteriormente.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" on:click={toggle1P}>Cargar</Button>
            <Button color="secondary" on:click={toggle1}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </NavItem>
      <NavItem>
        {#if statewisetestingdetails.length === 0}
          <NavLink disabled href="#" on:click={toggle2}
            >Borrar todos los datos</NavLink
          >
        {:else}
          <NavLink href="#" on:click={toggle2}>Borrar todos los datos</NavLink>
          <Modal isOpen={open2} {toggle2}>
            <ModalHeader {toggle2}>¿Borrar todos los datos?</ModalHeader>
            <ModalBody>Esta acción no se puede deshacer.</ModalBody>
            <ModalFooter>
              <Button color="danger" on:click={toggle2P}>Borrar</Button>
              <Button color="secondary" on:click={toggle2}>Cancelar</Button>
            </ModalFooter>
          </Modal>
        {/if}
      </NavItem>
    </Nav>
    <h2>API Sobre estadísticas de la COVID-19 en India</h2>
    <p />
  
    <!-- Alerts -->
    {#if errorMsg}
      <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    {#if okMsg}
      <p style="color: green">{okMsg}</p>
    {/if}
  
    <!-- Table -->
    <Table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Estado</th>
          <th>Casos totales</th>
          <th>Negativos</th>
          <th>Positivos</th>
        </tr>
      </thead>
      <tbody>
        
          <tr>
            <td
              ><input
                type="text"
                bind:value={newStat.date}
              /></td
            >
            <td
              ><input
                type="text"
                bind:value={newStat.state}
              /></td
            >
            <td
              ><input
                type="text"
                bind:value={newStat["totalsamples"]}
              /></td
            >
            <td
              ><input
                type="text"
                bind:value={newStat["negative"]}
              /></td
            >
            <td
              ><input
                type="text"
                bind:value={newStat["positive"]}
              /></td
            >
           
            <td
              ><Button color="secondary" on:click={insertStat}>Insertar</Button
              ></td
            >
            <td>
              <Button color="primary" on:click={searchStat}>Buscar</Button>
            </td>
          </tr>
        
        {#each statewisetestingdetails as stat}
          <tr>
            <td>{stat.date}</td>
            <td>{stat.state}</td>
            <td>{stat["totalsamples"]}</td>
            <td>{stat["negative"]}</td>
            <td>{stat["positive"]}</td>
    
  
            <td>
              <a href="#/statewisetestingdetails/{stat.date}/{stat.state}">
                <Button color="primary">Editar</Button>
              </a>
            </td>
            <td
              ><Button
                color="danger"
                on:click={deleteStat(stat.date, stat.state)}>Borrar</Button
              ></td
            >
          </tr>
        {/each}
      </tbody>
    </Table>
  
    <Pagination ariaLabel="Web pagination">
      <PaginationItem class={current_page === 1 ? "disabled" : ""}>
        <PaginationLink
          previous
          href="#/statewisetestingdetails"
          on:click={() => changePage(current_page - 1, current_offset - 10)}
        />
      </PaginationItem>
      {#each range(last_page, 1) as page}
        <PaginationItem class={current_page === page ? "active" : ""}>
          <PaginationLink
            previous
            href="#/statewisetestingdetails"
            on:click={() => changePage(page, (page - 1) * 10)}
            >{page}</PaginationLink
          >
        </PaginationItem>
      {/each}
      <PaginationItem class={current_page === last_page ? "disabled" : ""}>
        <PaginationLink
          next
          href="#/statewisetestingdetails"
          on:click={() => changePage(current_page + 1, current_offset + 10)}
        />
      </PaginationItem>
    </Pagination>
  
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
    h2 {
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 100;
    }
  </style>