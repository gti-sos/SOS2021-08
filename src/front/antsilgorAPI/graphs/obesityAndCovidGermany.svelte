<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    var BASE_API_PATH_EE = 'https://sos2021-10.herokuapp.com/api/integration/obesity-stats';
        
    
    var edex_data = [];
    var i_data = [];
    var covid19GermanyData = [];
    
    var inicio = 2008;
    var fin = 2016;
    
    async function cargaGrafica(){

        const covid19Germany = await fetch("/api/v1/covid19-tracking-germany");
        if(covid19Germany.ok){
            covid19GermanyData = await covid19Germany.json();
            console.log(`We have received ${covid19GermanyData.length} data points: `);
            console.log(JSON.stringify(covid19GermanyData,null,2));
            covid19GermanyData.forEach(data => {
                i_data.push(data.cases);
                console.log("Casos covid:" + i_data);
    
            });
        }else{
            console.log("Error loading covid19Germany");
        }
    
        //Peticion de datos
    
        console.log("se ejecuta cargar grafica");
    
    
        const res_ee = await fetch(BASE_API_PATH_EE);

        console.log(res_ee);
    
        if (res_ee.ok){
            var json_ee = await res_ee.json();
            
            if(json_ee.length===undefined){
            edex_data = [];
            edex_data.push(json_ee);          
            }
            else{
            edex_data = json_ee;
            }
    
        }
        
    
        //Tomamos los datos
    
        var datosGrafica_edex = await tomaDatosGrafica(edex_data,"man_percent");
        console.log("edex final:" + datosGrafica_edex);
        var datosGrafica_i    = await tomaDatosGrafica(i_data,"cases");
    
        //Construccion de la grafica
        var chart = JSC.chart('chartDiv', {
        debug: true,
        legend_position: 'bottom right',
        type: 'area spline',
        defaultSeries: { shape_opacity: 0.5 },
        xAxis: {
            crosshair_enabled: true,
          scale: { type: 'year' }
        },
        yAxis: {
            title: {
                text: "porcentaje (%)"
            }
        },
        title_label_text: 'Obesity and covid in Europe (Last 6 Months)',
        series: [
          {
            name: 'Obesity-Stats_man_percent',
            points: datosGrafica_edex
          },
          {
            name: 'Cases covid Germany',
            points:i_data
          }
        ]
      });
    }
    
    async function tomaDatosGrafica(datos,atributo){
        
        //Filtramos para usar datos seleccionados a partir de año de inicio
        var datosFiltradosAnyo = datos.filter((e)=>{
            return e.year >= inicio;
        });
    
        console.log("Datos filtrados:" + datosFiltradosAnyo);
    
        //Creamos variables auxiliares
        var arrayTotal = [];
        
        var anyos = rangoAnyos(inicio,fin);
        var a = 0;
    
        var mediaPorAnyo = 0;
        var arrayFinal = [];
        var contador0 = 0;
        var contadorDist = 0;
    
        //Iteramos por cada año del rango establecido
        for(var anyo in anyos){
            //Pillamos el año
            a=anyos[anyo];
            //Limpiamos variables
            mediaPorAnyo = 0.0;
            arrayTotal=[];
            
            //Iteramos sobre los datos para comprobar si su año coincide con el establecido
            for(var num in datosFiltradosAnyo){
                var dato = datosFiltradosAnyo[num]; //Tomamos el dato que estamos iterando
                if(dato.year == a){ //Si coincide con el año ("a") se toma el valor del atributo pasado por parametro
                    if(dato.country=="Spain"){
                     arrayTotal.push(dato[atributo]);
                    
                    }
                    
                }
                else{
                    arrayTotal.push(0);
                }
           }
    
           console.log("Total edex " + num +" " + arrayTotal);
           
           //Hacemos la media por años
           
           for(var i = 0; i < arrayTotal.length; ++i){
            if(arrayTotal[i] == 0)
                contador0++;
            else
                contadorDist++;
            }
    
    
           for(var num in arrayTotal){
                
               mediaPorAnyo += arrayTotal[num];
           }
           console.log(mediaPorAnyo);
    
           if(contador0 == anyos.length){
               mediaPorAnyo = 0;
           }
           else{
               mediaPorAnyo = mediaPorAnyo;
           }
    
         //  mediaPorAnyo = parseFloat(Math.round(mediaPorAnyo));
           
    
    
           //Pusheamos al array final
           arrayFinal.push(mediaPorAnyo);
        }
        console.log("quiero ver");
        console.log(arrayFinal);
    
        return arrayFinal;
       
    }
    
    function rangoAnyos(inic,fin){
        var rango = [];
        for(var i = inic; i<=fin;i++){
            rango.push(i);
        }
        return rango;
    }
    
    </script>
    
    <svelte:head>
        <script src="https://code.jscharting.com/latest/jscharting.js" on:load={cargaGrafica}></script>
    </svelte:head>
    
    <main>
    
        <figure class="highcharts-figure">
            <div id="container"></div>
            <p class="highcharts-description">
            </p>
        </figure>

        <Nav>
            <NavItem>
              <NavLink href="/#/integrations/">volver</NavLink>
            </NavItem>
        </Nav>
        
    
    </main>
