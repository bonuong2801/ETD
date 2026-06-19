import { useState } from "react";

export default function Settings() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Hướng dẫn liên kết Chat</h1>
        <p className="text-slate-500 mt-2">Xem hướng dẫn cấu hình nền tảng liên hệ Zalo và Facebook Messenger trên website.</p>
      </div>

      <div className="space-y-8">
        {/* Zalo Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.637.4 3.174 1.106 4.51l-1.393 4.22a.75.75 0 00.942.942l4.22-1.393C8.211 21.328 9.94 21.8 11.8 21.8c5.523 0 10-4.477 10-10S17.323 2 11.8 2zm-.233 13.064c-.18.06-.39-.028-.532-.14l-1.503-1.187-1.12.83c-.22.164-.525.105-.67-.132l-1.428-2.316c-.156-.254-.084-.582.163-.739a.75.75 0 01.378-.052l1.633 1.054a.5.5 0 00.597-.042l1.242-.924c.22-.164.526-.104.671.133l1.428 2.315c.156.253.084.582-.163.739l-.696.461z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Liên kết Zalo</h2>
              <p className="text-sm text-slate-500">Cấu hình link trang cá nhân hoặc OA Zalo</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="font-semibold text-slate-700 mb-2">1. Định dạng đường dẫn (Link Zalo):</p>
              <code className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-blue-600 block w-full">
                https://zalo.me/[Số_điện_thoại]
              </code>
              <p className="text-sm text-slate-500 mt-2">Ví dụ: <span className="font-mono text-slate-700">https://zalo.me/0901234567</span></p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="font-semibold text-slate-700 mb-2">2. Hướng dẫn lấy Link Zalo OA (Doanh nghiệp):</p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 text-sm">
                <li>Truy cập <a href="https://oa.zalo.me/manage/profile" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Zalo OA Manager</a></li>
                <li>Mở tài khoản OA của bạn, sao chép ID OA Zalo (Dãy số).</li>
                <li>Link Zalo OA sẽ có dạng: <strong>https://zalo.me/[OA_ID]</strong></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Messenger Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-[#e7f3ff] text-[#1877F2] rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Liên kết Facebook Messenger</h2>
              <p className="text-sm text-slate-500">Kết nối khách hàng trực tiếp qua Messenger</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="font-semibold text-slate-700 mb-2">1. Định dạng đường dẫn (Link m.me):</p>
              <code className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-[#1877F2] block w-full">
                https://m.me/[Tên_người_dùng_hoặc_ID_Fanpage]
              </code>
              <p className="text-sm text-slate-500 mt-2">Ví dụ: <span className="font-mono text-slate-700">https://m.me/solartech.vn</span></p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="font-semibold text-slate-700 mb-2">2. Cách lấy Username/ID Fanpage:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 text-sm">
                <li>Truy cập Fanpage Facebook trang của doanh nghiệp bạn.</li>
                <li>Nhìn lên thanh địa chỉ trình duyệt web: <strong className="font-mono">facebook.com/Tên_Fanpage_Của_Bạn</strong>.</li>
                <li>Copy phần "Tên_Fanpage_Của_Bạn" và ghép vào m.me.</li>
              </ul>
              <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 text-sm rounded-lg border border-yellow-200">
                <strong>Lưu ý:</strong> Để thay đổi link này trực tiếp trên Website, vui lòng liên hệ nhà phát triển để cấu hình trực tiếp vào mã nguồn, hoặc sau cài đặt động tính năng từ Bảng Điều Khiển. Mặc định bạn sẽ thay thế trong tệp <b>src/pages/StoreFront.tsx</b>.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
