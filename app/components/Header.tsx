type HeaderProps = {
  active?: "collections" | "bestsellers" | "artisans" | "care-kits";
  searchPlaceholder?: string;
  cartCount?: number;
};

export default function Header({
  active,
  searchPlaceholder = "Search premium leather...",
  cartCount
}: HeaderProps) {
  const isActive = (key: HeaderProps["active"]) => active === key;
  const cartLabel = typeof cartCount === "number" ? `Cart (${cartCount})` : "Cart";

  return (
    <header className="site-header" data-node-id="608:375">
      <div className="site-header__inner" data-node-id="608:376">
        <div className="site-header__logo" data-node-id="608:377">
          <a href="/" data-node-id="608:378">HIDE HAVEN</a>
        </div>
        <nav className="site-header__nav" data-node-id="608:379">
          <a
            className={`site-header__link ${isActive("collections") ? "site-header__link--active" : ""}`}
            href="/"
            data-node-id="608:380"
          >
            Collections
          </a>
          <a
            className={`site-header__link ${isActive("bestsellers") ? "site-header__link--active" : ""}`}
            href="/shop"
            data-node-id="608:382"
          >
            Bestsellers
          </a>
          <a
            className={`site-header__link ${isActive("artisans") ? "site-header__link--active" : ""}`}
            href="/artisans"
            data-node-id="608:384"
          >
            Artisans
          </a>
          <a
            className={`site-header__link ${isActive("care-kits") ? "site-header__link--active" : ""}`}
            href="/care-kits"
            data-node-id="608:386"
          >
            Care Kits
          </a>
        </nav>
        <div className="site-header__actions" data-node-id="608:388">
          <label className="site-header__search" data-node-id="608:391">
            <span className="sr-only">Search</span>
            <input type="text" placeholder={searchPlaceholder} />
            <img src="/images/header-search.svg" alt="" data-node-id="608:394" />
          </label>
          <button className="site-header__icon" type="button" aria-label="Account" data-node-id="608:396">
            <img src="/images/header-user.svg" alt="" />
          </button>
          <button className="site-header__icon" type="button" aria-label="Wishlist" data-node-id="608:399">
            <img src="/images/header-heart.svg" alt="" />
          </button>
          <a className="site-header__cart" href="/cart" data-node-id="608:401">
            <img src="/images/header-cart.svg" alt="" data-node-id="608:402" />
            <span data-node-id="608:405">{cartLabel}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
