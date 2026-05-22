"use client";

import { useState } from "react";
import { API_BASE_URL, formatPrice } from "../../../lib/api";

type LineItem = {
  key: number;
  product_name: string;
  unit_price: number;
  quantity: number;
};

let nextKey = 1;

export default function AdminNewOrder() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryArea, setDeliveryArea] = useState<"dhaka" | "outside">("dhaka");
  const [note, setNote] = useState("");
  const [discount, setDiscount] = useState(0);
  const [items, setItems] = useState<LineItem[]>([{ key: 0, product_name: "", unit_price: 0, quantity: 1 }]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<number | null>(null);
  const [error, setError] = useState("");

  const deliveryFee = deliveryArea === "dhaka" ? 60 : 120;
  const subtotal = items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
  const total = Math.max(0, subtotal + deliveryFee - discount);

  const addItem = () => {
    setItems([...items, { key: nextKey++, product_name: "", unit_price: 0, quantity: 1 }]);
  };

  const updateItem = (key: number, field: keyof LineItem, value: string | number) => {
    setItems(items.map((i) => (i.key === key ? { ...i, [field]: value } : i)));
  };

  const removeItem = (key: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((i) => i.key !== key));
  };

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError("Name, phone, and address are required");
      return;
    }
    if (items.some((i) => !i.product_name.trim() || i.unit_price <= 0 || i.quantity <= 0)) {
      setError("All items need a name, valid price, and quantity");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          address: address.trim(),
          delivery_area: deliveryArea,
          note,
          discount,
          delivery_fee: deliveryFee,
          items: items.map((i) => ({
            product_name: i.product_name.trim(),
            unit_price: i.unit_price,
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (data?.data?.order_id) {
        setSuccess(data.data.order_id);
      } else {
        setError(data?.error || "Failed to create order");
      }
    } catch {
      setError("Connection failed");
    }
    setSubmitting(false);
  };

  if (success) {
    return (
      <div className="admin-new-order-success">
        <div className="admin-success-card">
          <div className="admin-success-icon">✅</div>
          <h2>Order #{success} Created</h2>
          <p>Total: {formatPrice(total)} | Status: Confirmed</p>
          <div className="admin-success-actions">
            <a href={`/admin/orders/${success}`} className="admin-btn">View Order</a>
            <a href="/admin/orders" className="admin-link">All Orders</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-new-order">
      <div className="admin-page-header">
        <h1>New Order (Manual)</h1>
      </div>

      {error && <div className="admin-error">{error}</div>}

      <div className="admin-order-form-grid">
        {/* Customer */}
        <div className="admin-card">
          <h2>Customer Details</h2>
          <div className="admin-edit-form">
            <div className="admin-edit-field">
              <label>Full Name *</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Customer name" />
            </div>
            <div className="admin-edit-field">
              <label>Phone *</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="01XXXXXXXXX" />
            </div>
            <div className="admin-edit-field">
              <label>Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" />
            </div>
            <div className="admin-edit-field">
              <label>Address *</label>
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={2} placeholder="Delivery address" />
            </div>
            <div className="admin-edit-field">
              <label>Delivery Area</label>
              <select value={deliveryArea} onChange={(e) => setDeliveryArea(e.target.value as "dhaka" | "outside")}>
                <option value="dhaka">Inside Dhaka (BDT 60)</option>
                <option value="outside">Outside Dhaka (BDT 120)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="admin-card">
          <div className="admin-card__header">
            <h2>Items</h2>
            <button className="admin-btn-sm" onClick={addItem}>+ Add Item</button>
          </div>
          <div className="admin-edit-form">
            {items.map((item, i) => (
              <div key={item.key} className="admin-order-item-row">
                <input
                  placeholder="Product name"
                  value={item.product_name}
                  onChange={(e) => updateItem(item.key, "product_name", e.target.value)}
                  className="admin-order-item-name"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={item.unit_price || ""}
                  onChange={(e) => updateItem(item.key, "unit_price", parseInt(e.target.value) || 0)}
                  className="admin-order-item-price"
                />
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.key, "quantity", parseInt(e.target.value) || 1)}
                  className="admin-order-item-qty"
                />
                <span className="admin-order-item-total">{formatPrice(item.unit_price * item.quantity)}</span>
                {items.length > 1 && (
                  <button className="admin-btn-danger" onClick={() => removeItem(item.key)}>✕</button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Summary & Submit */}
        <div className="admin-card admin-card--wide">
          <h2>Order Summary</h2>
          <div className="admin-order-totals">
            <div><span>Subtotal:</span> <strong>{formatPrice(subtotal)}</strong></div>
            <div><span>Delivery:</span> <strong>{formatPrice(deliveryFee)}</strong></div>
            <div className="admin-edit-field" style={{ flexDirection: "row", alignItems: "center", gap: "12px" }}>
              <label style={{ margin: 0, whiteSpace: "nowrap" }}>Discount (BDT):</label>
              <input
                type="number"
                min="0"
                value={discount}
                onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
                style={{ width: "120px" }}
              />
            </div>
            {discount > 0 && <div><span>Discount:</span> <strong className="admin-discount">-{formatPrice(discount)}</strong></div>}
            <div className="admin-total-row"><span>Total:</span> <strong>{formatPrice(total)}</strong></div>
          </div>

          <div className="admin-edit-field">
            <label>Note (optional)</label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="Order notes..." />
          </div>

          <button className="admin-btn admin-btn--primary" onClick={handleSubmit} disabled={submitting} style={{ marginTop: "16px" }}>
            {submitting ? "Creating..." : `Create Order — ${formatPrice(total)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
