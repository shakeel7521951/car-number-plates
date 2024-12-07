import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  useGetMessageQuery,
  useSendMessageMutation,
} from '../Redux/messageRoute/messageApi';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

// Message component to display each message
const Message = ({ message, isOwnMessage }) => {
  const { profile } = useSelector((state) => state.user); // Assuming profile is in user slice of Redux
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
        <p className='text-sm break-words'>{message.content}</p>
        <span className='block text-xs text-gray-500 mt-1 text-right'>
          {message.timestamp}
        </span>
      </div>
    </div>
  );
};

const Chat = ({ senderId, receiverId }) => {
  const [inputText, setInputText] = useState('');
  const { profile } = useSelector((state) => state.user); // Assuming profile is in user slice of Redux
  const location = useLocation();
  console.log(location?.state?.seller);
  const sellerId = location?.state?.seller;
  console.log('sellerid', sellerId);
  const {
    data: messages,
    isLoading,
    isError,
    error,
  } = useGetMessageQuery({
    senderId: sellerId,
    receiverId: profile?._id,
  });
  const [sendMessage] = useSendMessageMutation();

  // Handle input changes
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle sending a new message
  const handleSendMessage = async (e) => {
    if (e.key === 'Enter' && inputText.trim()) {
      const newMessage = {
        senderId: profile?._id,
        receiverId: sellerId,
        content: inputText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      console.log('new message', newMessage);
      try {
        const res = await sendMessage(newMessage).unwrap(); // Send the message using RTK Query mutation

        setInputText(''); // Clear input after sending
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  // Show loading or error messages
  if (isLoading) return <p>Loading messages...</p>;
  if (isError) return <p>Error loading messages: {error.message}</p>;

  return (
    <div className='flex flex-col space-y-3 p-4 max-w-md mx-auto'>
      {/* Display all messages */}
      {messages && messages.length > 0 ? (
        messages.map((msg, index) => (
          <Message
            key={index}
            message={msg}
            isOwnMessage={msg.sender === senderId}
          />
        ))
      ) : (
        <p>No messages yet...</p>
      )}

      {/* Input field for typing a message */}
      <div className='flex mt-4'>
        <input
          type='text'
          className='flex-1 p-2 border rounded-lg border-gray-300 focus:outline-none'
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleSendMessage} // Handle Enter key press
          placeholder='Type a message...'
        />
      </div>
    </div>
  );
};

export default Chat;
