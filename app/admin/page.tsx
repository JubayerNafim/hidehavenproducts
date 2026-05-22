"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL, formatPrice } from "../lib/api";

type DashboardData = {
  total_revenue: number;
  total_orders: number;
  pending_orders: number;
  total_products: number;
  out_of_stock: number;
  total_sold: number;
  low_stock: { id: number; name: string; stock: number; image_full_url: string | null }[];
  recent_orders: { id: number; name: string; phone: string; total: number; status: string; created_at: string }[];
  monthly_revenue: { month: string; revenue: number; orders: number }[];
  recent_activity: { action: string; details: string; created_at: string; username: string }[];
};

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/dashboard`);
        const json = await res.json();
        if (json?.data) setData(json.data);
        else setError("Failed to load dashboard");
      } catch {
        setError("Connection failed");
      }
      setLoading(false);
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="admin-loading"><div className="admin-loading__spinner" /><p>Loading dashboard...</p></div>;
  if (error) return <div className="admin-error">{error}</div>;
  if (!data) return <div className="admin-error">No data available</div>;

  const statusColors: Record<string, string> = {
    pending: "#f59e0b",
    confirmed: "#3b82f6",
    shipped: "#8b5cf6",
    completed: "#10b981",
    cancelled: "#ef4444",
    returned: "#f97316",
  };

  return (
    <div className="admin-dashboard">
      <h1>Dashboard</h1>

      {/* KPI Cards */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi">
          <span className="admin-kpi__icon">💰</span>
          <div>
            <strong>{formatPrice(data.total_revenue)}</strong>
            <span>Total Revenue</span>
          </div>
        </div>
        <div className="admin-kpi">
          <span className="admin-kpi__icon">📦</span>
          <div>
            <strong>{data.total_orders}</strong>
            <span>Total Orders</span>
          </div>
        </div>
        <div className="admin-kpi">
          <span className="admin-kpi__icon">⏳</span>
          <div>
            <strong>{data.pending_orders}</strong>
            <span>Pending Orders</span>
          </div>
        </div>
        <div className="admin-kpi">
          <span className="admin-kpi__icon">🏷️</span>
          <div>
            <strong>{data.total_products}</strong>
            <span>Total Products</span>
          </div>
        </div>
        <div className="admin-kpi">
          <span className="admin-kpi__icon">📉</span>
          <div>
            <strong>{data.out_of_stock}</strong>
            <span>Out of Stock</span>
          </div>
        </div>
        <div className="admin-kpi">
          <span className="admin-kpi__icon">🛒</span>
          <div>
            <strong>{data.total_sold}</strong>
            <span>Items Sold</span>
          </div>
        </div>
      </div>

      <div className="admin-dashboard__grid">
        {/* Recent Orders */}
        <div className="admin-card">
          <div className="admin-card__header">
            <h2>Recent Orders</h2>
            <a href="/admin/orders" className="admin-card__link">View All</a>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.recent_orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <a href={`/admin/orders/${order.id}`} className="admin-link">#{order.id}</a>
                    </td>
                    <td>{order.name}<br /><small>{order.phone}</small></td>
                    <td>{formatPrice(order.total)}</td>
                    <td>
                      <span className="admin-status" style={{ background: statusColors[order.status] || "#888" }}>
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock */}
        <div className="admin-card">
          <div className="admin-card__header">
            <h2>Low Stock Alerts</h2>
            <a href="/admin/inventory" className="admin-card__link">Manage</a>
          </div>
          {data.low_stock.length === 0 ? (
            <p className="admin-empty">All products are well-stocked ✅</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Product</th><th>Stock</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {data.low_stock.map((p) => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td><span className="admin-low-stock">{p.stock}</span></td>
                      <td><a href="/admin/inventory" className="admin-link">Restock</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Monthly Revenue */}
        <div className="admin-card admin-card--wide">
          <div className="admin-card__header">
            <h2>Monthly Revenue (6 Months)</h2>
          </div>
          {data.monthly_revenue.length === 0 ? (
            <p className="admin-empty">No data yet</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Month</th><th>Orders</th><th>Revenue</th></tr>
                </thead>
                <tbody>
                  {data.monthly_revenue.map((m) => (
                    <tr key={m.month}>
                      <td>{m.month}</td>
                      <td>{m.orders}</td>
                      <td><strong>{formatPrice(m.revenue)}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="admin-card">
          <div className="admin-card__header">
            <h2>Recent Activity</h2>
          </div>
          {data.recent_activity.length === 0 ? (
            <p className="admin-empty">No activity yet</p>
          ) : (
            <div className="admin-activity">
              {data.recent_activity.map((a, i) => (
                <div key={i} className="admin-activity__item">
                  <div className="admin-activity__dot" />
                  <div>
                    <strong>{a.username}</strong> — {a.details || a.action}
                    <br />
                    <small>{new Date(a.created_at).toLocaleString()}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
