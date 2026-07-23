import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom"
import type { Product } from "../types/types";
import { HomeIcon, SearchIcon } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import api from "../config/api";
import toast from "react-hot-toast";

export const SearchResults = () => {

  const [searchedProducts, setSearchedProducts] = useState<Product[]>([])
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false)

  const query = searchParams.get("q") || ""

  useEffect(() => {
    if (!query) return
    setIsLoading(true)

    api.get(`/products?search=${encodeURIComponent(query)}`).then(({ data }) => {
      setSearchedProducts(data.products)
    }).catch((error: any) => {
      toast.error(error.response?.data?.message || error.message)
    }).finally(() => setIsLoading(false))

  }, [query])

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto py-6">
        <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
          <Link to="/">
            <HomeIcon className="size-4" />
          </Link>
          <span>/</span>
          <p className="text-app-green font-semibold">Search Results</p>
        </nav>

        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Results for "{query}"</h1>
          <p className="text-sm text-app-text-light">{searchedProducts.length} items found</p>
        </div>

        {
          searchedProducts.length > 0 ? (

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {
                searchedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              }
            </div>
          ) :
            <div className="text-center py-20">
              <SearchIcon className="size-16 text-app-border mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-app-green mb-2">No results found</h2>
              <p className="mb-6 text-app-text-light text-sm">We couldn't find any products matching "{query}". Try a different search term</p>
              <Link to="/products" className="inline-flex rounded-lg bg-app-green py-2.5 px-5 text-white text-sm font-medium">Browse All Products</Link>
            </div>
        }
      </div>
    </div>
  )
}
