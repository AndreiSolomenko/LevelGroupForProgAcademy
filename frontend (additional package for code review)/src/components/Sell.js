import { Container } from 'react-bootstrap';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Logo from './Logo';
import { motion } from 'framer-motion';
import ChatComponent from './ChatComponent';
import AllHeads from './AllHeads';
import { useLanguage } from './LanguageProvider';

function Sell() {

  const { language } = useLanguage();

  const [submissionResult, setSubmissionResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formName = e.target.name.value;
    const formPhone = e.target.phone.value;

    if (!formName || !formPhone) {
      setSubmissionResult('fields are not filled');
      return;
    }

    setIsSubmitting(true);

    const formData = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
    };

    const apiUrl = 'https://levelgroup.com.ua/api/submit-form';
    // const apiUrl = 'http://localhost:8080/api/submit-form';

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(formData),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((data) => {
        setSubmissionResult(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


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
            {language === 'en' ? 'Leave information that we can contact with you' : 'Залиште інформацію, за якою ми зможемо з вами зв`язатися'}
          </div>

          {submissionResult ? (

            <div>
              {submissionResult === "Email sent successfully!" ?
                <div className="submission-message">{language === 'en' ? "Information sent successfully!" : 'Інформація успішно надіслана!'}</div> :

                <div style={{ textAlign: 'center' }}>
                  <div className="submission-warning">{language === 'en' ? 'Please fill in all required fields (Name and Phone)' : 'Будь ласка, заповніть усі обов`язкові поля (ім`я та телефон)'}</div>
                  <Button
                    className='my-5'
                    onClick={() => setSubmissionResult(null)}
                    style={{
                      backgroundColor: 'transparent',
                      borderRadius: '0',
                      color: 'rgb(173, 129, 82)',
                      fontSize: '1.5rem',
                      fontWeight: '100',
                      border: '1px solid rgb(173, 129, 82)'
                    }}
                  >
                    <div className='form-button-text'>
                      {language === 'en' ? "Return to form" : 'Повернутись до форми'}
                    </div>
                  </Button>
                </div>}
            </div>

          ) : (
            <Form className="form-container border-none px-3" onSubmit={handleSubmit}>


              <Form.Group controlId="formName" className='mx-3 mt-4'>
                <Form.Control
                  className='shadow-none'
                  type="text"
                  placeholder={language === 'en' ? "Your Name" : 'Ваше Ім`я'}
                  name="name"
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#c6c6c6bf',
                    fontSize: '1.4rem',
                    fontWeight: '100',
                    borderRadius: '0',
                    borderBottom: '1px solid #91909066'
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formPhone" className='mx-3 mt-4'>
                <Form.Control
                  className='shadow-none'
                  type="text"
                  placeholder={language === 'en' ? "Your Phone" : 'Ваш Телефон'}
                  name="phone"
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#c6c6c6bf',
                    fontSize: '1.4rem',
                    fontWeight: '100',
                    borderRadius: '0',
                    borderBottom: '1px solid #91909066'
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className='mx-3 mt-4'>
                <Form.Control
                  className='shadow-none'
                  type="email"
                  placeholder={language === 'en' ? "Your E-Mail (optionally)" : 'Ваш E-Mail (за бажанням)'}
                  name="email"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#c6c6c6bf',
                    fontSize: '1.4rem',
                    fontWeight: '100',
                    border: 'none',
                    borderRadius: '0',
                    borderBottom: '1px solid #91909066'
                  }}
                />
              </Form.Group>

              <Button
                className='mx-3 my-4'
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: 'transparent',
                  borderRadius: '0',
                  color: 'rgb(173, 129, 82)',
                  fontSize: '1.5rem',
                  fontWeight: '100',
                  border: '1px solid rgb(173, 129, 82)'
                }}
              >
                <diV className='form-button-text'>
                  {language === 'en' ? "SEND" : 'НАДІСЛАТИ'}
                </diV>
              </Button>



            </Form>

          )}

        </motion.div>
      </Container>

      <div className='castom-chat'>
        <ChatComponent />
      </div>

    </>

  );
}

export default Sell;