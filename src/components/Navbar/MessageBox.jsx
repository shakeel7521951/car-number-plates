import { useState, useRef, useEffect } from 'react';
import { IoMdMail } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client'; // Import Socket.IO client
import { useSelector } from 'react-redux';
import { useGetNotificationQuery } from '../../Redux/messageRoute/messageApi';
import { GoDotFill } from 'react-icons/go';

const MessageBox = () => {
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  // const [notificationCount, setNotificationCount] = useState(0);
  const messageBoxRef = useRef(null);
  const { profile } = useSelector((state) => state.user);

  const { data: notificationsData } = useGetNotificationQuery();
  console.log('notifications data', notificationsData);
  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('notification', (notification) => {
      console.log('New notification from socket:', notification);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log('notififcation from socket ', notifications);
  }, [notifications]);
  // Close the dropdown when clicked outside
  const handleClickOutside = (e) => {
    if (messageBoxRef.current && !messageBoxRef.current.contains(e.target)) {
      setIsMessageDialogOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative' ref={messageBoxRef}>
      <div className='relative'>
        <IoMdMail
          size='40px'
          onClick={() => setIsMessageDialogOpen(!isMessageDialogOpen)}
          className='cursor-pointer'
        />
        <span className='absolute -top-2  -right-2 '>
          <GoDotFill className='w-full h-full color-[#FFD200]' />
        </span>
      </div>

      {isMessageDialogOpen && (
        <div className='absolute top-12 right-0 z-40 bg-white shadow-lg p-4 rounded-md w-60'>
          <h3 className='font-semibold'>Messages received</h3>
          <div className='space-y-2'>
            {/* Render notifications */}
            {notificationsData?.notifications?.map(
              (notification, index) =>
                profile?.name !== notification?.senderName && ( // Check if profile name is not equal to sender's name
                  <Link
                    key={index}
                    to={
                      profile?.role === 'seller'
                        ? `/chat?buyerId=${notification?.buyerId}`
                        : `/chat?sellerId=${notification?.sellerId}`
                    }
                    className='flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100'
                  >
                    {/* Notification item */}
                    <img
                      src={notification?.senderImage}
                      alt={notification?.senderName}
                      className='w-10 h-10 rounded-full object-cover'
                    />
                    <div className='flex flex-col'>
                      <span className='font-semibold'>
                        {notification?.senderName}
                      </span>
                      <span className='text-sm text-gray-500'>
                        {notification?.message}
                      </span>
                    </div>
                  </Link>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBox;
