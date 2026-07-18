import { Link } from "react-router-dom"
import { categoriesData } from "../assets/assets"

export const Categories = () => {
    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto">
                <div className="py-6">
                    <h2 className="font-semibold text-2xl">Browse Categories</h2>
                    <p className="text-sm text-app-text-light mt-1">Find exactly what you need using</p>
                </div>

                <div className="flex items-center mt-8 overflow-x-scroll no-scrollbar">
                    {
                        categoriesData.map((category) =>
                        (
                            <Link key={category.slug} to={`/products?category=${category.slug}`} onClick={() => window.scrollTo(0, 0)} className="group flex flex-col items-center gap-3 p-4">
                                <div className="rounded-2xl bg-orange-100 size-18 sm:size-26 sm:p-2 group-hover:ring-2 ring-orange-300/75 transition-all">
                                    <img src={category.image} alt={category.name} className="w-full h-full object-contain rounded-full transition-all" />
                                </div>
                                <p className="text-center font-medium text-xs text-zinc-600 leading-tight">{category.name}</p>
                            </Link>
                        ))
                    }

                </div>
            </div>
        </section>
    )
}
