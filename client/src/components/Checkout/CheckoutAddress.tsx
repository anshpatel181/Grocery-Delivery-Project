import { ChevronRightIcon, MapPin, PlusIcon } from "lucide-react"
import type { Address, User } from "../../types/types"
import { Link } from "react-router-dom"

interface Props {
    user: User | null
    address: Address
    setAddress: (Address: Address) => void,
    setActiveTab: (text: string) => void,
}

const CheckoutAddress = ({user, address, setAddress, setActiveTab}: Props) => {
    return (
        <div className="bg-white rounded-xl p-5">
            <p className="flex items-center font-semibold gap-1.5 text-app-green text-lg mb-5"><MapPin className="size-4" /> Delivery Address</p>
            {
                user?.addresses && user.addresses.length > 0 &&
                (
                    <>
                        <p className="mb-3 text-sm text-app-green">Saved Addresses</p>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {
                                user.addresses.map((add: any) => (
                                    <div key={add.id || add.label} onClick={() => setAddress({
                                        id: add.id,
                                        label: add.label,
                                        address: add.address,
                                        city: add.city,
                                        state: add.state,
                                        zip: add.zip,
                                        isDefault: add.isDefault,
                                        lat: add.lat,
                                        lng: add.lng
                                    })} className={`p-4 rounded-xl cursor-pointer transition-colors ${address.label === add.label && address.address === add.address ? "bg-app-cream border border-app-green" : "border border-app-border hover:bg-app-cream"}`} >
                                        <div className="flex gap-2 items-center mb-1">
                                            <MapPin className="size-4" />
                                            <span className="font-semibold text-zinc-900 text-sm">{add.label}</span>
                                            {add.isDefault && <span className="text-[10px] text-app-orange font-semibold tracking-wider px-2.5 py-0.5">DEFAULT</span>}
                                        </div>
                                        <p className="text-zinc-600 text-sm truncate">{add.address}</p>
                                        <p className="text-zinc-500 text-xs">{add.city}, {add.state}, {add.zip}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                )
            }
            <Link to="/addresses" className="border rounded-lg flex items-center justify-center py-2.5 px-4 text-app-green-lighter gap-2">Add New Address <PlusIcon className="size-4" /></Link>
            <button disabled={user!.addresses.length === 0} className="flex items-center gap-2 rounded-xl mt-6 px-6 py-3 font-semibold bg-app-green text-white enabled:hover:bg-app-green-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => user!.addresses.length > 0 && setActiveTab("Payment")}>Continue to Payment <ChevronRightIcon className="size-4" /></button>
        </div>
    )
}

export default CheckoutAddress