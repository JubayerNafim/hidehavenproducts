import Header from "../components/Header";
import Footer from "../components/Footer";

const kits = [
  {
    name: "The Essential Care Kit",
    price: "BDT 1,200",
    desc: "Everything you need to keep your leather looking its best. Includes conditioner, gentle cleaner, and a microfiber cloth.",
    includes: ["Premium Leather Conditioner (50ml)", "Gentle Leather Cleaner (50ml)", "Microfiber Application Cloth", "Care Guide Booklet"],
    image: "/images/shop/shop-img-4.png",
  },
  {
    name: "The Travel Care Set",
    price: "BDT 1,800",
    desc: "Compact care essentials for the frequent traveler. TSA-friendly sizes that fit in any bag.",
    includes: ["Travel-Size Conditioner (30ml)", "Travel-Size Cleaner (30ml)", "Travel Brush", "Zip Pouch", "Care Guide Booklet"],
    image: "/images/shop/shop-img-11.png",
  },
  {
    name: "The Premium Restoration Kit",
    price: "BDT 2,500",
    desc: "For vintage leather and deep restoration. Our most comprehensive care package for heirloom pieces.",
    includes: ["Premium Leather Conditioner (100ml)", "Deep Cleaner (100ml)", "Leather Balm (50ml)", "2x Microfiber Cloths", "Horsehair Brush", "Care Guide Booklet"],
    image: "/images/shop/shop-img-9.png",
  },
];

export default function CareKitsPage() {
  return (
    <>
      <Header active="care-kits" />
      <main className="page">
        {/* Hero */}
        <section className="care-hero">
          <div className="care-hero__content">
            <span className="hero__pill">Leather Care</span>
            <h1>Care Kits & Maintenance</h1>
            <p>
              Invest in your leather&apos;s longevity. Our specially formulated care kits help your
              Hide Haven pieces develop a beautiful patina and last for generations.
            </p>
          </div>
        </section>

        {/* Why Care Matters */}
        <section className="section">
          <div className="section__center">
            <h2 className="eyebrow">Why Leather Care Matters</h2>
            <p className="subtle" style={{ maxWidth: "640px" }}>
              Full-grain leather is a natural material that ages beautifully — but only with proper
              care. Conditioning every 3-6 months prevents drying, cracking, and extends the life of
              your leather for decades.
            </p>
          </div>

          <div className="care-benefits">
            <div className="care-benefit">
              <div className="care-benefit__icon">⏳</div>
              <h3>Lasts Longer</h3>
              <p>Regular conditioning prevents cracks and keeps leather supple for 10+ years.</p>
            </div>
            <div className="care-benefit">
              <div className="care-benefit__icon">✨</div>
              <h3>Better Patina</h3>
              <p>Well-maintained leather develops a rich, warm patina that tells your story.</p>
            </div>
            <div className="care-benefit">
              <div className="care-benefit__icon">💧</div>
              <h3>Water Resistant</h3>
              <p>Conditioned leather naturally repels water and resists stains.</p>
            </div>
            <div className="care-benefit">
              <div className="care-benefit__icon">♻️</div>
              <h3>Sustainable Choice</h3>
              <p>Extending your leather&apos;s life means fewer replacements — better for the planet.</p>
            </div>
          </div>
        </section>

        {/* Care Kits */}
        <section className="section">
          <div className="section__header">
            <div>
              <h2 className="eyebrow">Our Care Kits</h2>
              <p className="subtle">Choose the right kit for your needs.</p>
            </div>
          </div>

          <div className="care-kits-grid">
            {kits.map((kit, i) => (
              <article className="care-kit-card" key={i}>
                <div className="care-kit-card__image">
                  <img src={kit.image} alt={kit.name} />
                </div>
                <div className="care-kit-card__body">
                  <h3>{kit.name}</h3>
                  <p className="care-kit-card__desc">{kit.desc}</p>
                  <div className="care-kit-card__includes">
                    <h4>Includes:</h4>
                    <ul>
                      {kit.includes.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="care-kit-card__footer">
                    <strong className="care-kit-card__price">{kit.price}</strong>
                    <a className="button button--dark" href="/shop" style={{ width: "auto", padding: "10px 24px" }}>
                      Add to Cart
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Care Tips */}
        <section className="trust" style={{ gridTemplateColumns: "1fr" }}>
          <div className="trust__content" style={{ padding: "48px", alignItems: "center", textAlign: "center" }}>
            <h2 className="trust__title">Leather Care Tips</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "32px", marginTop: "24px", textAlign: "left" }}>
              <div>
                <h4 style={{ color: "var(--accent)", marginBottom: "8px" }}>1. Clean Gently</h4>
                <p style={{ opacity: 0.7 }}>Wipe with a dry cloth after each use. For deeper cleaning, use our gentle cleaner with a damp cloth.</p>
              </div>
              <div>
                <h4 style={{ color: "var(--accent)", marginBottom: "8px" }}>2. Condition Regularly</h4>
                <p style={{ opacity: 0.7 }}>Apply conditioner every 3-6 months. Less in humid climates, more in dry climates.</p>
              </div>
              <div>
                <h4 style={{ color: "var(--accent)", marginBottom: "8px" }}>3. Store Properly</h4>
                <p style={{ opacity: 0.7 }}>Keep in a cool, dry place away from direct sunlight. Use dust bags for long-term storage.</p>
              </div>
              <div>
                <h4 style={{ color: "var(--accent)", marginBottom: "8px" }}>4. Avoid Water</h4>
                <p style={{ opacity: 0.7 }}>While conditioned leather resists water, avoid soaking. Dry naturally at room temperature if wet.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
