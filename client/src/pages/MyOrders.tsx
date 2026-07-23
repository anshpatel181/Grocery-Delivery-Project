import { useEffect, useState } from "react"
import type { Order } from "../types/types"
import { Link, useSearchParams } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { Loading } from "../components/Loading"
import { Calendar, ChevronRightIcon, PackageIcon } from "lucide-react"
import api from "../config/api"
import toast from "react-hot-toast"
import { statusColors } from "../assets/assets"

export const MyOrders = () => {

  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$"
  const [orders, setOrders] = useState<Order[]>([])
  const [activeTab, setActiveTab] = useState("All Orders")
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  const tabs = ["All Orders", "Placed", "Out for Delivery", "Delivered"]
  const { clearCart } = useCart();

  const fetchOrders = async () => {
    try {

      const { data } = await api.get(`/orders?status=${activeTab}`)
      setOrders(data.orders)
    } catch (error: any) {
      console.error(error.message)
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (searchParams.get("clearCart")) {
      clearCart()
      setSearchParams({})
      setTimeout(() => {
        fetchOrders()
      }, 2000)
    }
    else {
      fetchOrders()
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
            <Loading />
          ) : orders.length === 0 ? (
            <div className="text-center py-16">
              <PackageIcon className="size-16 text-app-border mx-auto mb-4" />
              <h2 className="text-lg font-medium text-app-green mb-2">No Orders yet</h2>
              <p className="text-sm text-app-text-light mb-4">Start shopping to your orders here</p>
              <Link to="/products" className="inline-flex text-white bg-app-green rounded-lg text-sm py-2 px-4">Start Shopping</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {
                orders.map((order) => (
                  <Link to={`/orders/${order.id}`} key={order.id} className="block rounded-2xl bg-white max-w-4xl p-5 hover:shadow transition-all">
                    <div className="flex justify-between items-start mb-3">

                      {/* left side */}
                      <div>
                        <p className="font-medium text-sm text-app-green">Order #{order.id.slice(-8).toUpperCase()}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="size-3 text-app-text-light" />
                          <span className="text-xs text-app-text-light"> {new Date(order.createdAt).toLocaleDateString("en-us", { month: "short", day: "numeric", year: "numeric" })}</span>
                        </div>
                      </div>

                      {/* right side */}
                      <div className="flex gap-2 items-center">
                        <span className={`px-4 py-1 rounded-full font-medium text-xs ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>{order.status}</span>
                        <ChevronRightIcon className="size-4 text-app-text-light" />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      {
                        order.items.slice(0, 4).map((item, i) => (
                          <img key={i} src={item.image} alt={item.name} className="size-12 sm:size-16 rounded-lg object-cover border border-app-border" />
                        ))}

                      {order.items.length > 4 && <div className="size-12 sm:size-16 rounded-lg bg-app-cream flex items-center justify-center text-xs font-semibold text-app-text-light">
                        +{order.items.length - 4}
                      </div>
                      }
                    </div>

                    <div className="flex justify-between items-center pt-3 text-sm">
                      <span className="text-app-text-light">{order.items.length} items</span>
                      <span className="font-semibold text-app-green">{currency}{order.total.toFixed(2)}</span>
                    </div>
                  </Link>
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  )
}
