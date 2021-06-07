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
      <Jumbotron class="p-3" style="background-color: #FFB833">
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
            <a href="/#/integrations/grupal" class="fakeButton">Ver</a>
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
          <a href="https://sos2021-08.herokuapp.com/#/integrations/covid19-tracking-germany/depresionAndCovidGraph" class="fakeButton">Depression (Externa Alumno SOS)</a>
          <a href="https://sos2021-08.herokuapp.com/#/integrations/covid19-tracking-germany/obesityAndCovidGraph" class="fakeButton">Obesity (Externa ALumno SOS)</a>
          <a href="https://sos2021-08.herokuapp.com/#/integrations/covid19-tracking-germany/agegroupDeathsAndCases" class="fakeButton">Covid Alemania (propia Dygraph library)</a>
          <a href="https://sos2021-08.herokuapp.com/#/integrations/covid19-tracking-germany/nbaGraph" class="fakeButton">Datos de la NBA (Externa)</a>
          <a href="https://sos2021-08.herokuapp.com/#/covid19-tracking-germany/analytics" class="fakeButton">Covid Alemania (propia highcharts)</a>
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
              <Button color="primary">Gráfica Externa </Button>
            </a>
            

            <a href="/#/statewisetestingdetails/integracionFran">
              <Button color="primary">Gráfica Integracion Fran ( proxy)</Button>
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
         
         <a href="https://sos2021-08.herokuapp.com/#/info" class="fakeButton" style="background-color:#80ced6">Vistas de la API personal.</a>

          
          </div>
        </div>
      </slot>
    </div>
  </main>
  
  <style>
    .fakeButton {
      background-color: #ffb833;
      border: none;
      color: white;
      padding: 16px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      transition-duration: 0.4s;
      cursor: pointer;
      margin-right: 60px;
      border-radius: 12px;
    }
  
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
    .color {
        color: #FFB833;
    }

    .titulo {
        text-align: center;
    }
  </style>
  