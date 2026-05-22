"use client";

import { useState, useEffect, useCallback } from "react";
import { useCart } from "../components/CartContext";
import { useWishlist } from "../components/WishlistContext";
import {
  fetchProducts,
  resolveImageUrl,
  formatPrice,
  type Product,
  type ProductResponse,
} from "../lib/api";

const fallbackProducts: Product[] = [
  {
    name: "The Heritage Satchel",
    price: 15400,
    image_url: "/images/shop/shop-img-10.png",
    is_new: 1,
  },
  {
    name: "Obsidian Weekender",
    price: 32500,
    image_url: "/images/shop/shop-img-8.png",
    is_bestseller: 1,
  },
  {
    name: "Artisan Minimalist Clutch",
    price: 7200,
    image_url: "/images/shop/shop-img-5.png",
  },
  {
    name: "Explorer Watch Roll",
    price: 5900,
    image_url: "/images/shop/shop-img-11.png",
  },
  {
    name: "Executive Desk Pad",
    price: 12000,
    image_url: "/images/shop/shop-img-9.png",
  },
  {
    name: "Pro Camera Strap",
    price: 3800,
    image_url: "/images/shop/shop-img-7.png",
  },
];

type Props = {
  initialData?: ProductResponse | null;
};

export default function ShopContent({ initialData }: Props) {
  const { addItem } = useCart();
  const { isWishlisted, addItem: addWishlist, removeItem: removeWishlist } = useWishlist();

  const [products, setProducts] = useState<Product[]>(
    initialData?.data?.length ? initialData.data : fallbackProducts
  );
  const [total, setTotal] = useState(initialData?.meta?.total ?? fallbackProducts.length);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("sort_order");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const limit = 12;

  // Read initial search from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("search") || "";
    if (q) {
      setSearch(q);
    }
  }, []);

  const fetchData = useCallback(
    async (opts: { page?: number; sort?: string; category?: string; search?: string } = {}) => {
      setLoading(true);
      const params: Record<string, string> = {
        limit: String(limit),
        sort: opts.sort ?? sort,
        page: String(opts.page ?? page),
      };
      if (opts.category || category) params.category = opts.category || category;
      if (opts.search || search) params.search = opts.search || search;

      const res = await fetchProducts(params);
      if (res?.data?.length) {
        setProducts(res.data);
        if (res.meta) setTotal(res.meta.total);
      }
      setLoading(false);
    },
    [sort, category, search, page]
  );

  // Refetch when page/sort/category changes
  useEffect(() => {
    fetchData({ page, sort, category, search });
  }, [page, sort, category, search, fetchData]);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSort(val);
    setPage(1);
  };

  const handleCategory = (cat: string) => {
    setCategory(cat === category ? "" : cat);
    setPage(1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData({ search, page: 1 });
    setPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const showingFrom = (page - 1) * limit + 1;
  const showingTo = Math.min(page * limit, total);

  const sortLabel =
    sort === "price_asc"
      ? "Price: Low to High"
      : sort === "price_desc"
        ? "Price: High to Low"
        : sort === "newest"
          ? "Newest Arrivals"
          : "Sort by:";

  return (
    <section className="shop-body">
      <aside className="shop-sidebar">
        {/* Search */}
        <div className="shop-filter">
          <h4>Search</h4>
          <form onSubmit={handleSearchSubmit} className="shop-filter__search">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>

        {/* Categories */}
        <div className="shop-filter">
          <h4>Categories</h4>
          <ul>
            {["All Categories", "Wallets", "Belts", "Bags", "Travel", "Accessories"].map(
              (cat) => {
                const catKey = cat === "All Categories" ? "" : cat.toLowerCase();
                return (
                  <li
                    key={cat}
                    className={
                      category === catKey ? "active" : ""
                    }
                    onClick={() => handleCategory(catKey)}
                    style={{ cursor: "pointer" }}
                  >
                    <span>{cat}</span>
                  </li>
                );
              }
            )}
          </ul>
        </div>

        {/* Price Range */}
        <div className="shop-filter">
          <h4>Price Range</h4>
          <div className="price-range">
            <div className="price-range__bar" />
            <div className="price-range__values">
              <span>BDT 500</span>
              <span>BDT 50,000+</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="shop-products">
        {/* Toolbar */}
        <div className="shop-toolbar">
          <span>
            Showing {showingFrom}-{showingTo} of {total} products
            {search && <span> for &quot;{search}&quot;</span>}
            {category && <span> in &quot;{category}&quot;</span>}
          </span>
          <div className="shop-toolbar__actions">
            <label>
              Sort by:
              <select value={sort} onChange={handleSort}>
                <option value="sort_order">Default</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </label>
          </div>
        </div>

        {/* Product Grid */}
        <div className={`shop-grid ${loading ? "shop-grid--loading" : ""}`}>
          {loading ? (
            <div className="shop-loading">Loading products...</div>
          ) : (
            products.map((product, index) => {
              const isNew = !!product.is_new;
              const isBestseller = !!product.is_bestseller;
              const badge = isNew ? "New" : isBestseller ? "Bestseller" : "";
              const badgeClass = isBestseller
                ? "shop-card__badge shop-card__badge--dark"
                : "shop-card__badge";
              const displayPrice = formatPrice(product.sale_price ?? product.price);
              const imageUrl =
                product.image_full_url ||
                resolveImageUrl(product.image_url) ||
                fallbackProducts[index % fallbackProducts.length]?.image_url ||
                "";
              const wishlisted = isWishlisted(product.id);
              const productSlug = product.slug;

              return (
                <article className="shop-card" key={product.id ?? index}>
                  <a href={`/shop/${productSlug || `product-${index}`}`}>
                    {badge ? <span className={badgeClass}>{badge}</span> : null}
                    <img src={imageUrl} alt={product.name} />
                  </a>
                  <div className="shop-card__info">
                    <div>
                      <a href={`/shop/${productSlug || `product-${index}`}`}>
                        <h3>{product.name}</h3>
                      </a>
                      <p>{product.category || "Hand-stitched"}</p>
                    </div>
                    <button
                      type="button"
                      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                      onClick={() => {
                        if (product.id && wishlisted) {
                          removeWishlist(product.id);
                        } else {
                          addWishlist({
                            product_id: product.id,
                            name: product.name,
                            price: product.price,
                            image_url: product.image_url,
                            image_full_url: product.image_full_url,
                            slug: productSlug,
                          });
                        }
                      }}
                      style={{ color: wishlisted ? "#c68642" : undefined }}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M12 20.4s-7.1-4.3-9.4-8.3C.9 9.4 2.1 6.6 5 6.6c2 0 3.4 1.1 4.6 2.6 1.2-1.5 2.6-2.6 4.6-2.6 2.9 0 4.1 2.8 2.4 5.5-2.3 4-9.6 8.3-9.6 8.3z"
                          fill={wishlisted ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="shop-card__footer">
                    <strong>{displayPrice}</strong>
                    <button
                      type="button"
                      aria-label="Add to cart"
                      onClick={() =>
                        addItem({
                          product_id: product.id,
                          name: product.name,
                          price: product.sale_price ?? product.price,
                          quantity: 1,
                          image_url: product.image_url,
                          image_full_url: product.image_full_url,
                          slug: productSlug,
                        })
                      }
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M5 6h2l2.3 9.2a1 1 0 0 0 1 .8h8.4a1 1 0 0 0 1-.7L22 9H8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="10" cy="19" r="1.4" fill="currentColor" />
                        <circle cx="18" cy="19" r="1.4" fill="currentColor" />
                      </svg>
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="shop-pagination">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              &lt;
            </button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 7) {
                pageNum = i + 1;
              } else if (page <= 4) {
                pageNum = i + 1;
              } else if (page >= totalPages - 3) {
                pageNum = totalPages - 6 + i;
              } else {
                pageNum = page - 3 + i;
              }
              return (
                <button
                  key={pageNum}
                  type="button"
                  className={page === pageNum ? "active" : ""}
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
