import carImg from '../../assets/CarLogin.png';

const Login = () => {
  return (
    <section className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4'>
      <div className='relative bg-white text-black rounded-lg shadow-lg w-full max-w-3xl p-4 md:p-8 flex flex-col md:flex-row items-center md:items-start'>
        {/* Image Section: Visible on large screens */}
        <div className='hidden md:block w-1/2 p-4'>
          <img
            src={carImg}
            alt='Car Login'
            className='w-full h-full object-cover rounded-lg'
          />
        </div>

        {/* Form Section */}
        <div className='w-full md:w-1/2 p-4'>
          <h2 className='text-2xl font-semibold mb-4 text-center md:text-left'>
            Login
          </h2>
          <form className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Email</label>
              <input
                type='email'
                className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                placeholder='Enter your email'
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Password</label>
              <input
                type='password'
                className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                placeholder='Enter your password'
              />
            </div>
            <button
              type='submit'
              className='w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors'
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
