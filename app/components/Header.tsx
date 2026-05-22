"use client";

import { useState, useCallback } from "react";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";

type HeaderProps = {
  active?: "collections" | "bestsellers" | "artisans" | "care-kits";
  searchPlaceholder?: string;
};

export default function Header({
  active,
  searchPlaceholder = "Search premium leather...",
}: HeaderProps) {
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const [searchQuery, setSearchQuery] = useState("");

  const isActive = (key: HeaderProps["active"]) => active === key;
  const cartLabel =
    typeof cartCount === "number" && cartCount > 0
      ? `Cart (${cartCount})`
      : "Cart";

  const handleSearch = useCallback(
    (e: React.FormEvent | React.KeyboardEvent) => {
      e.preventDefault();
      const q = searchQuery.trim();
      if (q) {
        window.location.href = `/shop?search=${encodeURIComponent(q)}`;
      }
    },
    [searchQuery]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch(e);
      }
    },
    [handleSearch]
  );

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__logo">
          <a href="/">
            <img src="/images/logo.png" alt="Hide Haven" className="site-header__logo-img" />
          </a>
        </div>
        <nav className="site-header__nav">
          <a
            className={`site-header__link ${isActive("collections") ? "site-header__link--active" : ""}`}
            href="/collections"
          >
            Collections
          </a>
          <a
            className={`site-header__link ${isActive("bestsellers") ? "site-header__link--active" : ""}`}
            href="/shop"
          >
            Bestsellers
          </a>
          <a
            className={`site-header__link ${isActive("artisans") ? "site-header__link--active" : ""}`}
            href="/artisans"
          >
            Artisans
          </a>
          <a
            className={`site-header__link ${isActive("care-kits") ? "site-header__link--active" : ""}`}
            href="/care-kits"
          >
            Care Kits
          </a>
        </nav>
        <div className="site-header__actions">
          <form className="site-header__search" onSubmit={handleSearch}>
            <span className="sr-only">Search</span>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button type="submit" aria-label="Search" className="site-header__search-btn">
              <img src="/images/header-search.svg" alt="" />
            </button>
          </form>
          <button
            className="site-header__icon site-header__icon--wishlist"
            type="button"
            aria-label="Wishlist"
            onClick={() => (window.location.href = "/wishlist")}
          >
            <img src="/images/header-heart.svg" alt="" />
            {wishlistCount > 0 && (
              <span className="site-header__badge">{wishlistCount}</span>
            )}
          </button>
          <button className="site-header__icon" type="button" aria-label="Account">
            <img src="/images/header-user.svg" alt="" />
          </button>
          <a className="site-header__cart" href="/cart">
            <img src="/images/header-cart.svg" alt="" />
            <span>{cartLabel}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
