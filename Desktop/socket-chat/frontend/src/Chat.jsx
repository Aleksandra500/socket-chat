import React, { useEffect, useState, useRef } from 'react';
import socket from './socket';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Funkcija za scroll do poslednje poruke
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Prijem poruka sa servera
    socket.on('chatMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('chatMessage');
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('chatMessage', message); // šalje poruku serveru
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage(); // Enter za slanje
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-4 border border-gray-400 rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">Chat Room</h2>
      
      <div className="h-64 overflow-y-auto border border-gray-300 p-2 mb-4 bg-gray-50 rounded">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            {msg}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
