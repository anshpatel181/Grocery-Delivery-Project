import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { ProductCard } from "./ProductCard"
import { products } from "../assets/assets"

export const PopularProducts = () => {
    return (
        <section className="pb-16">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-semibold">Popular Products</h2>
                        <p className="text-sm text-app-text-light mt-1">Top-rated products this season</p>
                    </div>
                    <div>
                        <Link to="/products" className="text-sm font-semibold flex items-center gap-1 text-app-orange hover:text-app-orange-dark transition-colors">
                            View All
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>

                {/* products list */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-8">
                    {
                        products.slice(0,10).map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
