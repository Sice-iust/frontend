import React, { useState, useEffect, useRef } from "react";

interface Ticket {
  id: number;
  title: string;
  category: string;
  status: "pending" | "answered" | "closed";
  date: string;
  lastMessage: string;
  messages: Message[];
}

interface Message {
  id: number;
  sender: "user" | "support";
  text: string;
  date: string;
  time: string;
}

const Support: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"tickets" | "new" | "conversation">("tickets");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("technical");
  const [replyMessage, setReplyMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    setTickets([
      {
        id: 1,
        title: "مشکل در پرداخت آنلاین",
        category: "مالی",
        status: "answered",
        date: "۱۴۰۲/۰۵/۱۵",
        lastMessage: "پاسخ کارشناس: لطفا از مرورگر دیگری استفاده نمایید.",
        messages: [
          {
            id: 1,
            sender: "user",
            text: "من هنگام تلاش برای پرداخت خرید خود در سایت شما با مشکل مواجه شده، پس از وارد کردن اطلاعات پرداخت فرآیند تکمیل نمی‌شود و پیام خطا ریفات می‌کنیم. لطفاً بررسی بفرمایید و راهنمایی کنید که چگونه می‌توانم این مشکل را حل کنیم.",
            date: "۱۴۰۲/۰۵/۱۵",
            time: "۱۰:۳۰"
          },
          {
            id: 2,
            sender: "support",
            text: "با سلام و احترام\nموضوع را بررسی کردیم و می‌خواهیم به شما در حل این مسئله کمک کنیم.\n\nلطفاً موارد زیر را بررسی کنید:\n- اطمینان حاصل کنید که اطلاعات پرداخت صحیح وارد شده باشد.\n- اگر پرداخت ناموفق بوده است، لطفاً مجددا تلاش کنید یا روش پرداخت دیگری را امتحان کنیم.",
            date: "۱۴۰۲/۰۵/۱۵",
            time: "۱۱:۴۵"
          }
        ]
      },
      {
        id: 2,
        title: "خطا در ورود به سیستم",
        category: "فنی",
        status: "pending",
        date: "۱۴۰۲/۰۵/۱۸",
        lastMessage: "در حال بررسی توسط تیم پشتیبانی",
        messages: [
          {
            id: 1,
            sender: "user",
            text: "هنگام ورود به حساب کاربری با خطای 'اطلاعات ورود نامعتبر است' مواجه می‌شوم در حالی که رمز عبور را صحیح وارد می‌کنم.",
            date: "۱۴۰۲/۰۵/۱۸",
            time: "۰۹:۱۵"
          }
        ]
      },
      {
        id: 3,
        title: "سوال درباره محصولات",
        category: "عمومی",
        status: "closed",
        date: "۱۴۰۲/۰۵/۱۰",
        lastMessage: "تیکت بسته شد",
        messages: [
          {
            id: 1,
            sender: "user",
            text: "آیا محصول X با مدل Y سازگاری دارد؟",
            date: "۱۴۰۲/۰۵/۱۰",
            time: "۱۴:۲۰"
          },
          {
            id: 2,
            sender: "support",
            text: "بله، این محصول کاملاً با مدل Y سازگاری دارد.",
            date: "۱۴۰۲/۰۵/۱۰",
            time: "۱۵:۳۰"
          },
          {
            id: 3,
            sender: "user",
            text: "متشکرم از پاسخگویی شما.",
            date: "۱۴۰۲/۰۵/۱۰",
            time: "۱۶:۴۵"
          }
        ]
      },
    ]);
  }, []);

  useEffect(() => {
    if (shouldScroll && messagesContainerRef.current && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedTicket?.messages, shouldScroll]);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket: Ticket = {
      id: tickets.length + 1,
      title: subject,
      category: category === "technical" ? "فنی" : 
               category === "financial" ? "مالی" : 
               category === "general" ? "عمومی" : "پیشنهادات",
      status: "pending",
      date: new Date().toLocaleDateString('fa-IR'),
      lastMessage: message,
      messages: [
        {
          id: 1,
          sender: "user",
          text: message,
          date: new Date().toLocaleDateString('fa-IR'),
          time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
  
    setTickets([newTicket, ...tickets]);
    setSubject("");
    setMessage("");
    setActiveTab("tickets");
    setSelectedTicket(newTicket);
    setActiveTab("conversation");
    setShouldScroll(true);
  };

  const handleViewConversation = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setActiveTab("conversation");
  };

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTicket && replyMessage.trim()) {
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === selectedTicket.id) {
          const newMessage = {
            id: ticket.messages.length + 1,
            sender: "user" as const,
            text: replyMessage,
            date: new Date().toLocaleDateString('fa-IR'),
            time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
          };
          
          return {
            ...ticket,
            status: "pending" as const, 
            lastMessage: replyMessage,
            messages: [...ticket.messages, newMessage]
          };
        }
        return ticket;
      });
  
      setTickets(updatedTickets);
      setSelectedTicket(updatedTickets.find(t => t.id === selectedTicket.id) || null);
      setReplyMessage("");
      setShouldScroll(true);
    }
  };
  const handleBackToTickets = () => {
    setActiveTab("tickets");
    setSelectedTicket(null);
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
              ? "text-[#f18825] border-b-2 border-[#f18825]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("tickets")}
        >
          تیکت‌های من
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "new"
              ? "text-[#f18825] border-b-2 border-[#f18825]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("new")}
        >
          ایجاد تیکت جدید
        </button>
      </div>

      {activeTab === "tickets" ? (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
              onClick={() => handleViewConversation(ticket)}
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
                  className={`px-2 py-1 text-xs rounded-md ${
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
            </div>
          ))}
        </div>
      ) : activeTab === "new" ? (
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
              className="w-full text-right px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#f18825] focus:border-[#f18825]"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#f18825] focus:border-[#f18825] text-right appearance-none bg-white"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#f18825] focus:border-[#f18825]"
              required
              dir="rtl"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-[#f18825] text-white rounded-lg hover:bg-orange-600 transition flex items-center"
            >
              ارسال تیکت
              <svg
                className="w-5 h-5 ml-2 transform rotate-90"
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

            </button>
          </div>
        </form>
      ) : (
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={handleBackToTickets}
            className="flex items-center text-[#f18825] mb-4 hover:text-orange-700"
          >
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            بازگشت به لیست تیکت‌ها
          </button>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">{selectedTicket?.title}</h2>
              <span className={`px-3 py-1 text-sm rounded-md ${
                selectedTicket?.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : selectedTicket?.status === "answered"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}>
                {selectedTicket?.status === "pending"
                  ? "در انتظار پاسخ"
                  : selectedTicket?.status === "answered"
                  ? "پاسخ داده شده"
                  : "بسته شده"}
              </span>
            </div>

            <div ref={messagesContainerRef}
                      className="space-y-6 max-h-[500px] overflow-y-auto p-4"
                      onScroll={() => setShouldScroll(false)}>
              {selectedTicket?.messages.map((msg) => (
                <div 
                  key={msg.id}
                  ref={messagesEndRef}
                  className={`p-4 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-50 border border-blue-100 ml-10"
                      : "bg-gray-50 border border-gray-100 b-1 mr-10"
                  }`}
                >
                  <div className="flex flex-row-reverse justify-between items-center mb-2">
                    <span className="font-bold text-sm">
                      {msg.sender === "user" ? "شما" : "پشتیبانی"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {msg.date} - {msg.time}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-line">{msg.text}</p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {selectedTicket?.status !== "closed" && (
              <form onSubmit={handleSubmitReply} className="mt-8">
                <div className="mb-4">
                  <label htmlFor="reply" className="block text-gray-700 mb-2">
                    پاسخ شما
                  </label>
                  <textarea
                    id="reply"
                    rows={4}
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#f18825] focus:border-[#f18825]"
                    required
                    dir="rtl"
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#f18825] text-white rounded-lg hover:bg-orange-600 transition flex items-center"
                  >
                    ارسال پاسخ
                    <svg
                      className="w-5 h-5 ml-2 transform rotate-90"
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

                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
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