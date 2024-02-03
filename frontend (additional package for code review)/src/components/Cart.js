import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import AllHeads from './AllHeads';
import Logo from './Logo';
import { useLanguage } from './LanguageProvider';

function Cart() {

  const { language } = useLanguage();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);


  const removeFromLocalStorage = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };




  return (
    <>
      <Container className='cont-header'>
        <Logo />
        <AllHeads />
      </Container>

      <div className='text-thin-big text-center my-3'>
        {language === 'en' ? "Your Favorites" : 'Ваше вибране'}
      </div>
      <Container>
        <Row>
          {cartItems.map(lgObject =>
            <Col sm={12} md={6} lg={4} className={'d-flex mb-4'}>
              <Card style={{
                borderRadius: 0,
                backgroundColor: '#111010',
                border: '1px solid #91909066',
                width: '100%',
                marginTop: '1rem'
              }}>
                <Link className='img-box'
                  to={`/type/category/${lgObject.id}`}
                  onClick={() => {
                    window.scroll(0, 0);
                  }}>
                  <img src={lgObject.image} className="product-image"></img>
                </Link>
                <button
                  className='cart d-flex align-items-center justify-content-center'
                  onClick={() => removeFromLocalStorage(lgObject.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill='rgb(173, 129, 82)'
                    className="bi bi-bookmark"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                  </svg>
                </button>


                <Card.Body>
                  <Link className='text-decoration-none text-thin-medium' to={`/type/category/${lgObject.id}`}>{lgObject.street}, {lgObject.buildingNumber}</Link>
                  <div className='d-flex align-items-center justify-content-start'>
                    <div className='district-icon'></div>
                    <div className='text-thin-small my-2'>{lgObject.district}</div>
                  </div>
                  {/* <div className='text-thin-small my-2'>{lgObject.subLocalityName !== "" ? lgObject.subLocalityName : lgObject.localityName}</div> */}
                  <div className='d-flex align-items-center justify-content-start'>
                    <div className='d-flex align-items-center justify-content-start'>
                      <div className='area-icon'></div>
                      <div className='text-thin-small my-2'>{lgObject.totalArea} м.кв.</div>
                    </div>

                    {lgObject.rooms !== "to be confirmed" && (
                      <div className='d-flex align-items-center justify-content-start mx-5'>
                        <div className='rooms-icon'></div>
                        <div className='text-thin-small my-2'>{lgObject.rooms}</div>
                      </div>
                    )}
                    {lgObject.floor !== "to be confirmed" && (
                      <div className='d-flex align-items-center justify-content-start'>
                        <div className='floor-icon'></div>
                        <div className='text-thin-small'>{lgObject.floor}/{lgObject.floors}</div>
                      </div>
                    )}

                  </div>

                  <div className='custom-line'></div>
                  <div className='text-thin-medium'>{(Number(lgObject.price).toLocaleString().replace(/,/g, ' '))} {lgObject.currency}</div>
                </Card.Body>

              </Card>
            </Col>
          )}

        </Row>
      </Container>
    </>
  );
}

export default Cart;