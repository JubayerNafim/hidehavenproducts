"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL, formatPrice } from "../../lib/api";

type Order = {
  id: number;
  name: string;
  phone: string;
  total: number;
  status: string;
  created_at: string;
};

const statusColors: Record<string, string> = {
  pending: "#f59e0b",
  confirmed: "#3b82f6",
  shipped: "#8b5cf6",
  completed: "#10b981",
  cancelled: "#ef4444",
  returned: "#f97316",
};

const statuses = ["", "pending", "confirmed", "shipped", "completed", "cancelled", "returned"];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const limit = 20;

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (statusFilter) params.set("status", statusFilter);

    fetch(`${API_BASE_URL}/api/admin/orders?${params}`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.data) setOrders(d.data);
        if (d?.meta) setTotal(d.meta.total);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page, statusFilter]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="admin-orders-page">
      <div className="admin-page-header">
        <h1>Orders</h1>
        <a href="/admin/orders/new" className="admin-btn">+ New Order</a>
      </div>

      {/* Status filter */}
      <div className="admin-filters">
        {statuses.map((s) => (
          <button
            key={s}
            className={`admin-filter-btn ${statusFilter === s ? "active" : ""}`}
            onClick={() => { setStatusFilter(s); setPage(1); }}
          >
            {s === "" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="admin-card">
        {loading ? (
          <div className="admin-loading"><div className="admin-loading__spinner" /><p>Loading...</p></div>
        ) : orders.length === 0 ? (
          <p className="admin-empty">No orders found</p>
        ) : (
          <>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td>#{o.id}</td>
                      <td>{o.name}</td>
                      <td>{o.phone}</td>
                      <td><strong>{formatPrice(o.total)}</strong></td>
                      <td>
                        <span className="admin-status" style={{ background: statusColors[o.status] || "#888" }}>
                          {o.status}
                        </span>
                      </td>
                      <td>{new Date(o.created_at).toLocaleDateString()}</td>
                      <td>
                        <a href={`/admin/orders/${o.id}`} className="admin-link">Edit</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="admin-pagination">
                <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>‹</button>
                <span>Page {page} of {totalPages}</span>
                <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>›</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
