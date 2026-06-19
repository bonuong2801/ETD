import { useState, useEffect } from "react";
import { Navigate } from "react-router";

export default function Dashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(localStorage.getItem("admin_token"));
  const [isEditing, setIsEditing] = useState<string | null>(null);

  // Edit states
  const [editPrice, setEditPrice] = useState("");
  const [editDiscount, setEditDiscount] = useState("");

  // Add states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDiscount, setNewDiscount] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newType, setNewType] = useState("DichVuMatTroi");
  const [newImage, setNewImage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`/api/products?t=${new Date().getTime()}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error("Fetch returned non-array:", data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
  };

  const handleEdit = (product: any) => {
    setIsEditing(product.id);
    setEditPrice(product.gia);
    setEditDiscount(product.chiet_khau || "0");
  };

  const handleSave = async (product: any) => {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ten_san_pham: product.ten_san_pham,
          mo_ta: product.mo_ta,
          hinh_anh: product.hinh_anh,
          loai_san_pham: product.loai_san_pham,
          gia: editPrice,
          chiet_khau: editDiscount
        })
      });
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Lỗi: ${errorData.error}`);
        return;
      }
      setIsEditing(null);
      fetchProducts();
    } catch (e) {
      console.error(e);
      alert("Lỗi kết nối!");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Lỗi: ${errorData.error}`);
        return;
      }
      fetchProducts();
    } catch (e) {
      console.error(e);
      alert("Lỗi kết nối!");
    }
  };

  const handleAdd = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ten_san_pham: newName,
          gia: newPrice,
          chiet_khau: newDiscount,
          mo_ta: newDesc,
          hinh_anh: newImage || "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800",
          loai_san_pham: newType
        })
      });
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Lỗi: ${errorData.error}`);
        return;
      }
      setShowAddForm(false);
      // Reset form
      setNewName("");
      setNewPrice("");
      setNewDiscount("");
      setNewDesc("");
      setNewImage("");
      fetchProducts();
    } catch (e) {
      console.error(e);
      alert("Lỗi kết nối!");
    }
  };

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const categoryLabels: Record<string, string> = {
    "DichVuMatTroi": "Điện mặt trời",
    "PinLuuTru": "Pin lưu trữ",
    "GiaDungKhac": "Khác"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Quản lý Sản phẩm</h2>
          <p className="text-slate-500 mt-1 text-sm">Thêm mới, cập nhật giá và đăng các khuyến mãi mới nhất.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
             onClick={() => setShowAddForm(!showAddForm)} 
             className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
          >
            {showAddForm ? (
               <>Hủy bỏ</>
            ) : (
               <>
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                 Thêm sản phẩm
               </>
            )}
          </button>
          <button onClick={logout} className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm">
            Đăng xuất
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 mb-8 animate-in slide-in-from-top-4 duration-300">
          <h3 className="font-bold text-xl mb-6 text-slate-900">Chi tiết sản phẩm mới</h3>
          <form onSubmit={handleAdd} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Tên sản phẩm *</label>
                <input required value={newName} onChange={e => setNewName(e.target.value)} className="w-full border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl px-4 py-2.5 shadow-sm border outline-none transition-all" placeholder="VD: Pin lưu trữ 5kWh" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Danh mục *</label>
                <select value={newType} onChange={e => setNewType(e.target.value)} className="w-full border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl px-4 py-2.5 shadow-sm border outline-none transition-all bg-white">
                  <option value="DichVuMatTroi">Điện năng lượng mặt trời</option>
                  <option value="PinLuuTru">Dịch vụ đóng pin lưu trữ</option>
                  <option value="GiaDungKhac">Gia dụng thông minh, Phụ kiện khác</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Giá bán hiển thị *</label>
                <input required value={newPrice} onChange={e => setNewPrice(e.target.value)} className="w-full border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl px-4 py-2.5 shadow-sm border outline-none transition-all" placeholder="VD: 15.000.000 VND hoặc Liên hệ" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Chiết khấu (%)</label>
                <div className="relative">
                   <input value={newDiscount} onChange={e => setNewDiscount(e.target.value)} type="number" min="0" max="100" className="w-full border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl pl-4 pr-10 py-2.5 shadow-sm border outline-none transition-all" placeholder="0" />
                   <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">%</div>
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Tải ảnh sản phẩm</label>
                <div className="flex items-center gap-4">
                  {newImage && <img src={newImage} alt="Preview" className="h-12 w-12 rounded-lg bg-slate-100 object-cover border border-slate-200 shrink-0" />}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl px-4 py-2.5 shadow-sm border outline-none transition-all cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:text-emerald-700 file:bg-emerald-50 hover:file:bg-emerald-100" />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Mô tả ngắn</label>
                <textarea required value={newDesc} onChange={e => setNewDesc(e.target.value)} className="w-full border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl px-4 py-3 shadow-sm border outline-none transition-all resize-none" rows={3} placeholder="Mô tả ưu điểm và thông số cơ bản cho khách hàng..."></textarea>
              </div>
            </div>
            <div className="pt-2 flex justify-end">
               <button type="submit" className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                 Đăng Sản Phẩm Mới
               </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4 rounded-tl-2xl">Mặt Hàng</th>
                <th className="px-6 py-4">Phân Loại</th>
                <th className="px-6 py-4">Giá Niêm Yết</th>
                <th className="px-6 py-4">Khuyến Mãi (%)</th>
                <th className="px-6 py-4 text-right rounded-tr-2xl">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {products.length === 0 ? (
                 <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">Chưa có sản phẩm nào.</td>
                 </tr>
              ) : products.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-5">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                           <img src={p.hinh_anh} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="font-bold text-slate-900 text-[15px]">{p.ten_san_pham}</div>
                     </div>
                  </td>
                  <td className="px-6 py-5">
                     <span className="inline-flex items-center bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-semibold">
                        {categoryLabels[p.loai_san_pham] || p.loai_san_pham}
                     </span>
                  </td>
                  <td className="px-6 py-5">
                    {isEditing === p.id ? (
                      <input value={editPrice} onChange={e => setEditPrice(e.target.value)} className="border border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none px-3 py-1.5 rounded-lg w-32 font-medium" />
                    ) : (
                      <span className="font-bold text-slate-900">{p.gia}</span>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    {isEditing === p.id ? (
                      <div className="flex items-center gap-1">
                        <input type="number" min="0" max="100" value={editDiscount} onChange={e => setEditDiscount(e.target.value)} className="border border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none px-3 py-1.5 rounded-lg w-20 font-medium" />
                        <span className="font-bold text-slate-500">%</span>
                      </div>
                    ) : (
                      <span className={`font-bold inline-flex items-center justify-center px-2 py-0.5 rounded ${p.chiet_khau && p.chiet_khau !== "0" ? 'bg-red-50 text-red-600' : 'text-slate-400'}`}>
                         {p.chiet_khau || "0"}%
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right">
                    {isEditing === p.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleSave(p)} className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-3 py-1.5 rounded-lg font-bold text-xs transition-colors">Lưu lại</button>
                        <button onClick={() => setIsEditing(null)} className="bg-slate-100 text-slate-600 hover:bg-slate-200 px-3 py-1.5 rounded-lg font-bold text-xs transition-colors">Hủy</button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(p)} className="text-slate-400 hover:text-blue-600 font-semibold text-sm transition-colors">Sửa</button>
                        <button onClick={() => handleDelete(p.id)} className="text-slate-400 hover:text-red-500 font-semibold text-sm transition-colors">Xóa</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
