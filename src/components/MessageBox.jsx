import { useState } from 'react';
import person from '../assets/person1.jpeg';
import { IoMdMail } from 'react-icons/io';
const MessageBox = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const messages = [
    { id: 1, name: 'John Doe', message: 'Hey! How are you?', avatar: person },
    {
      id: 2,
      name: 'Jane Smith',
      message: 'Please check the latest updates.',
      avatar: person,
    },
    {
      id: 3,
      name: 'Alice Johnson',
      message: 'Are you joining the meeting?',
      avatar: person,
    },
  ];
  return (
    <div className='relative'>
      <IoMdMail
        size='40px'
        onClick={() => setIsMessageDialogOpen(!isMessageDialogOpen)}
      />
      <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs'>
        {messages.length}
      </span>

      {isMessageDialogOpen && (
        <div className='absolute top-full right-0 mt-2 bg-white p-4 rounded-lg shadow-lg w-72 z-20'>
          <div className='flex justify-between items-center'>
            <h2 className='text-lg font-bold'>Messages</h2>
            <button
              onClick={() => setIsMessageDialogOpen(false)}
              className='text-gray-500'
            >
              ✕
            </button>
          </div>
          <ul className='mt-4'>
            {messages.map((msg) => (
              <li key={msg.id} className='flex items-center mb-4'>
                <img
                  src={msg.avatar}
                  alt={msg.name}
                  className='w-8 h-8 rounded-full mr-3'
                />
                <div>
                  <h3 className='font-semibold'>{msg.name}</h3>
                  <p className='text-sm text-gray-600'>{msg.message}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default MessageBox;
