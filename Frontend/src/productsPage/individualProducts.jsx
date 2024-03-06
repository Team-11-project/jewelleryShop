import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './individualProducts.css';

// Images
import img1 from './img1.jpg';
import rolexOyster from './rolexOyster.jpg';
import AppNavbar from '../assets/navbar';
import AuthContext from '../Context/AuthContext';

// Function component for individual product
function IndividualProduct() {
  const location = useLocation()
  // console.log(location.state)
  const product = location.state
  // const { productId } = useParams();

  // Dummy data
  // const products = [
  //   {
  //     id: 1,
  //     name: 'Rolex Oyster Perpetual GOLD ',
  //     price: 8000.00,
  //     image: rolexOyster,
  //     description:
  //       'Introducing our Gold and Diamond-Studded Rolex Oyster Watch—a pinnacle of opulence for the discerning connoisseur. The 18-karat gold case, adorned with brilliant-cut diamonds on the bezel and dial, exudes luxury. The Oyster architecture ensures durability, and the self-winding movement guarantees accuracy. With a seamless gold bracelet and deployment clasp, this timepiece is a symbol of timeless elegance, perfect for making a bold statement at any occasion',
  //   },
  //   { id: 2, name: 'Product 2', price: 30, image: img1, description: 'Consectetur adipiscing elit.' },
  // ];

  // Fetch the product data based on productId
  // const product = products.find((p) => p.id === parseInt(productId));

  // if (!product) {
  //   return <div>Loading...</div>;
  // }
  let { user } = useContext(AuthContext)

  const addToCart = async (productId) => {
    
    try {
      // setIsLoading(true)
      const userId = user.user.id
      let response = await fetch(`http://localhost:3001/cart/add/${userId}/${productId}`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          }
        })
      const resJson = await response.json();
      console.log(resJson)
    }
    catch (error) {
      // setIsLoading(true)
      console.log(error)
    }
  }

  return (
    <>
      <AppNavbar />
      <Container className="individual-p-container mt-5">
        <Row>
          <Col md={6}>
            <img src={product?.image} alt={product?.name} className="img-fluid rounded" />
          </Col>
          <Col md={6} className="product-details d-flex flex-column justify-content-center align-items-start">
            <h1>{product?.name}</h1>
            <p className="description">{product?.details}</p>
            {/* Placeholder for star rating */}
            {/* <div className="star-rating mb-3">★★★★☆</div> */}
            <p className="price-p mb-4">£{product?.price}</p>
            <Link to="/addCart" onClick={() => addToCart(product.productId)}>
              <Button variant="primary" className="add-to-cart-btn">
                Add to Cart
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );

}

export default IndividualProduct;
