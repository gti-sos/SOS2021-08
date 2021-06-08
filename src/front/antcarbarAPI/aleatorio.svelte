

<script>
    import { Form, FormGroup, FormText, Input, Label } from 'sveltestrap';
    import Button from "sveltestrap/src/Button.svelte";

    let url_pic = ''
    async function loadData() {
        const URL = "https://dog.ceo/api/breeds/image/random"
        const res = await fetch(URL)
        if(res.ok){
            console.log("Se ha realizado una llamada correctamente");
            let data = await res.json()
            console.log(data)
            let url = data['message']
            console.log(url)
            url_pic = url
            console.log(url)
            document.getElementById("imagenPerro").src=url;
        }
    }
    loadData();
</script>

<main>
    <h1>Generar imagenes de perros aleatorios</h1>
    <hr>
    <Form>
        <FormGroup>
            <Label for="tx">URL:</Label>
            <Input type="text" bind:value={url_pic} />
        </FormGroup>
        <FormGroup>
            <div>
                <img id="imagenPerro" src="" alt="" width="250" height="250">
            </div>
        </FormGroup>
    </Form>
    <hr>
    <Button color="primary" on:click={loadData}>Generar imagen de perro</Button>

</main>