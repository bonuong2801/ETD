import { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function StoreFront() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/products?t=${new Date().getTime()}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data);
        else console.error("API returned error:", data);
      })
      .catch(err => console.error(err));
  }, []);

  const solarServices = products.filter(p => p.loai_san_pham === "DichVuMatTroi");
  const batteryServices = products.filter(p => p.loai_san_pham === "PinLuuTru");
  const otherProducts = products.filter(p => p.loai_san_pham === "GiaDungKhac");

  const renderProductCard = (product: any, categoryName: string, index: number) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      key={product.id} 
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-shadow group flex flex-col relative"
    >
      {(product.chiet_khau && product.chiet_khau !== "0" && product.chiet_khau !== "") && (
        <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg flex items-center gap-1 leading-none">
          Giảm <span className="text-[14px] leading-none">{product.chiet_khau}%</span>
        </div>
      )}
      <div className="h-56 overflow-hidden relative">
        <img src={product.hinh_anh} alt={product.ten_san_pham} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
          {categoryName}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           {/* Add subtle gradient on hover */}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug group-hover:text-emerald-700 transition-colors">{product.ten_san_pham}</h3>
        <p className="text-slate-500 mb-6 flex-1 text-sm leading-relaxed">{product.mo_ta}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-emerald-600 font-bold text-xl tracking-tight">{product.gia}</span>
             {(product.chiet_khau && product.chiet_khau !== "0" && product.chiet_khau !== "") && (
               <span className="text-xs text-slate-400 font-medium">Giá tốt nhất hôm nay</span>
             )}
          </div>
          <a href="#contact" className="bg-slate-50 group-hover:bg-emerald-50 text-slate-900 group-hover:text-emerald-700 px-4 py-2 rounded-lg font-semibold transition-colors text-sm flex items-center gap-2">
            Tư vấn <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-32 px-8 relative overflow-hidden" id="services">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
          >
            Năng lượng của tương lai với <br/> <span className="text-emerald-400 inline-block mt-2">Điện mặt trời & Pin lưu trữ</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
             className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            Dịch vụ lắp đặt năng lượng mặt trời chuyên nghiệp và cung cấp khối pin lưu trữ đóng theo yêu cầu với độ bền vượt trội.
          </motion.p>
          <motion.a 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5, delay: 0.4 }}
             href="#solar" 
             className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all inline-block shadow-[0_0_40px_-5px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_-5px_rgba(16,185,129,0.5)]"
          >
            Khám phá sản phẩm
          </motion.a>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none mix-blend-luminosity">
          <img src="https://images.unsplash.com/photo-1588612140409-bcdd1ac1d02d?auto=format&fit=crop&q=80&w=2000" alt="Solar background" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Solar Services */}
      <section id="solar" className="py-24 px-8 max-w-7xl mx-auto border-b border-slate-100">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <div className="w-12 h-1 bg-emerald-500 mx-auto mb-6 rounded-full"></div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Lắp đặt Điện năng lượng mặt trời</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Giải pháp điện mặt trời trọn gói tối ưu giúp tiết kiệm chi phí năng lượng và bảo vệ môi trường.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {solarServices.map((product, idx) => renderProductCard(product, "Năng lượng mặt trời", idx))}
        </div>
      </section>

      {/* Battery Services */}
      <section id="battery" className="py-24 px-8 max-w-7xl mx-auto border-b border-slate-100">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <div className="w-12 h-1 bg-emerald-500 mx-auto mb-6 rounded-full"></div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Dịch vụ đóng pin & Bảo dưỡng</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Chuyên cung cấp và đóng mới các khối pin lưu trữ chất lượng cao theo đúng yêu cầu sử dụng của bạn.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {batteryServices.map((product, idx) => renderProductCard(product, "Pin lưu trữ", idx))}
        </div>
      </section>

      {/* Other Products */}
      <section id="others" className="py-24 px-8 max-w-7xl mx-auto">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <div className="w-12 h-1 bg-emerald-500 mx-auto mb-6 rounded-full"></div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Các mặt hàng tiện ích khác</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Sản phẩm thông minh tích hợp sẵn năng lượng mặt trời, tiện lợi sử dụng trong mọi hoàn cảnh.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {otherProducts.map((product, idx) => renderProductCard(product, "Gia dụng thông minh", idx))}
        </div>
      </section>

      {/* Contact Section without Form */}
      <section id="contact" className="bg-slate-50 py-32 px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white rounded-[2rem] p-8 md:p-16 shadow-2xl shadow-emerald-900/5 border border-slate-100 text-center relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          <div className="mb-12 relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Liên Hệ Tư Vấn Trực Tiếp</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Bạn không cần để lại thông tin phức tạp. Bấm vào nút bên dưới hoặc gọi hotline để được chuyên gia tư vấn nhanh chóng nhất.</p>
          </div>

          <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 relative z-10">
            <a href="tel:0901234567" className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              Hotline: 090 123 4567
            </a>
            <a href="https://zalo.me/0901234567" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto bg-[#0068FF] hover:bg-[#0055D4] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.637.4 3.174 1.106 4.51l-1.393 4.22a.75.75 0 00.942.942l4.22-1.393C8.211 21.328 9.94 21.8 11.8 21.8c5.523 0 10-4.477 10-10S17.323 2 11.8 2zm-.233 13.064c-.18.06-.39-.028-.532-.14l-1.503-1.187-1.12.83c-.22.164-.525.105-.67-.132l-1.428-2.316c-.156-.254-.084-.582.163-.739a.75.75 0 01.378-.052l1.633 1.054a.5.5 0 00.597-.042l1.242-.924c.22-.164.526-.104.671.133l1.428 2.315c.156.253.084.582-.163.739l-.696.461z" clipRule="evenodd" /></svg>
              Chat Zalo Ngay
            </a>
            <a href="https://m.me/123456789" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto bg-[#1877F2] hover:bg-[#166fe5] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"/></svg>
              Chat Facebook
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
