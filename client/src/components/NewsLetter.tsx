import { Mail } from "lucide-react"

export const NewsLetter = () => {
  return (
    <section className="max-w-7xl mx-auto rounded-3xl px-4 sm:px-6 lg:px-8 py-18 shadow-xs mt-32 mb-20 bg-white">
        <div className="max-w-2xl mx-auto text-center">
            <div className="size-16 rounded-xl bg-white mx-auto mb-6 shadow flex items-center justify-center"><Mail className="text-app-green" strokeWidth={1.5} size={32} /></div>
            <h2 className="text-3xl font-semibold text-app-green mb-4">Subscribe to our Newsletter</h2>
            <p className="text-base mb-8 text-app-text-light">Get weekly updates on fresh produce, seasonal offers, and exclusive discounts right to your inbox.</p>
            <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto flex sm:flex-row gap-3">
                <input type="email" className="flex-1 border bg-white text-sm focus:border-app-green focus:ring border-app-border rounded-xl py-3.5 px-5 transition-all" placeholder="Enter your email address"/>
                <button className="py-3.5 px-8 rounded-xl bg-app-green hover:bg-app-green-light shadow-sm whitespace-nowrap active:scale-[0.98] transition-colors text-white font-semibold cursor-pointer" type="submit">Subscribe</button>
            </form>
        </div>
    </section>
  )
}
