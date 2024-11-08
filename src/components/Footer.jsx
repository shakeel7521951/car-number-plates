import React from 'react';

const Footer = () => {
  return (
    <footer className=" text-white py-8">
      <div className="container mx-auto border-t border-gray-600 pt-4">
        {/* First row with sections */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Resources section */}
          <div>
            <h3 className="text-lg text-black font-bold mb-4">Resources</h3>
            <ul>
              <li><a href="#" className="hover:text-[#655757] transition-all text-black">Documentation</a></li>
              <li><a href="#" className="hover:text-[#655757] transition-all text-black">API</a></li>
              <li><a href="#" className="hover:text-[#655757] transition-all text-black">Support</a></li>
              <li><a href="#" className="hover:text-[#655757] transition-all text-black">FAQ</a></li>
            </ul>
          </div>
          {/* Help section */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-black">Help</h3>
            <ul>
              <li><a href="#" className="hover:text-[#655757] transition-all text-black">Customer Service</a></li>
              <li><a href="#" className="hover:text-[#655757] transition-all text-black">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#655757] transition-all text-black">Order Tracking</a></li>
              <li><a href="#" className="hover:text-[#655757] transition-all text-black">Return Policy</a></li>
            </ul>
          </div>
          {/* Company section */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-black">Company</h3>
            <ul>
              <li><a href="#" className="hover:text-[#655757] transition-all text-black">About Us</a></li>
              <li><a href="#" className="hover:text-[#655757] transition-all text-black">Careers</a></li>
              <li><a href="#" className="hover:text-[#655757] transition-all text-black">Press</a></li>
              <li><a href="#" className="hover:text-[#655757] transition-all text-black">Blog</a></li>
            </ul>
          </div>
          {/* Promotion and Discount section */}
          <div>
            <h3 className="text-lg font-bold text-black mb-4">Promotion & Discount</h3>
            <ul>
              <li><a href="#" className="hover:text-[#3b3939] transition-all text-black">Sign Up for Deals</a></li>
              <li><a href="#" className="hover:text-[#655757] transition-all text-black">Student Discounts</a></li>
              <li><a href="#" className="hover:text-[#655757]  transition-all text-black">Referral Program</a></li>
              <li><a href="#" className="hover:text-[#343333] transition-all text-black">Seasonal Offers</a></li>
            </ul>
          </div>
        </div>

        {/* Footer bottom row for copyright */}
        <div className="flex justify-between items-center mt-8 border-t border-gray-600 pt-4">
          <p className="text-sm text-black">© 2024 All rights reserved</p>
          <div>
            <a href="#" className="hover:text-[#655757] transition-all text-black text-sm">Privacy Policy</a>
            <span className="mx-2 text-black">|</span>
            <a href="#" className="hover:text-[#655757] transition-all text-black text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
