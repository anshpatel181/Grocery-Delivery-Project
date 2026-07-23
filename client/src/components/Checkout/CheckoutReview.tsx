import { CheckIcon, MinusIcon, TruckIcon } from "lucide-react"
import type { Address, Product } from "../../types/types"
import { type ReactNode } from "react"

interface Props {
  items: { product: Product, quantity: number }[],
  currency: ReactNode,
  grandTotal: number,
  handlePlaceOrder: () => void,
  loading: boolean, 
  address: Address
}

const CheckoutReview = ({ items, currency, grandTotal, handlePlaceOrder, loading, address }: Props) => {

  return (
    <div className="bg-white rounded-xl p-5">
      <p className="flex items-center font-semibold gap-1.5 text-app-green text-lg mb-5"><CheckIcon className="size-4" /> Review Your Order</p>
      <div className="mb-5 p-4 bg-app-cream rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <TruckIcon className="size-4" />
          <span className="text-sm font-semibold text-app-green">Delivery Address</span>
        </div>
        <p className="text-app-text-light text-sm flex items-end gap-0.5">{address?.label} <MinusIcon className="size-4" /> {address?.address}, {address?.city}, {address?.state} {address?.zip}</p>
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

      <button disabled={loading} className={`w-full rounded-xl flex items-center justify-center mt-6 py-3 font-semibold bg-app-orange text-white hover:bg-app-orange-dark transition-colors disabled:opacity-60 active:scale-[0.98] ${loading && "opacity-60"}`} onClick={() => handlePlaceOrder()}>{loading ? "Placing Order..." : <span className="flex">Place Order <MinusIcon /> {currency} {grandTotal.toFixed(2)}</span> }</button>
    </div>
  )
}

export default CheckoutReview