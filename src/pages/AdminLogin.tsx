import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      
      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}`);
      }

      if (res.ok && data.token) {
        localStorage.setItem("admin_token", data.token);
        navigate("/admin");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (e: any) {
      console.error(e);
      setError(`Lỗi: ${e.message || "Network error"}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-12 w-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">S</div>
          <h1 className="text-2xl font-bold text-slate-900">SolarTech Admin</h1>
          <p className="text-slate-500 mt-2">Đăng nhập để vào trang quản trị</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2">Tên đăng nhập</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Mật khẩu</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-colors">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
