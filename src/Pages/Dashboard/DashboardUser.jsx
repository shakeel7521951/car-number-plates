import React, { useState } from 'react';
import user_image_1 from '../../assets/person1.jpeg';
import user_image_2 from '../../assets/person2.jpg';
import user_image_3 from '../../assets/person3.jpeg';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

const DashboardUser = () => {
  const [usersData, setUsersData] = useState([
    {
      user_id: 1,
      user_image: user_image_1,
      user_name: 'Malik',
      user_email: 'malik@gmail.com',
    },
    {
      user_id: 2,
      user_image: user_image_2,
      user_name: 'Ali',
      user_email: 'ali@gmail.com',
    },
    {
      user_id: 3,
      user_image: user_image_3,
      user_name: 'Usman',
      user_email: 'usman@gmail.com',
    },
    {
      user_id: 4,
      user_image: user_image_1,
      user_name: 'Hafsa',
      user_email: 'hafsa@gmail.com',
    },
    {
      user_id: 5,
      user_image: user_image_2,
      user_name: 'Sara',
      user_email: 'sara@gmail.com',
    },
    {
      user_id: 6,
      user_image: user_image_3,
      user_name: 'Fatima',
      user_email: 'fatima@gmail.com',
    },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUserName, setEditedUserName] = useState('');
  const [editedUserEmail, setEditedUserEmail] = useState('');
  const [editedUserImage, setEditedUserImage] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Function to open the edit modal
  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditedUserName(user.user_name);
    setEditedUserEmail(user.user_email);
    setEditedUserImage(user.user_image);
    setIsEditModalOpen(true);
  };

  // Function to handle saving edited data
  const handleEditSave = () => {
    const updatedUsers = usersData.map((user) =>
      user.user_id === selectedUser.user_id
        ? {
            ...user,
            user_name: editedUserName,
            user_email: editedUserEmail,
            user_image: editedUserImage,
          }
        : user
    );
    setUsersData(updatedUsers);
    setIsEditModalOpen(false);
  };

  // Function to handle file change for profile picture
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUserImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to open delete confirmation modal
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  // Function to delete the user
  const handleDeleteUser = () => {
    const updatedUsers = usersData.filter(
      (user) => user.user_id !== selectedUser.user_id
    );
    setUsersData(updatedUsers);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className='w-[82%] mx-auto'>
      <h1 className='text-xl font-semibold mb-4'>Users</h1>

      <div className='bg-white rounded-3xl shadow-lg overflow-hidden p-2'>
        {/* Header */}
        <div className='grid grid-cols-5 bg-gray-100 rounded-xl border-[1px] border-black'>
          <div className='p-4 font-medium'>User ID</div>
          <div className='p-4 font-medium'>Picture</div>
          <div className='p-4 font-medium'>Name</div>
          <div className='p-4 font-medium'>Email</div>
          <div className='p-4 font-medium'>Actions</div>
        </div>

        {/* User Rows */}
        <div className='divide-y divide-gray-200'>
          {usersData.map((user) => (
            <div
              key={user.user_id}
              className='grid grid-cols-5 items-center bg-white hover:bg-gray-50'
            >
              <div className='p-4 text-gray-700'>{user.user_id}</div>
              <div className='p-4'>
                <img
                  src={user.user_image}
                  alt={user.user_name}
                  className='w-14 h-14 rounded-lg object-cover'
                />
              </div>
              <div className='p-4 text-gray-700'>{user.user_name}</div>
              <div className='p-4 text-gray-700'>{user.user_email}</div>
              <div className='p-4 flex space-x-4'>
                {/* Edit Button */}
                <button
                  className='text-gray-600 hover:text-gray-800'
                  onClick={() => openEditModal(user)}
                >
                  <FaRegEdit className='w-6 h-7' />
                </button>
                {/* Delete Button */}
                <button
                  className='text-gray-600 hover:text-gray-800'
                  onClick={() => openDeleteModal(user)}
                >
                  <MdDeleteOutline className='w-7 h-7' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <div className='fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-xl shadow-lg w-[400px]'>
            <h2 className='text-lg font-semibold mb-4'>Edit User</h2>
            <div className='mb-4 text-center'>
              <img
                src={editedUserImage}
                alt='Profile'
                className='w-20 h-20 rounded-full object-cover mx-auto mb-4'
              />
              <input type='file' onChange={handleImageChange} />
            </div>
            <div className='mb-4'>
              <label>Name:</label>
              <input
                type='text'
                value={editedUserName}
                onChange={(e) => setEditedUserName(e.target.value)}
                className='w-full border rounded-lg p-2 mt-1'
              />
            </div>
            <div className='mb-4'>
              <label>Email:</label>
              <input
                type='email'
                value={editedUserEmail}
                onChange={(e) => setEditedUserEmail(e.target.value)}
                className='w-full border rounded-lg p-2 mt-1'
              />
            </div>
            <div className='flex justify-end gap-4'>
              <button
                onClick={handleEditSave}
                className='bg-green-500 text-white px-4 py-2 rounded-lg'
              >
                Save
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className='bg-gray-300 px-4 py-2 rounded-lg'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className='fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-xl shadow-lg'>
            <h2 className='text-lg font-semibold mb-4'>
              Are you sure you want to delete?
            </h2>
            <div className='flex justify-end gap-4'>
              <button
                onClick={handleDeleteUser}
                className='bg-red-500 text-white px-4 py-2 rounded-lg'
              >
                Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className='bg-gray-300 px-4 py-2 rounded-lg'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardUser;
