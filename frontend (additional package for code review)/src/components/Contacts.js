import { Container } from 'react-bootstrap';
import Logo from './Logo';
import ChatComponent from './ChatComponent';
import { motion } from 'framer-motion';
import AllHeads from './AllHeads';
import { useLanguage } from './LanguageProvider';


function Contacts() {

  const { language } = useLanguage();

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

          <div className='title-size text-center'>
            {language === 'en' ? 'Information about the company and employees' : 'Інформація про компанію та співробітників'}
          </div>

        </motion.div>
      </Container>

      {/* <div className='castom-chat'>
        <ChatComponent />
      </div> */}

    </>

  );
}

export default Contacts;