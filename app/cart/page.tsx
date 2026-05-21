import Footer from "../components/Footer";
import Header from "../components/Header";

export default function CartPage() {
  const hasItems = true;
  const cartCount = hasItems ? 2 : 0;

  return (
    <>
      <Header searchPlaceholder="Search heritage goods..." cartCount={cartCount} />
      <main className="cart-page">
        <nav className="cart-breadcrumbs">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/shop">Shop</a>
          <span>/</span>
          <span className="cart-breadcrumbs__current">Cart</span>
        </nav>

        <section className="cart-hero">
          <div>
            <h1>Your Cart</h1>
            <p>Review your essentials and checkout securely.</p>
          </div>
          <a className="cart-hero__link" href="/shop">Continue Shopping</a>
        </section>

        {hasItems ? (
          <>
            <section className="cart-grid">
              <div className="cart-items">
                <article className="cart-item">
                  <img src="/images/shop/shop-img-10.png" alt="" />
                  <div className="cart-item__details">
                    <h3>The Heritage Satchel</h3>
                    <p>Full Grain Leather</p>
                    <div className="cart-item__meta">
                      <span>Color: Cognac</span>
                      <span>Size: 16 in</span>
                    </div>
                  </div>
                  <div className="cart-item__qty">
                    <button type="button" aria-label="Decrease quantity">
                      <span>-</span>
                    </button>
                    <span className="cart-item__count">1</span>
                    <button type="button" aria-label="Increase quantity">
                      <span>+</span>
                    </button>
                  </div>
                  <strong className="cart-item__price">BDT 15,400</strong>
                  <button className="cart-item__remove" type="button" aria-label="Remove item">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
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
                </article>

                <article className="cart-item">
                  <img src="/images/shop/shop-img-8.png" alt="" />
                  <div className="cart-item__details">
                    <h3>Obsidian Weekender</h3>
                    <p>48hr Capacity</p>
                    <div className="cart-item__meta">
                      <span>Color: Midnight</span>
                      <span>Size: 20 in</span>
                    </div>
                  </div>
                  <div className="cart-item__qty">
                    <button type="button" aria-label="Decrease quantity">
                      <span>-</span>
                    </button>
                    <span className="cart-item__count">1</span>
                    <button type="button" aria-label="Increase quantity">
                      <span>+</span>
                    </button>
                  </div>
                  <strong className="cart-item__price">BDT 32,500</strong>
                  <button className="cart-item__remove" type="button" aria-label="Remove item">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
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
                </article>

                <article className="cart-item cart-item--compact">
                  <img src="/images/shop/shop-img-4.png" alt="" />
                  <div className="cart-item__details">
                    <h3>Slim Bifold Wallet</h3>
                    <p>RFID Protection</p>
                    <div className="cart-item__meta">
                      <span>Color: Sand</span>
                      <span>Size: One</span>
                    </div>
                  </div>
                  <div className="cart-item__qty">
                    <button type="button" aria-label="Decrease quantity">
                      <span>-</span>
                    </button>
                    <span className="cart-item__count">2</span>
                    <button type="button" aria-label="Increase quantity">
                      <span>+</span>
                    </button>
                  </div>
                  <strong className="cart-item__price">BDT 6,400</strong>
                  <button className="cart-item__remove" type="button" aria-label="Remove item">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
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
                </article>
              </div>

              <aside className="cart-summary">
                <div className="cart-summary__panel">
                  <h2>Order Summary</h2>
                  <div className="cart-summary__row">
                    <span>Subtotal</span>
                    <strong>BDT 54,300</strong>
                  </div>
                  <div className="cart-summary__row">
                    <span>Shipping</span>
                    <span>BDT 0</span>
                  </div>
                  <div className="cart-summary__row">
                    <span>Discount</span>
                    <span>-BDT 1,500</span>
                  </div>
                  <div className="cart-summary__total">
                    <span>Total</span>
                    <strong>BDT 52,800</strong>
                  </div>
                  <button className="cart-summary__cta" type="button">Proceed to Checkout</button>
                  <p className="cart-summary__note">
                    Secure checkout with SSL encryption and trusted payment partners.
                  </p>
                </div>

                <div className="cart-summary__promo">
                  <h3>Have a promo code?</h3>
                  <div className="cart-summary__input">
                    <input type="text" placeholder="Enter code" />
                    <button type="button">Apply</button>
                  </div>
                </div>

                <div className="cart-summary__support">
                  <h4>Need help?</h4>
                  <p>Chat with our leather specialists for sizing and care questions.</p>
                  <a href="/collections">Browse Gift Sets</a>
                </div>
              </aside>
            </section>

            <section className="cart-recommendations">
              <div className="cart-recommendations__header">
                <h2>You may also love</h2>
                <a href="/shop">Shop Bestsellers</a>
              </div>
              <div className="cart-recommendations__grid">
                <article>
                  <img src="/images/shop/shop-img-11.png" alt="" />
                  <div>
                    <h3>Explorer Watch Roll</h3>
                    <p>BDT 5,900</p>
                  </div>
                </article>
                <article>
                  <img src="/images/shop/shop-img-9.png" alt="" />
                  <div>
                    <h3>Executive Desk Pad</h3>
                    <p>BDT 12,000</p>
                  </div>
                </article>
                <article>
                  <img src="/images/shop/shop-img-7.png" alt="" />
                  <div>
                    <h3>Pro Camera Strap</h3>
                    <p>BDT 3,800</p>
                  </div>
                </article>
              </div>
            </section>
          </>
        ) : (
          <section className="cart-empty">
            <div className="cart-empty__card">
              <div>
                <h2>Your cart is empty</h2>
                <p>Explore handcrafted pieces that pair beautifully with your collection.</p>
                <a className="cart-empty__cta" href="/shop">Start Shopping</a>
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
