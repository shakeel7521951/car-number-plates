import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
  const { language } = useSelector((state) => state.language);

  return (
    <footer
      className={`text-white py-8 max-w-[90vw] mx-auto ${
        language === 'ar' ? 'text-right' : 'text-left'
      }`}
    >
      <div className="container mx-auto border-t border-gray-600 pt-4">
        {/* First row with sections */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Resources section */}
          <div>
            <h3 className="text-lg font-bold mb-4">
              {language === 'eng' ? 'Resources' : 'الموارد'}
            </h3>
            <ul>
              <li>
                <a href="#" className="hover:text-[#dad6d6] transition-all">
                  {language === 'eng' ? 'Documentation' : 'التوثيق'}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#dad6d6] transition-all">
                  {language === 'eng' ? 'API' : 'واجهة برمجة التطبيقات'}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#dad6d6] transition-all">
                  {language === 'eng' ? 'Support' : 'الدعم'}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#dad6d6] transition-all">
                  {language === 'eng' ? 'FAQ' : 'الأسئلة الشائعة'}
                </a>
              </li>
            </ul>
          </div>
          {/* Help section */}
          <div>
            <h3 className="text-lg font-bold mb-4">
              {language === 'eng' ? 'Help' : 'المساعدة'}
            </h3>
            <ul>
              <li>
                <a href="#" className="hover:text-[#dad6d6] transition-all">
                  {language === 'eng' ? 'Customer Service' : 'خدمة العملاء'}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#dad6d6] transition-all">
                  {language === 'eng' ? 'Contact Us' : 'اتصل بنا'}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#dad6d6] transition-all">
                  {language === 'eng' ? 'Order Tracking' : 'تتبع الطلب'}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#dad6d6] transition-all">
                  {language === 'eng' ? 'Return Policy' : 'سياسة الإرجاع'}
                </a>
              </li>
            </ul>
          </div>
          {/* Company section */}
          <div>
            <h3 className="text-lg font-bold mb-4">
              {language === 'eng' ? 'Company' : 'الشركة'}
            </h3>
            <ul>
              <li>
                <a href="#" className="hover:text-[#dad6d6] transition-all">
                  {language === 'eng' ? 'About Us' : 'معلومات عنا'}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#dad6d6] transition-all">
                  {language === 'eng' ? 'Careers' : 'الوظائف'}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#dad6d6] transition-all">
                  {language === 'eng' ? 'Press' : 'الصحافة'}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#dad6d6] transition-all">
                  {language === 'eng' ? 'Blog' : 'المدونة'}
                </a>
              </li>
            </ul>
          </div>
          {/* Promotion section */}
          <div>
            <h3 className="text-lg font-bold mb-4">
              {language === 'eng' ? 'Promotion & Discount' : 'العروض والخصومات'}
            </h3>
            <ul>
              <li>
                <a href="#" className="hover:text-[#dad6d6] transition-all">
                  {language === 'eng'
                    ? 'Sign Up for Deals'
                    : 'اشترك للحصول على العروض'}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#dad6d6] transition-all">
                  {language === 'eng'
                    ? 'Student Discounts'
                    : 'خصومات الطلاب'}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#dad6d6] transition-all">
                  {language === 'eng'
                    ? 'Referral Program'
                    : 'برنامج الإحالة'}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#dad6d6] transition-all">
                  {language === 'eng'
                    ? 'Seasonal Offers'
                    : 'العروض الموسمية'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom row */}
        <div className="flex justify-between items-center mt-8 border-t border-gray-600 pt-4">
          <p className="text-sm">
            {language === 'eng'
              ? '© 2024 All rights reserved'
              : '© 2024 جميع الحقوق محفوظة'}
          </p>
          <div>
            <a href="#" className="hover:text-[#dad6d6] transition-all text-sm">
              {language === 'eng' ? 'Privacy Policy' : 'سياسة الخصوصية'}
            </a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-[#dad6d6] transition-all text-sm">
              {language === 'eng' ? 'Terms of Service' : 'شروط الخدمة'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
