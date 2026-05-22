"use client";

import { useState } from "react";
import { useCart } from "../../components/CartContext";
import { useWishlist } from "../../components/WishlistContext";
import { formatPrice, type Product } from "../../lib/api";

type Props = {
  product: Product;
  inStock: boolean;
};

export function ProductDetailClient({ product, inStock }: Props) {
  const { addItem } = useCart();
  const { addItem: addWishlist, removeItem: removeWishlist, isWishlisted } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!inStock) return;
    addItem({
      product_id: product.id,
      name: product.name,
      price: product.sale_price ?? product.price,
      quantity,
      image_url: product.image_url,
      image_full_url: product.image_full_url,
      slug: product.slug,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = () => {
    if (product.id && wishlisted) {
      removeWishlist(product.id);
    } else {
      addWishlist({
        product_id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        image_full_url: product.image_full_url,
        slug: product.slug,
      });
    }
  };

  return (
    <div className="product-detail__actions">
      <div className="product-detail__qty">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span>{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.min(99, q + 1))}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <button
        className={`product-detail__add-to-cart ${addedToCart ? "added" : ""}`}
        onClick={handleAddToCart}
        disabled={!inStock}
      >
        {addedToCart ? "✓ Added to Cart" : inStock ? "Add to Cart" : "Out of Stock"}
      </button>

      <button
        className={`product-detail__wishlist-btn ${wishlisted ? "wishlisted" : ""}`}
        onClick={handleWishlist}
        type="button"
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" width="22" height="22">
          <path
            d="M12 20.4s-7.1-4.3-9.4-8.3C.9 9.4 2.1 6.6 5 6.6c2 0 3.4 1.1 4.6 2.6 1.2-1.5 2.6-2.6 4.6-2.6 2.9 0 4.1 2.8 2.4 5.5-2.3 4-9.6 8.3-9.6 8.3z"
            fill={wishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>
    </div>
  );
}
