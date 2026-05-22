"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL, formatPrice, resolveImageUrl } from "../../lib/api";

type Product = {
  id: number;
  name: string;
  price: number;
  sale_price: number | null;
  stock: number;
  category: string;
  type: string;
  slug: string;
  image_full_url: string | null;
  is_featured: number;
  is_new: number;
  is_bestseller: number;
  on_sale: number;
};

export default function AdminInventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStock, setEditingStock] = useState<Record<number, string>>({});
  const [saving, setSaving] = useState<number | null>(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/products`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.data) setProducts(d.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleStockChange = (id: number, value: string) => {
    setEditingStock((prev) => ({ ...prev, [id]: value }));
  };

  const saveStock = async (id: number) => {
    const newStock = parseInt(editingStock[id] ?? "", 10);
    if (isNaN(newStock) || newStock < 0) return;

    setSaving(id);
    setSuccess("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: newStock }),
      });
      const data = await res.json();
      if (data?.data?.updated) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, stock: newStock } : p))
        );
        setSuccess("Stock updated ✅");
        setTimeout(() => setSuccess(""), 2000);
      }
    } catch {
      // ignore
    }
    setSaving(null);
  };

  if (loading) return <div className="admin-loading"><div className="admin-loading__spinner" /><p>Loading inventory...</p></div>;

  return (
    <div className="admin-inventory">
      <div className="admin-page-header">
        <h1>Inventory Management</h1>
        <a href="/admin/products/new" className="admin-btn">+ Add Product</a>
      </div>

      {success && <div className="admin-toast">{success}</div>}

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Sale Price</th>
                <th>Current Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const isLow = p.stock <= 5 && p.stock > 0;
                const isOut = p.stock <= 0;
                return (
                  <tr key={p.id}>
                    <td>
                      <div className="admin-product-cell">
                        {p.image_full_url && (
                          <img src={p.image_full_url} alt="" className="admin-thumb" />
                        )}
                        <div>
                          <strong>{p.name}</strong>
                          <br />
                          <small className="admin-muted">{p.type}</small>
                        </div>
                      </div>
                    </td>
                    <td>{p.category || "—"}</td>
                    <td>{formatPrice(p.price)}</td>
                    <td>{p.sale_price ? formatPrice(p.sale_price) : "—"}</td>
                    <td>
                      <span className={`admin-stock-badge ${isOut ? "out" : isLow ? "low" : "ok"}`}>
                        {isOut ? "Out" : isLow ? "Low" : "OK"}
                      </span>
                    </td>
                    <td>
                      <div className="admin-stock-edit">
                        <input
                          type="number"
                          min="0"
                          value={editingStock[p.id] ?? p.stock}
                          onChange={(e) => handleStockChange(p.id, e.target.value)}
                          className="admin-stock-input"
                        />
                        <button
                          className="admin-btn-sm"
                          onClick={() => saveStock(p.id)}
                          disabled={saving === p.id}
                        >
                          {saving === p.id ? "..." : "Update"}
                        </button>
                      </div>
                    </td>
                    <td>
                      <a href={`/shop/${p.slug}`} className="admin-link" target="_blank">View</a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
