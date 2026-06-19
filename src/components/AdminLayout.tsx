import { Outlet, Link, useLocation } from "react-router";

export default function AdminLayout() {
  const location = useLocation();
  const isSettings = location.pathname.includes('/settings');

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">SolarTech Admin</h1>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className={`px-4 py-2.5 rounded-lg flex items-center gap-3 transition-colors ${!isSettings ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 text-slate-300 hover:text-white'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Quản lý Sản phẩm
          </Link>
          <Link to="/admin/settings" className={`px-4 py-2.5 rounded-lg flex items-center gap-3 transition-colors ${isSettings ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 text-slate-300 hover:text-white'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Hướng dẫn liên kết
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800 space-y-4">
          <div className="flex items-center gap-3 px-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-xs font-mono uppercase tracking-widest">MySQL Connected</span>
          </div>
          <div className="flex items-center gap-3 px-4 pb-4">
            <div className="h-10 w-10 bg-slate-700 rounded-full flex-shrink-0"></div>
            <div>
              <p className="text-sm font-semibold text-white">SolarTech Admin</p>
              <p className="text-xs opacity-50">Quản trị viên</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <Link to="/" className="text-sm hover:text-emerald-600 transition-colors">Trang chủ web</Link>
            <span className="text-xs">/</span>
            <span className="text-sm font-semibold text-slate-900">{isSettings ? 'Hướng dẫn liên kết' : 'Quản lý Sản phẩm'}</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Action buttons could go here */}
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 flex-1 overflow-auto bg-slate-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
