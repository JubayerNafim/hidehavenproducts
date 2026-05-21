import React from 'react'

const imgHeroSection = "https://www.figma.com/api/mcp/asset/f85ce9c5-97d1-401f-bd64-e194eda6c4e3"
const imgContainer1 = "https://www.figma.com/api/mcp/asset/798bf89e-b614-436d-8031-a4ca6019efa0"
const imgContainer2 = "https://www.figma.com/api/mcp/asset/fca286f3-625d-49ea-b277-350de90119b5"
const imgContainer4 = "https://www.figma.com/api/mcp/asset/9c208d03-39ae-461d-bde5-a728d32cd1d2"
const imgContainer = "https://www.figma.com/api/mcp/asset/e7747a53-1a3c-4dba-a243-c6c45fa34c42"
const imgImage = "https://www.figma.com/api/mcp/asset/e06b56dd-6e9a-4010-9178-2cc30ff2e2fb"
const imgIcon = "https://www.figma.com/api/mcp/asset/4290bbe5-2b0f-47ad-95a6-d4f291036aaf"
const imgContainer5 = "https://www.figma.com/api/mcp/asset/fa358250-4db9-4331-bf65-ffbf4389720a"

export default function Homepage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero */}
      <section className="relative h-[600px] rounded-lg shadow-sm overflow-hidden">
        <img src={imgHeroSection} alt="hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center pl-10 pr-40 pt-44 pb-44">
          <div className="max-w-xl text-white">
            <div className="inline-block bg-amber-600 px-3 py-1 rounded text-sm tracking-wide uppercase">SEASONAL COLLECTION 2024</div>
            <h1 className="mt-6 text-4xl font-semibold">Timeless Leather Goods</h1>
            <p className="mt-4 text-lg text-amber-100">Curated essentials for every lifestyle.</p>
            <a className="inline-block mt-6 bg-white text-black px-8 py-3 rounded">Shop All Categories</a>
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

        <div className="grid grid-cols-12 gap-6 h-[600px]">
          <div className="col-span-8 rounded-lg overflow-hidden relative">
            <img src={imgContainer1} alt="container1" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
              <h3 className="text-white text-lg">Executive Briefcases</h3>
              <p className="text-white/80 mt-2">Command the room with timeless professional gear.</p>
              <button className="mt-4 bg-white text-black px-6 py-2 rounded">Shop Travel Bags</button>
            </div>
          </div>

          <div className="col-span-4 flex flex-col gap-6">
            <div className="rounded-lg overflow-hidden relative flex-1">
              <img src={imgContainer2} alt="wallets" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-white">Wallets</h3>
                <div className="mt-2 flex items-center text-white">
                  <span className="mr-2">Explore Wallets</span>
                  <img src={imgContainer} alt="arrow" className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden relative flex-1">
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

        <div className="grid grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <article key={i} className="bg-white rounded-md shadow p-0 overflow-hidden">
              <div className="h-[350px] relative">
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
