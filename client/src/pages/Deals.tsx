import { useEffect, useState } from "react"
import type { Product } from "../types/types"
import { products } from "../assets/assets"
import { ZapIcon } from "lucide-react"
import { Loading } from "../components/Loading"
import { ProductCard } from "../components/ProductCard"
import api from "../config/api"
import toast from "react-hot-toast"

export const Deals = () => {

  const [productsData, setProductsData] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    api.get("/products/flash-deals").then(({ data }) => {
      setProductsData(data.products)
    }).catch((error: any) => {
      toast.error(error.response.data.message || error.message)
    }).finally(() => {
      setLoading(false)
    })

    setTimeout(() => setLoading(false), 1000)
  }, [])

  return (
    <div className="min-h-screen">
      <div className="bg-linear-to-r from-app-orange to-app-orange-dark py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <ZapIcon className="size-6 fill-white text-white" />
            <h1 className="font-semibold text-3xl text-white">
              Flash Deals
            </h1>
            <ZapIcon className="size-6 fill-white text-white" />
          </div>
          <p className="mx-auto max-w-md text-white/80">Limited-time offers on your favorite organic products. Grab them before they're gone!</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-5">
        {
          loading ? (
            <Loading />
          ) : (
            productsData?.length === 0 ? (
              <div className="text-center py-16">
                <ZapIcon className="size-16 text-app-border mx-auto mb-4" />
                <h2 className="text-lg font-semibold text-app-green mb-2">No deals right now</h2>
                <p className="text-sm text-app-text-light">Check back soon for amazing offers</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                {
                  products.map((product) => product.stock > 0 && (
                    <ProductCard key={product.id} product={product} />
                  ))
                }
              </div>
            )
          )
        }
      </div>
    </div>
  )
}
