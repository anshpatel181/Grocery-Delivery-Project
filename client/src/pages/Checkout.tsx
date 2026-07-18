import { useState } from "react"
import { useCart } from "../context/CartContext"
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, CheckIcon, ChevronRightIcon, CreditCardIcon, MapPin, MinusIcon, PlusIcon, TruckIcon } from "lucide-react";
import type { Address } from "../types/types";

export const Checkout = () => {

  const [activeTab, setActiveTab] = useState("Address")
  const { items, cartTotal } = useCart();
  const [addresses, setAddresses] = useState<Address[]>([])
  const [activePaymentMethod, setActivePaymentMethod] = useState("CARD")
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL
  const deliveryFee = cartTotal > 20 ? 0 : 1.99
  const tax = cartTotal * 0.08
  const grandTotal = cartTotal + deliveryFee + tax
  const navigate = useNavigate();

  const tabs = [{ icon: MapPin, text: "Address", icon2: ChevronRightIcon }, { icon: CreditCardIcon, text: "Payment", icon2: ChevronRightIcon }, { icon: CheckIcon, text: "Review", icon2: "" }]
  const paymentMethods = [{ method: "CARD", text: "Credit / Debit Card", description: "Pay securely with your card" }, { method: "COD", text: "Cash on Delivery", description: "Pay when you receive" }]

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
                <div className="bg-white rounded-xl p-5">
                  <p className="flex items-center font-semibold gap-1.5 text-app-green text-lg mb-5"><MapPin className="size-4" /> Delivery Address</p>
                  {
                    addresses.length > 0 &&
                    (
                      <>
                        <p className="mb-3 text-sm text-app-green">Saved Addresses</p>
                        <div className="grid grid-cols-2 gap-2">
                        </div>
                      </>
                    )
                  }
                  <Link to="/addresses" className="border rounded-lg flex items-center justify-center py-2.5 px-4 text-app-green-lighter gap-2">Add New Address <PlusIcon className="size-4" /></Link>
                  <button disabled={addresses.length === 0} className="flex items-center gap-2 rounded-xl mt-6 px-6 py-3 font-semibold bg-app-green text-white enabled:hover:bg-app-green-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => addresses.length > 0 && setActiveTab(tabs[1].text)}>Continue to Payment <ChevronRightIcon className="size-4" /></button>
                </div>
              }

              {/* active tab is payment method selection */}
              {
                activeTab === "Payment" &&
                <div className="bg-white rounded-xl p-5">
                  <p className="flex items-center font-semibold gap-1.5 text-app-green text-lg mb-5"><CreditCardIcon className="size-4" /> Payment Method</p>
                  <div className="space-y-3">
                    {
                      paymentMethods.map((paymentMeth, index) => (
                        <label className={`p-4 flex items-center gap-4 rounded-xl border border-app-border cursor-pointer transition-all hover:border-app-green-lighter ${paymentMeth.method === activePaymentMethod && "bg-app-cream border-app-green"}`} onClick={() => setActivePaymentMethod(paymentMeth.method)} key={index}>
                          <input type="radio" className="size-4 text-app-green" checked={paymentMeth.method === activePaymentMethod} />
                          <div>
                            <p className="text-sm font-semibold text-app-green">{paymentMeth.text}</p>
                            <p className="text-xs text-app-text-light">{paymentMeth.description}</p>
                          </div>
                        </label>
                      ))
                    }
                  </div>

                  <button className="flex items-center gap-2 rounded-xl mt-6 px-6 py-3 font-semibold bg-app-green text-white enabled:hover:bg-app-green-light transition-colors" onClick={() => setActiveTab(tabs[2].text)}>Review Order <ChevronRightIcon className="size-4" /></button>
                </div>
              }

              {
                activeTab === "Review" &&
                <div className="bg-white rounded-xl p-5">
                  <p className="flex items-center font-semibold gap-1.5 text-app-green text-lg mb-5"><CheckIcon className="size-4" /> Review Your Order</p>
                  <div className="mb-5 p-4 bg-app-cream rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <TruckIcon className="size-4" />
                      <span className="text-sm font-semibold text-app-green">Delivery Address</span>
                    </div>
                    <p className="text-app-text-light text-sm flex items-end gap-0.5">Home <MinusIcon className="size-4" /> 304, Nilgiri heights, panchvati area, Kalol, Gujarat 382721</p>
                  </div>

                  <div className="space-y-3 mb-5">
                    {
                      items.map((item, index) => (
                        <div className="flex items-center gap-3" key={index}>
                          <img src={item.product.image} alt={item.product.image} className="size-12 object-contain rounded-lg" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-app-green">{item.product.name}</p>
                            <p className="text-xs text-app-text-light">Qty:{item.quantity}</p>
                          </div>
                          <span className="text-sm font-semibold text-app-green">{currency}{item.product.price.toFixed(2)}</span>
                        </div>
                      ))
                    }
                  </div>

                  <button className="w-full rounded-xl flex items-center justify-center mt-6 py-3 font-semibold bg-app-orange text-white hover:bg-app-orange-dark transition-colors disabled:opacity-60 active:scale-[0.98]" onClick={() => setActiveTab(tabs[2].text)}>Place Order <MinusIcon /> {currency}{grandTotal.toFixed(2)}</button>
                </div>
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
