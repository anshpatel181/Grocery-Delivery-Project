import { AppPromoBanner } from "../components/AppPromoBanner"
import { Categories } from "../components/Categories"
import { Features } from "../components/Features"
import { Hero } from "../components/Hero"
import { NewsLetter } from "../components/NewsLetter"
import { PopularProducts } from "../components/PopularProducts"

export const Home = () => {

  
  return (
    <div className="max-w-7xl min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <Hero />
    <Features/>
    <Categories/>
    <PopularProducts/>
    <AppPromoBanner/>
    <NewsLetter/>
    </div>
  )
}
