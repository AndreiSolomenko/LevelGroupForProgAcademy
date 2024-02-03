import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

function ChatComponent() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const userName = useRef('');

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
        messageText: encodeURIComponent(message),
      });

      const url = `https://levelgroup.com.ua/api/send-message?${queryParams.toString()}`;
      // const url = `http://localhost:8080/api/send-message?${queryParams.toString()}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Message sent successfully');

        setMessages([...messages, message]);

        setMessage('');
      } else {
        console.log('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }

    fetchMessages();

  };

  const fetchMessages = async () => {
    try {
      const response = await fetch('https://levelgroup.com.ua/api/get-messages');
      // const response = await fetch('http://localhost:8080/api/get-messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.log('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
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
        <h1>LEVEL GROUP</h1>
        <div className="avatar">
          <img className='chat-img' alt="" />
        </div>
      </div>
      <div className="messages">
        <div className="messages-content">
          {messages ? (
            messages.map((msg, index) => (
              <div className="message" key={index}>
                {msg}
              </div>
            ))
          ) : (
            <p>Loading messages...</p>
          )}
        </div>
      </div>
      <div className="message-box">
        <textarea
          type="text"
          className="message-input"
          placeholder="Type message..."
          value={message}
          onChange={handleInputChange}
        ></textarea>
        <button
          type="submit"
          className="message-submit"
          onClick={handleSendClick}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatComponent;