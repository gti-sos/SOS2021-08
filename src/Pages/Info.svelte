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
  
    <h1>SOS2021-01</h1>
  
    <h2>Equipo (y fuente de datos)</h2>
    <Container>
      <Col>
        <a href="http://github.com/19juaniyo99">Juan Buitrago Ruiz</a> (divorce-stats)
      </Col>
      <Col>
        <a href="http://github.com/Lucia2712">Lucia Castro Perez</a> (life-stats)
      </Col>
      <Col>
        <a href="http://github.com/AbramsM1A2">Abraham Corta Ramirez</a> (natality-stats)
      </Col>
    </Container>
    <p />
    <Container>
      <Row>
        <Col>
          <a href="http://github.com/gti-sos/SOS2021-01">
            <Button color="primary">GitHub</Button></a
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
            <CardTitle><h5>divorce-stats</h5></CardTitle>
          </CardHeader>
          <CardBody>
            <CardSubtitle />
            <CardText
              >Fuente de datos sobre el divorcio. Tasa de matrimonios y divorcios, relación entre
              matrimonios y divorcios.</CardText
            >
            <a href="https://sos2021-01.herokuapp.com/api/v1/divorce-stats">
              <Button color="primary">API v1</Button></a
            >
            <a href="/#/divorce-stats">
              <Button color="primary">Interfaz</Button>
            </a>
            <a href="https://documenter.getpostman.com/view/14948045/TzJoDg1Q"
              ><Button color="info">Documentación v1</Button></a
            >
          </CardBody>
          <CardFooter
            >desarrollado por
            <a href="https://github.com/19juaniyo99">Juan Buitrago Ruiz</a
            ></CardFooter
          >
        </Card>
      </Col>
      <Col xs="auto">
        <Card class="mb-3">
          <CardHeader>
            <CardTitle><h5>life-stats</h5></CardTitle>
          </CardHeader>
          <CardBody>
            <CardSubtitle />
            <CardText
              >Fuente de datos del índice de calidad de vida por país, que está vinculado a
              el índice de poder adquisitivo y el índice de seguridad.</CardText
            >
            <a href="https://sos2021-01.herokuapp.com/api/v1/life-stats">
              <Button color="primary">API v1</Button>
            </a>
            <a href="/#/life-stats">
              <Button color="primary">Interfaz</Button>
            </a>
            <a href="https://documenter.getpostman.com/view/14961437/TzJoDg1P">
              <Button color="info">Documentación v1</Button>
            </a>
          </CardBody>
          <CardFooter
            >desarrollado por
            <a href="https://github.com/Lucia2712">Lucia Castro Perez</a>
          </CardFooter>
        </Card>
      </Col>
      <Col xs="auto">
        <Card class="mb-3">
          <CardHeader>
            <CardTitle><h5>natality-stats</h5></CardTitle>
          </CardHeader>
          <CardBody>
            <CardSubtitle />
            <CardText>
              Ratios de natalidad y fertlidad de hombres y mujeres nacidos por año y
              país.
            </CardText>
            <a href="/api/v1/natality-stats"
              ><Button color="primary">API v1</Button></a
            >
            <a href="/#/natality-stats"
              ><Button color="primary">Interfaz</Button></a
            >
            <a href="https://documenter.getpostman.com/view/14932491/TzJrCzRM"
              ><Button color="info">Documentación v1</Button></a
            >
          </CardBody>
          <CardFooter
            >desarrollado por
            <a href="https://github.com/AbramsM1A2">Abraham Corta Ramírez</a
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
      color: #ff3e00;
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