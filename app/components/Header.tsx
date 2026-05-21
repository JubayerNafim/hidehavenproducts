export default function Header() {
  return (
    <header className="site-header" data-node-id="608:375">
      <div className="site-header__inner" data-node-id="608:376">
        <div className="site-header__logo" data-node-id="608:377">
          <span data-node-id="608:378">HIDE HAVEN</span>
        </div>
        <nav className="site-header__nav" data-node-id="608:379">
          <a className="site-header__link site-header__link--active" href="/collections" data-node-id="608:380">
            Collections
          </a>
          <a className="site-header__link" href="/bestsellers" data-node-id="608:382">
            Bestsellers
          </a>
          <a className="site-header__link" href="/artisans" data-node-id="608:384">
            Artisans
          </a>
          <a className="site-header__link" href="/care-kits" data-node-id="608:386">
            Care Kits
          </a>
        </nav>
        <div className="site-header__actions" data-node-id="608:388">
          <label className="site-header__search" data-node-id="608:391">
            <span className="sr-only">Search</span>
            <input type="text" placeholder="Search premium leather..." />
            <img src="/images/header-search.svg" alt="" data-node-id="608:394" />
          </label>
          <button className="site-header__icon" type="button" aria-label="Account" data-node-id="608:396">
            <img src="/images/header-user.svg" alt="" />
          </button>
          <button className="site-header__icon" type="button" aria-label="Wishlist" data-node-id="608:399">
            <img src="/images/header-heart.svg" alt="" />
          </button>
          <button className="site-header__cart" type="button" data-node-id="608:401">
            <img src="/images/header-cart.svg" alt="" data-node-id="608:402" />
            <span data-node-id="608:405">Cart</span>
          </button>
        </div>
      </div>
    </header>
  );
}
