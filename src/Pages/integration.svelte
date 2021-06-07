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
            <a href="#/graphics/integrations/grupal" class="fakeButton">Ver</a>
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
          <a href="https://sos2021-08.herokuapp.com/#/integrations/covid19-tracking-germany/depresionAndCovidGraph" class="fakeButton">Depression (Externa)</a>
          <a href="https://sos2021-08.herokuapp.com/#/integrations/covid19-tracking-germany/obesityAndCovidGraph" class="fakeButton">Obesity (Externa)</a>
          <a href="https://sos2021-08.herokuapp.com/#/integrations/covid19-tracking-germany/agegroupDeathsAndCases" class="fakeButton">Covid Alemania (propia Dygraph library)</a>
          <a href="https://sos2021-08.herokuapp.com/#/integrations/covid19-tracking-germany/analytics" class="fakeButton">Covid Alemania (propia highcharts)</a>
          </div>
        </div>
      </slot>
    </div>
    <br><br>
    <div class="box">
      <slot>
        <div>
          <h3 class="titulo"><b>Integraciones de Fernando Nuevo</b></h3>
           <br>
           <div class="titulo">
            <a href="https://sos2021-08.herokuapp.com/#/graphics/integrations/educationExpenditures" class="fakeButton">Gastos en educación (G04)</a>
            <a href="https://sos2021-08.herokuapp.com/#/graphics/integrations/lifeStats" class="fakeButton">Índice calidad de vida (G01)</a>
            <a href="https://sos2021-08.herokuapp.com/#/graphics/integrations/superheroStats" class="fakeButton">Estadísticas de Iron Man (externa)</a>
            <a href="https://sos2021-08.herokuapp.com/#/graphics/integrations/audioDB" class="fakeButton">Discografía Daft Punk (externa)</a>
          </div>
        </div>
      </slot>
    </div>
    <br><br>
    <div class="box">
      <slot>
        <div>
        <h3 class="titulo"><b>Integraciones de Humberto Garcia</b></h3>
         <br>
          <div class="titulo">
         <a href="https://sos2021-08.herokuapp.com/#/graphics/integrations/alcohol" class="fakeButton">Covid2 (Externa)</a>
         <a href="https://sos2021-08.herokuapp.com/#/graphics/integrations/cards" class="fakeButton">cartas (Externa)</a>
         <a href="https://sos2021-08.herokuapp.com/#/graphics/integrations/poverty" class="fakeButton">Pobreza (G04)</a>
         <a href="https://sos2021-08.herokuapp.com/#/graphics/integrations/unemployment" class="fakeButton">Desempleados (G23)</a>
         <a href="https://sos2021-08.herokuapp.com/#/graphics/integrations/starwar" class="fakeButton">StarWar (Externa)</a>
         <a href="https://sos2021-08.herokuapp.com/#/graphics/integrations/outschool" class="fakeButton">Abandono (G24)</a>
         <a href="https://sos2021-08.herokuapp.com/#/graphics/integrations/chuck" class="fakeButton">chuck (externa)</a>

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
  