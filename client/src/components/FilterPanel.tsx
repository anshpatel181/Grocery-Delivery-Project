
export const FilterPanel = ({ categories, category, minPrice, maxPrice, clearFilters, updateFilter, hasFilters }: any) => {

  const categoriesWithAll = [{ slug: "", name: "All Categories" }, ...categories]
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6">
        <h3 className="font-semibold">Categories</h3>
        <div className="space-y-1.5">
          {
            categoriesWithAll.map((cat: any) => (
              <button key={cat.slug} onClick={() => updateFilter("category", cat.slug)} className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-all ${category === cat.slug ? "bg-app-green text-white" : "text-app-text-light hover:bg-app-cream"}`}>
                {cat.name}
              </button>
            ))
          }
        </div>
      </div>
      <div>
        <h3 className="text-sm text-app-green mb-3 font-semibold">Price Range</h3>
        <div className="flex gap-2 items-center">
          <input type="number" placeholder="Min" onChange={(e) => updateFilter("minPrice", e.target.value)} className="border not-focus:border-app-border rounded-lg w-full py-2 px-3 text-sm bg-white" value={minPrice} />
          <span className="text-app-text-light">-</span>
          <input type="number" placeholder="Max" className="border not-focus:border-app-border rounded-lg text-sm bg-white w-full px-3 py-2 " value={maxPrice} onChange={(e) => updateFilter("maxPrice", e.target.value)} />
        </div>
      </div>
      {
        hasFilters && (
          <button className="hover:bg-red-50 py-2 rounded-lg w-full text-app-error text-sm font-medium transition-colors" onClick={clearFilters}>Clear All Filters</button>
        )
      }
    </div>
  )
}
