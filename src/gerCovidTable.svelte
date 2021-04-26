<script>
    import {
        onMount
    } from "svelte";

    import Table from "sveltestrap/src/Table.svelte";
 
    let covidGERstats = [];
    async function loadData(){
        console.log(" CARGANDO DATOS COVID GER...");
        const res = await fetch("/api/v1/covid19-tracking-germany/loadInitialData");

        if(res.ok){
            console.log("Ok.");
            getData();
            
        }else{
            console.log("Error!");
        }
    }   

    async function getData(){
        console.log("Fetching covid us...");
        const res = await fetch("/api/v1/covid19-tracking-germany");

        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            covidGERstats = json;
            console.log(`We have received ${covidGERstats.length} countries.`);
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
                <th>state</th>
                <th>county</th>
                <th>age-group</th>
                <th>gender</th>
                <th>date</th>  
                <th>cases</th>
                <th>death</th>
                <th>recovered</th>
                
            </tr>
        </thead>
        <tbody>
            {#each covidGERstats as data}
                <tr>
                    <td>{data.state}</td>
                    <td>{data.county}</td>
                    <td>{data.agegroup}</td>
                    <td>{data.gender}</td>
                    <td>{data.date}</td>
                    <td>{data.cases}</td>
                    <td>{data.death}</td>
                    <td>{data.recovered}</td>
                </tr>
            {/each}
        </tbody>
    </Table>
</main>