import React, { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import car1 from '../assets/CarForgot.png';

function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);

  const chatData = [
    {
      id: 1,
      name: 'Haroon Rasheed',
      message: 'You have a new message',
      time: '9:45 AM',
    },
    { id: 2, name: 'Sara Ali', message: "Let's meet today", time: '10:15 AM' },
    {
      id: 3,
      name: 'John Doe',
      message: 'Are you available?',
      time: '11:30 AM',
    },
    {
      id: 4,
      name: 'Anna Smith',
      message: 'Check out the new update',
      time: '12:00 PM',
    },
    {
      id: 5,
      name: 'Michael Johnson',
      message: 'Meeting postponed',
      time: '1:45 PM',
    },
    {
      id: 6,
      name: 'Emily White',
      message: 'Thanks for your help',
      time: '2:30 PM',
    },
  ];

  const replies = {
    1: 'Hello Haroon! Thanks for reaching out.',
    2: "Sure, Sara. Let's discuss the details.",

    3: "Yes, John. I'm available.",
    4: "Thank you, Anna! I'll check it out.",
    5: 'Noted, Michael. Thanks for letting me know.',
    6: "You're welcome, Emily!",
  };

  return (
    <div className='flex flex-col md:flex-row justify-center gap-3 p-2'>
      {/* Sidebar */}
      <div className='w-full md:w-[23%] overflow-y-auto'>
        <p className='text-white text-lg font-medium mb-2'>Messages</p>
        <input
          type='text'
          className='bg-[#757679] rounded-lg w-full md:w-[200px] py-2 px-2 outline-none'
          placeholder='Search'
        />
        <div className='h-[80vh] w-full bg-[#757679] rounded-xl my-3 p-1 py-3 overflow-y-auto'>
          {chatData.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`flex justify-between items-center hover:bg-[#c0da8f] rounded-xl py-3 px-1 cursor-pointer ${
                selectedChat === chat.id ? 'bg-[#c0da8f]' : ''
              }`}
            >
              <div className='flex gap-2 items-center'>
                <img
                  src={car1}
                  alt='profile'
                  className='h-[40px] w-[40px] rounded-full'
                />
                <div>
                  <p className='font-medium'>{chat.name}</p>
                  <p className='text-sm'>{chat.message}</p>
                </div>
              </div>
              <p className='text-sm'>{chat.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Box */}
      <div className='w-full md:w-[73%]'>
        <div className='flex justify-between items-center px-2 mt-5 mb-3 md:mt-10 md:mb-5'>
          <p className='text-white text-lg font-medium'>
            {selectedChat
              ? chatData.find((chat) => chat.id === selectedChat).name
              : 'Select a chat'}
          </p>
          <div className='h-[30px] w-[30px] rounded-full bg-[#4e4547] flex justify-center items-center text-white'>
            <IoMenu />
          </div>
        </div>
        <div className='h-[80vh] w-full bg-white rounded-xl p-4'>
          <p>{selectedChat ? replies[selectedChat] : 'No message selected.'}</p>
        </div>
      </div>
    </div>
  );
}

export default Chat;
