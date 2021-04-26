<script>
    import {
        onMount
    } from "svelte";

    import Table from "sveltestrap/src/Table.svelte";
 
    let covidUSstats = [];

    async function loadData(){
        console.log(" CARGANDO DATOS COVID US...");
        const res = await fetch("/api/v1/us_counties_covid19_daily/loadInitialData");

        if(res.ok){
            console.log("Ok.");
            getData();
            
        }else{
            console.log("Error!");
        }
    }   

    async function getData(){
        console.log("Fetching covid us...");
        const res = await fetch("/api/v1/us_counties_covid19_daily");

        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            covidUSstats = json;
            console.log(`We have received ${covidUSstats.length} countries.`);
        }else{
            console.log("Error!");
        }
    }   
    
    onMount(getData);
</script>

<main>
    <Table bordered>
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
            {#each covidUSstats as data}
                <tr>
                    <td>{data.date}</td>
                    <td>{data.county}</td>
                    <td>{data.state}</td>
                    <td>{data.fips}</td>
                    <td>{data.cases}</td>
                    <td>{data.deaths}</td>
                </tr>
            {/each}
        </tbody>
    </Table>
</main>