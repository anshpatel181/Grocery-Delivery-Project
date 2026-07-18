import { ArrowRightIcon, LeafIcon } from "lucide-react"
import { assets } from "../assets/assets"
import { Link } from "react-router-dom"

export const Hero = () => {
    return (
        <section className="relative overflow-hidden min-h-135 mb-10 rounded-3xl flex items-center">
            <img src={assets.hero_bg} alt="hero-image" className="absolute inset-0 h-full w-full object-cover rounded-xl" />
            <div className="absolute inset-0 bg-linear-to-r from-app-green via-app-green/65 to-transparent" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="max-w-xl xl:pl-10">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-orange-300 bg-orange-300/10 rounded-full mb-5"><LeafIcon className="size-3" />Farm-Fresh & Organic</span>
                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5">Nourish your home with <span className="text-orange-300">Earth's finest</span></h1>
                    <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md">Fresh, organic groceries delivered from local farms to your doorstep. Quality you can taste, convenience you deserve.</p>
                    <div className=" text-white flex flex-wrap gap-3">
                        <Link to="/products" className="bg-orange-400 hover:bg-orange-500 transition-all rounded-full py-3 px-7 flex justify-center items-center gap-2 font-semibold active:scale-[0.98]">Shop Now<ArrowRightIcon className="size-4"/></Link>
                        <Link to="/products" className="border border-white/20 transition-all rounded-full bg-white/10 hover:bg-white/20 py-3 px-7 font-semibold">Browse Categories</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
