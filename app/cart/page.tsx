"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useCart } from "../components/CartContext";
import { formatPrice, resolveImageUrl, placeOrder } from "../lib/api";
import type { OrderPayload } from "../lib/api";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const hasItems = items.length > 0;
  const DELIVERY_FEE_DHAKA = 0;
  const DELIVERY_FEE_OUTSIDE = 120;

  const [deliveryArea, setDeliveryArea] = useState<"dhaka" | "outside">("dhaka");
  const [showCheckout, setShowCheckout] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<number | null>(null);
  const [orderError, setOrderError] = useState("");

  // Checkout form state
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    note: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const deliveryFee = deliveryArea === "dhaka" ? DELIVERY_FEE_DHAKA : DELIVERY_FEE_OUTSIDE;
  const total = subtotal + deliveryFee;

  const handleQuantity = (index: number, delta: number) => {
    const newQty = items[index].quantity + delta;
    if (newQty <= 0) {
      removeItem(index);
    } else {
      updateQuantity(index, newQty);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.phone.trim()) errors.phone = "Phone is required";
    if (!form.address.trim()) errors.address = "Address is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;
    setSubmitting(true);
    setOrderError("");

    const payload: OrderPayload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      email: form.email.trim() || undefined,
      delivery_area: deliveryArea,
      note: form.note.trim() || undefined,
      delivery_fee: deliveryFee,
      items: items.map((item) => ({
        product_id: item.product_id,
        product_name: item.name,
        unit_price: item.price,
        quantity: item.quantity,
      })),
    };

    const result = await placeOrder(payload);
    if (result?.data?.order_id) {
      setOrderSuccess(result.data.order_id);
      clearCart();
    } else {
      setOrderError(result?.error || "Failed to place order. Please try again.");
    }
    setSubmitting(false);
  };

  // ── Order Success View ───────────────────────────────────────────

  if (orderSuccess) {
    return (
      <>
        <Header />
        <main className="cart-page">
          <div className="order-success">
            <div className="order-success__card">
              <div className="order-success__icon">✓</div>
              <h2>Order Placed Successfully!</h2>
              <p>Your order <strong>#{orderSuccess}</strong> has been received.</p>
              <p>We will contact you at <strong>{form.phone}</strong> for delivery confirmation.</p>
              <a className="cart-empty__cta" href="/shop">Continue Shopping</a>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header searchPlaceholder="Search heritage goods..." />
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
                {items.map((item, index) => (
                  <article className="cart-item" key={index}>
                    <img
                      src={item.image_full_url || resolveImageUrl(item.image_url) || "/images/asset-07.png"}
                      alt={item.name}
                    />
                    <div className="cart-item__details">
                      <h3>{item.name}</h3>
                      <p>{item.color ? `Color: ${item.color}` : "Full Grain Leather"}</p>
                      {item.size && (
                        <div className="cart-item__meta">
                          <span>Size: {item.size}</span>
                        </div>
                      )}
                    </div>
                    <div className="cart-item__qty">
                      <button type="button" aria-label="Decrease quantity" onClick={() => handleQuantity(index, -1)}>
                        <span>−</span>
                      </button>
                      <span className="cart-item__count">{item.quantity}</span>
                      <button type="button" aria-label="Increase quantity" onClick={() => handleQuantity(index, 1)}>
                        <span>+</span>
                      </button>
                    </div>
                    <strong className="cart-item__price">{formatPrice(item.price * item.quantity)}</strong>
                    <button className="cart-item__remove" type="button" aria-label="Remove item" onClick={() => removeItem(index)}>
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
                ))}
              </div>

              <aside className="cart-summary">
                <div className="cart-summary__panel">
                  <h2>Order Summary</h2>
                  <div className="cart-summary__row">
                    <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>
                  <div className="cart-summary__row">
                    <span>Delivery</span>
                    <select
                      value={deliveryArea}
                      onChange={(e) => setDeliveryArea(e.target.value as "dhaka" | "outside")}
                      className="cart-summary__select"
                    >
                      <option value="dhaka">Inside Dhaka (Free)</option>
                      <option value="outside">Outside Dhaka (BDT 120)</option>
                    </select>
                  </div>
                  <div className="cart-summary__row">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? "Free" : `BDT ${deliveryFee}`}</span>
                  </div>
                  <div className="cart-summary__total">
                    <span>Total</span>
                    <strong>{formatPrice(total)}</strong>
                  </div>
                  <button
                    className="cart-summary__cta"
                    type="button"
                    onClick={() => setShowCheckout(!showCheckout)}
                  >
                    {showCheckout ? "Hide Checkout" : "Proceed to Checkout"}
                  </button>
                  <p className="cart-summary__note">
                    Secure checkout with SSL encryption and trusted payment partners.
                  </p>
                </div>

                {/* Checkout Form */}
                {showCheckout && (
                  <div className="cart-checkout-form">
                    <h3>Delivery Details</h3>
                    {orderError && <div className="cart-checkout-form__error">{orderError}</div>}
                    <div className="cart-checkout-form__field">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                      {formErrors.name && <span className="field-error">{formErrors.name}</span>}
                    </div>
                    <div className="cart-checkout-form__field">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                      {formErrors.phone && <span className="field-error">{formErrors.phone}</span>}
                    </div>
                    <div className="cart-checkout-form__field">
                      <label>Email (optional)</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div className="cart-checkout-form__field">
                      <label>Delivery Address *</label>
                      <textarea
                        placeholder="Street, area, landmark"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        rows={3}
                      />
                      {formErrors.address && <span className="field-error">{formErrors.address}</span>}
                    </div>
                    <div className="cart-checkout-form__field">
                      <label>Order Note (optional)</label>
                      <textarea
                        placeholder="Any special instructions"
                        value={form.note}
                        onChange={(e) => setForm({ ...form, note: e.target.value })}
                        rows={2}
                      />
                    </div>
                    <button
                      className="cart-summary__cta"
                      type="button"
                      onClick={handleCheckout}
                      disabled={submitting}
                    >
                      {submitting ? "Placing Order..." : `Place Order — ${formatPrice(total)}`}
                    </button>
                  </div>
                )}

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
                  <a href="/shop">
                    <img src="/images/shop/shop-img-11.png" alt="" />
                    <div>
                      <h3>Explorer Watch Roll</h3>
                      <p>BDT 5,900</p>
                    </div>
                  </a>
                </article>
                <article>
                  <a href="/shop">
                    <img src="/images/shop/shop-img-9.png" alt="" />
                    <div>
                      <h3>Executive Desk Pad</h3>
                      <p>BDT 12,000</p>
                    </div>
                  </a>
                </article>
                <article>
                  <a href="/shop">
                    <img src="/images/shop/shop-img-7.png" alt="" />
                    <div>
                      <h3>Pro Camera Strap</h3>
                      <p>BDT 3,800</p>
                    </div>
                  </a>
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
