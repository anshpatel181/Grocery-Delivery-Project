import { useEffect, useState } from "react"
import type { Order } from "../types/types"
import { Link, useSearchParams } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { Loading } from "../components/Loading"
import { PackageIcon } from "lucide-react"

export const MyOrders = () => {

  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$"
  const [orders, setOrders] = useState<Order[]>([])
  const [activeTab, setActiveTab] = useState("All Orders")
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  const tabs = ["All Orders", "Placed", "Out for Delivery", "Delivered"]
  const { clearCart } = useCart();

  useEffect(() => {
    if (searchParams.get("clearCart")) {
      clearCart()
      setSearchParams({})
      setTimeout(() => {
        // fetchOrders()
      }, 2000)
    }
    else {
      // fetchOrders()
    }
    setLoading(false)
  }, [activeTab])
  return (
    <div className="min-h-screen mb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-semibold text-2xl text-app-green mb-6">My Orders</h1>

        {/* Tabs */}
        <div className="flex gap-2 pb-2 mb-6 overflow-x-auto">
          {
            tabs.map((tab, index) => (
              <button key={index} className={`py-2 px-4 rounded-xl text-sm font-medium whitespace-nowrap ${activeTab === tab ? "bg-app-green text-white" : "bg-white text-app-text-light hover:bg-app-cream transition-colors"} `} onClick={() => setActiveTab(tab)}>{tab}</button>
            ))
          }
        </div>
        {/* Orders list */}

        {
          loading ? (
            <Loading/>
          ) : orders.length === 0 ? (
            <div className="text-center py-16">
              <PackageIcon className="size-16 text-app-border mx-auto mb-4" />
              <h2 className="text-lg font-medium text-app-green mb-2">No Orders yet</h2>
              <p className="text-sm text-app-text-light mb-4">Start shopping to your orders here</p>
              <Link to="/products" className="inline-flex text-white bg-app-green rounded-lg text-sm py-2 px-4">Start Shopping</Link>
            </div>
          ) : (
            <div className="space-y-4">

            </div>
          )
        }
      </div>
    </div>
  )
}
