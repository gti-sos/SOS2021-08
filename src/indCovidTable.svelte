<script>
    import {
        onMount
    } from "svelte";

    import Table from "sveltestrap/src/Table.svelte";
 
    let covidINDstats = [];
    async function loadData(){
        console.log(" CARGANDO DATOS COVID GER...");
        const res = await fetch("/api/v1/statewisetestingdetails/loadInitialData");

        if(res.ok){
            console.log("Ok.");
            getData();
            
        }else{
            console.log("Error!");
        }
    }   

    async function getData(){
        console.log("Fetching covid india...");
        const res = await fetch("/api/v1/statewisetestingdetails");

        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            covidINDstats = json;
            console.log(`We have received ${covidINDstats.length} countries.`);
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
                <th>state</th>
                <th>totalsamples</th>
                <th>negative</th>
                <th>positive</th>
             
                
            </tr>
        </thead>
        <tbody>
            {#each covidINDstats as data}
                <tr>
                    <td>{data.date}</td>
                    <td>{data.state}</td>
                    <td>{data.totalsamples}</td>
                    <td>{data.negative}</td>
                    <td>{data.positive}</td>
                    
                  
                </tr>
            {/each}
        </tbody>
    </Table>
</main>