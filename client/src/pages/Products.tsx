import { ArrowRightIcon, ChevronDown, HomeIcon, SlidersHorizontalIcon, XIcon } from "lucide-react"
import { Link, useSearchParams } from "react-router-dom"
import type { Product } from "../types/types"
import { useEffect, useState } from "react"
import { categoriesData, products } from "../assets/assets"
import { ProductCard } from "../components/ProductCard"
import { FilterPanel } from "../components/FilterPanel"
import { Loading } from "../components/Loading"

export const Products = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const category = searchParams.get("category") || ""
  const minPrice = searchParams.get("minPrice") || ""
  const maxPrice = searchParams.get("maxPrice") || ""
  const sort = searchParams.get("sort") || ""
  const organic = searchParams.get("organic") || ""
  const page = searchParams.get("page") || 1

  const fetchProducts = async () => {
    setLoading(true)
    setProductsData(products.filter((item) => item.category === category || category === ""))
    setLoading(false) 
  }

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams)

    if (value) {
      newParams.set(key, value)
    }
    else {
      newParams.delete(key)
    }

    if (key !== "page") {
      newParams.delete("page")
    }

    setSearchParams(newParams)
  }

  useEffect(() => {
    fetchProducts();
  }, [category, minPrice, maxPrice, sort, organic, page])

  const clearFilters = () => setSearchParams({})

  const activeCategory = categoriesData.find((cat) => cat.slug === category)
  const hasFilters = category || minPrice || maxPrice || organic

  return (
    <section className="min-h-screen bg-app-cream">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <nav className="flex gap-2 items-center text-sm text-app-text-light mb-6">
          <Link to="/" className="hover:text-app-green transition-colors" >
            <HomeIcon className="size-4" />
          </Link>
          <span className="text-app-text-light">/</span>
          <span className="font-semibold">{activeCategory ? activeCategory.name : "All Categories"}</span>
        </nav>

        <div className="flex gap-8 xl:gap-10">

          {/* sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl p-4 sticky top-24">
              <FilterPanel categories={categoriesData} category={category} organic={organic} minPrice={minPrice} maxPrice={maxPrice} updateFilter={updateFilter} clearFilters={clearFilters} hasFilters={hasFilters} mobileFiltersOpen={mobileFiltersOpen} />
            </div>
          </aside>
          <main className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-app-green">{activeCategory ? activeCategory.name : "All Products"}</h1>
                <p className="text-app-text-light text-sm">{products.length} products found</p>
              </div>

              <div className="flex flex-col lg:items-center gap-3">
                <button onClick={() => setMobileFiltersOpen(true)} className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm bg-white rounded-xl border border-app-border hover:bg-app-cream transition-colors">
                  <SlidersHorizontalIcon className="size-4" /> Filters
                </button>

                {/* Sort */}
                <div className="relative">
                  <select className="appearance-none pl-3 pr-8 py-2 text-sm bg-white rounded-xl border border-app-border focus:border-app-green outline-none cursor-pointer" value={sort} onChange={(e) => updateFilter("sort", e.target.value)}>
                    <option value="">Newest</option>
                    <option value="price_asc">Price: Low -&gt; High</option>
                    <option value="price_desc">Price: High -&gt; Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="name">A -&gt; Z</option>
                  </select>

                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-app-text-light pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Product grid */}
            {
              loading ? 
                <Loading />
               :
                productsData.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-lg font-semibold text-app-green mb-2">No Products found</p>
                    <p className="text-sm text-app-text-light mb-4">Try adjusting your filters or search items</p>
                    <button className="px-5 py-2 text-white font-medium text-sm bg-app-green rounded-xl hover:bg-app-green-light transition-colors" onClick={clearFilters} >Clear Filters</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-8">
                    {
                      productsData.map((prod) => prod.stock > 0 && (
                        <ProductCard key={prod._id} product={prod} />
                      ))
                    }
                  </div>
                )
            }
            {
              totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-16">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button className={`size-9 rounded-lg text-sm font-medium transition-colors ${page === i + 1 ? "bg-app-green text-white" : "bg-white text-app-text-light hover:bg-app-cream"}`} onClick={() => { updateFilter("page", String(i + 1)); scrollTo(0, 0) }}>
                      {i + 1}
                    </button>
                  ))}
                </div>
              )
            }
          </main>
        </div>

        {
          mobileFiltersOpen && (
            <>
              <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setMobileFiltersOpen(false)} />
              <div className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-2xl max-h-[80vh] overflow-y-auto animate-slide-in-up">
                <div className="flex justify-between items-center p-4 border-b border-app-border">
                  <h3 className="text-lg font-semibold text-app-green">Filters</h3>
                  <button onClick={() => setMobileFiltersOpen(false)} className="p-2 hover:bg-app-cream rounded-lg">
                    <XIcon className="size-5" />
                  </button>
                </div>
                <div className="p-4">
                  <FilterPanel categories={categoriesData} category={category} organic={organic} minPrice={minPrice} maxPrice={maxPrice} updateFilter={updateFilter} clearFilters={clearFilters} hasFilters={hasFilters} mobileFiltersOpen={mobileFiltersOpen} />
                </div>
              </div>
            </>
          )
        }
      </div>
    </section>
  )
}
