import Footer from "../components/Footer";
import Header from "../components/Header";

export default function ShopPage() {
  return (
    <>
      <Header active="bestsellers" searchPlaceholder="Search heritage goods..." cartCount={2} />
      <main className="shop-page">
        <nav className="shop-breadcrumbs">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/shop">Shop</a>
          <span>/</span>
          <span className="shop-breadcrumbs__current">All Products</span>
        </nav>

        <section className="shop-hero">
          <div className="shop-hero__header">
            <div>
              <h1>Bestsellers</h1>
              <p>Our most coveted hand-stitched leather essentials.</p>
            </div>
            <a className="shop-hero__link" href="/shop">View All Favorites</a>
          </div>

          <div className="shop-hero__grid">
            <div className="shop-hero__feature">
              <img src="/images/shop/shop-img-6.png" alt="" />
              <div className="shop-hero__overlay">
                <span>Limited Edition</span>
                <h2>The Artisan Executive Briefcase</h2>
                <p>
                  Masterfully crafted from vegetable-tanned hide for the modern professional.
                </p>
                <button type="button">Shop Now - BDT 24,500</button>
              </div>
            </div>
            <div className="shop-hero__cards">
              <div className="shop-hero__card">
                <div>
                  <h3>Slim Bifold Wallet</h3>
                  <p>RFID protection & premium tan finish.</p>
                  <strong>BDT 3,200</strong>
                </div>
                <img src="/images/shop/shop-img-4.png" alt="" />
              </div>
              <div className="shop-hero__card shop-hero__card--muted">
                <div>
                  <h3>Heritage Belt</h3>
                  <p>Brass buckle, lifetime warranty.</p>
                  <strong>BDT 4,800</strong>
                </div>
                <img src="/images/shop/shop-img-3.png" alt="" />
              </div>
            </div>
          </div>
        </section>

        <section className="shop-body">
          <aside className="shop-sidebar">
            <div className="shop-filter">
              <h4>Categories</h4>
              <ul>
                <li className="active">
                  <span>All Categories</span>
                  <span className="count">124</span>
                </li>
                <li>
                  <span>Wallets</span>
                  <span className="count">32</span>
                </li>
                <li>
                  <span>Belts</span>
                  <span className="count">12</span>
                </li>
                <li>
                  <span>Travel Bags</span>
                  <span className="count">24</span>
                </li>
              </ul>
            </div>
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
            <div className="shop-toolbar">
              <span>Showing 1-12 of 124 products</span>
              <div className="shop-toolbar__actions">
                <label>
                  Sort by:
                  <select defaultValue="Newest Arrivals">
                    <option>Newest Arrivals</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                </label>
                <div className="shop-view">
                  <button className="shop-view__btn active" type="button" aria-label="Grid view" />
                  <button className="shop-view__btn" type="button" aria-label="List view" />
                </div>
              </div>
            </div>

            <div className="shop-grid">
              <article className="shop-card">
                <span className="shop-card__badge">New</span>
                <img src="/images/shop/shop-img-10.png" alt="" />
                <div className="shop-card__info">
                  <div>
                    <h3>The Heritage Satchel</h3>
                    <p>Full Grain Leather</p>
                  </div>
                  <button type="button" aria-label="Wishlist">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M12 20.4s-7.1-4.3-9.4-8.3C.9 9.4 2.1 6.6 5 6.6c2 0 3.4 1.1 4.6 2.6 1.2-1.5 2.6-2.6 4.6-2.6 2.9 0 4.1 2.8 2.4 5.5-2.3 4-9.6 8.3-9.6 8.3z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>
                </div>
                <div className="shop-card__footer">
                  <strong>BDT 15,400</strong>
                  <button type="button" aria-label="Add to cart">
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

              <article className="shop-card">
                <span className="shop-card__badge shop-card__badge--dark">Limited</span>
                <img src="/images/shop/shop-img-8.png" alt="" />
                <div className="shop-card__info">
                  <div>
                    <h3>Obsidian Weekender</h3>
                    <p>48hr Capacity</p>
                  </div>
                  <button type="button" aria-label="Wishlist">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M12 20.4s-7.1-4.3-9.4-8.3C.9 9.4 2.1 6.6 5 6.6c2 0 3.4 1.1 4.6 2.6 1.2-1.5 2.6-2.6 4.6-2.6 2.9 0 4.1 2.8 2.4 5.5-2.3 4-9.6 8.3-9.6 8.3z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>
                </div>
                <div className="shop-card__footer">
                  <strong>BDT 32,500</strong>
                  <button type="button" aria-label="Add to cart">
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

              <article className="shop-card">
                <img src="/images/shop/shop-img-5.png" alt="" />
                <div className="shop-card__info">
                  <div>
                    <h3>Artisan Minimalist Clutch</h3>
                    <p>Hand-stitched</p>
                  </div>
                  <button type="button" aria-label="Wishlist">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M12 20.4s-7.1-4.3-9.4-8.3C.9 9.4 2.1 6.6 5 6.6c2 0 3.4 1.1 4.6 2.6 1.2-1.5 2.6-2.6 4.6-2.6 2.9 0 4.1 2.8 2.4 5.5-2.3 4-9.6 8.3-9.6 8.3z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>
                </div>
                <div className="shop-card__footer">
                  <strong>BDT 7,200</strong>
                  <button type="button" aria-label="Add to cart">
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

              <article className="shop-card">
                <img src="/images/shop/shop-img-11.png" alt="" />
                <div className="shop-card__info">
                  <div>
                    <h3>Explorer Watch Roll</h3>
                    <p>Green Pebble Grain</p>
                  </div>
                  <button type="button" aria-label="Wishlist">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M12 20.4s-7.1-4.3-9.4-8.3C.9 9.4 2.1 6.6 5 6.6c2 0 3.4 1.1 4.6 2.6 1.2-1.5 2.6-2.6 4.6-2.6 2.9 0 4.1 2.8 2.4 5.5-2.3 4-9.6 8.3-9.6 8.3z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>
                </div>
                <div className="shop-card__footer">
                  <strong>BDT 5,900</strong>
                  <button type="button" aria-label="Add to cart">
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

              <article className="shop-card">
                <img src="/images/shop/shop-img-9.png" alt="" />
                <div className="shop-card__info">
                  <div>
                    <h3>Executive Desk Pad</h3>
                    <p>Spacious & Smooth</p>
                  </div>
                  <button type="button" aria-label="Wishlist">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M12 20.4s-7.1-4.3-9.4-8.3C.9 9.4 2.1 6.6 5 6.6c2 0 3.4 1.1 4.6 2.6 1.2-1.5 2.6-2.6 4.6-2.6 2.9 0 4.1 2.8 2.4 5.5-2.3 4-9.6 8.3-9.6 8.3z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>
                </div>
                <div className="shop-card__footer">
                  <strong>BDT 12,000</strong>
                  <button type="button" aria-label="Add to cart">
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

              <article className="shop-card">
                <img src="/images/shop/shop-img-7.png" alt="" />
                <div className="shop-card__info">
                  <div>
                    <h3>Pro Camera Strap</h3>
                    <p>Heavy Duty Support</p>
                  </div>
                  <button type="button" aria-label="Wishlist">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M12 20.4s-7.1-4.3-9.4-8.3C.9 9.4 2.1 6.6 5 6.6c2 0 3.4 1.1 4.6 2.6 1.2-1.5 2.6-2.6 4.6-2.6 2.9 0 4.1 2.8 2.4 5.5-2.3 4-9.6 8.3-9.6 8.3z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>
                </div>
                <div className="shop-card__footer">
                  <strong>BDT 3,800</strong>
                  <button type="button" aria-label="Add to cart">
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
            </div>

            <div className="shop-pagination">
              <button type="button">&lt;</button>
              <button type="button" className="active">1</button>
              <button type="button">2</button>
              <span>...</span>
              <button type="button">12</button>
              <button type="button">&gt;</button>
            </div>
          </div>
        </section>

        <section className="shop-benefits">
          <div>
            <span className="shop-benefits__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  d="M3 12h10v6H3zM13 9h4l4 3v6h-8zM6 18h1M17 18h1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div>
              <h4>Free Nationwide Delivery</h4>
              <p>On orders over BDT 5,000</p>
            </div>
          </div>
          <div>
            <span className="shop-benefits__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 3l7 3v5c0 4-3 7-7 10-4-3-7-6-7-10V6z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div>
              <h4>Authenticity Guarantee</h4>
              <p>100% Genuine Full Grain</p>
            </div>
          </div>
          <div>
            <span className="shop-benefits__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  d="M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div>
              <h4>Easy Returns</h4>
              <p>15-day hassle-free policy</p>
            </div>
          </div>
          <div>
            <span className="shop-benefits__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  d="M14 7l3 3-7 7H7v-3zM16 5l3 3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div>
              <h4>Lifetime Warranty</h4>
              <p>On all hardware and stitching</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
