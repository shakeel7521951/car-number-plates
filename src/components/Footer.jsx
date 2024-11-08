import React from 'react';

const Footer = () => {
  return (
    <footer className=' text-white py-8    max-w-[90vw] mx-auto'>
      <div className='container mx-auto border-t border-gray-600 pt-4'>
        {/* First row with sections */}
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-8'>
          {/* Resources section */}
          <div>
            <h3 className='text-lg  font-bold mb-4'>Resources</h3>
            <ul>
              <li>
                <a href='#' className='hover:text-[#dad6d6] transition-all '>
                  Documentation
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-[#dad6d6] transition-all '>
                  API
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-[#dad6d6] transition-all '>
                  Support
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-[#dad6d6] transition-all '>
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          {/* Help section */}
          <div>
            <h3 className='text-lg font-bold mb-4 '>Help</h3>
            <ul>
              <li>
                <a href='#' className='hover:text-[#dad6d6] transition-all '>
                  Customer Service
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-[#dad6d6] transition-all '>
                  Contact Us
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-[#dad6d6] transition-all '>
                  Order Tracking
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-[#dad6d6] transition-all '>
                  Return Policy
                </a>
              </li>
            </ul>
          </div>
          {/* Company section */}
          <div>
            <h3 className='text-lg font-bold mb-4 '>Company</h3>
            <ul>
              <li>
                <a href='#' className='hover:text-[#dad6d6] transition-all '>
                  About Us
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-[#dad6d6] transition-all '>
                  Careers
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-[#dad6d6] transition-all '>
                  Press
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-[#dad6d6] transition-all '>
                  Blog
                </a>
              </li>
            </ul>
          </div>
          {/* Promotion and Discount section */}
          <div>
            <h3 className='text-lg font-bold  mb-4'>Promotion & Discount</h3>
            <ul>
              <li>
                <a href='#' className='hover:text-[#3b3939] transition-all '>
                  Sign Up for Deals
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-[#dad6d6] transition-all '>
                  Student Discounts
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-[#dad6d6]  transition-all '>
                  Referral Program
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-[#343333] transition-all '>
                  Seasonal Offers
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom row for copyright */}
        <div className='flex justify-between items-center mt-8 border-t border-gray-600 pt-4'>
          <p className='text-sm '>© 2024 All rights reserved</p>
          <div>
            <a
              href='#'
              className='hover:text-[#dad6d6] transition-all  text-sm'
            >
              Privacy Policy
            </a>
            <span className='mx-2 '>|</span>
            <a
              href='#'
              className='hover:text-[#dad6d6] transition-all  text-sm'
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
