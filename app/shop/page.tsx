import Footer from "../components/Footer";
import Header from "../components/Header";
import ShopContent from "./ShopContent";
import { fetchProducts, resolveImageUrl, formatPrice } from "../lib/api";

export default async function ShopPage() {
  // Fetch initial data server-side for fast first paint
  const initialData = await fetchProducts({ is_bestseller: "1", limit: "12" });

  // Extract hero products from live data (with fallbacks)
  const heroProducts = initialData?.data?.filter((p) => p.image_full_url || p.image_url) ?? [];
  const topProduct = heroProducts[0] ?? null;
  const sideProducts = heroProducts.slice(1, 3);

  const heroImage = topProduct
    ? topProduct.image_full_url || resolveImageUrl(topProduct.image_url) || ""
    : "/images/shop/shop-img-6.png";
  const heroBadge = topProduct?.is_new ? "New Arrival" : topProduct?.is_bestseller ? "Bestseller" : "Featured";
  const heroName = topProduct?.name || "The Artisan Executive Briefcase";
  const heroDesc = topProduct?.description?.slice(0, 120) || "Masterfully crafted from vegetable-tanned hide for the modern professional.";
  const heroPrice = formatPrice(topProduct?.sale_price ?? topProduct?.price);
  const heroSlug = topProduct?.slug;

  return (
    <>
      <Header active="bestsellers" searchPlaceholder="Search heritage goods..." />
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
            <a className="shop-hero__link" href="/shop">View All Products</a>
          </div>

          <div className="shop-hero__grid">
            <div className="shop-hero__feature">
              <img src={heroImage} alt={heroName} />
              <div className="shop-hero__overlay">
                <span>{heroBadge}</span>
                <h2>{heroName}</h2>
                <p>{heroDesc}</p>
                <a className="shop-hero__btn" href={heroSlug ? `/shop/${heroSlug}` : "/shop"}>
                  Shop Now — {heroPrice}
                </a>
              </div>
            </div>
            <div className="shop-hero__cards">
              {sideProducts.length > 0 ? (
                sideProducts.map((p, i) => {
                  const img = p.image_full_url || resolveImageUrl(p.image_url) || "";
                  const price = formatPrice(p.sale_price ?? p.price);
                  const slug = p.slug;
                  return (
                    <a
                      key={i}
                      className={`shop-hero__card${i === 1 ? " shop-hero__card--muted" : ""}`}
                      href={slug ? `/shop/${slug}` : "/shop"}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div>
                        <h3>{p.name}</h3>
                        <p>{p.category || "Hand-stitched leather"}</p>
                        <strong>{price}</strong>
                      </div>
                      <img src={img} alt={p.name} />
                    </a>
                  );
                })
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </section>

        <ShopContent initialData={initialData} />

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
