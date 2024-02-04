import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { Container } from 'react-bootstrap';

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

import Logo from './Logo';
import AllHeads from './AllHeads';
import { useLanguage } from './LanguageProvider';
import Footer from './Footer';

import buySliderImg1 from '../images/b1.jpg'
import buySliderImg2 from '../images/b2.jpg'
import rentSliderImg1 from '../images/r1.jpg'
import rentSliderImg2 from '../images/r2.jpg'

function Type() {

  const { type } = useParams();
  const { language } = useLanguage();

  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    // fetch(`https://levelgroup.com.ua/api/${type}`).then(response => response.json()).then(data => {
    fetch(`http://localhost:8080/api/${type}`).then(response => response.json()).then(data => {
      setImgs(data);
    }).catch(error => {
      console.error('Error:', error);
    });
  }, [])

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
          initial={{ opacity: 0, transition: { duration: 4 } }}
          animate={{ opacity: 1, transition: { duration: 4 } }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >
          <div className='title-size'>{language === 'en' ? 'EXCLUSIVE OFFERS' : 'ЕКСКЛЮЗИВНІ ПРОПОЗИЦІЇ'}</div>

          <ReactCompareSlider
            className='compare-slider-size mt-4'
            // boundsPadding={0}
            itemOne={
              <>
                <div className='slider-button slider-button-size slider-button-before'>
                  {language === 'en' ? 'View' : 'Переглянути'}
                </div>
                <Link
                  className='slider-button slider-button-size slider-button-before'
                  to={type === 'buy' ? '/buy/apartments/212765963' : '/rent/apartments/111776036'}
                  style={{ zIndex: '10', opacity: '0' }}
                >
                  {language === 'en' ? 'View' : 'Переглянути'}
                </Link>

                <Link
                  className='slider-button slider-button-size slider-button-after'
                  to={type === 'buy' ? '/buy/apartments/212772600' : '/rent/offices/1488262'}
                  style={{ zIndex: '10', opacity: '0' }}
                >
                  {language === 'en' ? 'View' : 'Переглянути'}
                </Link>

                <ReactCompareSliderImage
                  alt="Image one"
                  src={type === 'buy' ? buySliderImg1 : rentSliderImg1}
                />
              </>
            }
            itemTwo={
              <>
                <div className='slider-button slider-button-size slider-button-after'>
                  {language === 'en' ? 'View' : 'Переглянути'}
                </div>
                <ReactCompareSliderImage
                  alt="Image two"
                  src={type === 'buy' ? buySliderImg2 : rentSliderImg2}
                />

              </>
            }
            keyboardIncrement="5%"
            position={50}
          />

          {type === 'buy' && <div className='title-size mt-5'>{language === 'en' ? 'BUYING CATEGORIES' : 'КАТЕГОРІЇ ПРОДАЖУ'}</div>}
          {type === 'rent' && <div className='title-size mt-5'>{language === 'en' ? 'RENT CATEGORIES' : 'КАТЕГОРІЇ ОРЕНДИ'}</div>}

          <div className="categories-box mt-4">

            <div className='category-box'>
              <Link
                className='text-decoration-none'
                to={`/${type}/apartments`}
                onClick={() => {
                  window.scroll(0, 0);
                }}
              >
                <div className='category-img-box'>
                  <img className='category-img' src={imgs.apartments} alt='' />
                </div>
                <h4 className="category-txt mt-3">{language === 'en' ? 'Apartments' : 'Квартири'}</h4>
              </Link>
            </div>

            <div className='category-box'>
              <Link
                className='text-decoration-none'
                to={`/${type}/houses`}
                onClick={() => {
                  window.scroll(0, 0);
                }}
              >
                <div className='category-img-box'>
                  <img className='category-img' src={imgs.houses} alt='' />
                </div>
                <h4 className="category-txt mt-3">{language === 'en' ? 'Houses' : 'Будинки'}</h4>
              </Link>
            </div>

          </div>

          <div className="categories-box">

            <div className='category-box'>
              <Link
                className='text-decoration-none'
                to={`/${type}/land`}
                onClick={() => {
                  window.scroll(0, 0);
                }}
              >
                <div className='category-img-box'>
                  <img className='category-img' src={imgs.land} alt='' />
                </div>
                <h4 className="category-txt mt-3">{language === 'en' ? 'Land' : 'Земля'}</h4>
              </Link>
            </div>

            <div className='category-box'>
              <Link
                className='text-decoration-none'
                to={`/${type}/offices`}
                onClick={() => {
                  window.scroll(0, 0);
                }}
              >
                <div className='category-img-box'>
                  <img className='category-img' src={imgs.offices} alt='' />
                </div>
                <h4 className="category-txt mt-3">{language === 'en' ? 'Commercial' : 'Комерційна нерухомість'}</h4>
              </Link>
            </div>

          </div>

          <Footer />
        </motion.div>
      </Container>

    </>
  );
}

export default Type;