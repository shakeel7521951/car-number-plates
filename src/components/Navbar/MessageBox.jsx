import { useState, useRef, useEffect } from 'react';
import { IoMdMail } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client'; // Import Socket.IO client
import { useSelector } from 'react-redux';
import {
  useDeleteNotificationMutation,
  useGetNotificationQuery,
} from '../../Redux/messageRoute/messageApi';
import { GoDotFill } from 'react-icons/go';
import { toast } from 'react-toastify';
import { FaBell } from 'react-icons/fa';
import { baseUrl } from '../../BaseUrl';

const MessageBox = () => {
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [liveNotification, setLiveNotifications] = useState('');
  const messageBoxRef = useRef(null);
  const { profile } = useSelector((state) => state.user);
  const [deleteNotification] = useDeleteNotificationMutation();
  const { data: notificationsData } = useGetNotificationQuery();
  console.log('notifications data', notificationsData);

  useEffect(() => {
    const socket = io('https://backend.lusailnumbers.com/api/api/v1', {
      //change back baseurl
      transports: ['websocket', 'polling'], // Ensure WebSocket is being used
      withCredentials: true,
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('notification', (notification) => {
      console.log('Received notification:', notification);
      setLiveNotifications(notification);
      setNotifications((prev) => [...prev, notification]);
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Combine live notifications with the fetched notifications
  const combinedNotifications = [
    ...(notificationsData?.notifications || []),
    ...notifications,
  ];

  // Use effect to trigger toast notification
  useEffect(() => {
    if (liveNotification && profile?.email !== liveNotification?.senderEmail) {
      toast.success(
        `You received a message from ${liveNotification?.senderName}`
      );
    }
  }, [liveNotification, profile?.name]);

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

  const handleNotification = async (id) => {
    try {
      const res = await deleteNotification(id).unwrap();
      console.log(res?.message);

      // Update the state to remove the deleted notification
      setNotifications((prev) =>
        prev.filter(
          (notification) =>
            notification?.buyerId !== id && notification?.sellerId !== id
        )
      );
    } catch (error) {
      console.log(error?.message);
    }
  };
  return (
    <div className='relative' ref={messageBoxRef}>
      <div className='relative'>
        <FaBell
          size='34px'
          onClick={() => setIsMessageDialogOpen(!isMessageDialogOpen)}
          className='cursor-pointer'
        />
        {combinedNotifications?.length > 0 && (
          <span className='absolute -top-2 -right-2'>
            <GoDotFill className='w-full h-full color-[#FFD200]' />
          </span>
        )}
      </div>

      {isMessageDialogOpen && (
        <div className='absolute top-12 right-0 z-40 bg-white shadow-lg p-4 rounded-md w-60 max-h-80 overflow-y-auto'>
          {combinedNotifications.length <= 0 ? (
            <h3 className='font-semibold'>No message yet</h3>
          ) : (
            <h3 className='font-semibold'>Messages received</h3>
          )}
          <div className='space-y-2'>
            {/* Render combined notifications */}
            {combinedNotifications.map(
              (notification, index) =>
                profile?.email !== notification?.senderEmail && ( // Check if profile name is not equal to sender's name
                  <Link
                    key={index}
                    to={
                      profile?.role === 'seller'
                        ? `/chat?buyerId=${notification?.buyerId}`
                        : `/chat?sellerId=${notification?.sellerId}`
                    }
                    className='flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100'
                    onClick={() =>
                      handleNotification(
                        profile?.role === 'seller'
                          ? notification?.buyerId
                          : notification?.sellerId
                      )
                    }
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
                        {notification?.message?.slice(0, 20)}...{' '}
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
