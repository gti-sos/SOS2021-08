
<script>
    import {
      Button,
      Icon,
      Card,
      CardBody,
      CardFooter,
      CardHeader,
      CardSubtitle,
      CardText,
      CardTitle,
      Col,
      Container,
      Row,
    } from "sveltestrap";
  </script>
  
  <main>
    <div class="container-fluid"> 
    <h1>SOS2021-08</h1>
  
    <h2>Equipo</h2>
    <Container>
      <Col>
        <a href="https://github.com/antoniosilva096">Antonio Silva Gordillo</a>
      </Col>
      <Col>
        <a href="https://github.com/carran97">Antonio Carranza Barroso</a>
      </Col>
      <Col>
        <a href="https://github.com/jhonvi2">Juan Vega Seco</a>
      </Col>
    </Container>
    <p />
    <h2>Descripción del proyecto</h2>
    <p> Proyecto con datos y estadísticas del COVID-19 a nivel mundial.</p>
  
    <Container>
      <Col>
        <a href="https://github.com/gti-sos/SOS2021-08"><b>Repositorio: </b>https://github.com/gti-sos/SOS2021-08</a>
      </Col>
      <Col>
        <a href="http://sos2021-08.herokuapp.com"
          ><b>Enlace: </b>http://sos2021-08.herokuapp.com</a
        >
      </Col>
    </Container>
    <p />
  
    <a href="/#/info">
      <Button color="info">Info</Button>
    </a>
  
    <p />
  
    <h2>APIs</h2>
    <Container>
      <Col xs="auto">
        <Card class="mb-3">
          <CardHeader>
            <CardTitle><h5>covid19-tracking-germany</h5></CardTitle>
          </CardHeader>
          <CardBody>
            <CardSubtitle />
            <CardText
              >Estadisticas sobre casos, muertes, recuperados, grupos de edad y género de la evolución de la COVID-19 EN Alemania.</CardText
            >
            <a href="https://sos2021-08.herokuapp.com/api/v1/covid19-tracking-germany">
              <Button color="primary">API v1</Button></a
            >
            <a href="/#/covid19-tracking-germany">
              <Button color="primary">Interfaz</Button>
            </a>
            <a href="https://documenter.getpostman.com/view/14969395/TzJoE1Zm"
              ><Button color="info">Documentación v1</Button></a
            >
            <a href="./#/covid19-tracking-germany/analytics"
            ><Button style="background-color: #D453AF">Gráfica</Button></a>
          </CardBody>
          <CardFooter
            >desarrollado por
            <a href="https://github.com/antoniosilva096">Antonio Silva Gordillo</a
            ></CardFooter
          >
        </Card>
        <Card class="mb-3">
            <CardHeader>
              <CardTitle><h5>us_counties_covid19_daily</h5></CardTitle>
            </CardHeader>
            <CardBody>
              <CardSubtitle />
              <CardText
                >Estadisticas covid en EEUU.</CardText
              >
              <a href="https://sos2021-08.herokuapp.com/api/v1/us_counties_covid19_daily">
                <Button color="primary">API v1</Button></a
              >
              <a href="/#/us_counties_covid19_daily">
                <Button color="primary">Interfaz</Button>
              </a>
              <a href="https://documenter.getpostman.com/view/14969056/TzJshe8k"
                ><Button color="info">Documentación v1</Button></a
              >
            </CardBody>
            <CardFooter
              >desarrollado por
              <a href="https://github.com/">Antonio Carranza Barroso</a
              ></CardFooter
            >
          </Card>
        <Card class="mb-3">
            <CardHeader>
              <CardTitle><h5>statewisetestingdetails</h5></CardTitle>
            </CardHeader>
            <CardBody>
              <CardSubtitle />
              <CardText
                >Estadisticas covid en India.</CardText
              >
              <a href="https://sos2021-08.herokuapp.com/api/v1/statewisetestingdetails">
                <Button color="primary">API v1</Button></a
              >
              <a href="/#/statewisetestingdetails">
                <Button color="primary">Interfaz</Button>
              </a>
              <a href="/#/statewisetestingdetails/graph">
                <Button color="primary">Gráfica Pie HC</Button>
              </a>
              <a href="/#/statewisetestingdetails/graph2">
                <Button color="primary">Gráfica 3D</Button>
              </a>
              <a href="/#/statewisetestingdetails/graphQ">
                <Button color="primary">Gráfica Quickchart</Button>
              </a>
              <a href="https://documenter.getpostman.com/view/14947979/TzJsgyZ1"
                ><Button color="info">Documentación v1</Button></a
              >
            </CardBody>
            <CardFooter
              >desarrollado por
              <a href="https://github.com/">Juan Vega Seco</a
              ></CardFooter
            >
          </Card>
      </Col>
    </Container>
    </div>
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
    h1 {
      color: #9509c0;
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 100;
    }
    b {
      color: #00c1ff;
    }
  </style>