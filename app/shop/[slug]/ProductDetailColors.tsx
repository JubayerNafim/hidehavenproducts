"use client";

type Props = {
  colors: string[];
};

export function ProductDetailColors({ colors }: Props) {
  const handleSwatchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const parent = e.currentTarget.parentElement;
    parent?.querySelectorAll(".product-detail__swatch").forEach((s) =>
      s.classList.remove("active")
    );
    e.currentTarget.classList.add("active");
    const label = e.currentTarget.title;
    const heading = e.currentTarget
      .closest(".product-detail__colors")
      ?.querySelector("h4 span");
    if (heading) heading.textContent = label;
  };

  if (colors.length === 0) return null;

  return (
    <div className="product-detail__colors">
      <h4>
        Color: <span>{colors[0]}</span>
      </h4>
      <div className="product-detail__color-swatches">
        {colors.map((color, i) => (
          <button
            key={i}
            className={`product-detail__swatch ${i === 0 ? "active" : ""}`}
            title={color}
            onClick={handleSwatchClick}
          >
            <span
              style={{
                display: "block",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: color,
                border: "1px solid #ddd",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
