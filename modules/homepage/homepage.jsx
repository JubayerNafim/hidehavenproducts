import React from 'react'

const imgHeroSection = "/images/hero.jpg"
const imgContainer1 = "/images/container1.jpg"
const imgContainer2 = "/images/container2.jpg"
const imgContainer4 = "/images/container4.jpg"
const imgContainer = "/images/container.jpg"
const imgImage = "/images/image.jpg"
const imgIcon = "/images/icon.jpg"
const imgContainer5 = "/images/container5.jpg"

export default function Homepage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero */}
      <section className="relative rounded-lg shadow-sm overflow-hidden h-[520px] md:h-[640px] lg:h-[760px]">
        <img src={imgHeroSection} alt="hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/45 flex items-center">
          <div className="max-w-3xl px-6 md:px-12 lg:px-20 text-white">
            <div className="inline-block bg-amber-600 px-3 py-1 rounded text-sm tracking-wide uppercase">SEASONAL COLLECTION 2024</div>
            <h1 className="mt-6 text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight">Timeless Leather Goods</h1>
            <p className="mt-4 text-base md:text-lg text-amber-100 max-w-xl">Curated essentials for every lifestyle.</p>
            <a className="inline-block mt-6 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded">Shop All Categories</a>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="mt-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-sm text-gray-900">Explore Collections</h2>
            <p className="text-gray-500">Curated essentials for every lifestyle.</p>
          </div>
          <div className="flex items-center text-amber-600">
            <span className="mr-2">View All Categories</span>
            <img src={imgContainer} alt="arrow" className="w-4 h-4" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
          <div className="lg:col-span-8 rounded-lg overflow-hidden relative h-72 md:h-96 lg:h-full">
            <img src={imgContainer1} alt="container1" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
              <h3 className="text-white text-lg">Executive Briefcases</h3>
              <p className="text-white/80 mt-2">Command the room with timeless professional gear.</p>
              <button className="mt-4 bg-white text-black px-6 py-2 rounded">Shop Travel Bags</button>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="rounded-lg overflow-hidden relative h-36 md:h-44 lg:h-1/2">
              <img src={imgContainer2} alt="wallets" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-white">Wallets</h3>
                <div className="mt-2 flex items-center text-white">
                  <span className="mr-2">Explore Wallets</span>
                  <img src={imgContainer} alt="arrow" className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden relative h-36 md:h-44 lg:h-1/2">
              <img src={imgContainer4} alt="belts" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-white">Belts</h3>
                <div className="mt-2 flex items-center text-white">
                  <span className="mr-2">Explore Belts</span>
                  <img src={imgContainer} alt="arrow" className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid (Bestsellers) */}
      <section className="mt-16">
        <div className="text-center mb-6">
          <h2 className="text-xl font-medium">Customer Favorites</h2>
          <p className="max-w-xl mx-auto text-gray-500">Our most celebrated pieces, trusted by thousands of customers across Bangladesh for their durability and style.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <article key={i} className="bg-white rounded-md shadow p-0 overflow-hidden">
              <div className="relative h-64 sm:h-80 lg:h-[350px]">
                <img src={i === 2 ? imgImage : imgContainer1} alt={`product-${i}`} className="w-full h-full object-cover" />
                {i === 0 && <div className="absolute top-3 left-3 bg-red-700 text-white text-xs px-2 py-1 rounded uppercase">Bestseller</div>}
                {i === 3 && <div className="absolute top-3 left-3 bg-amber-700 text-white text-xs px-2 py-1 rounded uppercase">New</div>}
              </div>
              <div className="p-3">
                <h3 className="text-gray-900">Product Title {i + 1}</h3>
                <div className="flex items-center mt-2">
                  <div className="flex -space-x-2">
                    <img src={imgIcon} alt="star" className="w-3 h-3" />
                    <img src={imgIcon} alt="star" className="w-3 h-3" />
                    <img src={imgIcon} alt="star" className="w-3 h-3" />
                    <img src={imgIcon} alt="star" className="w-3 h-3" />
                    <img src={imgIcon} alt="star" className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-gray-500 ml-2">(1{2 * i + 2})</span>
                </div>
                <div className="mt-3 font-bold">৳ {i === 2 ? '12,500.00' : i === 0 ? '2,450.00' : '1,850.00'}</div>
                <div className="mt-3 flex items-center">
                  <img src={imgContainer5} alt="in-stock" className="w-3 h-3 mr-2" />
                  <div className="text-sm text-gray-500">In Stock</div>
                </div>
                <button className="mt-4 w-full bg-black text-white py-3 rounded">Add to Cart</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
