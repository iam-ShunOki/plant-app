CREATE DATABASE IF NOT EXISTS plant_recommendation_db
CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

USE plant_recommendation_db;

-- データベースのユーザー権限設定
GRANT ALL PRIVILEGES ON plant_recommendation_db.* TO 'plantuser'@'%';
FLUSH PRIVILEGES;

-- 日本語データを正しく扱うための設定
SET NAMES utf8mb4;