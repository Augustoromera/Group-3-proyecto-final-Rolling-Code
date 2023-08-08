import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Container, Carousel, Card, CardGroup, Button } from 'react-bootstrap';
import '../styles/bodyHome.css';



const foods = [
    {
      image: 'https://lanoticia.com/wp-content/uploads/2022/09/dia-nacional-de-la-hamburguesa-con-queso-gratis.jpg',
      description: 'Hamburguesa con queso',
    },
    {
      image: 'https://www.eltiempo.com/uploads/2021/04/15/6078c68c2f49b.jpeg',
      description: 'Papas fritas',
    },
    {
      image: 'https://img.taste.com.au/oaMttv42/taste/2020/06/july20_simple-pesto-pepperoni-pizza-162757-1.jpg',
      description: 'Pizza de pepperoni',
    },
    {
      image: 'https://www.recetasnestle.com.mx/sites/default/files/srh_recipes/05b0c91b17ded782d5cb45158897244f.jpg',
      description: 'Hot dog',
    },
  ];

  function BodyHome() {
    return (
        <>
      <div>
        <Carousel className="carousel-container img-fluid " interval={5000}>
        {foods.map((food, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={food.image}
              alt={food.description}
              
            />
            <Carousel.Caption>
              <h3>{food.description}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
        <h1 className='text-center'>Nuestros productos</h1>
        <hr />
        <h2 className='text-center'>Destacados</h2>
        </div>
      <Container className="mt-5">
        <CardGroup>
          {foods.map((food, index) => (
            <Card key={index}>
              <Card.Img variant="top" src={food.image} alt={food.description} />
              <Card.Body>
                <Card.Title>{food.description}</Card.Title>
                <Card.Text>
                  Descripción del producto.
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </CardGroup>
            <br />
            <hr />
            <h3>Hamburguesas</h3>

            <div className="row">
  <div className="col-6 col-lg-3">
    <Card className="h-100">
      <Card.Img variant="top" src="https://assets.unileversolutions.com/recipes-v2/232001.jpg" alt="Producto 1" />
      <Card.Body>
        <Card.Title>Doble Cheddar con Bacon</Card.Title>
        <Card.Text>
          Descripción del producto 1.
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
  <div className="col-6 col-lg-3">
    <Card className="h-100">
      <Card.Img variant="top" src="https://www.seriouseats.com/thmb/uSNXjlR9pQU0Nt9HJTzD2ZhZ45Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2015__07__20150728-homemade-whopper-food-lab-35-b3500a5c2f3e4e10aa3169d5f76e1468.jpg" />
      <Card.Body>
        <Card.Title>Cheeseburger Simple</Card.Title>
        <Card.Text>
          Descripción del producto 2.
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
  <div className="col-6 col-lg-3">
    <Card className="h-100">
      <Card.Img variant="top" src="https://cdn.pedix.app/W0AsEiy0lKAARE913TEH/products/1691198412713-82958.png?size=1500x1500" alt="Producto 3" />
      <Card.Body>
        <Card.Title>Triple con Cheddar</Card.Title>
        <Card.Text>
          Descripción del producto 3.
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
  <div className="col-6 col-lg-3">
    <Card className="h-100">
      <Card.Img variant="top" src="https://cdn.pedix.app/cmcoRjnUw4iqdTE8SUtm/products/1662394720573.png?size=1500x1500" alt="Producto 4" />
      <Card.Body>
        <Card.Title>Taparterias Deluxe</Card.Title>
        <Card.Text>
          Descripción del producto 4.
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
</div>

<br />
            <h3>Papas Fritas</h3>

            <div className="row">
  <div className="col-6 col-lg-3">
    <Card className="h-100">
      <Card.Img variant="top" src="https://vinomanos.com/wp-content/uploads/2021/08/pexels-dzenina-lukac-1583884-min.jpeg" alt="Producto 1" />
      <Card.Body>
        <Card.Title>Tradicional</Card.Title>
        <Card.Text>
          Descripción del producto 1.
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
  <div className="col-6 col-lg-3">
    <Card className="h-100">
      <Card.Img variant="top" src="https://media-cdn.tripadvisor.com/media/photo-s/1b/14/33/1d/papas-fritas-rusticas.jpg" />
      <Card.Body>
        <Card.Title>Rústicas</Card.Title>
        <Card.Text>
          Descripción del producto 2.
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
  <div className="col-6 col-lg-3">
    <Card className="h-100">
      <Card.Img variant="top" src="https://locosxlaparrilla.com/wp-content/uploads/2015/02/Receta-recetas-locos-x-la-parrilla-locosxlaparrilla-receta-papas-fritas-cheddar-verdeo-panceta-papas-fritas-cheddar-verde-640x477.jpg" alt="Producto 3" />
      <Card.Body>
        <Card.Title>Con Cheddar y Bacon</Card.Title>
        <Card.Text>
          Descripción del producto 3.
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
  <div className="col-6 col-lg-3">
    <Card className="h-100">
      <Card.Img variant="top" src="https://cocinachic.net/wp-content/uploads/2014/12/369911944_2c0cc49bd7_b.jpg" alt="Producto 4" />
      <Card.Body>
        <Card.Title>Con Crema y Verdeo</Card.Title>
        <Card.Text>
          Descripción del producto 4.
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
</div>
<br />
            <h3>Bebidas</h3>

            <div className="row">
  <div className="col-6 col-lg-3">
    <Card className="h-100">
      <Card.Img variant="top" src="https://jumboargentina.vtexassets.com/arquivos/ids/770503/Gaseosa-Coca-cola-Sin-Az-car-2-5-L-2-237888.jpg?v=638128497845800000" alt="Producto 1" />
      <Card.Body>
        <Card.Title>Coca Cola</Card.Title>
        <Card.Text>
          Descripción del producto 1.
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
  <div className="col-6 col-lg-3">
    <Card className="h-100">
      <Card.Img variant="top" src="https://plazalama.com.do/cdn/shop/products/40654.jpg?v=1631660651" />
      <Card.Body>
        <Card.Title>Fanta</Card.Title>
        <Card.Text>
          Descripción del producto 2.
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
  <div className="col-6 col-lg-3">
    <Card className="h-100">
      <Card.Img variant="top" src="https://www.repartienda.com/wp-content/uploads/2020/05/IMG_8513.jpg" alt="Producto 3" />
      <Card.Body>
        <Card.Title>Sprite</Card.Title>
        <Card.Text>
          Descripción del producto 3.
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
  <div className="col-6 col-lg-3">
    <Card className="h-100">
      <Card.Img variant="top" src="https://superlago.com.ar/wp-content/uploads/2021/01/7791813423324.jpg" alt="Producto 4" />
      <Card.Body>
        <Card.Title>Mirinda Manzana</Card.Title>
        <Card.Text>
          Descripción del producto 4.
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
</div>
            <br />
            <h3>Postres</h3>

            <div className="row mb-3">
  <div className="col-6 col-lg-3 ">
    <Card className="h-100">
      <Card.Img variant="top" src="https://ve-low.com/cdn/shop/products/Bittercomprimidaw1.jpg?v=1676241029" alt="Producto 1" />
      <Card.Body>
        <Card.Title>Helado</Card.Title>
        <Card.Text>
          Descripción del producto 1.
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
  <div className="col-6 col-lg-3 ">
    <Card className="h-100">
      <Card.Img variant="top" src="https://chio.com.ar/tienda/trenque-lauquen/445-large_default/bombon-escoses-nevado-ice-cream.jpg" />
      <Card.Body>
        <Card.Title>Bombón Escosés</Card.Title>
        <Card.Text>
          Descripción del producto 2.
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
  <div className="col-6 col-lg-3 ">
    <Card className="h-100">
      <Card.Img variant="top" src="https://www.divinacocina.es/wp-content/uploads/flan-de-dulce-de-leche.plato_.jpg" alt="Producto 3" />
      <Card.Body>
        <Card.Title>Flan</Card.Title>
        <Card.Text>
          Descripción del producto 3.
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
  <div className="col-6 col-lg-3 ">
    <Card className="h-100">
      <Card.Img variant="top" src="https://i0.wp.com/weinmayer.es/wp-content/uploads/2020/05/Weinmayer-Tarta-de-xocolata-coulant-porcio.jpg?fit=800%2C800&ssl=1" alt="Producto 4" />
      <Card.Body>
        <Card.Title>Tarta</Card.Title>
        <Card.Text>
          Descripción del producto 4.
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
</div>
      

      </Container>

  
    </>
    );
  }
  
  export default BodyHome;