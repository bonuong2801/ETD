import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";

export default function PublicLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shift + Alt + 1
      if (e.shiftKey && e.altKey && (e.key === '1' || e.code === 'Digit1' || e.key === '¡')) {
        navigate('/admin/login');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Header */}
      <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            S
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">SolarTech</h1>
        </div>
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <a href="#solar" className="text-slate-600 hover:text-emerald-600 transition-colors">Điện mặt trời</a>
          <a href="#battery" className="text-slate-600 hover:text-emerald-600 transition-colors">Đóng pin</a>
          <a href="#others" className="text-slate-600 hover:text-emerald-600 transition-colors">Mặt hàng khác</a>
          <a href="#contact" className="text-slate-600 hover:text-emerald-600 transition-colors">Liên hệ</a>
        </nav>
        <div>
          <a href="#contact" className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
            Gọi tư vấn ngay
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center flex flex-col items-center gap-4">
        <p>&copy; {new Date().getFullYear()} SolarTech. Bản quyền thuộc về SolarTech.</p>
      </footer>
    </div>
  );
}
