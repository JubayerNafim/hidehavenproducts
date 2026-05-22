"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../../../lib/api";

type MediaItem = {
  key: number;
  url: string;
  type: "image" | "video";
};

let mediaKey = 1;

export default function AdminAddProduct() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [type, setType] = useState("wallet");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [colors, setColors] = useState("");
  const [stock, setStock] = useState(0);
  const [slug, setSlug] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBestseller, setIsBestseller] = useState(false);
  const [sortOrder, setSortOrder] = useState(0);
  const [media, setMedia] = useState<MediaItem[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const addMedia = () => {
    setMedia([...media, { key: mediaKey++, url: "", type: "image" }]);
  };

  const updateMedia = (key: number, field: "url" | "type", value: string) => {
    setMedia(media.map((m) => (m.key === key ? { ...m, [field]: value } : m)));
  };

  const removeMedia = (key: number) => {
    setMedia(media.filter((m) => m.key !== key));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || price <= 0 || !type.trim()) {
      setError("Name, price, and type are required");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description,
          price,
          sale_price: salePrice > 0 ? salePrice : null,
          type: type.trim(),
          category,
          color,
          colors,
          stock,
          slug: slug.trim() || undefined,
          image_url: imageUrl,
          youtube_url: youtubeUrl || undefined,
          is_new: isNew ? 1 : 0,
          is_featured: isFeatured ? 1 : 0,
          is_bestseller: isBestseller ? 1 : 0,
          sort_order: sortOrder,
          media: media.filter((m) => m.url.trim()).map((m) => ({
            url: m.url.trim(),
            type: m.type,
          })),
        }),
      });
      const data = await res.json();
      if (data?.data?.id) {
        router.push(`/admin/inventory`);
      } else {
        setError(data?.error || "Failed to create product");
      }
    } catch {
      setError("Connection failed");
    }
    setSubmitting(false);
  };

  // Auto-generate slug from name
  const generateSlug = () => {
    const generated = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    setSlug(generated);
  };

  return (
    <div className="admin-add-product">
      <div className="admin-page-header">
        <h1>Add New Product</h1>
      </div>

      {error && <div className="admin-error">{error}</div>}

      <form onSubmit={handleSubmit} className="admin-product-form">
        <div className="admin-product-form__grid">
          {/* Basic Info */}
          <div className="admin-card">
            <h2>Basic Information</h2>
            <div className="admin-edit-form">
              <div className="admin-edit-field">
                <label>Product Name *</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Heritage Bifold Wallet" required />
              </div>

              <div className="admin-edit-field">
                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="Full product description..." />
              </div>

              <div className="admin-field-row">
                <div className="admin-edit-field">
                  <label>Price (BDT) *</label>
                  <input type="number" min="1" value={price || ""} onChange={(e) => setPrice(parseInt(e.target.value) || 0)} required />
                </div>
                <div className="admin-edit-field">
                  <label>Sale Price (BDT)</label>
                  <input type="number" min="0" value={salePrice || ""} onChange={(e) => setSalePrice(parseInt(e.target.value) || 0)} />
                </div>
              </div>

              <div className="admin-field-row">
                <div className="admin-edit-field">
                  <label>Type *</label>
                  <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="wallet">Wallet</option>
                    <option value="belt">Belt</option>
                    <option value="bag">Bag</option>
                    <option value="accessory">Accessory</option>
                    <option value="care">Care Kit</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="admin-edit-field">
                  <label>Category</label>
                  <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Wallets, Belts" />
                </div>
              </div>

              <div className="admin-field-row">
                <div className="admin-edit-field">
                  <label>Stock</label>
                  <input type="number" min="0" value={stock} onChange={(e) => setStock(parseInt(e.target.value) || 0)} />
                </div>
                <div className="admin-edit-field">
                  <label>Sort Order</label>
                  <input type="number" min="0" value={sortOrder} onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)} />
                </div>
              </div>
            </div>
          </div>

          {/* Media & Flags */}
          <div className="admin-card">
            <h2>Media</h2>
            <div className="admin-edit-form">
              <div className="admin-edit-field">
                <label>Main Image URL</label>
                <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="/uploads/products/..." />
              </div>

              <div className="admin-edit-field">
                <label>YouTube URL (optional)</label>
                <input value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="https://youtube.com/..." />
              </div>

              <div className="admin-card__header" style={{ marginTop: "8px" }}>
                <label style={{ fontWeight: 600, fontSize: "14px" }}>Gallery Images</label>
                <button type="button" className="admin-btn-sm" onClick={addMedia}>+ Add Image</button>
              </div>
              {media.map((m) => (
                <div key={m.key} className="admin-media-row">
                  <input
                    placeholder="Image URL"
                    value={m.url}
                    onChange={(e) => updateMedia(m.key, "url", e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <select value={m.type} onChange={(e) => updateMedia(m.key, "type", e.target.value as "image" | "video")}>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                  <button type="button" className="admin-btn-danger" onClick={() => removeMedia(m.key)}>✕</button>
                </div>
              ))}
            </div>

            <h2 style={{ marginTop: "20px" }}>Flags</h2>
            <div className="admin-flags">
              <label className="admin-checkbox">
                <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} />
                New Arrival
              </label>
              <label className="admin-checkbox">
                <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
                Featured
              </label>
              <label className="admin-checkbox">
                <input type="checkbox" checked={isBestseller} onChange={(e) => setIsBestseller(e.target.checked)} />
                Bestseller
              </label>
            </div>
          </div>

          {/* Variants & SEO */}
          <div className="admin-card admin-card--wide">
            <h2>Variants & SEO</h2>
            <div className="admin-edit-form">
              <div className="admin-field-row">
                <div className="admin-edit-field">
                  <label>Color (single)</label>
                  <input value={color} onChange={(e) => setColor(e.target.value)} placeholder="e.g. Cognac" />
                </div>
                <div className="admin-edit-field">
                  <label>Colors (comma separated)</label>
                  <input value={colors} onChange={(e) => setColors(e.target.value)} placeholder="e.g. #8B4513, #2F1B0E, #D4A574" />
                </div>
              </div>

              <div className="admin-field-row">
                <div className="admin-edit-field">
                  <label>URL Slug</label>
                  <div className="admin-slug-row">
                    <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto-generated" />
                    <button type="button" className="admin-btn-sm" onClick={generateSlug}>Generate</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn--primary" disabled={submitting}>
            {submitting ? "Creating Product..." : "Create Product"}
          </button>
          <a href="/admin/inventory" className="admin-link">Cancel</a>
        </div>
      </form>
    </div>
  );
}
