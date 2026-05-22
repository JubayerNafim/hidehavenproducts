import Footer from "./components/Footer";
import Header from "./components/Header";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.hidehaven.me";

type HeroImage = {
  image_path: string;
  caption?: string | null;
  alt_text?: string | null;
  link_url?: string | null;
  active?: number | null;
};

type Banner = {
  text: string;
  active?: number | null;
};

type Product = {
  id?: number;
  name: string;
  price: number;
  sale_price?: number | null;
  image_url?: string | null;
  is_bestseller?: number | null;
  is_new?: number | null;
  is_featured?: number | null;
  stock?: number | null;
};

const fallbackHero = {
  image_path: "/images/asset-01.png",
  caption: "Seasonal Collection 2024",
  alt_text: ""
};

const fallbackProducts: Product[] = [
  {
    name: "The Heritage Bifold",
    price: 2450,
    image_url: "/images/asset-07.png",
    is_bestseller: 1,
    stock: 12
  },
  {
    name: "Classic Stitch Belt",
    price: 1850,
    image_url: "/images/asset-11.png",
    stock: 9
  },
  {
    name: "Artisan Messenger",
    price: 12500,
    image_url: "/images/asset-12.png",
    stock: 4
  },
  {
    name: "Nomad Travel Sleeve",
    price: 1200,
    image_url: "/images/asset-14.png",
    is_new: 1,
    stock: 2
  }
];

const resolveImageUrl = (path?: string | null) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_BASE_URL}${path}`;
};

const formatPrice = (value?: number | null) => {
  if (!value && value !== 0) return "";
  return `BDT ${value.toLocaleString("en-US")}`;
};

const fetchJson = async <T,>(path: string): Promise<T | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
};

export default async function HomePage() {
  const [heroResponse, bannerResponse, productResponse] = await Promise.all([
    fetchJson<{ data?: HeroImage[] }>("/api/hero-images"),
    fetchJson<{ data?: Banner[] }>("/api/banners"),
    fetchJson<{ data?: Product[] }>("/api/products?is_bestseller=1&limit=4")
  ]);

  const heroImage = heroResponse?.data?.[0] || fallbackHero;
  const bannerText = bannerResponse?.data?.[0]?.text || fallbackHero.caption || "Seasonal Collection 2024";
  const products = productResponse?.data && productResponse.data.length > 0 ? productResponse.data : fallbackProducts;

  return (
    <>
      <Header active="collections" />
      <main className="page" data-node-id="608:3">
      <section className="hero" data-node-id="608:4">
        <img className="hero__image" src={resolveImageUrl(heroImage.image_path)} alt={heroImage.alt_text || ""} />
        <div className="hero__overlay" data-node-id="608:6">
          <div className="hero__content" data-node-id="608:7">
            <span className="hero__pill" data-node-id="608:8">
              {bannerText}
            </span>
            <a className="button button--light" href="/shop" data-node-id="608:15">
              Shop All Categories
            </a>
          </div>
        </div>
      </section>

      <section className="section" data-node-id="608:17">
        <div className="section__header" data-node-id="608:18">
          <div>
            <h2 className="eyebrow" data-node-id="608:21">
              Explore Collections
            </h2>
            <p className="subtle" data-node-id="608:23">
              Curated essentials for every lifestyle.
            </p>
          </div>
          <a className="link" href="/shop" data-node-id="608:24">
            <span>View All Categories</span>
            <img src="/images/asset-02.svg" alt="" />
          </a>
        </div>

        <div className="category-grid" data-node-id="608:28">
          <div className="category-card category-card--large" data-node-id="608:29">
            <img className="category-card__image" src="/images/asset-03.png" alt="" />
            <div className="category-card__overlay" data-node-id="608:31">
              <h3 className="category-card__title" data-node-id="608:33">
                Executive Briefcases
              </h3>
              <p className="category-card__copy" data-node-id="608:36">
                Command the room with timeless professional gear.
              </p>
              <a className="button button--light" href="#" data-node-id="608:37">
                Shop Travel Bags
              </a>
            </div>
          </div>
          <div className="category-stack" data-node-id="608:39">
            <div className="category-card" data-node-id="608:40">
              <img className="category-card__image" src="/images/asset-04.png" alt="" />
              <div className="category-card__overlay" data-node-id="608:42">
                <h3 className="category-card__title" data-node-id="608:44">
                  Wallets
                </h3>
                <a className="text-button" href="#" data-node-id="608:45">
                  <span>Explore Wallets</span>
                  <img src="/images/asset-05.svg" alt="" />
                </a>
              </div>
            </div>
            <div className="category-card" data-node-id="608:49">
              <img className="category-card__image" src="/images/asset-06.png" alt="" />
              <div className="category-card__overlay" data-node-id="608:51">
                <h3 className="category-card__title" data-node-id="608:53">
                  Belts
                </h3>
                <a className="text-button" href="#" data-node-id="608:54">
                  <span>Explore Belts</span>
                  <img src="/images/asset-05.svg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" data-node-id="608:58">
        <div className="section__center" data-node-id="608:59">
          <h2 className="eyebrow" data-node-id="608:61">
            Customer Favorites
          </h2>
          <p className="subtle" data-node-id="608:63">
            Our most celebrated pieces, trusted by thousands of customers across Bangladesh for
            their durability and style.
          </p>
          <a className="link section__link" href="/shop">
            View All Favorites
            <img src="/images/asset-02.svg" alt="" />
          </a>
        </div>

        <div className="product-grid" data-node-id="608:64">
          {products.map((product, index) => {
            const badge = product.is_bestseller ? "Bestseller" : product.is_new ? "New" : product.is_featured ? "Featured" : "";
            const badgeClass = product.is_new ? "badge badge--brown" : badge ? "badge badge--red" : "";
            const displayPrice = formatPrice(product.sale_price ?? product.price);
            const inStock = (product.stock ?? 0) > 0;
            const imageUrl = resolveImageUrl(product.image_url) || fallbackProducts[index]?.image_url || "";

            return (
              <article className="product-card" data-node-id={`favorite-${index}`} key={product.id ?? index}>
                <div className="product-card__media">
                  <img src={imageUrl} alt="" />
                  {badge ? (
                    <span className={badgeClass} data-node-id={`favorite-badge-${index}`}>
                      {badge}
                    </span>
                  ) : null}
                </div>
                <div className="product-card__body">
                  <h3>{product.name}</h3>
                  <div className="rating" data-node-id={`favorite-rating-${index}`}>
                    <img src="/images/asset-08.svg" alt="" />
                    <img src="/images/asset-08.svg" alt="" />
                    <img src="/images/asset-08.svg" alt="" />
                    <img src="/images/asset-08.svg" alt="" />
                    <img src="/images/asset-09.svg" alt="" />
                    <span>(0)</span>
                  </div>
                  <div className="price">{displayPrice}</div>
                  <div className="stock">
                    <img src="/images/asset-10.svg" alt="" />
                    <span>{inStock ? "In Stock" : "Limited Stock"}</span>
                  </div>
                  <a className="button button--dark" href="#">
                    Add to Cart
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="trust" data-node-id="608:185">
        <div className="trust__content" data-node-id="608:187">
          <h2 className="trust__title" data-node-id="608:189">
            Crafted Without Compromise
          </h2>
          <p className="trust__copy" data-node-id="608:192">
            Since 2024, HIDE HAVEN has redefined what it means to own quality. We believe your daily
            essentials should last a lifetime.
          </p>
          <div className="trust__list" data-node-id="608:194">
            <div className="trust__item" data-node-id="608:195">
              <img src="/images/asset-15.svg" alt="" />
              <div>
                <h4>Full-Grain Leather Only</h4>
                <p>
                  We never use "genuine leather" composites. Only the top layer for maximum strength.
                </p>
              </div>
            </div>
            <div className="trust__item" data-node-id="608:203">
              <img src="/images/asset-16.svg" alt="" />
              <div>
                <h4>Saddle Stitching</h4>
                <p>
                  Traditional hand-stitched techniques that ensure if one thread breaks, the rest hold
                  firm.
                </p>
              </div>
            </div>
            <div className="trust__item" data-node-id="608:211">
              <img src="/images/asset-17.svg" alt="" />
              <div>
                <h4>Direct to Consumer</h4>
                <p>By cutting out the middlemen, we provide luxury quality at honest prices in BDT.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="trust__image" data-node-id="608:219">
          <img src="/images/asset-18.png" alt="" />
        </div>
      </section>

      <section className="section" data-node-id="608:221">
        <div className="section__center" data-node-id="608:222">
          <h2 className="eyebrow" data-node-id="608:224">
            Trusted by our Community
          </h2>
          <div className="review__rating" data-node-id="608:225">
            <div className="rating rating--large">
              <img src="/images/asset-19.svg" alt="" />
              <img src="/images/asset-19.svg" alt="" />
              <img src="/images/asset-19.svg" alt="" />
              <img src="/images/asset-19.svg" alt="" />
              <img src="/images/asset-19.svg" alt="" />
            </div>
            <span>4.9/5 based on 2,500+ reviews</span>
          </div>
        </div>

        <div className="review-grid" data-node-id="608:239">
          <article className="review-card" data-node-id="608:240">
            <div className="rating">
              <img src="/images/asset-08.svg" alt="" />
              <img src="/images/asset-08.svg" alt="" />
              <img src="/images/asset-08.svg" alt="" />
              <img src="/images/asset-08.svg" alt="" />
              <img src="/images/asset-08.svg" alt="" />
            </div>
            <p>
              "The quality of the leather is unmatched in Bangladesh. I've had my briefcase for 2
              years and it only looks better with age. Truly a heritage piece."
            </p>
            <div className="review-card__footer">
              <span className="review-card__avatar">AA</span>
              <div>
                <h4>Asif Ahmed</h4>
                <div className="verified">
                  <span>Verified Purchase</span>
                  <img src="/images/asset-20.svg" alt="" />
                </div>
              </div>
            </div>
          </article>

          <article className="review-card" data-node-id="608:265">
            <div className="rating">
              <img src="/images/asset-08.svg" alt="" />
              <img src="/images/asset-08.svg" alt="" />
              <img src="/images/asset-08.svg" alt="" />
              <img src="/images/asset-08.svg" alt="" />
              <img src="/images/asset-08.svg" alt="" />
            </div>
            <p>
              "I bought the Artisan Messenger as a gift for my husband. The packaging was beautiful
              and the delivery to Chittagong was super fast. Highly recommend!"
            </p>
            <div className="review-card__footer">
              <span className="review-card__avatar">NK</span>
              <div>
                <h4>Nusrat Khan</h4>
                <div className="verified">
                  <span>Verified Purchase</span>
                  <img src="/images/asset-20.svg" alt="" />
                </div>
              </div>
            </div>
          </article>

          <article className="review-card" data-node-id="608:290">
            <div className="rating">
              <img src="/images/asset-08.svg" alt="" />
              <img src="/images/asset-08.svg" alt="" />
              <img src="/images/asset-08.svg" alt="" />
              <img src="/images/asset-08.svg" alt="" />
              <img src="/images/asset-08.svg" alt="" />
            </div>
            <p>
              "Honest pricing and incredible quality. Their customer support team helped me choose
              the right belt size and the fit is perfect. 10/10."
            </p>
            <div className="review-card__footer">
              <span className="review-card__avatar">MR</span>
              <div>
                <h4>Mahbubur Rahman</h4>
                <div className="verified">
                  <span>Verified Purchase</span>
                  <img src="/images/asset-20.svg" alt="" />
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
