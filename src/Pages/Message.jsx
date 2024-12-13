import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  useGetMessageQuery,
  useSendMessageMutation,
  useMessageQueryQuery, // Fetch all users for the sidebar
} from '../Redux/messageRoute/messageApi';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { baseUrl } from '../BaseUrl';

const socket = io(baseUrl);

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
        <p className='text-sm break-words'>{message.content}</p>
        <span className='block mt-1 text-xs text-right'>
          {formattedTimestamp}
        </span>
      </div>
    </div>
  );
};

const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]); // State to store users for the sidebar
  const { profile } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  const sellerIdParam = new URLSearchParams(location.search).get('sellerId');
  const buyerIdParam = new URLSearchParams(location.search).get('buyerId');

  const isChatOpen = sellerIdParam || buyerIdParam;
  const {
    data: initialMessages,
    isLoading: isMessagesLoading,
    isError: isMessagesError,
    error: messagesError,
  } = useGetMessageQuery(
    {
      receiverId: profile?.role === 'seller' ? buyerIdParam : sellerIdParam,
    },
    { skip: !isChatOpen }
  );

  const {
    data: usersData,
    isLoading: isUsersLoading,
    isError: isUsersError,
    error: usersError,
  } = useMessageQueryQuery();

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

  useEffect(() => {
    // Fetch and set users for the sidebar
    if (usersData && usersData.length > 0) {
      setUsers(usersData);
    }
  }, [usersData]);

  useEffect(() => {
    // Scroll to the bottom when messages update
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const debounceSendMessage = (newMessage) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      try {
        await sendMessage(newMessage).unwrap();
        setInputText('');
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }, 300); // 300ms debounce delay
  };

  const handleSendMessage = (e) => {
    if (e.key === 'Enter' && inputText.trim()) {
      const newMessage = {
        receiverId: profile?.role === 'seller' ? buyerIdParam : sellerIdParam,
        content: inputText,
      };
      debounceSendMessage(newMessage);
    }
  };

  const handleUserClick = (userId) => {
    // Navigate to the specific chat
    const param =
      profile?.role === 'seller' ? `buyerId=${userId}` : `sellerId=${userId}`;
    navigate(`/chat?${param}`);
  };

  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <div className='w-1/3 bg-gray-50 border-r border-gray-200 h-full p-4'>
        <h2 className='text-xl font-semibold mb-4'>Users</h2>
        {isUsersLoading && <p>Loading users...</p>}
        {isUsersError && <p>Error loading users: {usersError.message}</p>}
        <ul className='space-y-3'>
          {users.map((user) => (
            <li
              key={user.buyer}
              className='flex items-center p-3 bg-white shadow rounded-lg cursor-pointer hover:bg-gray-100'
              onClick={() =>
                handleUserClick(
                  profile?.role === 'buyer'
                    ? user?.seller?._id
                    : user?.buyer?._id
                )
              }
            >
              <img
                className='w-10 h-10 rounded-full mr-3'
                src={
                  profile?.role === 'buyer'
                    ? user?.seller?.imageUrl
                    : user?.buyer?.imageUrl
                }
                alt='User'
              />
              <div>
                <p className='font-semibold'>
                  {profile?.role === 'buyer'
                    ? user?.seller?.name
                    : user?.buyer?.name}
                </p>
                <p className='text-sm text-gray-600'>{user.lastMessage}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className='flex-1 flex flex-col h-full'>
        {isMessagesLoading && <p>Loading messages...</p>}
        {isMessagesError && (
          <p>Error loading messages: {messagesError.message}</p>
        )}
        {!isChatOpen && (
          <div className='flex items-center justify-center h-full text-gray-500'>
            <p>Select a user to start chatting.</p>
          </div>
        )}
        {isChatOpen && (
          <>
            <div className='flex-1 overflow-y-auto p-4 space-y-3'>
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
              <div ref={messagesEndRef} />
            </div>

            <div className='sticky bottom-0 bg-white p-4 shadow-md'>
              <input
                type='text'
                className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none'
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleSendMessage}
                placeholder='Type a message...'
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
