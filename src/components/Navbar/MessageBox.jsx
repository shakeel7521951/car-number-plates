import { useState, useRef, useEffect } from 'react';
import { IoMdMail } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client'; // Import Socket.IO client
import { useSelector } from 'react-redux';
import { useGetNotificationQuery } from '../../Redux/messageRoute/messageApi';

const MessageBox = () => {
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  // const [notificationCount, setNotificationCount] = useState(0);
  const messageBoxRef = useRef(null);
  const { profile } = useSelector((state) => state.user);

  const { data: notificationsData } = useGetNotificationQuery();
  console.log('notifications data', notificationsData?.notifications?.[0]);

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('notification', (notification) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
        <span>{notificationsData?.notifications?.length}</span>
      </div>

      {isMessageDialogOpen && (
        <div className='absolute top-12 right-0 z-40 bg-white shadow-lg p-4 rounded-md w-60'>
          <h3 className='font-semibold'>Messages received</h3>
          <div className='space-y-2'>
            {/* Render notifications */}
            {notificationsData?.notifications?.map((notification, index) => (
              <Link
                key={index}
                to={
                  profile?.role === 'seller'
                    ? `/chat?buyerId=${notification?.buyerId}`
                    : `/chat?sellerId=${notification?.sellerId}`
                }
              >
                {console.log(
                  'butersdklfahsdguhdiewnkvjher',
                  notification?.buyerId
                )}
                <h1>You recieved message</h1>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBox;
