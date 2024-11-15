import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const navigate = useNavigate();

  // Mock current user data
  const currentUser = {
    name: 'John Doe',
    role: 'Buyer', // default role, update this dynamically in production
  };

  // Form state
  const [name, setName] = useState(currentUser.name);
  const [role, setRole] = useState(currentUser.role);

  const handleUpdate = (e) => {
    e.preventDefault();
    // Implement actual update logic here
    alert(`Profile updated:\nName: ${name}\nRole: ${role}`);
    navigate('/profile'); // Navigate back to profile after saving changes
  };

  return (
    <div className='max-w-3xl mx-auto bg-white shadow-md rounded-md p-6 mt-12'>
      <h2 className='text-2xl font-bold mb-4'>Update Profile</h2>
      <form onSubmit={handleUpdate}>
        <div className='mb-4'>
          <label className='block text-gray-700'>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full px-4 py-2  rounded border border-black'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className='w-full px-4 py-2 border rounded border-black'
            required
          >
            <option value='Buyer'>Buyer</option>
            <option value='Seller'>Seller</option>
          </select>
        </div>
        <div className='flex justify-between flex-wrap'>
          <button type='submit' className='px-4 py-2 animated-button'>
            <span className='button-content '>Save Changes</span>
          </button>

          <div className='animated-button px-4 py-2 '>
            <Link to={'/update-password'} className='button-content '>
              Update Password
            </Link>
          </div>

          <Link
            to={'/profile'}
            type='button'
            className='px-4 py-2 animated-button'
          >
            <span className='button-content '> Cancel</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
