import { Container } from 'react-bootstrap';
import Logo from './Logo';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useLanguage } from './LanguageProvider';
import ChatComponent from './ChatComponent';

import AllHeads from './AllHeads';
import Carousel from 'react-bootstrap/Carousel';
import Footer from './Footer';
import AgentPhoto from './AgentFoto';

function Object(props) {

  const { filters } = props.location ? props.location.state || { filters: {} } : { filters: {} };

  const { type, category, id } = useParams();
  const [lgObject, setLgObject] = useState([]);

  const { language } = useLanguage();

  function chooseCategory(category, translations) {
    return translations[category] || 'Unknown Category';
  }
  const typeUA = type === 'buy' ? 'Продаж' : 'Оренда';
  const categoryTranslationsUA = {
    apartments: 'Квартири',
    houses: 'Будинки',
    land: 'Земля',
    offices: 'Комерційна нерухомість',
  };
  const categoryUA = chooseCategory(category, categoryTranslationsUA);
  const typeEN = type === 'buy' ? 'Buy' : 'Rent';
  const categoryTranslationsEN = {
    apartments: 'Apartments',
    houses: 'Houses',
    land: 'Land',
    offices: 'Commercial',
  };

  const categoryEN = chooseCategory(category, categoryTranslationsEN);

  useEffect(() => {
    fetch(`https://levelgroup.com.ua/api/${type}/${category}/${id}`)
    // fetch(`http://localhost:8080/api/${type}/${category}/${id}`)
      .then(response => response.json())
      .then(data => {
        setLgObject(data)
      }).catch(error => {
        console.error('Error:', error);
      });
  }, [])

  const hasValidCoordinates =
    !isNaN(parseFloat(lgObject.latitude)) &&
    !isNaN(parseFloat(lgObject.longitude)) &&
    lgObject.latitude !== '0' &&
    lgObject.longitude !== '0';
  const position = hasValidCoordinates ? [parseFloat(lgObject.latitude), parseFloat(lgObject.longitude)] : [0, 0];


  return (
    <>

      <div className='my-header'>
        <Container className='cont-header'>
          <Logo />
          <AllHeads />
        </Container>
      </div>

      <Container className='content-start'>
        <motion.div

          initial={{ opacity: 0, transition: { duration: 1 } }}
          animate={{ opacity: 1, transition: { duration: 2 } }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >


          <div className='d-flex align-items-center mb-3'>
            <Link
              className='card-address text-decoration-none path-link-text'
              to={`/${type}`}
            >
              {language === 'en' ? typeEN : typeUA}
            </Link >
            <div className='arrow-icon arrow-icon-margin'></div>
            <Link
              className='card-address text-decoration-none path-link-text'
              to={{
                pathname: `/${type}/${category}`,
                state: { filters: filters },
              }}
            >
              {language === 'en' ? categoryEN : categoryUA}
            </Link>
            <div className='arrow-icon arrow-icon-margin'></div>
            <div className='path-text'>
              {lgObject.street}, {lgObject.buildingNumber} ( id: {lgObject.id} )
            </div>
            {/* <div style={{ fontSize: '1.2rem', marginLeft: '0.5rem' }}>(id: {lgObject.id})</div> */}
          </div>


          <div className='object-card'>

            <Carousel className='carousel-size'>
              {lgObject.images && lgObject.images.map((image, index) => (
                <Carousel.Item key={index} className='text-center carousel-item-size'>
                  <img
                    className='object-image'
                    src={image}
                    alt={`Image ${index}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>

            <div className='agent-card'>

              <div style={{ border: '1px solid #91909066', textAlign: 'center'}}>
                <div className='agent-photo'>
                  <AgentPhoto salesAgentName={lgObject.salesAgentName} />
                </div>
                <div className='agent-name'>{lgObject.salesAgentName}</div>
                <div className='agent-phone-text'>
                  {lgObject.phones && lgObject.phones.map((phone, index) => (
                    <div key={index}>+{phone}</div>
                  ))}
                </div>
                <div className='agent-email-text'>{lgObject.salesAgentEmail}</div>

                {/* <div className='d-flex align-items-center justify-content-start mt-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#c6c6c6bf" class="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                  </svg>
                  <div className='text-thin-small mx-3 card-address'>send a message</div>
                </div> */}

              </div>

              <div className='text-decoration-none object-address-text'>{lgObject.street}, {lgObject.buildingNumber}</div>
              <div className='d-flex align-items-center justify-content-start mt-2'>
                <div className='district-icon'></div>
                <div className='object-info-text'>{lgObject.district}</div>
              </div>

              <div className='object-info'>
                <div className='d-flex align-items-center justify-content-start mt-3'>
                  <div className='area-icon'></div>
                  <div className='object-info-text'>{lgObject.totalArea} м.кв.</div>
                </div>

                <div className='d-flex align-items-center justify-content-start mt-3'>
                  <div className='rooms-icon'></div>
                  <div className='object-info-text'>{lgObject.rooms}</div>
                </div>


                <div className='d-flex align-items-center justify-content-start mt-3'>
                  <div className='floor-icon'></div>
                  <div className='object-info-text'>
                    {category === 'houses' ? lgObject.floors : `${lgObject.floor} / ${lgObject.floors}`}

                  </div>
                </div>


              </div>

              <div className='d-flex align-items-center justify-content-start mt-3'>
                <div className='bath-icon'></div>
                <div className='object-bathroom-text'>{lgObject.bathroomUnit}</div>
              </div>

              <div className='object-price-text'>
                {(Number(lgObject.price).toLocaleString().replace(/,/g, ' '))} {lgObject.currency}
              </div>

            </div>
          </div>
          <div className='object-description-text my-5'>{lgObject.description}</div>

          <div className='d-flex justify-content-center'>
            {hasValidCoordinates && (
              <MapContainer className='map-size' center={position} zoom={13}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                  <Popup>
                    {lgObject.street}
                    <br />
                    Latitude: {lgObject.latitude}, Longitude: {lgObject.longitude}
                  </Popup>
                </Marker>
              </MapContainer>
            )}
          </div >

          <Footer />
        </motion.div >
      </Container >


      {/* <div className='castom-chat'>
        <ChatComponent />
      </div> */}

    </>

  );

}

export default Object;