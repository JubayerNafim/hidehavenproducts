# Database Schema Documentation

This document provides a detailed overview of the tables and columns present in the database.

## Table: `admin_activity_log`

| Column Name | Data Type | Constraints / Default |
| :--- | :--- | :--- |
| `id` | `int(11)` | NOT NULL |
| `admin_id` | `int(11)` | NOT NULL |
| `action` | `varchar(255)` | NOT NULL |
| `details` | `text` | DEFAULT NULL |
| `ip_address` | `varchar(50)` | DEFAULT NULL |
| `user_agent` | `varchar(255)` | DEFAULT NULL |
| `created_at` | `timestamp` | NULL DEFAULT current_timestamp() |

---

## Table: `admin_users`

| Column Name | Data Type | Constraints / Default |
| :--- | :--- | :--- |
| `id` | `int(11)` | NOT NULL |
| `username` | `varchar(50)` | NOT NULL |
| `password` | `varchar(255)` | NOT NULL |
| `created_at` | `timestamp` | NULL DEFAULT current_timestamp() |
| `updated_at` | `timestamp` | NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() |

---

## Table: `banners`

| Column Name | Data Type | Constraints / Default |
| :--- | :--- | :--- |
| `id` | `int(11)` | NOT NULL |
| `text` | `varchar(255)` | NOT NULL |
| `language` | `enum(` | 'en','bn') DEFAULT 'bn' |
| `active` | `tinyint(1)` | DEFAULT 1 |
| `sort_order` | `int(11)` | DEFAULT 0 |
| `created_at` | `timestamp` | NULL DEFAULT current_timestamp() |
| `updated_at` | `timestamp` | NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() |

---

## Table: `comments`

| Column Name | Data Type | Constraints / Default |
| :--- | :--- | :--- |
| `id` | `int(10)` | UNSIGNED NOT NULL |
| `product_id` | `int(11)` | DEFAULT NULL |
| `name` | `varchar(120)` | NOT NULL |
| `text` | `text` | NOT NULL |
| `status` | `enum(` | 'approved','pending','rejected') NOT NULL DEFAULT 'approved' |
| `created_at` | `timestamp` | NULL DEFAULT current_timestamp() |

---

## Table: `contacts`

| Column Name | Data Type | Constraints / Default |
| :--- | :--- | :--- |
| `id` | `int(10)` | UNSIGNED NOT NULL |
| `name` | `varchar(120)` | NOT NULL |
| `email` | `varchar(180)` | DEFAULT '' |
| `phone` | `varchar(40)` | DEFAULT '' |
| `message` | `text` | NOT NULL |
| `created_at` | `timestamp` | NULL DEFAULT current_timestamp() |

---

## Table: `hero_images`

| Column Name | Data Type | Constraints / Default |
| :--- | :--- | :--- |
| `id` | `bigint(20)` | UNSIGNED NOT NULL |
| `image_path` | `varchar(1024)` | NOT NULL |
| `caption` | `varchar(255)` | DEFAULT NULL |
| `alt_text` | `varchar(255)` | DEFAULT NULL |
| `link_url` | `varchar(1024)` | DEFAULT NULL |
| `open_in_new_tab` | `tinyint(1)` | NOT NULL DEFAULT 0 |
| `sort_order` | `int(11)` | NOT NULL DEFAULT 1000 |
| `active` | `tinyint(1)` | NOT NULL DEFAULT 1 |
| `uploader_id` | `bigint(20)` | UNSIGNED DEFAULT NULL |
| `notes` | `text` | DEFAULT NULL |
| `created_at` | `timestamp` | NOT NULL DEFAULT current_timestamp() |
| `updated_at` | `timestamp` | NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() |
| `deleted_at` | `timestamp` | NULL DEFAULT NULL |

---

## Table: `inventory`

| Column Name | Data Type | Constraints / Default |
| :--- | :--- | :--- |
| `product_id` | `int(11)` | NOT NULL |
| `stock` | `int(11)` | DEFAULT 0 |
| `reserved` | `int(11)` | DEFAULT 0 |
| `updated_at` | `timestamp` | NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() |

---

## Table: `orders`

| Column Name | Data Type | Constraints / Default |
| :--- | :--- | :--- |
| `id` | `int(10)` | UNSIGNED NOT NULL |
| `name` | `varchar(120)` | NOT NULL |
| `email` | `varchar(180)` | DEFAULT '' |
| `phone` | `varchar(40)` | NOT NULL |
| `address` | `varchar(255)` | NOT NULL |
| `delivery_area` | `enum(` | 'dhaka','outside') NOT NULL DEFAULT 'dhaka' |
| `note` | `varchar(500)` | DEFAULT '' |
| `admin_comment` | `text` | DEFAULT NULL |
| `delivery_fee` | `int(11)` | NOT NULL DEFAULT 0 |
| `subtotal` | `int(11)` | NOT NULL DEFAULT 0 |
| `total` | `int(11)` | NOT NULL DEFAULT 0 |
| `status` | `enum(` | 'pending','confirmed','shipped','completed','cancelled','returned') NOT NULL DEFAULT 'pending' |
| `created_at` | `timestamp` | NULL DEFAULT current_timestamp() |

---

## Table: `order_items`

| Column Name | Data Type | Constraints / Default |
| :--- | :--- | :--- |
| `id` | `int(10)` | UNSIGNED NOT NULL |
| `order_id` | `int(10)` | UNSIGNED NOT NULL |
| `product_id` | `int(11)` | DEFAULT NULL |
| `product_name` | `varchar(255)` | NOT NULL |
| `unit_price` | `int(11)` | NOT NULL |
| `quantity` | `int(11)` | NOT NULL |
| `created_at` | `timestamp` | NULL DEFAULT current_timestamp() |

---

## Table: `products`

| Column Name | Data Type | Constraints / Default |
| :--- | :--- | :--- |
| `id` | `int(11)` | NOT NULL |
| `name` | `varchar(255)` | NOT NULL |
| `description` | `text` | CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL |
| `price` | `int(11)` | NOT NULL |
| `sale_price` | `int(11)` | DEFAULT NULL |
| `type` | `varchar(50)` | NOT NULL |
| `color` | `varchar(50)` | DEFAULT NULL |
| `stock` | `int(11)` | NOT NULL DEFAULT 0 |
| `on_sale` | `tinyint(1)` | DEFAULT 0 |
| `featured` | `tinyint(1)` | DEFAULT 0 |
| `created_at` | `timestamp` | NULL DEFAULT current_timestamp() |
| `updated_at` | `timestamp` | NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() |
| `colors` | `text` | DEFAULT NULL |
| `slug` | `varchar(255)` | DEFAULT NULL |
| `category` | `varchar(255)` | DEFAULT NULL |
| `image_url` | `varchar(255)` | DEFAULT NULL |
| `is_featured` | `tinyint(1)` | DEFAULT 0 |
| `is_new` | `tinyint(1)` | DEFAULT 0 |
| `is_bestseller` | `tinyint(1)` | DEFAULT 0 |
| `sort_order` | `int(11)` | DEFAULT 0 |
| `youtube_url` | `varchar(255)` | DEFAULT NULL |

---

## Table: `product_media`

| Column Name | Data Type | Constraints / Default |
| :--- | :--- | :--- |
| `id` | `int(11)` | NOT NULL |
| `product_id` | `int(11)` | NOT NULL |
| `url` | `varchar(255)` | NOT NULL |
| `type` | `enum(` | 'image','video') DEFAULT 'image' |
| `sort_order` | `int(11)` | DEFAULT 0 |
| `created_at` | `timestamp` | NULL DEFAULT current_timestamp() |
| `media_url` | `varchar(255)` | DEFAULT NULL |
| `media_type` | `varchar(50)` | DEFAULT NULL |

---

## Table: `reviews`

| Column Name | Data Type | Constraints / Default |
| :--- | :--- | :--- |
| `id` | `int(10)` | UNSIGNED NOT NULL |
| `product_id` | `int(11)` | NOT NULL |
| `name` | `varchar(120)` | NOT NULL |
| `text` | `text` | NOT NULL |
| `rating` | `tinyint(4)` | DEFAULT NULL |
| `status` | `enum(` | 'approved','pending','rejected') NOT NULL DEFAULT 'approved' |
| `created_at` | `timestamp` | NULL DEFAULT current_timestamp() |

---

## Table: `visits`

| Column Name | Data Type | Constraints / Default |
| :--- | :--- | :--- |
| `id` | `int(10)` | UNSIGNED NOT NULL |
| `timestamp` | `varchar(64)` | NOT NULL |
| `page` | `varchar(255)` | NOT NULL |
| `userAgent` | `varchar(255)` | NOT NULL |
| `language` | `varchar(32)` | NOT NULL |
| `country` | `varchar(64)` | DEFAULT '' |
| `clicked_link` | `text` | DEFAULT NULL |
| `created_at` | `timestamp` | NULL DEFAULT current_timestamp() |

---

