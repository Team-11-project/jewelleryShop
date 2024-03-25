import React, { useContext, useEffect, useState } from 'react'
import './favorites.css'
import { Link } from 'react-router-dom';
import { Container, Row, Col, Dropdown, Form, Card, Button } from 'react-bootstrap';
import AppNavbar from '../assets/navbar'
import AuthContext from '../Context/AuthContext'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingBag, faXmark } from '@fortawesome/free-solid-svg-icons';


function Favorites() {
    const notify = (message) => { toast(message) }
    let { user, authTokens } = useContext(AuthContext)
    const [favorites, setFavorites] = useState([])
    const pathToImages = '../../src/assets/'
    console.log(favorites)
    const [isRemove, setIsRemove] = useState(false)


    const getFavorites = async (userId) => {
        const token = authTokens?.token
        try {
            let response = await fetch(`http://localhost:3001/favorites/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${token}`,
                },
            });
            const resJson = await response.json();
            if (resJson.status === 200) {
                setFavorites(resJson.response);
            } else {
                console.log(resJson);
                notify('error: ' + resJson.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const removeFromFavorites = async (userId, productId) => {
        const token = authTokens?.token
        try {
            let response = await fetch(`
            http://localhost:3001/favorites/remove-from-favorites/${userId}/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const resJson = await response.json();
            if (response.status === 200) {
                notify('error: ' + resJson.message);
            } else {
                notify('error: ' + resJson.message);
            }
            setIsRemove(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getFavorites(user?.user?.id)
    }, [isRemove])

    return (
        <>
            {
                user
                    ?
                    <div className="">
                        <AppNavbar />
                        <Container className="products-container">
                            <Row>
                                <Col>
                                    <div className="products-intro">
                                        <h1>Your Favorites</h1>
                                        <p>Explore Your Favorites.</p>
                                    </div>
                                </Col>
                            </Row>
                            <div className="product-display">
                                <div className="card-container">
                                    {favorites.map((fave) => (
                                        <Card key={fave?.product.productId}>
                                            <Link to={`/product/${fave.product.productId}`} state={fave.product}>
                                                <Card.Img variant="top" src={pathToImages + fave?.product.image} />
                                            </Link>
                                            <Card.Body>
                                                <Card.Title>{fave.product.name}</Card.Title>
                                                <Card.Text>£{fave.product.price}</Card.Text>
                                                <div className="card-icons">
                                                    <a href="#!" onClick={() => { removeFromFavorites(user?.user?.id, fave.product.productId); setIsRemove(true) }}>
                                                        <FontAwesomeIcon icon={faXmark} className="rem-icon" style={{ color: 'rgb(0, 1, 59)' }} />
                                                    </a>
                                                    {/* <Link to="/addCart" onClick={() => addToCart(product?.productId)}> */}
                                                    <FontAwesomeIcon icon={faShoppingBag} className="icon" style={{ color: 'rgb(0, 1, 59)' }} onClick={() => addToCart(fave.product?.productId)} />
                                                    {/* </Link> */}
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </Container>
                    </div>
                    :
                    <div className=""> please log in</div>

            }
        </>


    )
}

export default Favorites