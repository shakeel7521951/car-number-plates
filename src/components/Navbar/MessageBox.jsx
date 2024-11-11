import { useState } from 'react';
import person from '../../assets/person1.jpeg';
import { IoMdMail } from 'react-icons/io';
import { Link } from 'react-router-dom';

const MessageBox = () => {
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='relative'>
      {/* Message Icon with Notification Badge */}
      <div className='relative'>
        <IoMdMail
          size='40px'
          onClick={() => setIsMessageDialogOpen(!isMessageDialogOpen)}
          className='cursor-pointer'
        />
        <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs'>
          {messages.length}
        </span>
      </div>

      {/* Message Dialog */}
      {isMessageDialogOpen && (
        <div className='absolute top-full right-0 mt-2 bg-white p-4 rounded-lg shadow-lg w-72 z-20'>
          {/* Header with Search */}
          <div className='flex flex-col space-y-2'>
            <div className='flex justify-between items-center'>
              <h2 className='text-lg font-bold'>Messages</h2>
              <button
                onClick={() => setIsMessageDialogOpen(false)}
                className='text-gray-500'
              >
                ✕
              </button>
            </div>
            <input
              type='text'
              placeholder='Search messages...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200'
            />
          </div>

          {/* Message List */}
          <ul className='mt-4 max-h-64 overflow-y-auto'>
            {filteredMessages.map((msg) => (
              <Link
                to={'/message'}
                key={msg.id}
                className='flex items-center mb-4'
              >
                <img
                  src={msg.avatar}
                  alt={msg.name}
                  className='w-8 h-8 rounded-full mr-3'
                />
                <div>
                  <h3 className='font-semibold'>{msg.name}</h3>
                  <p className='text-sm text-gray-600'>{msg.message}</p>
                </div>
              </Link>
            ))}
            {filteredMessages.length === 0 && (
              <p className='text-sm text-gray-500'>No messages found.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MessageBox;
