"use client";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { useWishlist } from "../components/WishlistContext";
import { useCart } from "../components/CartContext";
import { formatPrice, resolveImageUrl } from "../lib/api";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  return (
    <>
      <Header />
      <main className="cart-page">
        <nav className="cart-breadcrumbs">
          <a href="/">Home</a>
          <span>/</span>
          <span className="cart-breadcrumbs__current">Wishlist</span>
        </nav>

        <section className="cart-hero">
          <div>
            <h1>Your Wishlist</h1>
            <p>Save your favorite pieces for later.</p>
          </div>
          <a className="cart-hero__link" href="/shop">Continue Shopping</a>
        </section>

        {items.length > 0 ? (
          <div className="shop-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {items.map((item, index) => (
              <article className="shop-card" key={item.product_id ?? index}>
                <a href={item.slug ? `/shop/${item.slug}` : "/shop"}>
                  <img
                    src={item.image_full_url || resolveImageUrl(item.image_url) || "/images/asset-07.png"}
                    alt={item.name}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                </a>
                <div className="shop-card__info">
                  <div>
                    <a href={item.slug ? `/shop/${item.slug}` : "/shop"}>
                      <h3>{item.name}</h3>
                    </a>
                  </div>
                </div>
                <div className="shop-card__footer" style={{ padding: "8px 16px 16px" }}>
                  <strong>{formatPrice(item.price)}</strong>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      type="button"
                      aria-label="Add to cart"
                      className="shop-card__cart-btn"
                      onClick={() => {
                        addItem({
                          product_id: item.product_id,
                          name: item.name,
                          price: item.price,
                          quantity: 1,
                          image_url: item.image_url,
                          image_full_url: item.image_full_url,
                          slug: item.slug,
                        });
                      }}
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
                    <button
                      type="button"
                      aria-label="Remove from wishlist"
                      className="shop-card__remove-btn"
                      onClick={() => item.product_id && removeItem(item.product_id)}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
                        <path
                          d="M5 7h14M9 7V5h6v2M9 10v7M12 10v7M15 10v7M7 7l1 12h8l1-12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <section className="cart-empty">
            <div className="cart-empty__card">
              <div>
                <h2>Your wishlist is empty</h2>
                <p>Save your favorite leather goods for quick access later.</p>
                <a className="cart-empty__cta" href="/shop">Explore Products</a>
              </div>
              <img src="/images/shop/shop-img-12.png" alt="" />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
