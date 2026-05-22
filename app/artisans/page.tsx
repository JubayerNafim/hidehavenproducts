import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ArtisansPage() {
  return (
    <>
      <Header active="artisans" />
      <main className="page">
        {/* Hero */}
        <section className="artisans-hero">
          <div className="artisans-hero__content">
            <span className="hero__pill">Meet Our Artisans</span>
            <h1>Handcrafted by Masters</h1>
            <p>
              Every Hide Haven piece is born from generations of leather-working tradition.
              Our artisans combine age-old techniques with modern design to create heirloom-quality
              goods you will treasure for decades.
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section className="section">
          <div className="section__center">
            <h2 className="eyebrow">Our Philosophy</h2>
            <p className="subtle" style={{ maxWidth: "640px" }}>
              We believe in slow craftsmanship — taking the time to do things right, using
              traditional methods that honor the material and the maker.
            </p>
          </div>
          <div className="artisans-grid">
            <div className="artisans-card">
              <div className="artisans-card__icon">🔪</div>
              <h3>Hand Cutting</h3>
              <p>
                Each piece is hand-traced and cut by master craftsmen, ensuring every edge is
                precise and every curve intentional.
              </p>
            </div>
            <div className="artisans-card">
              <div className="artisans-card__icon">🧵</div>
              <h3>Saddle Stitching</h3>
              <p>
                Our artisans use the traditional two-needle saddle stitch — a technique that
                creates a bond stronger than any machine stitch.
              </p>
            </div>
            <div className="artisans-card">
              <div className="artisans-card__icon">🎨</div>
              <h3>Natural Finishing</h3>
              <p>
                We use plant-based dyes and natural waxes to bring out the rich character of
                full-grain leather, allowing it to develop a unique patina over time.
              </p>
            </div>
            <div className="artisans-card">
              <div className="artisans-card__icon">🔍</div>
              <h3>Quality Inspection</h3>
              <p>
                Every product undergoes rigorous inspection — checking stitches, edges, hardware,
                and finish before it reaches your hands.
              </p>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="trust" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div className="trust__content">
            <h2 className="trust__title">From Hide to Haven</h2>
            <p className="trust__copy">
              Our leather sourcing is as intentional as our craftsmanship. We select only the
              finest full-grain hides from ethical tanneries, then let our artisans work their
              magic.
            </p>
            <div className="trust__list">
              <div className="trust__item">
                <img src="/images/asset-15.svg" alt="" />
                <div>
                  <h4>Sustainable Sourcing</h4>
                  <p>Full-grain leather from environmentally responsible tanneries.</p>
                </div>
              </div>
              <div className="trust__item">
                <img src="/images/asset-16.svg" alt="" />
                <div>
                  <h4>Ethical Production</h4>
                  <p>Fair wages, safe conditions, and respect for every crafts person.</p>
                </div>
              </div>
              <div className="trust__item">
                <img src="/images/asset-17.svg" alt="" />
                <div>
                  <h4>Direct to You</h4>
                  <p>No middlemen — just artisans creating for those who value quality.</p>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              background: "linear-gradient(135deg, #1b1c1a 0%, #2d2a26 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "48px",
            }}
          >
            <div style={{ textAlign: "center", color: "#fff" }}>
              <div style={{ fontSize: "64px", marginBottom: "16px" }}>🤝</div>
              <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 400, margin: "0 0 8px" }}>
                Supporting Local Artisans
              </h3>
              <p style={{ opacity: 0.8, maxWidth: "360px", margin: "0 auto" }}>
                Every purchase supports a network of skilled leather workers across Bangladesh,
                preserving traditional craftsmanship for future generations.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section">
          <div className="section__center">
            <h2 className="eyebrow">Ready to Own a Piece of Heritage?</h2>
            <p className="subtle">
              Explore our collection and bring home the work of Bangladesh finest leather artisans.
            </p>
            <a className="button button--dark" href="/shop" style={{ width: "auto", padding: "16px 48px", marginTop: "16px" }}>
              Shop Handcrafted Goods
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
