<script>
    import {
      Jumbotron,
      Navbar,
      Nav,
      NavItem,
      NavLink,
      NavbarBrand,
      Dropdown,
      DropdownToggle,
      DropdownMenu,
      DropdownItem,
      Button,
    } from "sveltestrap";
  
    let isOpen = false;
  </script>
  
  <main>
    <body>
      <Jumbotron class="p-3" style="background-color: #6c4675">
        <h1 class="titulo; mainDiv" style="color: white">Integraciones del grupo sos2021-08</h1>
      </Jumbotron>
      
    </body>
  
    <br />

    <div class="box">
        <slot>
          <div>
            <h3 class="titulo"><b>Grafica Grupal</b></h3>
            <br>
            <div class="titulo">
            <a href="/#/analytics" class="primary">
              <Button color="primary">Ver</Button></a>
            </div>
          </div>
        </slot>
      </div>
      <br><br>
  
    <div class="box">
      <slot>
        <div>
          <h3 class="titulo"><b>Integraciones de Antonio Silva Gordillo</b></h3>
          <br>
          <div class="titulo">
            <a href="https://sos2021-08.herokuapp.com/#/integrations/covid19-tracking-germany/depresionAndCovidGraph">
              <Button color="primary">Depression (Externa Alumno SOS)</Button></a>
            <a href="https://sos2021-08.herokuapp.com/#/integrations/covid19-tracking-germany/obesityAndCovidGraph">
              <Button color="primary">Obesity (Externa ALumno SOS)</Button></a>
            <a href="https://sos2021-08.herokuapp.com/#/integrations/covid19-tracking-germany/agegroupDeathsAndCases">
              <Button color="primary">Covid Alemania (propia Dygraph library)</Button></a>
            <a href="https://sos2021-08.herokuapp.com/#/integrations/covid19-tracking-germany/nbaGraph">
              <Button color="primary">Datos de la NBA (Externa)</Button></a>
            <a href="https://sos2021-08.herokuapp.com/#/integrations/covid19-tracking-germany/europePopulationVariationGraph">
              <Button color="primary">Datos de la variación de la población en europa (Externa con proxy)</Button></a>
            <a href="https://sos2021-08.herokuapp.com/#/covid19-tracking-germany/analytics">
              <Button color="primary">Covid Alemania (propia highcharts)</Button></a>
          </div>
        </div>
      </slot>
    </div>
    <br><br>
    <div class="box">
      <slot>
        <div>
          <h3 class="titulo"><b>Integraciones de Juan Vega Seco</b></h3>
           <br>
           <div class="titulo">
            <a href="https://sos2021-08.herokuapp.com/#/integrations/statewisetestingdetails/graph2">
              <Button color="primary">Gráfica HC</Button>
            </a>
            <a href="https://sos2021-08.herokuapp.com/#/integrations/statewisetestingdetails/amcChart">
              <Button color="primary">Gráfica Integracion AMC</Button>
            </a>
            <a href="https://sos2021-08.herokuapp.com/#/integrations/statewisetestingdetails/integrationAnx">
              <Button color="primary">Gráfica Integracion I1</Button>
            </a>
            <a href="https://sos2021-08.herokuapp.com/#/integrations/statewisetestingdetails/integracionE1">
              <Button color="primary">Gráfica Integracion E1</Button>
            </a>
            <a href="https://sos2021-08.herokuapp.com/#/integrations/statewisetestingdetails/integracionE2">
              <Button color="primary">Gráfica Integracion E2</Button>
            </a>
            <a href="https://sos2021-08.herokuapp.com/#/integrations/statewisetestingdetails/integracionE3">
              <Button color="primary">Gráfica Integracion E3 </Button>
            </a>
            <a href="https://sos2021-08.herokuapp.com/#/integrations/statewisetestingdetails/integracionE4">
              <Button color="primary">Gráfica Integracion E4 </Button>
            </a>
            <a href="https://sos2021-08.herokuapp.com/#/integrations/statewisetestingdetails/integracionI2">
              <Button color="primary">Gráfica Integracion I2 </Button>
            </a>
            <a href="https://sos2021-08.herokuapp.com/#/integrations/statewisetestingdetails/integracionFran">
              <Button color="primary">Gráfica Integración I3 </Button>
            </a>
            

          </div>
        </div>
      </slot>
    </div>
    <br><br>
    <div class="box">
      <slot>
        <div>
        <h3 class="titulo"><b>Integraciones de Antonio Carranza Barroso</b></h3>
         <br>
          <div class="titulo">
         

         <a href="/#/us_counties_covid19_daily/graphicDonut3D">
          <Button color="primary">Gráfica Donut</Button>
        </a>
        <a href="/#/us_counties_covid19_daily/chartist">
          <Button color="primary">Gráfica Chartist</Button>
        </a>
        <a href="/#/us_counties_covid19_daily/highchartBB">
          <Button color="primary">Gráfica API EXTERNA BREAKING BAD</Button>
        </a>
        <a href="/#/us_counties_covid19_daily/fusionchart1">
          <Button color="primary">Gráfica fusionChart(Integracion)</Button>
        </a>
        <a href="/#/us_counties_covid19_daily/aleatorio">
          <Button color="primary">API EXTERNA aleatorio</Button>
        </a>
        <a href="/#/us_counties_covid19_daily/integracionProxy">
          <Button color="primary"> Gráfica con proxy(Integracion)</Button>
        </a>
          
          </div>
        </div>
      </slot>
    </div>
  </main>
  
  <style>
  
    .mainDiv {
      text-align: center;
      margin: 20px;
    }
  
    .box {
      width: 50%;
      border: 1px solid #aaa;
      border-radius: 2px;
      box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
      padding: 1em;
      margin-left: auto;
      margin-right: auto;
    }
  
    .mainDiv {
      text-align: center;
      margin: 20px;
    }

    .titulo {
        text-align: center;
    }
  </style>
  