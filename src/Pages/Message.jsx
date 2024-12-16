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
import { IoSend } from 'react-icons/io5';

const socket = io(baseUrl);

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
  const [users, setUsers] = useState([]);
  const { profile } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  const sellerIdParam = new URLSearchParams(location.search).get('sellerId');
  const buyerIdParam = new URLSearchParams(location.search).get('buyerId');
  const activeUserId = profile?.role === 'buyer' ? sellerIdParam : buyerIdParam;
  const isChatOpen = sellerIdParam || buyerIdParam;

  const {
    data: initialMessages,
    isLoading: isMessagesLoading,
    isError: isMessagesError,
    error: messagesError,
  } = useGetMessageQuery(
    { receiverId: profile?.role === 'seller' ? buyerIdParam : sellerIdParam },
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
    if (initialMessages && initialMessages.length > 0) {
      setMessages(initialMessages);
    }

    socket.on('onMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);

      // Update the users list with the latest message
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          const userId =
            profile?.role === 'buyer' ? user?.seller?._id : user?.buyer?._id;

          if (userId === message.sender || userId === message.receiver) {
            return {
              ...user,
              lastMessage: message.content,
            };
          }
          return user;
        })
      );
    });

    return () => {
      socket.off('onMessage');
    };
  }, [initialMessages, profile?.role]);

  useEffect(() => {
    if (usersData && usersData.length > 0) {
      setUsers(usersData);
    }
  }, [usersData]);

  useEffect(() => {
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
    if ((e.key === 'Enter' && inputText.trim()) || e.type === 'click') {
      const newMessage = {
        receiverId: profile?.role === 'seller' ? buyerIdParam : sellerIdParam,
        content: inputText,
      };

      debounceSendMessage(newMessage);

      // Update users' last message synchronously when a new message is sent
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          const userId =
            profile?.role === 'buyer' ? user?.seller?._id : user?.buyer?._id;

          // Ensure the last message is updated for the correct user
          if (userId === newMessage.receiverId) {
            return {
              ...user,
              lastMessage: newMessage.content,
            };
          }

          return user;
        })
      );
    }
  };

  const handleUserClick = (userId) => {
    const param =
      profile?.role === 'seller' ? `buyerId=${userId}` : `sellerId=${userId}`;
    navigate(`/chat?${param}`);
  };

  return (
    <div className='flex flex-col md:flex-row h-[78vh]'>
      {/* Sidebar */}
      <div className='md:w-1/3 w-full bg-gray-50 border-r border-gray-200 h-[40vh] sm:h-auto  p-4'>
        <h2 className='text-lg md:text-xl font-semibold mb-4'>Users</h2>
        {isUsersLoading && <p>Loading users...</p>}
        {isUsersError && <p>Error loading users: {usersError.message}</p>}
        <ul className='space-y-3'>
          {users.length > 0 ? (
            users?.map((user) => {
              const userId =
                profile?.role === 'buyer'
                  ? user?.seller?._id
                  : user?.buyer?._id;
              const isActive = userId === activeUserId; // Check if user is active
              return (
                <li
                  key={userId}
                  className={`flex items-center p-3 bg-white shadow rounded-lg cursor-pointer hover:bg-gray-100 ${
                    isActive ? 'bg-blue-100 border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => handleUserClick(userId)}
                >
                  <img
                    className='w-8 h-8 md:w-10 md:h-10 rounded-full mr-3'
                    src={
                      profile?.role === 'buyer'
                        ? user?.seller?.imageUrl
                        : user?.buyer?.imageUrl
                    }
                    alt='User'
                  />
                  <div>
                    <p className='font-semibold text-sm md:text-base'>
                      {profile?.role === 'buyer'
                        ? user?.seller?.name
                        : user?.buyer?.name}
                    </p>
                    <p className='text-xs md:text-sm text-gray-600'>
                      {`${user?.lastMessage?.slice(0, 10)}...`}
                    </p>
                  </div>
                </li>
              );
            })
          ) : (
            <div className='flex flex-col items-center justify-center h-full text-center text-gray-600'>
              <h1 className='text-md md:text-lg font-bold text-gray-800'>
                Your chats will appear here
              </h1>
              <p className='text-xs md:text-sm'>
                Connect with a user to start a conversation.
              </p>
            </div>
          )}
        </ul>
      </div>

      {/* Chat Window */}
      <div className='flex-1 flex flex-col h-full'>
        {isMessagesLoading && <p>Loading messages...</p>}
        {isMessagesError && (
          <p>Error loading messages: {messagesError.message}</p>
        )}
        {!isChatOpen && (
          <div className='flex items-center justify-center h-full text-gray-500 text-sm md:text-base'>
            <p>Select a user to start chatting.</p>
          </div>
        )}
        {isChatOpen && (
          <>
            <div className='flex-1 overflow-y-auto p-3 md:p-4 space-y-2 md:space-y-3'>
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

            <div className='sticky bottom-0 bg-white p-3 md:p-4 shadow-md flex items-center'>
              <input
                type='text'
                className='w-full p-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:outline-none'
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleSendMessage}
                placeholder='Type a message...'
              />
              <button
                onClick={handleSendMessage}
                className='ml-2 p-2 md:p-3 bg-[#c19846] text-white rounded-full shadow-md hover:scale-105 transition-all focus:outline-none flex items-center justify-center'
              >
                <IoSend size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
