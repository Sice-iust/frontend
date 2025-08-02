import React, { useState } from "react";

interface Ticket {
  id: number;
  title: string;
  category: string;
  status: "pending" | "answered" | "closed";
  date: string;
  lastMessage: string;
}

const Support: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"tickets" | "new">("tickets");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("technical");

  const mockTickets: Ticket[] = [
    {
      id: 1,
      title: "مشکل در پرداخت آنلاین",
      category: "مالی",
      status: "answered",
      date: "۱۴۰۲/۰۵/۱۵",
      lastMessage: "پاسخ کارشناس: لطفا از مرورگر دیگری استفاده نمایید.",
    },
    {
      id: 2,
      title: "خطا در ورود به سیستم",
      category: "فنی",
      status: "pending",
      date: "۱۴۰۲/۰۵/۱۸",
      lastMessage: "در حال بررسی توسط تیم پشتیبانی",
    },
    {
      id: 3,
      title: "سوال درباره محصولات",
      category: "عمومی",
      status: "closed",
      date: "۱۴۰۲/۰۵/۱۰",
      lastMessage: "تیکت بسته شد",
    },
  ];

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`تیکت با موضوع "${subject}" ارسال شد`);
    setSubject("");
    setMessage("");
    setActiveTab("tickets");
  };

  return (
    <div className="container bg-white rounded-xl mt-4 mx-4 p-10 w-auto min-h-screen mb-4 text-right">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        پشتیبانی و تیکت‌ها
      </h1>


      <div className="flex flex-row-reverse border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "tickets"
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("tickets")}
        >
          تیکت‌های من
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "new"
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("new")}
        >
          ایجاد تیکت جدید
        </button>
      </div>

      {activeTab === "tickets" ? (
        <div className="space-y-4">
          {mockTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex flex-row-reverse justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {ticket.title}
                  </h3>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="text-sm text-gray-600">
                      دسته: {ticket.category}
                    </span>
                    <span className="text-sm text-gray-600">
                      تاریخ: {ticket.date}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    ticket.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : ticket.status === "answered"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {ticket.status === "pending"
                    ? "در انتظار پاسخ"
                    : ticket.status === "answered"
                    ? "پاسخ داده شده"
                    : "بسته شده"}
                </span>
              </div>
              <div className="mt-3 p-3 bg-gray-50 rounded text-sm text-gray-700">
                <p className="font-medium">آخرین پیام:</p>
                <p>{ticket.lastMessage}</p>
              </div>
              <div className="mt-3 flex justify-end space-x-2">
                <button className="px-3 py-1 text-sm border border-orange-500 text-orange-500 rounded hover:bg-orange-50 transition">
                  مشاهده مکاتبات
                </button>
                {ticket.status !== "closed" && (
                  <button className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition">
                    پاسخ دادن
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmitTicket} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-700 mb-2">
              موضوع تیکت
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-right px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

            <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 mb-2 text-right">
                دسته‌بندی
                </label>
                <div className="relative">
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-right appearance-none bg-white"
                    dir="rtl"
                >
                    <option value="technical">پشتیبانی فنی</option>
                    <option value="financial">مالی و پرداخت</option>
                    <option value="general">عمومی</option>
                    <option value="suggestion">پیشنهادات</option>
                </select>
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                </div>
            </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 mb-2">
              متن پیام
            </label>
            <textarea
              id="message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              required
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition flex items-center"
            >
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              ارسال تیکت
            </button>
          </div>
        </form>
      )}

      <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
        <h3 className="font-semibold text-orange-800 mb-2">راهنمای پشتیبانی</h3>
        <p className="text-orange-700">
          در صورت نیاز به پاسخ سریع می‌توانید از طریق شماره تلفن ۰۲۱-۱۲۳۴۵۶۷۸ با
          ما در تماس باشید. ساعت پاسخگویی: ۹ صبح تا ۵ بعدازظهر
        </p>
      </div>
    </div>
  );
};

export default Support;
