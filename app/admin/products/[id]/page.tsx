"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_BASE_URL } from "../../../lib/api";

type MediaItem = {
  key: number;
  id?: number;
  url: string;
  type: "image" | "video";
};

let mediaKey = 100;

export default function AdminEditProduct() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form fields
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/products/${productId}`);
        const json = await res.json();
        if (json?.data) {
          const p = json.data;
          setName(p.name || "");
          setDescription(p.description || "");
          setPrice(p.price || 0);
          setSalePrice(p.sale_price || 0);
          setType(p.type || "wallet");
          setCategory(p.category || "");
          setColor(p.color || "");
          setColors(p.colors || "");
          setStock(p.stock ?? 0);
          setSlug(p.slug || "");
          setImageUrl(p.image_url || "");
          setYoutubeUrl(p.youtube_url || "");
          setIsNew(!!p.is_new);
          setIsFeatured(!!p.is_featured);
          setIsBestseller(!!p.is_bestseller);
          setSortOrder(p.sort_order || 0);
          if (p.media?.length) {
            setMedia(p.media.map((m: { id?: number; url?: string; media_url?: string; type?: string }) => ({
              key: mediaKey++,
              id: m.id,
              url: m.url || m.media_url || "",
              type: (m.type as "image" | "video") || "image",
            })));
          }
        } else {
          setError("Product not found");
        }
      } catch {
        setError("Failed to load product");
      }
      setLoading(false);
    };
    fetchProduct();
  }, [productId]);

  const addMedia = () => {
    setMedia([...media, { key: mediaKey++, url: "", type: "image" }]);
  };

  const updateMedia = (key: number, field: "url" | "type", value: string) => {
    setMedia(media.map((m) => (m.key === key ? { ...m, [field]: value } : m)));
  };

  const removeMedia = (key: number) => {
    setMedia(media.filter((m) => m.key !== key));
  };

  const generateSlug = () => {
    const generated = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    setSlug(generated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || price <= 0 || !type.trim()) {
      setError("Name, price, and type are required");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/products/${productId}`, {
        method: "PUT",
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
        }),
      });
      const data = await res.json();
      if (data?.data?.updated) {
        setSuccess("Product updated successfully ✅");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data?.error || "Failed to update product");
      }
    } catch {
      setError("Connection failed");
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading__spinner" />
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="admin-add-product">
      <div className="admin-page-header">
        <h1>Edit Product #{productId}</h1>
        <a href="/admin/inventory" className="admin-link">← Back to Inventory</a>
      </div>

      {success && <div className="admin-toast">{success}</div>}
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
                {imageUrl && (
                  <img
                    src={imageUrl.startsWith("http") ? imageUrl : `https://hidehaven.me${imageUrl}`}
                    alt="Preview"
                    style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px", marginTop: "4px", background: "#f5f2ed" }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                )}
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
            {submitting ? "Saving..." : "Save Changes"}
          </button>
          <a href="/admin/inventory" className="admin-link">Cancel</a>
        </div>
      </form>
    </div>
  );
}
