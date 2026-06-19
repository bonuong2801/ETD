import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, updateDoc, deleteDoc, orderBy, query, limit } from "firebase/firestore";
import fs from "fs";

let firebaseConfig: any = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  appId: process.env.FIREBASE_APP_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  firestoreDatabaseId: process.env.FIREBASE_FIRESTORE_DATABASE_ID,
};

// Loại bỏ các giá trị undefined để không đè lên config từ file nếu không có biến môi trường
Object.keys(firebaseConfig).forEach(key => firebaseConfig[key] === undefined && delete firebaseConfig[key]);

try {
  const configContent = fs.readFileSync('firebase-applet-config.json', 'utf-8');
  const fileConfig = JSON.parse(configContent);
  firebaseConfig = { ...fileConfig, ...firebaseConfig };
} catch (e) {
  console.warn("Không tìm thấy firebase-applet-config.json. Đang sử dụng Environment Variables.");
}

let mockProducts: any[] = [
  {
    id: "1",
    ten_san_pham: "Hệ thống điện mặt trời hộ gia đình 5kW",
    gia: "125.000.000 VND",
    chiet_khau: "5",
    mo_ta: "Hệ thống điện mặt trời 5kW trọn gói bao gồm lắp đặt.",
    loai_san_pham: "DichVuMatTroi",
    hinh_anh: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800",
    created_at: Date.now()
  },
  {
    id: "3",
    ten_san_pham: "Đóng khối pin Lithium theo yêu cầu",
    gia: "Từ 10.000.000 VND",
    chiet_khau: "0",
    mo_ta: "Khối pin LiFePO4 bền bỉ, được thiết kế dung lượng và điện áp riêng cho hệ thống của bạn.",
    loai_san_pham: "PinLuuTru",
    hinh_anh: "https://images.unsplash.com/photo-1620501533682-1d59648939c0?auto=format&fit=crop&q=80&w=800",
    created_at: Date.now() - 1000
  },
  {
    id: "5",
    ten_san_pham: "Đèn đường năng lượng mặt trời 300W",
    gia: "1.200.000 VND",
    chiet_khau: "10",
    mo_ta: "Đèn LED siêu sáng tiết kiệm điện, tự động bật tắt với tấm pin và cảm biến thông minh.",
    loai_san_pham: "GiaDungKhac",
    hinh_anh: "https://plus.unsplash.com/premium_photo-1678753733054-d8bcda5e7a9e?auto=format&fit=crop&q=80&w=800",
    created_at: Date.now() - 2000
  },
  {
    id: "6",
    ten_san_pham: "Quạt năng lượng mặt trời kèm pin",
    gia: "850.000 VND",
    chiet_khau: "0",
    mo_ta: "Giải pháp làm mát không tốn điện lưới, tích hợp pin lưu trữ sử dụng được cả khi mất điện.",
    loai_san_pham: "GiaDungKhac",
    hinh_anh: "https://images.unsplash.com/photo-1618621743666-da2246fa49d6?auto=format&fit=crop&q=80&w=800",
    created_at: Date.now() - 3000
  }
];

let db: any = null;

async function connectFirebase() {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId || "(default)");
    const q = query(collection(db, "SanPham"), limit(1));
    const snapshot = await getDocs(q).catch((e: any) => { 
        console.error("Test fetch failed", e);
        return null; 
    });
    
    if (snapshot && snapshot.empty) {
        console.log("Seeding initial data...");
        for (const item of mockProducts) {
             await setDoc(doc(db, "SanPham", item.id), item);
        }
    }
    console.log("Connected to Firebase Firestore successfully!");
  } catch (error) {
    console.error("Firebase connection error:", error);
    db = null;
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "solar-tech-super-secret-key-12345";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD_PLAIN = process.env.ADMIN_PASSWORD || "123456@";
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(ADMIN_PASSWORD_PLAIN, 10);

async function startServer() {
  await connectFirebase();

  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(cors());

  // ============================================
  // MIDDLEWARE XÁC THỰC ADMIN
  // ============================================
  const verifyAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid token" });
    }
    const token = authHeader.split(" ")[1];
    try {
      jwt.verify(token, JWT_SECRET);
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };

  // ============================================
  // API ROUTES
  // ============================================

  app.post("/api/admin/login", (req, res) => {
    try {
      const { username, password } = req.body;
      
      const isUsernameValid = username === ADMIN_USERNAME;
      const isPasswordValid = password ? bcrypt.compareSync(password, ADMIN_PASSWORD_HASH) : false;

      if (isUsernameValid && isPasswordValid) {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1d" });
        return res.json({ token, message: "Đăng nhập thành công" });
      } else {
        return res.status(401).json({ error: "Sai tên đăng nhập hoặc mật khẩu" });
      }
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ error: "Đã xảy ra lỗi trên máy chủ" });
    }
  });

  app.get("/api/products", async (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    if (db) {
      try {
        const q = query(collection(db, "SanPham"), orderBy("created_at", "desc"));
        const snapshot = await getDocs(q);
        const rows = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(rows);
      } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: "Lỗi truy vấn Database", details: err.message });
      }
    } else {
      res.status(500).json({ error: "Chưa kết nối Database" });
    }
  });

  app.post("/api/products", verifyAdmin, async (req, res) => {
    const { ten_san_pham, gia, chiet_khau, mo_ta, hinh_anh, loai_san_pham } = req.body;
    if (!ten_san_pham || !gia) return res.status(400).json({ error: "Thiếu dữ liệu bắt buộc" });

    if (db) {
      try {
        const newDocRef = doc(collection(db, "SanPham"));
        const productData = {
          ten_san_pham,
          gia,
          chiet_khau: chiet_khau || "0",
          mo_ta,
          hinh_anh,
          loai_san_pham: loai_san_pham || 'DichVuMatTroi',
          created_at: Date.now()
        };
        await setDoc(newDocRef, productData);
        res.json({ id: newDocRef.id, message: "Thêm thành công" });
      } catch (err) {
        console.error("Firebase write failed", err);
        res.status(500).json({ error: "Lỗi khi lưu vào Database" });
      }
    } else {
      res.status(500).json({ error: "Chưa kết nối Database" });
    }
  });

  app.put("/api/products/:id", verifyAdmin, async (req, res) => {
    const { id } = req.params;
    const { ten_san_pham, gia, chiet_khau, mo_ta, hinh_anh, loai_san_pham } = req.body;
    
    if (db) {
      try {
        await updateDoc(doc(db, "SanPham", id), {
          ten_san_pham,
          gia,
          chiet_khau: chiet_khau || "0",
          mo_ta,
          hinh_anh,
          loai_san_pham
        });
        res.json({ message: "Cập nhật thành công" });
      } catch (err) {
        console.error("Firebase update failed", err);
        res.status(500).json({ error: "Lỗi cập nhật Database" });
      }
    } else {
      res.status(500).json({ error: "Chưa kết nối Database" });
    }
  });

  app.delete("/api/products/:id", verifyAdmin, async (req, res) => {
    const { id } = req.params;
    if (db) {
      try {
        await deleteDoc(doc(db, "SanPham", id));
        res.json({ message: "Xóa thành công" });
      } catch (err) {
        console.error("Firebase delete failed", err);
        res.status(500).json({ error: "Lỗi khi xóa" });
      }
    } else {
      res.status(500).json({ error: "Chưa kết nối Database" });
    }
  });


  // ============================================
  // VITE MIDDLEWARE & STATIC FILES
  // ============================================
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
