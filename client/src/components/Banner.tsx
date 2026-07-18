import { TruckIcon, XIcon, ZapIcon } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

export const Banner = () => {

    const [bannerVisible, setBannerVisible] = useState(() => {
        return sessionStorage.getItem("banner_dismissed") !== "true"
    })

    const dismissBanner = () => {
        setBannerVisible(false)
        sessionStorage.setItem("banner_dismissed", "true")
    }

    return (
        <div className="relative bg-linear-to-r from-[#1B3022] via-[#006045] to-[#1B3022] text-white text-xs sm:text-sm overflow-hidden">
            {bannerVisible && (
                <div className="max-w-7xl mx-auto flex justify-center items-center px-4 sm:px-6 lg:px-8 py-2 gap-5">
                    <div className="flex justify-center items-center gap-2">
                        <button onClick={() => toast.success("Hello")}>
                            <TruckIcon className="size-4 shrink-0" />
                        </button>
                        <span className="font-medium">Free delivery on orders above $20</span>
                    </div>
                    <span className="hidden sm:inline text-white/40">|</span>
                    <div className="hidden sm:flex items-center gap-2">
                        <ZapIcon className="size-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
                        <span>Farm-fresh produce delivered daily</span>
                    </div>
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors" onClick={dismissBanner} ><XIcon className="size-3.5" /></button>
                </div>
            )
            }
        </div>
    )
}
