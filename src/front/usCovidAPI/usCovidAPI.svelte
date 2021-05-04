

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
  
    //------------------Nav-----------------------
  
    //Load stats
    let open1 = false;
    const toggle1 = () => (open1 = !open1);
    const toggle1P = () => {
      open1 = !open1;
      loadStats();
    };
    //Delete all stats
    let open2 = false;
    const toggle2 = () => (open2 = !open2);
    const toggle2P = () => {
      open2 = !open2;
      deleteAllStats();
    };
  
    //------------------API-------------------
    const BASE_CONTACT_API_PATH = "/api/v1";
  
    let covidUSstats = [];
    let resultQuery = [];
  
    let newStat = {
      date: "",
      county: "",
      state: "",
      "fips": "",
      "cases": "",
      "deaths": "",
      
    };
  
    let queryStat = {
      date: "",
      county: "",
      state: "",
      "fips": "",
      "cases": "",
      "deaths": "",
     
    };
  
    //Alertas
    let errorMsg = "";
    let okMsg = "";
  
    let fullQuery = "";
  
    //Pagination
    let current_offset = 0;
    let limit = 10;
  
    let current_page = 1;
    let last_page = 1;
    let total = 0;
  
    let isASearch = false;
    // Functiones de ayuda
    function resetInputs(flag) {
      console.log("Reseting inputs: " + flag);
      let resetStat = {
        date: "",
        county: "",
        state: "",
        "fips": "",
        "cases": "",
        "deaths": "",
        
      };
      if (flag == 1) {
        queryStat = resetStat;
        current_page = 1;
        current_offset = 0;
      } else {
        newStat = resetStat;
      }
    }
  
    //Calcula el rango entre ods valores
    function range(size, startAt = 0) {
      return [...Array(size).keys()].map((i) => i + startAt);
    }
  
    //Cambio de pagina
    function changePage(page, offset, search) {
      console.log("------Change page------");
      console.log(
        "Params page: " + page + " offset: " + offset + " search: " + search
      );
      last_page = Math.ceil(total / 10);
      console.log("new last page: " + last_page);
      if (page !== current_page) {
        console.log("enter if");
        current_offset = offset;
        current_page = page;
        console.log("page: " + page);
        console.log("current_offset: " + current_offset);
        console.log("current_page: " + current_page);
        if (search == false) {
          console.log(" search: false?" + search);
          getStats();
        } else {
          console.log(" search: true?" + search);
          searchStat();
        }
      }
      console.log("---------Exit change page-------");
    }
  
    //Total de datos en la BD
    async function getNumTotal() {
      console.log("Total entities of getStat");
      const res = await fetch(BASE_CONTACT_API_PATH + "/us_counties_covid19_daily");
      if (res.ok) {
        const json = await res.json();
        total = json.length;
        console.log("getTotal: " + total);
        changePage(current_page, current_offset, isASearch);
      } else {
        errorMsg = "No se ha encontrado datos.";
      }
    }
  
    //Total de datos de una query en la BD
    async function getNumTotalQuery() {
      console.log("Total entities of query");
      const res = await fetch(
        BASE_CONTACT_API_PATH + "/us_counties_covid19_daily" + fullQuery
      );
      if (res.ok) {
        const json = await res.json();
        total = json.length;
        console.log("getTotal: " + total);
        changePage(current_page, current_offset, isASearch);
      } else {
        errorMsg = "No se ha encontrado datos.";
      }
    }
  
    function restore() {
      if (isASearch == true) {
        resetInputs(1);
        isASearch = false;
      }
      current_offset=0;
      current_page=1;
      getNumTotal();
    }
  
    //Funciones API
    async function loadStats() {
      console.log("Loading data...");
      const res = await fetch(
        BASE_CONTACT_API_PATH + "/us_counties_covid19_daily/loadInitialData"
      ).then(function (res) {
        if (res.ok) {
          console.log("OK");
          getStats();
          //Alertas
          errorMsg = "";
          errorStatus = 0;
          okMsg = "Datos cargados correctamente";
        } else {
          if (res.status === 409) {
            errorMsg = "Alguno de los datos ya se encuentra cargado";
          } else if (res.status === 500) {
            errorMsg = "No se ha podido acceder a la base de datos";
          }
          okMsg = "";
          console.log("ERROR!" + errorMsg);
        }
      });
    }
  
    async function getStats() {
      console.log("Fetching data...");
  
      const res = await fetch(
        BASE_CONTACT_API_PATH +
          "/us_counties_covid19_daily?limit=" +
          limit +
          "&offset=" +
          current_offset
      );
  
      if (res.ok) {
        console.log("Ok");
        const json = await res.json();
        covidUSstats = json;
        console.log(`We have received ${covidUSstats.length} stats.`);
        errorMsg = "";
  
        getNumTotal();
      } else {
        if (covidUSstats.length != 0) {
          errorMsg = "No hay datos disponibles";
          console.log("ERROR!");
        }
        if (res.status === 500) {
          errorMsg = "No se ha podido acceder a la base de datos";
        }
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    }
  
    async function searchStat() {
      console.log("Searching stat...");
      var msg = "";
  
      if(isASearch==false){
        current_offset=0;
        current_page=1;
      }
  
      var campos = new Map(
        Object.entries(queryStat).filter((o) => {
          return o[1] != "";
        })
      );
      let querySymbol = "?";
      for (var [clave, valor] of campos.entries()) {
        msg += clave + "=" + valor + " ";
        querySymbol += clave + "=" + valor + "&";
      }
      fullQuery = querySymbol.slice(0, -1);
  
      if (fullQuery != "") {
        const res = await fetch(
          BASE_CONTACT_API_PATH +
            "/us_counties_covid19_daily/" +
            fullQuery +
            "&limit=" +
            limit +
            "&offset=" +
            current_offset
        );
        if (res.ok) {
          console.log("OK");
          const json = await res.json();
          resultQuery = json;
          okMsg = "Resulado de la busqueda con " + msg;
          isASearch = true;
          getNumTotalQuery();
        } else {
          resultQuery = [];
          if (res.status === 404) {
            errorMsg = "No existe un dato con " + msg;
          } else if (res.status === 500) {
            errorMsg = "No se ha podido acceder a la base de datos";
          }
          okMsg = "";
          console.log("ERROR!" + errorMsg);
        }
      } else {
        errorMsg = "Se necesita un campo a buscar";
        okMsg = "";
      }
    }
  
    async function insertStat() {
      console.log("Inserting stat: " + JSON.stringify(newStat));
  
      newStat.date = newStat.date;
      newStat.county = newStat.county;
      newStat["state"] = newStat.state;
      newStat["fips"] = parseFloat(newStat["fips"]);
      newStat["cases"] = parseInt(newStat["cases"]);
      newStat["deaths"] = parseInt(newStat["deaths"]);
  
      const res = await fetch(BASE_CONTACT_API_PATH + "/us_counties_covid19_daily/", {
        method: "POST",
        body: JSON.stringify(newStat),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(function (res) {
        if (res.ok) {
          console.log("OK");
          restore();
          getStats();
          errorMsg = "";
          okMsg = `${newStat.date} ${newStat.date} ha sido insertado correctamente`;
        } else {
          if (res.status === 409) {
            errorMsg = `${newStat.date} ${newStat.date} ya se encuentra cargado`;
          } else if (res.status === 500) {
            errorMsg = "No se ha podido acceder a la base de datos";
          }else{
            errorMsg = "Todos los campos deben estar rellenados correctamene";
          }
          okMsg = "";
          console.log("ERROR!" + errorMsg);
        }
      });
      resetInputs(2);
    }
  
    async function deleteStat(county, fips) {
      console.log(`Deleting data with county ${county} and fips ${fips}`);
  
      const res = await fetch(
        BASE_CONTACT_API_PATH + "/us_counties_covid19_daily/" + county + "/" + fips,
        {
          method: "DELETE",
        }
      ).then(function (res) {
        if (res.ok) {
          console.log("OK");
          if (covidUSstats.length === 1) {
            covidUSstats = [];
            currentPage = 1;
          }
          errorMsg = "";
          okMsg = `La entrada ${county} ${fips} ha sido borrada`;
          getStats();
        } else {
          if (res.status === 404) {
            errorMsg = `No se puede eliminar, la entrada ${county} ${fips} no existe`;
          } else if (res.status === 500) {
            errorMsg = "No se ha podido acceder a la base de datos";
          }
          okMsg = "";
          console.log("ERROR!" + errorMsg);
        }
      });
    }
  
    async function deleteAllStats() {
      console.log("Deleting data...");
  
      const res = await fetch(BASE_CONTACT_API_PATH + "/us_counties_covid19_daily/", {
        method: "DELETE",
      }).then(function (res) {
        if (res.ok) {
          console.log("OK");
          covidUSstats = [];
          errorMsg = "";
          okMsg = "Todos los elementos han sido borrados";
          restore();
          //getStats();
        } else {
          if (res.status === 404) {
            errorMsg = "No existen datos que borrar";
          } else if (res.status === 500) {
            errorMsg = "No se ha podido acceder a la base de datos";
          }
          okMsg = "";
          console.log("ERROR!" + errorMsg);
        }
      });
    }
  
    //functions executed
    onMount(getStats);
    getNumTotal();
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
            Esta acción cargará los datos siempre y cuando no existan previamente.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" on:click={toggle1P}>Cargar</Button>
            <Button color="secondary" on:click={toggle1}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </NavItem>
      <NavItem>
        {#if covidUSstats.length === 0}
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
    <h2>Natalidad</h2>
  
    <p />
  
    <p />
    {#if errorMsg}
      <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    {#if okMsg}
      <p style="color: green">{okMsg}</p>
    {/if}
  
    <h3>Buscar</h3>
    <Table borderer>
      <thead>
        <tr>
          <th> Date </th>
          <th>County </th>
          <th>State </th>
          <th>Fips </th>
          <th>Cases </th>
          <th>Deaths </th>
         
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            ><input
              type="text"
              bind:value={queryStat.date}
            /></td
          >
          <td
            ><input
              type="text"
              
              bind:value={queryStat.county}
            /></td
          >
          <td
            ><input
              type="text"

              bind:value={queryStat.state}
            /></td
          >
          <td
            ><input
              type="number"
      
              bind:value={queryStat["fips"]}
            /></td
          >
          <td
            ><input
              type="number"
     
              min="1"
              bind:value={queryStat["cases"]}
            /></td
          >
          <td
            ><input
              type="number"
           
              bind:value={queryStat["deaths"]}
            /></td
          >
          
          >
          <td><Button color="primary" on:click={searchStat}>Buscar</Button></td>
          <td><Button color="secondary" on:click={restore}>Restaurar</Button></td
          >
        </tr>
      </tbody>
    </Table>
  
    <h3>Listado de datos</h3>
    <!-- Table -->
    <Table borderer>
      <thead>
        <tr>
            <th>date</th>
            <th>county</th>
            <th>state</th>
            <th>fips</th>
            <th>cases</th>  
            <th>deaths</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            ><input
              
              bind:value={newStat.date}
            /></td
          >
          <td
            ><input
              
              bind:value={newStat.county}
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
              type="number"
              
              bind:value={newStat["fips"]}
            /></td
          >
          <td
            ><input
              type="text"
              bind:value={newStat["cases"]}
            /></td
          >
          <td
            ><input
              type="number"
            
              bind:value={newStat["deaths"]}
            /></td
          >
         
          >
          <td><Button color="primary" on:click={insertStat}>Insertar</Button></td>
        </tr>
  
        {#if isASearch==true}
          {#each resultQuery as stat}
            <tr>
              <td>{stat.date}</td>
              <td>{stat.county}</td>
              <td>{stat.state}</td>
              <td>{stat["fips"]}</td>
              <td>{stat["cases"]}</td>
              <td>{stat["deaths"]}%</td>
             
              <td>
                <a href="#/us_counties_covid19_daily/{stat.date}/{stat.county}">
                  <Button color="primary">Editar</Button>
                </a></td
              >
              <td
                ><Button
                  color="danger"
                  on:click={deleteStat(stat.date, stat.date)}>Borrar</Button
                ></td
              >
            </tr>
          {/each}
        {:else}
          {#each covidUSstats as stat}
            <tr>
              <td>{stat.date}</td>
              <td>{stat.county}</td>
              <td>{stat.state}</td>
              <td>{stat["fips"]}</td>
              <td>{stat["cases"]}</td>
              <td>{stat["deaths"]}</td>
              
              <td>
                <a href="#/us_counties_covid19_daily/{stat.date}/{stat.date}">
                  <Button color="primary">Editar</Button>
                </a></td
              >
              <td
                ><Button
                  color="danger"
                  on:click={deleteStat(stat.county, fips.date)}>Borrar</Button
                ></td
              >
            </tr>
          {/each}
        {/if}
      </tbody>
    </Table>
  
    <!-- Pagination -->
    <Pagination ariaLabel="Web pagination">
      <PaginationItem class={current_page === 1 ? "disabled" : ""}>
        <PaginationLink
          previous
          href="#/us_counties_covid19_daily"
          on:click={() =>
            changePage(current_page - 1, current_offset - 10, isASearch)}
        />
      </PaginationItem>
      {#each range(last_page, 1) as page}
        <PaginationItem class={current_page === page ? "active" : ""}>
          <PaginationLink
            previous
            href="#/us_counties_covid19_daily"
            on:click={() => changePage(page, (page - 1) * 10, isASearch)}
            >{page}</PaginationLink
          >
        </PaginationItem>
      {/each}
      <PaginationItem class={current_page === last_page ? "disabled" : ""}>
        <PaginationLink
          next
          href="#/us_counties_covid19_daily"
          on:click={() =>
            changePage(current_page + 1, current_offset + 10, isASearch)}
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










