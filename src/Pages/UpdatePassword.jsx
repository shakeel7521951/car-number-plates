import { useState } from 'react';
import image from '../assets/gold.jpg';
import { useUpdatePasswordMutation } from '../Redux/userRoutes/userApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
  const [UpdatePassword, { isLoading }] = useUpdatePasswordMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, password, confirmPassword } = formData;
    console.log(formData);
    if (password !== confirmPassword) {
      toast.error('Password is not Match ');
      return;
    }
    try {
      const res = await UpdatePassword({
        oldPassword,
        password,
        confirmPassword,
      }).unwrap();
      console.log(res);
      toast.success(res?.message);
      navigate('/profile');
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || 'Error while updating password');
    }
  };

  return (
    <section className='w-[90vw] mx-auto mt-12 flex justify-center items-center min-h-screen'>
      <div className='w-full bg-white text-black rounded-lg shadow-lg p-4 md:p-8 flex flex-col md:flex-row items-center justify-center'>
        {/* Image Section: Visible on large screens */}
        <div className='hidden md:block w-1/2 p-4 h-[100vh]'>
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
                  name='oldPassword'
                  value={formData.oldPassword}
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
                  name='password'
                  value={formData.password}
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
                  name='confirmPassword'
                  value={formData.confirmPassword}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdatePassword;
