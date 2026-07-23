import { CheckIcon, MapPin, MapPinIcon, PencilIcon, PlusIcon, Trash2Icon, XIcon } from "lucide-react"
import React, { useEffect, useState } from "react"
import type { Address } from "../types/types"
import { Loading } from "../components/Loading"
import api from "../config/api"
import toast from "react-hot-toast"
import { useAuth } from "../context/AuthContext"

export const Addresses = () => {

  const { updateUser } = useAuth()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    label: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false
  })

  const fetchAddresses = async () => {

    try {      
      const { data } = await api.get("/addresses")      
      setAddresses(data.addresses)
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAddresses()
  }, [])

  const resetForm = () => {
    setFormData({
      label: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      isDefault: false
    })
    setIsAddressModalOpen(false)
    setEditingId(null)
  }

  const getUserLocation = (retries = 3): Promise<{ lat: Number; lng: Number }> => {

    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser"))
        return
      }

      const attempt = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            })
          },
          (error: any) => {
            if (retries > 0) {
              retries--
              setTimeout(attempt, 1000)
            } else {
              reject(new Error(error.message || "Failed to get location after retries"))
            }
          }, {
          enableHighAccuracy: false,
          timeout: 15000,
          maximumAge: 60000
        }
        )
      };
      attempt()
    })
  }

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      const coords = await getUserLocation()
      const payload = { ...formData, ...coords }

      if (editingId) {
        const { data } = await api.put(`/addresses/${editingId}`, payload)
        setAddresses(data.addresses)
        updateUser({ addresses: data.addresses })
        toast.success("Address Updated!")

      }
      else {
        const { data } = await api.post("/addresses", payload)
        setAddresses(data.addresses)
        updateUser({ addresses: data.addresses })
        toast.success("Address added!")
      }
      resetForm()
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.response?.data?.message || error.message || "Failed")
    }
  }

  const handleEditAddress = (id: string) => {
    setIsAddressModalOpen(true)

    const editAddress = addresses.find((add) => add.id === id)

    if(!editAddress) {
      resetForm()
      toast.error("Address couldn't found")
      return
    }
    setEditingId(editAddress?.id as string)
    setFormData({...formData, label: editAddress.label, address: editAddress.address, city: editAddress.city, state: editAddress.city, zip: editAddress.zip, isDefault: editAddress.isDefault})
  }

  const handleAddressDelete = (id: string) => {

    const confirm = window.confirm("Are you sure you want to delete this address?")

    if(!confirm) return
    api.delete(`/addresses/${id}`).then(({ data }) => {
      setAddresses(data.addresses)
      updateUser({addresses: data.addresses})
      toast.success("Address removed")
    }).catch((error: any) => {
      toast.error(error.response?.data?.message || error.message)
    })
  }

  const handleInputChange = (e: any) => {
    let { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  console.log(addresses);
  return (
    <section className="min-h-screen">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
        <div className="flex justify-between mb-8">
          <h1 className="text-2xl font-semibold text-app-green">My Addresses</h1>
          <button onClick={() => setIsAddressModalOpen(true)} className="px-4 py-2 rounded-xl text-sm font-semibold bg-app-green text-white flex items-center gap-2 transition-colors"><PlusIcon className="size-4" />Add Address</button>
        </div>

        <div className="space-y-4">


          {
            isLoading ? (
              <Loading />
            ) : (
              addresses.length === 0 ? (
                <div className="text-center py-16">
                  <MapPinIcon className="size-16 text-app-border mx-auto mb-4" />
                  <h2 className="text-lg font-semibold text-app-green mb-2">No addresses saved</h2>
                  <p className="text-sm text-app-text-light">Add an address for faster checkout</p>
                </div>
              ) : (

                addresses.map((add) => (
                  <div className="max-w-3xl rounded-2xl bg-white mb-4 p-6 flex items-start justify-between" key={add.id}>
                    <div className="flex gap-4">
                      <div className="size-10 rounded-xl bg-app-cream flex items-center justify-center shrink-0"><MapPin className="size-5 text-app-green" /></div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{add.label}</p>{add.isDefault && <span className="text-[10px] font-medium flex items-center justify-center gap-1 rounded-full px-2.5 py-0.5 bg-app-green text-white"><CheckIcon className="size-3" />Default</span>}
                        </div>
                        <p className="text-app-text-light">{add.address}</p>
                        <p className="text-app-text-light">{add.state}, <span>{add.zip}</span></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleEditAddress(add.id)} className="size-8 p-2 text-app-text-light hover:text-app-green hover:bg-app-cream transition-colors rounded-lg"><PencilIcon className="size-4" /></button>
                      <button onClick={() => handleAddressDelete(add.id)} className="size-8 p-2 text-app-text-light hover:text-app-error hover:bg-red-50 transition-colors rounded-lg"><Trash2Icon className="size-4" /></button>
                    </div>
                  </div>
                ))
              )
            )
          }
        </div>

        {/* Address modal */}
        {
          isAddressModalOpen && (
            <>
              <div className="fixed inset-0 bg-black/40 z-50" />
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl p-6 max-w-lg w-full animate-fade-in">
                  <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center mb-5">
                      <h2 className="text-lg font-semibold text-app-green">{editingId ? "Edit Address" : "Add new address"}</h2>
                      <button onClick={resetForm} className="p-2 rounded-lg hover:bg-app-cream transition-colors">
                        <XIcon className="size-5" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="mb-4">
                        <label htmlFor="label" className="block text-sm font-medium text-app-green mb-1.5">Label</label>
                        <input name="label" type="text" id="label" value={formData.label} onChange={handleInputChange} placeholder="Home, Work, etc." className="w-full rounded-xl border border-app-border focus:border-app-green px-4 py-2.5 outline-none" required />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="streetAdd" className="block text-sm font-medium text-app-green mb-1.5">Street Address</label>
                        <input name="address" type="text" id="streetAdd" value={formData.address} onChange={handleInputChange} className="w-full rounded-xl border border-app-border focus:border-app-green px-4 py-2.5 outline-none" required />
                      </div>
                      <div className="grid md:grid-cols-2 gap-3 mb-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-app-green mb-1.5">City</label>
                          <input name="city" type="text" id="city" value={formData.city} onChange={handleInputChange} className="w-full rounded-xl border border-app-border focus:border-app-green px-4 py-2.5 outline-none" required />
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-app-green mb-1.5">State</label>
                          <input name="state" type="text" id="state" value={formData.state} onChange={handleInputChange} className="w-full rounded-xl border border-app-border focus:border-app-green px-4 py-2.5 outline-none" required />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="zip" className="block text-sm font-medium text-app-green mb-1.5">ZIP Code</label>
                          <input name="zip" type="text" id="zip" value={formData.zip} onChange={handleInputChange} className="w-full rounded-xl border border-app-border focus:border-app-green px-4 py-2.5 outline-none" required />
                        </div>

                        <div className="flex items-end pb-1">
                          <label className="flex items-center justify-center gap-2 cursor-pointer">
                            <input name="isDefault" type="checkbox" checked={formData.isDefault} onChange={() => setFormData({ ...formData, isDefault: !formData.isDefault })} />
                            <span className="text-app-green text-sm">Set as default</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="w-full bg-app-green hover:bg-app-green-light text-white text-center py-3 rounded-xl mt-6 font-semibold text-base">{editingId ? "Update Address" : "Save Address"}</button>
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
