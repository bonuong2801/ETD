-- Bước 1: Thiết kế Cơ sở dữ liệu (MySQL)

CREATE DATABASE IF NOT EXISTS SolarBatteryDB;
USE SolarBatteryDB;

-- 1. Bảng Admin (Quản trị viên)
CREATE TABLE IF NOT EXISTS Admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng SanPham (Sản phẩm / Dịch vụ)
CREATE TABLE IF NOT EXISTS SanPham (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_san_pham VARCHAR(255) NOT NULL,
    gia VARCHAR(100) NOT NULL,
    chiet_khau VARCHAR(100) DEFAULT '0',
    mo_ta TEXT,
    hinh_anh VARCHAR(255),
    loai_san_pham ENUM('DichVuMatTroi', 'PinLuuTru', 'GiaDungKhac') NOT NULL DEFAULT 'DichVuMatTroi',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


