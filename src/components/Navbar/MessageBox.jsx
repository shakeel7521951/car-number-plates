import { useState, useRef, useEffect } from 'react';
import person from '../../assets/person1.jpeg';
import { IoMdMail } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client'; // Import Socket.IO client
import { useSelector } from 'react-redux';
import { useGetNotificationQuery } from '../../Redux/messageRoute/messageApi';

const MessageBox = () => {
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const messageBoxRef = useRef(null);
  const { profile } = useSelector((state) => state.user);
  console.log('profiile', profile);
  // if(profile?._id === )
  const {
    data: notificationsData,
    error,
    isLoading,
  } = useGetNotificationQuery();

  // console.log(
  //   'outside data',
  //   notificationsData?.notifications[0]?.message?.buyerId
  // );
  // Establish socket connection on component mount
  useEffect(() => {
    // Assuming your backend is running at 'http://localhost:5000'
    const socket = io('http://localhost:5000');
    // console.log('get notifgication query', notificationsData);
    // Listen for new notifications from the server
    socket.on('notification', (notification) => {
      // console.log('New Notification:', notification); // Log notification data to console
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
    });

    // Clean up the socket connection on component unmount
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

  // if (profile?._id === notifications?.userId) {
  //   // console.log('mathc');
  //   setNotificationCount(1);
  // }

  return (
    <div className='relative' ref={messageBoxRef}>
      {/* Message Icon, clicking toggles the message dialog */}
      <div className='relative'>
        <IoMdMail
          size='40px'
          onClick={() => setIsMessageDialogOpen(!isMessageDialogOpen)}
          className='cursor-pointer'
        />
        <span>{notificationsData?.notifications?.length}</span>
      </div>

      {/* Dropdown/Message Dialog */}
      {isMessageDialogOpen && (
        <div className='absolute top-12 right-0 z-40 bg-white shadow-lg p-4 rounded-md w-60'>
          <h3 className='font-semibold'>Messages received</h3>
          <div className='space-y-2'>
            {/* Render notifications */}
            {notificationsData?.notifications?.map((notification, index) => (
              <Link
                key={index}
                to={`/chat?sellerId=${notification?.userId}&buyerId=${notificationsData?.notifications[0]?.message?.buyerId}`}
              >
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
