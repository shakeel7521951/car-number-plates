import { useState } from 'react';
import image from '../assets/CarUpdate.png';

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmNewPassword } = formData;

    // Validate that the new password and confirm password match
    if (newPassword !== confirmNewPassword) {
      alert("New password and confirm password don't match");
      return;
    }

    // Make API call to update the password (replace with your actual API endpoint)
  };

  return (
    <section className='w-[90vw] mx-auto mt-12 flex justify-center items-center min-h-screen'>
      <div className='w-full bg-white text-black rounded-lg shadow-lg p-4 md:p-8 flex flex-col md:flex-row items-center md:items-start'>
        {/* Image Section: Visible on large screens */}
        <div className='hidden md:block w-1/2 p-4'>
          <img
            src={image}
            alt='Car Update Password'
            className='w-full h-full object-cover rounded-lg'
          />
        </div>

        {/* Form Section */}
        <div className='w-full md:w-1/2 p-4 lg:h-[600px] flex items-center justify-center flex-col'>
          <div className='w-full max-w-md'>
            <h2 className='text-2xl font-semibold mb-4 text-center'>
              Update Password
            </h2>
            <form className='space-y-4' onSubmit={handleSubmit}>
              {/* Current Password */}
              <div>
                <input
                  type='password'
                  name='currentPassword'
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                  placeholder='Enter your current password'
                  required
                />
              </div>

              {/* New Password */}
              <div>
                <input
                  type='password'
                  name='newPassword'
                  value={formData.newPassword}
                  onChange={handleChange}
                  className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                  placeholder='Enter a new password'
                  required
                />
              </div>

              {/* Confirm New Password */}
              <div>
                <input
                  type='password'
                  name='confirmNewPassword'
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                  placeholder='Confirm your new password'
                  required
                />
              </div>

              <button
                type='submit'
                className='w-full bg-[#050c2b] text-white p-2 rounded-md hover:bg-[#090d1d] transition-colors mt-4'
              >
                Update Password
              </button>
            </form>

            {isPasswordUpdated && (
              <div className='text-green-500 mt-4 text-center'>
                Your password has been updated successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdatePassword;