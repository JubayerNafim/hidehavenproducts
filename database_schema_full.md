
# Database Schema Documentation: `hidehave_database2`

## Table: `admin_activity_log`
| Column | Type | Nullable | Default |
| :--- | :--- | :--- | :--- |
| id | int(11) | No | None |
| admin_id | int(11) | No | None |
| action | varchar(255) | No | None |
| details | text | Yes | NULL |
| ip_address | varchar(50) | Yes | NULL |
| user_agent | varchar(255) | Yes | NULL |
| created_at | timestamp | Yes | current_timestamp() |

## Table: `admin_users`
| Column | Type | Nullable | Default |
| :--- | :--- | :--- | :--- |
| id | int(11) | No | None |
| username | varchar(50) | No | None |
| password | varchar(255) | No | None |
| created_at | timestamp | Yes | current_timestamp() |
| updated_at | timestamp | Yes | current_timestamp() |

## Table: `banners`
| Column | Type | Nullable | Default |
| :--- | :--- | :--- | :--- |
| id | int(11) | No | None |
| text | varchar(255) | No | None |
| language | enum('en','bn') | Yes | 'bn' |
| active | tinyint(1) | Yes | 1 |
| sort_order | int(11) | Yes | 0 |
| created_at | timestamp | Yes | current_timestamp() |
| updated_at | timestamp | Yes | current_timestamp() |

## Table: `comments`
| Column | Type | Nullable | Default |
| :--- | :--- | :--- | :--- |
| id | int(10) | No | None |
| product_id | int(11) | Yes | NULL |
| name | varchar(120) | No | None |
| text | text | No | None |
| status | enum('approved','pending','rejected') | No | 'approved' |
| created_at | timestamp | Yes | current_timestamp() |

## Table: `contacts`
| Column | Type | Nullable | Default |
| :--- | :--- | :--- | :--- |
| id | int(10) | No | None |
| name | varchar(120) | No | None |
| email | varchar(180) | Yes | '' |
| phone | varchar(40) | Yes | '' |
| message | text | No | None |
| created_at | timestamp | Yes | current_timestamp() |

## Table: `hero_images`
| Column | Type | Nullable | Default |
| :--- | :--- | :--- | :--- |
| id | bigint(20) | No | None |
| image_path | varchar(1024) | No | None |
| caption | varchar(255) | Yes | NULL |
| alt_text | varchar(255) | Yes | NULL |
| link_url | varchar(1024) | Yes | NULL |
| open_in_new_tab | tinyint(1) | No | 0 |
| sort_order | int(11) | No | 1000 |
| active | tinyint(1) | No | 1 |
| uploader_id | bigint(20) | Yes | NULL |
| notes | text | Yes | NULL |
| created_at | timestamp | No | current_timestamp() |
| updated_at | timestamp | No | current_timestamp() |
| deleted_at | timestamp | Yes | NULL |

## Table: `inventory`
| Column | Type | Nullable | Default |
| :--- | :--- | :--- | :--- |
| product_id | int(11) | No | None |
| stock | int(11) | Yes | 0 |
| reserved | int(11) | Yes | 0 |
| updated_at | timestamp | Yes | current_timestamp() |

## Table: `orders`
| Column | Type | Nullable | Default |
| :--- | :--- | :--- | :--- |
| id | int(10) | No | None |
| name | varchar(120) | No | None |
| email | varchar(180) | Yes | '' |
| phone | varchar(40) | No | None |
| address | varchar(255) | No | None |
| delivery_area | enum('dhaka','outside') | No | 'dhaka' |
| note | varchar(500) | Yes | '' |
| admin_comment | text | Yes | NULL |
| delivery_fee | int(11) | No | 0 |
| subtotal | int(11) | No | 0 |
| total | int(11) | No | 0 |
| status | enum('pending','confirmed','shipped','completed','cancelled','returned') | No | 'pending' |
| created_at | timestamp | Yes | current_timestamp() |

## Table: `order_items`
| Column | Type | Nullable | Default |
| :--- | :--- | :--- | :--- |
| id | int(10) | No | None |
| order_id | int(10) | No | None |
| product_id | int(11) | Yes | NULL |
| product_name | varchar(255) | No | None |
| unit_price | int(11) | No | None |
| quantity | int(11) | No | None |
| created_at | timestamp | Yes | current_timestamp() |

## Table: `products`
| Column | Type | Nullable | Default |
| :--- | :--- | :--- | :--- |
| id | int(11) | No | None |
| category_id | int(11) | No | None |
| name | varchar(255) | No | None |
| slug | varchar(255) | No | None |
| price | int(11) | No | None |
| description | text | Yes | NULL |
| thumbnail | varchar(255) | Yes | NULL |
| active | tinyint(1) | Yes | 1 |
| created_at | timestamp | Yes | current_timestamp() |
| updated_at | timestamp | Yes | current_timestamp() |

## Table: `product_media`
| Column | Type | Nullable | Default |
| :--- | :--- | :--- | :--- |
| id | int(11) | No | None |
| product_id | int(11) | No | None |
| type | enum('image','video') | No | 'image' |
| media_path | varchar(255) | No | None |
| is_thumbnail | tinyint(1) | No | 0 |
| created_at | timestamp | Yes | current_timestamp() |
