import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useSelector } from 'react-redux';

const faqsData = {
  english: [
    {
      question: 'Do I need an account to buy or sell number plates?',
      answer: 'Yes, an account is required to buy or sell number plates.',
    },
    {
      question: 'How can I list my number plate for sale?',
      answer:
        'To list your number plate, log in to your account, click on "Post," provide the details, and your plate will be ready for sale.',
    },
    {
      question: 'Will the app support multiple languages?',
      answer: 'Yes, the app supports both English and Arabic.',
    },
    {
      question: 'Is there a fee for listing my number plate?',
      answer:
        'No, listing is free. However, transaction fees may apply on sales.',
    },
    {
      question: 'Can I edit my number plate listing after posting it?',
      answer:
        'Yes, you can edit your listing details anytime from "My Listings."',
    },
    {
      question: 'Is my personal information shared with other users?',
      answer:
        'No, your personal information remains private. All communication is handled within the app.',
    },
    {
      question: 'How do I delete my account if needed?',
      answer:
        'You can delete your account by going to "View Profile"  > "Delete" and selecting the delete option.',
    },
  ],

  arabic: [
    {
      question: 'هل أحتاج إلى حساب لشراء أو بيع لوحات الأرقام؟',
      answer: 'نعم، يجب إنشاء حساب لشراء أو بيع لوحات الأرقام.',
    },
    {
      question: 'كيف يمكنني إدراج لوحة أرقام للبيع؟',
      answer:
        'لتسجيل لوحة الأرقام الخاصة بك، قم بتسجيل الدخول إلى حسابك، واضغط على "إدراج"، وأدخل التفاصيل، وستكون اللوحة جاهزة للبيع.',
    },
    {
      question: 'هل سيدعم التطبيق لغات متعددة؟',
      answer: 'نعم، التطبيق يدعم اللغتين الإنجليزية والعربية.',
    },
    {
      question: 'هل توجد رسوم على إدراج لوحة الأرقام؟',
      answer: 'لا، الإدراج مجاني. ومع ذلك، قد يتم تطبيق رسوم على المبيعات.',
    },
    {
      question: 'هل يمكنني تعديل إعلان لوحة الأرقام بعد نشره؟',
      answer: 'نعم، يمكنك تعديل تفاصيل إعلانك في أي وقت من خلال "إعلاناتي".',
    },
    {
      question: 'هل تتم مشاركة معلوماتي الشخصية مع مستخدمين آخرين؟',
      answer: 'لا، تظل معلوماتك الشخصية خاصة. جميع المحادثات تتم داخل التطبيق.',
    },
    {
      question: 'كيف يمكنني حذف حسابي إذا لزم الأمر؟',
      answer:
        'يمكنك حذف حسابك عن طريق الانتقال إلى "عرض الملف الشخصي" > "حذف"، واختيار خيار الحذف.',
    },
  ],
};

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const { language } = useSelector((state) => state.language); // "english" or "arabic"

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Select the correct language array
  const faqs = language === 'arabic' ? faqsData.arabic : faqsData.english;

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4 text-center'>
        {language === 'arabic'
          ? 'الأسئلة الشائعة'
          : 'Frequently Asked Questions'}
      </h2>
      <div className='space-y-4'>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className='border rounded-lg p-4 shadow-sm cursor-pointer'
            onClick={() => toggleAnswer(index)}
          >
            <div
              className={`w-full flex justify-between items-center text-lg font-medium ${
                language === 'arabic' ? 'text-right' : 'text-left'
              } text-gray-800`}
            >
              {faq.question}
              <span
                className={`transform transition-transform duration-500 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              >
                <MdKeyboardArrowDown size={'40px'} />
              </span>
            </div>
            <div
              className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                openIndex === index ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <p
                className={`mt-2 text-gray-600 ${
                  language === 'arabic' ? 'text-right' : 'text-left'
                }`}
              >
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
