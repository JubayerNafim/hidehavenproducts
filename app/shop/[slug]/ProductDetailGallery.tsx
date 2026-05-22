"use client";

import type { ProductMedia } from "../../lib/api";

const MEDIA_BASE =
  process.env.NEXT_PUBLIC_MEDIA_BASE_URL || "https://hidehaven.me";

const resolveUrl = (img: ProductMedia): string => {
  if (img.full_url) return img.full_url;
  const path = img.media_url || img.url;
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${MEDIA_BASE}${path}`;
};

type Props = {
  images: ProductMedia[];
  productName: string;
};

export function ProductDetailGallery({ images, productName }: Props) {
  if (images.length <= 1) return null;

  const handleThumbClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const gallery = btn.closest(".product-detail__gallery");
    const mainImg = gallery?.querySelector<HTMLImageElement>(
      ".product-detail__main-image img"
    );
    if (mainImg && btn.dataset.image) {
      mainImg.src = btn.dataset.image;
    }
  };

  return (
    <div className="product-detail__thumbs">
      {images.map((img, i) => (
        <button
          key={i}
          className="product-detail__thumb"
          data-image={resolveUrl(img)}
          onClick={handleThumbClick}
        >
          <img
            src={resolveUrl(img)}
            alt={`${productName} view ${i + 1}`}
          />
        </button>
      ))}
    </div>
  );
}
