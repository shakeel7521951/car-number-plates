import { useState } from "react";
import { sellerData } from "../../StaticData/data";
import plateName from "../../assets/plateName.png";
import { useSelector } from "react-redux";

const SellerDataCards = () => {
  const [count, setCount] = useState(3);
  const [dateFilter, setDateFilter] = useState(30); 
  const { language } = useSelector((state) => state.language);

  // Function to calculate "days ago" from a given date
  const calculateDaysAgo = (date) => {
    const today = new Date();
    const itemDate = new Date(date);
    const timeDiff = Math.abs(today - itemDate);
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  // Filter sellerData based on the selected date filter
  const filteredData = sellerData
    .filter((item) => calculateDaysAgo(item.date) <= dateFilter)
    .slice(0, count);

  const handleCount = () => {
    setCount(count + 3);
  };

  return (
    <>
      <div
        className={`flex items-center justify-between gap-4 mt-12 lg:w-[90vw] lg:mx-auto px-2 ${
          language === "ar" ? "text-right" : "text-left"
        }`}
      >
        <h1 className="text-xl font-bold">
          {language === "eng" ? "Payment History" : "تاريخ الدفع"}
        </h1>
        <select
          value={dateFilter}
          onChange={(e) => {
            setCount(3);
            setDateFilter(Number(e.target.value));
          }}
          className="p-2 border rounded"
        >
          <option value={1}>
            {language === "eng" ? "Last 1 day" : "آخر يوم"}
          </option>
          <option value={7}>
            {language === "eng" ? "Last 7 days" : "آخر 7 أيام"}
          </option>
          <option value={15}>
            {language === "eng" ? "Last 15 days" : "آخر 15 يومًا"}
          </option>
          <option value={30}>
            {language === "eng" ? "Last 30 days" : "آخر 30 يومًا"}
          </option>
        </select>
      </div>
      <main
        className={`flex flex-col gap-4 mt-12 lg:w-[90vw] lg:mx-auto px-2 ${
          language === "ar" ? "text-right" : "text-left"
        }`}
      >
        {filteredData.length > 0 ? (
          filteredData.map((item) => {
            const { id, date, plateNumber, price, status } = item;
            return (
              <main
                className={`border bottom-1 border-black p-4 flex flex-col sm:flex-row ${
                  language === "ar" ? "sm:flex-row-reverse" : ""
                } justify-between`}
                key={id}
              >
                <div className="flex gap-4">
                  <div className="w-32 sm:w-40">
                    <img
                      src={plateName}
                      alt="Plate Name"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <h1 className="font-semibold text-xl sm:text-2xl">
                      {language === "eng" ? "Private Plate" : "لوحة خاصة"}{" "}
                      {plateNumber} ({calculateDaysAgo(date)}{" "}
                      {language === "eng" ? "days ago" : "منذ أيام"})
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between relative">
                  <h1 className="text-xl font-semibold">
                    {language === "eng" ? "Sold" : "تم البيع"}
                  </h1>
                  <h1 className="text-xl font-semibold">
                    {price} {language === "eng" ? "Q.T" : "ريال"}
                  </h1>
                  <div className="flex gap-4 mt-2 items-center">
                    <span>{language === "eng" ? "Status" : "الحالة"}</span>
                    <button
                      className={`p-2 ${
                        status === "pending"
                          ? "bg-blue-500"
                          : "bg-[#BA9328]"
                      } text-white rounded w-32`}
                    >
                      {language === "eng" ? status : status === "pending" ? "قيد الانتظار" : "تم البيع"}
                    </button>
                  </div>
                </div>
              </main>
            );
          })
        ) : (
          <p className="text-center mt-4">
            {language === "eng"
              ? "No data available for the selected date range."
              : "لا توجد بيانات متاحة للنطاق الزمني المحدد."}
          </p>
        )}
      </main>
      <div
        className={`w-full flex items-center justify-center ${
          language === "ar" ? "text-right" : "text-left"
        }`}
      >
        <button
          onClick={handleCount}
          disabled={
            filteredData.length < count ||
            filteredData.length === sellerData.length ||
            filteredData.length === 0
          }
          className={`p-2 mt-4 ${
            filteredData.length < count ||
            filteredData.length === sellerData.length ||
            filteredData.length === 0
              ? "bg-gray-300 text-black cursor-not-allowed"
              : "bg-[#0D072C] text-white"
          } rounded w-max text-center px-5`}
        >
          {language === "eng" ? "Load More" : "تحميل المزيد"}
        </button>
      </div>
    </>
  );
};

export default SellerDataCards;
