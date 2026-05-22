"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { API_BASE_URL, formatPrice } from "../../../lib/api";

type OrderItem = {
  id: number;
  product_id: number | null;
  product_name: string;
  unit_price: number;
  quantity: number;
};

type Order = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  delivery_area: string;
  note: string;
  admin_comment: string | null;
  delivery_fee: number;
  subtotal: number;
  total: number;
  status: string;
  created_at: string;
  items: OrderItem[];
};

const statusOptions = ["pending", "confirmed", "shipped", "completed", "cancelled", "returned"];

export default function AdminOrderEditor() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Editable fields
  const [status, setStatus] = useState("");
  const [adminComment, setAdminComment] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/orders/${orderId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.data) {
          setOrder(d.data);
          setStatus(d.data.status);
          setAdminComment(d.data.admin_comment || "");
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [orderId]);

  const handleSave = async () => {
    setSaving(true);
    setSuccess("");
    setError("");

    const payload: Record<string, unknown> = {
      status,
      admin_comment: adminComment,
    };

    // If there's a discount, send it
    if (discount > 0) {
      payload.discount = discount;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data?.data?.updated) {
        setSuccess("Order updated ✅");
        setTimeout(() => setSuccess(""), 3000);
        // Refresh
        const refresh = await fetch(`${API_BASE_URL}/api/admin/orders/${orderId}`);
        const refreshed = await refresh.json();
        if (refreshed?.data) setOrder(refreshed.data);
      } else {
        setError(data?.error || "Failed to update");
      }
    } catch {
      setError("Connection failed");
    }
    setSaving(false);
  };

  if (loading) return <div className="admin-loading"><div className="admin-loading__spinner" /><p>Loading order...</p></div>;
  if (!order) return <div className="admin-error">Order not found</div>;

  return (
    <div className="admin-order-editor">
      <div className="admin-page-header">
        <h1>Order #{order.id}</h1>
        <a href="/admin/orders" className="admin-link">← Back to Orders</a>
      </div>

      {success && <div className="admin-toast">{success}</div>}
      {error && <div className="admin-error">{error}</div>}

      <div className="admin-order-grid">
        {/* Customer Info */}
        <div className="admin-card">
          <h2>Customer Details</h2>
          <div className="admin-info-list">
            <div><strong>Name:</strong> {order.name}</div>
            <div><strong>Phone:</strong> {order.phone}</div>
            <div><strong>Email:</strong> {order.email || "—"}</div>
            <div><strong>Address:</strong> {order.address}</div>
            <div><strong>Area:</strong> {order.delivery_area}</div>
            <div><strong>Placed:</strong> {new Date(order.created_at).toLocaleString()}</div>
          </div>
        </div>

        {/* Order Items */}
        <div className="admin-card">
          <h2>Items</h2>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>Product</th><th>Price</th><th>Qty</th><th>Total</th></tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product_name}</td>
                    <td>{formatPrice(item.unit_price)}</td>
                    <td>{item.quantity}</td>
                    <td>{formatPrice(item.unit_price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="admin-order-totals">
            <div><span>Subtotal:</span> <strong>{formatPrice(order.subtotal)}</strong></div>
            <div><span>Delivery:</span> <strong>{formatPrice(order.delivery_fee)}</strong></div>
            {discount > 0 && <div><span>Discount:</span> <strong className="admin-discount">-{formatPrice(discount)}</strong></div>}
            <div className="admin-total-row"><span>Total:</span> <strong>{formatPrice(order.total)}</strong></div>
          </div>
        </div>

        {/* Edit Panel */}
        <div className="admin-card admin-card--wide">
          <h2>Edit Order</h2>
          <div className="admin-edit-form">
            <div className="admin-edit-field">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>

            <div className="admin-edit-field">
              <label>Discount (BDT)</label>
              <input
                type="number"
                min="0"
                value={discount}
                onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
                placeholder="0"
              />
            </div>

            <div className="admin-edit-field admin-edit-field--full">
              <label>Admin Note (internal)</label>
              <textarea
                value={adminComment}
                onChange={(e) => setAdminComment(e.target.value)}
                rows={4}
                placeholder="Add internal notes about this order..."
              />
            </div>

            <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
