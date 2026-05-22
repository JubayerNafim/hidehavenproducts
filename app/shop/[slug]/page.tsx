import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { fetchProductBySlug, fetchProducts, resolveImageUrl, formatPrice } from "../../lib/api";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetailClient } from "./ProductDetailClient";
import { ProductDetailGallery } from "./ProductDetailGallery";
import { ProductDetailColors } from "./ProductDetailColors";

// ── Generate static params for bestseller products ─────────────────

export async function generateStaticParams() {
  const res = await fetchProducts({ is_bestseller: "1", limit: "50" });
  const products = res?.data ?? [];
  return products
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug! }));
}

// ── Metadata ───────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const detail = await fetchProductBySlug(params.slug);
  const product = detail?.data;
  if (!product) return { title: "Product Not Found — Hide Haven" };

  return {
    title: `${product.name} — Hide Haven`,
    description: product.description?.slice(0, 160) || `${product.name} — handcrafted full-grain leather.`,
    openGraph: {
      title: `${product.name} — Hide Haven`,
      description: product.description?.slice(0, 160) || "",
      images: product.image_full_url
        ? [{ url: product.image_full_url }]
        : [],
    },
  };
}

// ── Server Component ───────────────────────────────────────────────

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const detail = await fetchProductBySlug(params.slug);

  if (!detail?.data) {
    notFound();
  }

  const product = detail.data;
  const media = detail.media ?? [];
  const images = media.length > 0 ? media : [];
  const mainImage =
    product.image_full_url || resolveImageUrl(product.image_url) || "";

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: product.name, href: "#" },
  ];

  const displayPrice = formatPrice(product.sale_price ?? product.price);
  const originalPrice = product.sale_price ? formatPrice(product.price) : null;
  const inStock = (product.stock ?? 0) > 0;
  const colors = product.colors ? product.colors.split(",").map((c) => c.trim()) : [];

  return (
    <>
      <Header />
      <main className="product-detail-page">
        {/* Breadcrumbs */}
        <nav className="product-detail__breadcrumbs">
          {breadcrumbItems.map((item, i) => (
            <span key={i}>
              <a href={item.href}>{item.label}</a>
              {i < breadcrumbItems.length - 1 && <span className="sep">/</span>}
            </span>
          ))}
        </nav>

        <div className="product-detail__layout">
          {/* Gallery */}
          <div className="product-detail__gallery">
            <div className="product-detail__main-image">
              <img src={mainImage} alt={product.name} />
              {product.is_new ? (
                <span className="badge badge--brown">New</span>
              ) : product.is_bestseller ? (
                <span className="badge badge--red">Bestseller</span>
              ) : null}
            </div>
            <ProductDetailGallery images={images} productName={product.name} />
          </div>

          {/* Info */}
          <div className="product-detail__info">
            <p className="product-detail__category">{product.category || "Accessories"}</p>
            <h1>{product.name}</h1>
            <div className="product-detail__rating">
              <span className="rating">
                <img src="/images/asset-08.svg" alt="" />
                <img src="/images/asset-08.svg" alt="" />
                <img src="/images/asset-08.svg" alt="" />
                <img src="/images/asset-08.svg" alt="" />
                <img src="/images/asset-09.svg" alt="" />
              </span>
              <span>(12 reviews)</span>
            </div>

            <div className="product-detail__pricing">
              <strong className="product-detail__price">{displayPrice}</strong>
              {originalPrice && (
                <span className="product-detail__original">{originalPrice}</span>
              )}
            </div>

            <p className="product-detail__desc">{product.description || "Handcrafted from full-grain leather with traditional saddle stitching."}</p>

            <ProductDetailColors colors={colors} />

            {/* Stock status */}
            <p className={`product-detail__stock ${inStock ? "" : "out-of-stock"}`}>
              {inStock ? "✓ In Stock" : "✕ Out of Stock"}
            </p>

            {/* Quantity & Add to Cart */}
            <ProductDetailClient product={product} inStock={inStock} />

            {/* Features */}
            <div className="product-detail__features">
              <div className="product-detail__feature">
                <img src="/images/asset-15.svg" alt="" />
                <span>Full-Grain Leather</span>
              </div>
              <div className="product-detail__feature">
                <img src="/images/asset-16.svg" alt="" />
                <span>Saddle Stitched</span>
              </div>
              <div className="product-detail__feature">
                <img src="/images/asset-17.svg" alt="" />
                <span>Direct from Artisan</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
