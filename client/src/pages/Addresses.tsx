import { MapPin, MapPinIcon, PencilIcon, PlusIcon, Trash2Icon, XIcon } from "lucide-react"
import { useState } from "react"
import type { Address } from "../types/types"
import { Loading } from "../components/Loading"

export const Addresses = () => {

  const [addresses, setAddresses] = useState<Address[]>([])
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
  const [isAddAddress, setIsAddAddress] = useState(true)
  const [checkBox, setCheckBox] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <section className="min-h-screen">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
        <div className="flex justify-between mb-8">
          <h1 className="text-2xl font-semibold text-app-green">My Addresses</h1>
          <button onClick={() => setIsAddressModalOpen(true)} className="px-4 py-2 rounded-xl text-sm font-semibold bg-app-green text-white flex items-center gap-2 transition-colors"><PlusIcon className="size-4" />Add Address</button>
        </div>

        <div className="space-y-4">
          <div className="max-w-3xl rounded-2xl bg-white mb-4 p-6 flex items-start justify-between">
            <div className="flex gap-4">
              <div className="size-10 rounded-xl bg-app-cream flex items-center justify-center shrink-0"><MapPin className="size-5 text-app-green" /></div>
              <div className="space-y-1 text-sm">
                <p className="font-semibold">Home</p>
                <p className="text-app-text-light">304, <span>kalol,</span></p>
                <p className="text-app-text-light">Gujarat, <span>382721,</span></p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setIsAddressModalOpen(true)} className="size-8 p-2 text-app-text-light hover:text-app-green hover:bg-app-cream transition-colors rounded-lg"><PencilIcon className="size-4" /></button>
              <button className="size-8 p-2 text-app-text-light hover:text-app-error hover:bg-red-50 transition-colors rounded-lg"><Trash2Icon className="size-4" /></button>
            </div>
          </div>
          <div className="max-w-3xl rounded-2xl bg-white mb-4 p-6 flex items-start justify-between">
            <div className="flex gap-4">
              <div className="size-10 rounded-xl bg-app-cream flex items-center justify-center shrink-0"><MapPin className="size-5 text-app-green" /></div>
              <div className="space-y-1 text-sm">
                <p className="font-semibold">Home</p>
                <p className="text-app-text-light">304, <span>kalol,</span></p>
                <p className="text-app-text-light">Gujarat, <span>382721,</span></p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="size-8 p-2 text-app-text-light hover:text-app-green hover:bg-app-cream transition-colors rounded-lg"><PencilIcon className="size-4" /></button>
              <button className="size-8 p-2 text-app-text-light hover:text-app-error hover:bg-red-50 transition-colors rounded-lg"><Trash2Icon className="size-4" /></button>
            </div>
          </div>
        </div>

        {
          isLoading ? (
            <Loading/> 
          ) : (
            addresses.length === 0 ? (
              <div className="text-center py-16">
                <MapPinIcon className="size-16 text-app-border mx-auto mb-4"/>
                <h2 className="text-lg font-semibold text-app-green mb-2">No addresses saved</h2>
                <p className="text-sm text-app-text-light">Add an address for faster checkout</p>
              </div>
            ) : (
              <div>
                
              </div>
            )
          )
        }

        {/* Address modal */}
        {
          isAddressModalOpen && (
            <>
              <div className="fixed inset-0 bg-black/40 z-50" />
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl p-6 max-w-lg w-full animate-fade-in">
                  <form>
                    <div className="flex justify-between items-center mb-5">
                      <h2 className="text-lg font-semibold text-app-green">Add New Address</h2>
                      <button onClick={() => setIsAddressModalOpen(false)} className="p-2 rounded-lg hover:bg-app-cream transition-colors">
                        <XIcon className="size-5" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="mb-4">
                        <label htmlFor="label" className="block text-sm font-medium text-app-green mb-1.5">Label</label>
                        <input type="text" id="label" placeholder="Home, Work, etc." className="w-full rounded-xl border border-app-border focus:border-app-green px-4 py-2.5 outline-none" required />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="streetAdd" className="block text-sm font-medium text-app-green mb-1.5">Street Address</label>
                        <input type="text" id="streetAdd" className="w-full rounded-xl border border-app-border focus:border-app-green px-4 py-2.5 outline-none" required />
                      </div>
                      <div className="grid md:grid-cols-2 gap-3 mb-4">
                        <div>
                          <label htmlFor="label" className="block text-sm font-medium text-app-green mb-1.5">City</label>
                          <input type="text" id="label" className="w-full rounded-xl border border-app-border focus:border-app-green px-4 py-2.5 outline-none" required />
                        </div>
                        <div>
                          <label htmlFor="label" className="block text-sm font-medium text-app-green mb-1.5">State</label>
                          <input type="text" id="label" className="w-full rounded-xl border border-app-border focus:border-app-green px-4 py-2.5 outline-none" required />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="label" className="block text-sm font-medium text-app-green mb-1.5">ZIP Code</label>
                          <input type="text" id="label" className="w-full rounded-xl border border-app-border focus:border-app-green px-4 py-2.5 outline-none" required />
                        </div>

                        <div className="flex items-end pb-1">
                        <label className="flex items-center justify-center gap-2 cursor-pointer" onChange={() => setCheckBox(!checkBox)}>
                            <input type="checkbox" />
                            <span className="text-app-green text-sm">Set as default</span>
                        </label>
                        </div>  
                      </div>
                    </div>

                    <button className="w-full bg-app-green hover:bg-app-green-light text-white text-center py-3 rounded-xl mt-6 font-semibold text-base">Save Address</button>
                  </form>
                </div>
              </div>
            </>
          )
        }
      </div>
    </section>
  )
}
