"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";
import { useWishlist } from "../components/WishlistContext";
import { fetchProducts, resolveImageUrl, formatPrice, type Product } from "../lib/api";

const CATEGORIES = [
  { key: "", label: "All Collections", desc: "Browse our complete range" },
  { key: "wallets", label: "Wallets", desc: "Slim bifolds, cardholders, and coin purses" },
  { key: "belts", label: "Belts", desc: "Full-grain leather belts with brass buckles" },
  { key: "bags", label: "Bags", desc: "Messengers, totes, and travel bags" },
  { key: "travel", label: "Travel", desc: "Weekenders, duffels, and passport holders" },
  { key: "accessories", label: "Accessories", desc: "Watch straps, keychains, and desk pads" },
];

export default function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { isWishlisted, addItem: addWishlist, removeItem: removeWishlist } = useWishlist();

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = { limit: "50" };
    if (activeCategory) params.category = activeCategory;
    fetchProducts(params).then((res) => {
      if (res?.data) setProducts(res.data);
      setLoading(false);
    });
  }, [activeCategory]);

  return (
    <>
      <Header active="collections" />
      <main className="shop-page">
        <nav className="shop-breadcrumbs">
          <a href="/">Home</a>
          <span>/</span>
          <span className="shop-breadcrumbs__current">Collections</span>
        </nav>

        {/* Category Tabs */}
        <section className="collections-tabs">
          <h1>Our Collections</h1>
          <p>Curated essentials for every lifestyle.</p>
          <div className="collections-tabs__nav">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                className={`collections-tab ${activeCategory === cat.key ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                <strong>{cat.label}</strong>
                <span>{cat.desc}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="shop-body" style={{ gridTemplateColumns: "1fr" }}>
          <div className="shop-products">
            {loading ? (
              <div className="shop-loading">Loading collections...</div>
            ) : products.length === 0 ? (
              <div className="shop-loading">
                <p>No products found in this collection.</p>
                <a href="/shop" className="cart-empty__cta" style={{ marginTop: "16px", display: "inline-block" }}>
                  Browse All Products
                </a>
              </div>
            ) : (
              <>
                <div className="shop-toolbar">
                  <span>{products.length} products</span>
                </div>
                <div className="shop-grid">
                  {products.map((product, index) => {
                    const displayPrice = formatPrice(product.sale_price ?? product.price);
                    const imageUrl = product.image_full_url || resolveImageUrl(product.image_url) || "";
                    const wishlisted = isWishlisted(product.id);
                    const productSlug = product.slug;

                    return (
                      <article className="shop-card" key={product.id ?? index}>
                        <a href={`/shop/${productSlug || `product-${index}`}`}>
                          {product.is_new ? (
                            <span className="shop-card__badge">New</span>
                          ) : product.is_bestseller ? (
                            <span className="shop-card__badge shop-card__badge--dark">Bestseller</span>
                          ) : null}
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
                              if (product.id && wishlisted) removeWishlist(product.id);
                              else addWishlist({
                                product_id: product.id,
                                name: product.name,
                                price: product.price,
                                image_url: product.image_url,
                                image_full_url: product.image_full_url,
                                slug: productSlug,
                              });
                            }}
                            style={{ color: wishlisted ? "#c68642" : undefined }}
                          >
                            <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
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
                            onClick={() => addItem({
                              product_id: product.id,
                              name: product.name,
                              price: product.sale_price ?? product.price,
                              quantity: 1,
                              image_url: product.image_url,
                              image_full_url: product.image_full_url,
                              slug: productSlug,
                            })}
                          >
                            <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
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
                  })}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
