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
      Nav,
      NavItem,
      NavLink,
      Row,
    } from "sveltestrap";
  </script>
  
  <main>
    <Nav>
      <NavItem>
        <NavLink href="/">Volver</NavLink>
      </NavItem>
    </Nav>
  
    <h1>SOS2021-08</h1>
  
    <h2>Grupo sos2021-08 y fuente de datos</h2>
    
    <p />
    <Container>
      <Row>
        <Col>
          <a href="http://github.com/gti-sos/SOS2021-08">
            <Button color="primary">Repositorio GitHub</Button></a
          >
        </Col>
      </Row>
    </Container>
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
            <a href="/#/divorce-stats">
              <Button color="primary">Interfaz</Button>
            </a>
            <a href="https://documenter.getpostman.com/view/14969395/TzJoE1Zm"
              ><Button color="info">Documentación v1</Button></a
            >
          </CardBody>
          <CardFooter
            >desarrollado por
            <a href="https://github.com/antoniosilva096">Antonio Silva Gordillo</a
            ></CardFooter
          >
        </Card>
      </Col>
      
    </Container>
    <Container>
      <Col xs="auto">
        <Card class="mb-3">
          <CardHeader>
            <CardTitle><h5>us_counties_covid19</h5></CardTitle>
          </CardHeader>
          <CardBody>
            <CardSubtitle />
            <CardText
              >Estadisticas sobre casos, muertes, recuperados, grupos de edad y género de la evolución de la COVID-19 EN EEUU.</CardText
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
            <a href="https://github.com/carran97">Antonio Carranza Barroso</a
            ></CardFooter
          >
        </Card>
      
      </Col>
    </Container>
    
   
    <Container>
      <Col xs="auto">
        <Card class="mb-3">
          <CardHeader>
            <CardTitle><h5>statewisetestingdetails</h5></CardTitle>
          </CardHeader>
          <CardBody>
            <CardSubtitle />
            <CardText
              >Estadisticas sobre casos, muertes, recuperados, grupos de edad y género de la evolución de la COVID-19 EN la India.</CardText
            >
            <a href="https://sos2021-08.herokuapp.com/api/v1/statewisetestingdetails">
              <Button color="primary">API v1</Button></a
            >
            <a href="/#/statewisetestingdetails">
              <Button color="primary">Interfaz</Button>
            </a>
            <a href="https://documenter.getpostman.com/view/14947979/TzJsgyZ1"
              ><Button color="info">Documentación v1</Button></a
            >
          </CardBody>
          <CardFooter
            >desarrollado por
            <a href="https://github.com/jhonvi2">Juan Vega Seco</a
            ></CardFooter
          >
        </Card>
      </Col>
    </Container>
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 1em;
      max-width: 240px;
      margin: 0 auto;
    }
    h1 {
      color: #9509c0;
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 100;
    }
    @media (min-width: 640px) {
      main {
        max-width: none;
      }
    }
  </style>