import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useGetMessageQuery,
  useSendMessageMutation,
} from '../Redux/messageRoute/messageApi';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

// Message component to display each message
const Message = ({ message, isOwnMessage }) => {
  const formattedTimestamp = new Date(message.timestamp).toLocaleString();

  return (
    <div
      className={`flex w-full py-2 px-4 ${
        isOwnMessage ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`max-w-xs md:max-w-sm lg:max-w-md rounded-lg p-4 shadow-md ${
          isOwnMessage
            ? 'bg-blue-600 text-white self-end'
            : 'bg-gray-100 text-gray-800 self-start'
        }`}
      >
        <p className="text-sm break-words">{message.content}</p>
        <span className="block mt-1 text-xs text-right">
          {formattedTimestamp}
        </span>
      </div>
    </div>
  );
};


const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const { profile } = useSelector((state) => state.user);
  const location = useLocation();

  const sellerIdParam = new URLSearchParams(location.search).get('sellerId');
  const buyerIdParam = new URLSearchParams(location.search).get('buyerId');

  const {
    data: initialMessages,
    isLoading,
    isError,
    error,
  } = useGetMessageQuery({
    receiverId: profile?.role === 'seller' ? buyerIdParam : sellerIdParam,
  });

  const [sendMessage] = useSendMessageMutation();

  useEffect(() => {
    // Set initial messages on component mount
    if (initialMessages && initialMessages.length > 0) {
      setMessages(initialMessages);
    }

    socket.on('onMessage', (message) => {
      console.log('Received new message socket:', message);
      setMessages((prevMessages) => [...prevMessages, message]); // Append new message
    });

    return () => {
      socket.off('onMessage');
    };
  }, [initialMessages]);

  console.log('Messages from db', messages);

  // Handle input changes
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle sending a new message
  const handleSendMessage = async (e) => {
    if (e.key === 'Enter' && inputText.trim()) {
      const newMessage = {
        receiverId: profile?.role === 'seller' ? buyerIdParam : sellerIdParam,
        content: inputText,
      };

      try {
        await sendMessage(newMessage).unwrap();

        // Manually append the new message to the state after sending
        // setMessages((prevMessages) => [
        //   ...prevMessages,
        //   { ...newMessage, timestamp: new Date() },
        // ]);

        setInputText('');
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };
console.log("messages final console",messages)
  if (isLoading) return <p>Loading messages...</p>;
  if (isError) return <p>Error loading messages: {error.message}</p>;

  return (
    <div className="flex flex-col max-w-md p-4 mx-auto space-y-3">
      {messages && messages.length > 0 ? (
        messages.map((msg, index) => (
          <Message
            key={index}
            message={msg}
            isOwnMessage={msg?.receiver === profile?._id}
          />
        ))
      ) : (
        <p>No messages yet...</p>
      )}

      <div className="flex mt-4">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleSendMessage}
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
};

export default Chat;
