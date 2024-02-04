import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLanguage } from './LanguageProvider';

function ChatComponent() {
  const { language } = useLanguage();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const userName = useRef('');
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    userName.current = `user_${uuidv4()}`;
  }, []);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendClick = async () => {
    if (message.trim() === '') {
      return;
    }

    try {
      const queryParams = new URLSearchParams({
        userName: userName.current,
        messageText: message,
      });

      // const url = `https://levelgroup.com.ua/api/send-message?${queryParams.toString()}`;
      const url = `http://localhost:8080/api/send-message?${queryParams.toString()}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Message sent successfully');

        setMessage('');
        fetchMessages();
      } else {
        console.log('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      // const response = await fetch('https://levelgroup.com.ua/api/get-messages');
      const response = await fetch('http://localhost:8080/api/get-messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
        scrollToBottom();
      } else {
        console.log('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    fetchMessages();
    const intervalId = setInterval(fetchMessages, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="chat h-100 w-100">
      <div className="chat-title">
        <div className='title-img'></div>
        <div className='title-text'>LEVEL GROUP</div>
        <div className='title-but'></div>
      </div>

      <div className="messages" ref={messagesContainerRef}>
        <div className="messages-content">
          {messages ? (
            messages.map((msg, index) => {
              const parsedMessage = JSON.parse(msg);
              return (
                parsedMessage.userName === userName.current && (
                  <div className="message" key={index}>
                    {parsedMessage.text}
                  </div>
                )
              );
            })
          ) : (
            <div className="message">{language === 'en' ? "Need professional help? Talk with a Level Group property expert now!" : "Потрібна професійна допомога? Поговоріть із експертом із нерухомості Level Group зараз!"}</div>
          )}
        </div>
      </div>

      <div className="message-box">
        <textarea
          type="text"
          className="message-input"
          placeholder={language === 'en' ? "Type message..." : "Введіть повідомлення..."}
          value={message}
          onChange={handleInputChange}
        ></textarea>
        <button
          type="submit"
          className="message-submit"
          onClick={handleSendClick}
        >
          {language === 'en' ? "SEND" : 'НАДІСЛАТИ'}
        </button>
      </div>
    </div>
  );
}

export default ChatComponent;