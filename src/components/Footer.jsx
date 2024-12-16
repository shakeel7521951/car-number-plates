import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  const { language } = useSelector((state) => state.language);

  const footerSections = [
    {
      title: { eng: "Resources", arabic: "الموارد" },
      items: [
        { eng: "Support", arabic: "الدعم", link: "/faqs" },
        { eng: "FAQ", arabic: "الأسئلة الشائعة", link: "/faqs" },
      ],
    },
    {
      title: { eng: "Help", arabic: "المساعدة" },
      items: [
        { eng: "Inbox", arabic: "خدمة العملاء", link: "/chat" },
        {
          eng: "Contact Us",
          arabic: "اتصل بنا",
          link: "mailto:info@lusailnumers.com",
        },
      ],
    },
    {
      title: { eng: "Company", arabic: "الشركة" },
      items: [
        { eng: "Home", arabic: "معلومات عنا", link: "/" },
        { eng: "Sign Up", arabic: "التسجيل", link: "/login" },
        { eng: "Explore", arabic: "اكتشف", link: "/explore" },
      ],
    },
    {
      title: { eng: "User", arabic: "المستخدم" },
      items: [
        { eng: "Sign Up", arabic: "اشترك", link: "/login" },
        { eng: "Profile", arabic: "الملف الشخصي", link: "/dashboard" },
        { eng: "Post Template", arabic: "إنشاء قالب", link: "/createPlate" },
      ],
    },
  ];

  return (
    <footer
      className={`text-white py-8 max-w-[90vw] mx-auto ${
        language === "arabic" ? "text-right" : "text-left"
      }`}
    >
      <div className="container pt-4 mx-auto border-t border-gray-600">
        {/* First row with sections */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="mb-4 text-lg font-bold">
                {section?.title[language]}
              </h3>
              <ul>
                {section?.items?.map((item, idx) => (
                  <li key={idx}>
                    {item.link.startsWith("mailto:") ? (
                      <a
                        href={item.link}
                        className="hover:text-[#dad6d6] transition-all"
                      >
                        {item[language]}
                      </a>
                    ) : (
                      <Link
                        to={item.link}
                        className="hover:text-[#dad6d6] transition-all"
                      >
                        {item[language]}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer bottom row */}
        <div className="flex items-center justify-between pt-4 mt-8 border-t border-gray-600">
          <p className="text-sm">
            {language === "eng"
              ? "© 2024 All rights reserved"
              : "© 2024 جميع الحقوق محفوظة"}
          </p>
          <div>
            <Link
              to="/privacy-policy"
              className="hover:text-[#dad6d6] transition-all text-sm"
            >
              {language === "eng" ? "Privacy Policy" : "سياسة الخصوصية"}
            </Link>
            <span className="mx-2">|</span>
            <Link
              to="/terms-of-service"
              className="hover:text-[#dad6d6] transition-all text-sm"
            >
              {language === "eng" ? "Terms of Service" : "شروط الخدمة"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
