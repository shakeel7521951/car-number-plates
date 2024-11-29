import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
  const { language } = useSelector((state) => state.language);

  const footerSections = [
    {
      title: { eng: 'Resources', arabic: 'الموارد' },
      items: [
        { eng: 'Documentation', arabic: 'التوثيق', link: '#' },
        { eng: 'API', arabic: 'واجهة برمجة التطبيقات', link: '#' },
        { eng: 'Support', arabic: 'الدعم', link: '#' },
        { eng: 'FAQ', arabic: 'الأسئلة الشائعة', link: '#' },
      ],
    },
    {
      title: { eng: 'Help', arabic: 'المساعدة' },
      items: [
        { eng: 'Customer Service', arabic: 'خدمة العملاء', link: '#' },
        { eng: 'Contact Us', arabic: 'اتصل بنا', link: '#' },
        { eng: 'Order Tracking', arabic: 'تتبع الطلب', link: '#' },
        { eng: 'Return Policy', arabic: 'سياسة الإرجاع', link: '#' },
      ],
    },
    {
      title: { eng: 'Company', arabic: 'الشركة' },
      items: [
        { eng: 'About Us', arabic: 'معلومات عنا', link: '#' },
        { eng: 'Careers', arabic: 'الوظائف', link: '#' },
        { eng: 'Press', arabic: 'الصحافة', link: '#' },
        { eng: 'Blog', arabic: 'المدونة', link: '#' },
      ],
    },
    {
      title: { eng: 'Promotion & Discount', arabic: 'العروض والخصومات' },
      items: [
        {
          eng: 'Sign Up for Deals',
          arabic: 'اشترك للحصول على العروض',
          link: '#',
        },
        { eng: 'Student Discounts', arabic: 'خصومات الطلاب', link: '#' },
        { eng: 'Referral Program', arabic: 'برنامج الإحالة', link: '#' },
        { eng: 'Seasonal Offers', arabic: 'العروض الموسمية', link: '#' },
      ],
    },
  ];
  // console.log('first', footerSections[0]?.title[language]);
  return (
    <footer
      className={`text-white py-8 max-w-[90vw] mx-auto ${
        language === 'arabic' ? 'text-right' : 'text-left'
      }`}
    >
      <div className='container mx-auto border-t border-gray-600 pt-4'>
        {/* First row with sections */}
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-8'>
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className='text-lg font-bold mb-4'>
                {section?.title[language]}
              </h3>
              <ul>
                {section?.items?.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.link}
                      className='hover:text-[#dad6d6] transition-all'
                    >
                      {item[language]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer bottom row */}
        <div className='flex justify-between items-center mt-8 border-t border-gray-600 pt-4'>
          <p className='text-sm'>
            {language === 'eng'
              ? '© 2024 All rights reserved'
              : '© 2024 جميع الحقوق محفوظة'}
          </p>
          <div>
            <a href='#' className='hover:text-[#dad6d6] transition-all text-sm'>
              {language === 'eng' ? 'Privacy Policay' : 'سياسة الخصوصية'}
            </a>
            <span className='mx-2'>|</span>
            <a href='#' className='hover:text-[#dad6d6] transition-all text-sm'>
              {language === 'eng' ? 'Terms of Service' : 'شروط الخدمة'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
