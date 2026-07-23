import { useState } from "react"
import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, CheckIcon, ChevronRightIcon, CreditCardIcon, MapPin } from "lucide-react";
import type { Address } from "../types/types";
import api from "../config/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import CheckoutAddress from "../components/Checkout/CheckoutAddress";
import CheckoutPayment from "../components/Checkout/CheckoutPayment";
import CheckoutReview from "../components/Checkout/CheckoutReview";

export const Checkout = () => {

  const [activeTab, setActiveTab] = useState("Address")
  const { items, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [activePaymentMethod, setActivePaymentMethod] = useState("card")
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL
  const deliveryFee = cartTotal > 20 ? 0 : 1.99
  const tax = cartTotal * 0.08
  const grandTotal = cartTotal + deliveryFee + tax
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState<Address>({
    id: "",
    label: "Home",
    address: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false,
    lat: 0,
    lng: 0
  })

  const tabs = [{ icon: MapPin, text: "Address", icon2: ChevronRightIcon }, { icon: CreditCardIcon, text: "Payment", icon2: ChevronRightIcon }, { icon: CheckIcon, text: "Review", icon2: "" }]
  const paymentMethods = [{ method: "card", text: "Credit / Debit Card", description: "Pay securely with your card" }, { method: "COD", text: "Cash on Delivery", description: "Pay when you receive" }]

  const handlePlaceOrder = async () => {

    setLoading(true)
    try {
      const orderData = {
        items: items.map((item) => ({
          product: item.product.id,
          quantity: item.quantity
        })), 
        shippingAddress: address,
        paymentMethod: activePaymentMethod
      }

      const {data} = await api.post("/orders", orderData)
      console.log(data);
      
      if(data.url) {
        window.location.href = data.url
        return;
      }

      toast.success("Order placed successfully")
      clearCart()
      navigate(`/orders/${data.order.id}`)
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
      scrollTo(0,0)
    }
  }

  useState(() => {
    if (user?.addresses?.length) {
      const defaultAddr = user.addresses.find((add) => add.isDefault) || user.addresses[0]
      setAddress({
        id: defaultAddr.id,
        label: defaultAddr.label,
        address: defaultAddr.address,
        city: defaultAddr.city,
        state: defaultAddr.state,
        zip: defaultAddr.zip,
        isDefault: defaultAddr.isDefault,
        lat: defaultAddr.lat,
        lng: defaultAddr.lng
      })
    }
  })

  return (
    <div className="min-h-screen">
      {/* empty cart */}
      {items.length === 0 ? (
        <div className="min-h-screen mx-auto flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-semibold text-xl text-app-green mb-2">Your cart is empty</h2>
            <p className="text-sm text-app-text-light mb-3">Add some products to checkout</p>
            <button onClick={() => navigate("/products")} className="rounded-xl text-white bg-app-green hover:bg-app-green-light py-2.5 px-5 text-sm transition-colors">Browse Products</button>
          </div>
        </div>
      ) :
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button onClick={() => navigate(-1)} className="text-sm text-app-text-light hover:text-black transition-colors flex items-center gap-2">
            <ArrowLeftIcon className="size-4 " />
            Back
          </button>
          <h1 className="text-base md:text-xl lg:text-2xl font-semibold mt-6 text-app-green">Checkout</h1>

          <div className="flex gap-2">
            {
              tabs.map((tab, index) => (
                <button key={index} className={`flex text-sm font-medium mt-7 ${activeTab === tab.text ? "text-app-cream bg-app-green" : "bg-white text-app-text-light"} items-center gap-2 rounded-xl py-2 px-4`} onClick={() => setActiveTab(tab.text)} >
                  <tab.icon className="size-4" />
                  {tab.text}
                  {
                    tab.icon2 !== "" && <tab.icon2 className="size-4 text-app-text-light" />
                  }
                </button>
              ))
            }
          </div>


          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="md:col-span-2">
              {/* active tab is address */}
              {/* left side */}
              {
                activeTab === "Address" &&
                <CheckoutAddress user={user} address={address} setAddress={setAddress} setActiveTab={setActiveTab} />
              }

              {/* active tab is payment method selection */}
              {
                activeTab === "Payment" &&
                <CheckoutPayment paymentMethods={paymentMethods} activePaymentMethod={activePaymentMethod} setActivePaymentMethod={setActivePaymentMethod} setActiveTab={setActiveTab} />
              }

              {
                activeTab === "Review" &&
                <CheckoutReview items={items} currency={currency} grandTotal={grandTotal} handlePlaceOrder={handlePlaceOrder} loading={loading} address={address} />
              }

            </div>

            {/* right side */}
            <div className="bg-white rounded-2xl p-5 sticky h-fit top-24">
              <h3 className="mb-4 text-sm text-app-green font-semibold">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-app-text-light">Subtotal ({items.length} items)</span>
                  <span>{currency}{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-app-text-light">Delivery</span>
                  <span className={`${deliveryFee === 0 ? "text-app-success" : ""}`}>{deliveryFee === 0 ? "Free" : deliveryFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-app-text-light">Tax</span>
                  <span>{currency}{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-app-border pt-2 font-semibold text-app-green text-base">
                  <span>Total</span>
                  <span>{currency}{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
