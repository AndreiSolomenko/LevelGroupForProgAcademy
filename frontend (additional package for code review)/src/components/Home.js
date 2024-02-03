import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

import Logo from './Logo';
import SocialMedia from './SocialMedia';
import ChatComponent from './ChatComponent';
import { useLanguage } from './LanguageProvider';

import buyEN from '../images/buyEN.png';
import buyUA from '../images/buyUA.png';
import rentEN from '../images/rentEN.png';
import rentUA from '../images/rentUA.png';
import animationPlanet from '../images/newPlanet6.gif';

function Home() {

  const { language } = useLanguage();
  const [animationVisible, setAnimationVisible] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    if (animationVisible) {
      restartAnimation();
    }
  }, [animationVisible]);

  const restartAnimation = () => {
    const animationElement = animationRef.current;
    if (animationElement) {
      animateElement(animationElement);
    }
  };

  const animateElement = (element) => {
    const currentSrc = element.src;
    element.classList.remove('animate');
    void element.offsetWidth;
    element.src = '';
    void element.offsetWidth;
    element.src = currentSrc;
    element.classList.add('animate');
  };

  const startAnimation = () => {
    setAnimationVisible(!animationVisible);
  };

  return (
    <Container>
      <div className='cont-header'>
        <Logo />
      </div>

      {animationVisible && (
        <img className='animation' ref={animationRef} src={animationPlanet} alt='' />
      )}
      <motion.div
        initial={{ opacity: 0, transition: { duration: 0 } }}
        animate={{ opacity: 1, transition: { duration: 4 } }}
        exit={{ opacity: 0, transition: { duration: 4 } }}
      >
        <div className="space">
          <div className="planet">
            <div className="buy-rent-block">
              <Link
                to="/buy"
                onClick={startAnimation}
              >
                {language === 'en' ?
                  <div className='planet-text-byu-en'>
                    <img className='planet-text-img' src={buyEN} alt='' />
                  </div> :
                  <div className='planet-text-byu-ua'>
                    <img className='planet-text-img' src={buyUA} alt='' />
                  </div>
                }
              </Link>
              <Link
                to="/rent"
                onClick={startAnimation}
              >
                {language === 'en' ?
                  <div className='planet-text-rent-en'>
                    <img className='planet-text-img' src={rentEN} alt='' />
                  </div> :
                  <div className='planet-text-rent-ua'>
                    <img className='planet-text-img' src={rentUA} alt='' />
                  </div>
                }
              </Link>
            </div>
          </div>

        </div>
        <div className='social-media-position'>
          <SocialMedia />
        </div>

      </motion.div>

      <div className='santa-claus'></div>
    </Container>


  );
}

export default Home;