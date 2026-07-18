import { LeafIcon, ShieldCheckIcon, TimerIcon, TruckIcon } from "lucide-react"

export const Features = () => {
    return (
        <section className="border border-app-border/80 rounded-xl py-5 bg-white">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3 py-3">
                        <div className="size-10 rounded-lg bg-app-cream flex items-center justify-center shrink-0">
                            <TruckIcon className="size-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-app-green">Free Delivery</p>
                            <p className="text-xs text-app-text-light">Orders above $20</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 py-3">
                        <div className="size-10 rounded-lg bg-app-cream flex items-center justify-center shrink-0">
                            <LeafIcon className="size-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-app-green">100% Organic</p>
                            <p className="text-xs text-app-text-light">Certified products</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 py-3">
                        <div className="size-10 rounded-lg bg-app-cream flex items-center justify-center shrink-0">
                            <TimerIcon className="size-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-app-green">Same Day</p>
                            <p className="text-xs text-app-text-light">Express delivery</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 py-3">
                        <div className="size-10 rounded-lg bg-app-cream flex items-center justify-center shrink-0">
                            <ShieldCheckIcon className="size-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-app-green">Secure Pay</p>
                            <p className="text-xs text-app-text-light">Safe checkout</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
