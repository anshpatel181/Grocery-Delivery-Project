import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, HomeIcon, LeafIcon, MinusIcon, PlusIcon, ShoppingCart, StarIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import type { Product } from "../types/types"
import { useCart } from "../context/CartContext"
import { Loading } from "../components/Loading"
import DummyReviewsSection from "../assets/DummyReviewsSection"
import { ProductCard } from "../components/ProductCard"
import api from "../config/api"

export const ProductDetail = () => {

  const currency = import.meta.env.VITE_CURRENCY_SYMBOL
  const { id } = useParams()
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const [loading, setLoading] = useState(true)
  const [localQuantity, setLocalQuantity] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLocalQuantity(1)

    api.get(`/products/${id}`).then(({ data }) => {
      setProduct(data.product)
      return api.get(`/products?category=${data.product.category}`)
    }).then(({ data }) => {
      setRelatedProducts(data.products.filter((p: Product) => p.id !== id))
    }).catch(() => navigate("/products")).finally(() => setLoading(false))
  }, [id, navigate])

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loading />
    </div>
  )

  if (!product) return null
  const cartItem = items.find((item) => item.product.id === id)
  const inCart = !!cartItem

  const displayQuantity = inCart ? cartItem.quantity : localQuantity

  const handleMinus = () => {
    if (inCart) {
      if (cartItem.quantity > 1) {
        updateQuantity(product.id, cartItem.quantity - 1)
      }
      else {
        removeFromCart(product.id)
        setLocalQuantity(1)
      }
    }

    else setLocalQuantity(Math.max(1, localQuantity - 1))
  }

  const handlePlus = () => {
    if (inCart) {
      updateQuantity(product.id, cartItem.quantity + 1)
    }

    else setLocalQuantity(localQuantity + 1)
  }

  const categoryLable = product.category.replace(/-/g, " ")

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* header */}
        <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
          <Link to="/" className="hover:text-app-green transition-colors">
            <HomeIcon className="size-4" />
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-app-green transition-colors">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-app-green transition-colors capitalize">{categoryLable}</Link>
          <span>/</span>
          <span className="text-app-green font-medium truncate max-w-50">{product.name}</span>
        </nav>

        {/* back button */}
        <button onClick={() => navigate(-1)} className="flex items-center text-app-text-light mb-6 gap-1.5 text-sm hover:text-app-green transition-colors ">
          <ArrowLeftIcon className="size-4" /> Back
        </button>

        {/* Product details section */}
        <div className="bg-white/50 rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* left side */}
            <div className="relative flex items-center justify-center p-8 md:p-12 min-h-80 md:min-h-120">
              <img src={product.image} alt={product.name} className="max-h-90 w-auto object-contain" />
              <div className="absolute top-5 left-5 flex flex-wrap gap-1.5">
                {product.isOrganic && (
                  <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-app-green text-white rounded-full">
                    <LeafIcon className="w-3 h-3" />
                    Organic
                  </span>
                )}

                {
                  product.discount > 0 && (
                    <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-app-orange text-white rounded-full">
                      {product.discount}%OFF
                    </span>
                  )
                }
              </div>
            </div>

            {/* Right side */}
            <div className="p-6 md:p-10 flex flex-col justify-center">

              {/* product category */}
              <span className="text-app-text-light text-xs font-medium tracking-wider mb-2 capitalize">{categoryLable}</span>
              {/* product name */}
              <h1 className="font-semibold text-2xl md:text-3xl text-app-green mb-3">{product.name}</h1>

              {/* Product rating */}
              {
                product.rating > 0 && (
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex items-center gap-0.5">
                      {
                        [1, 2, 3, 4, 5].map((star) => (
                          <StarIcon key={star} className={`size-4 ${star <= Math.round(product.rating) ? "text-app-warning fill-app-warning" : "text-app-border"}`} />
                        ))
                      }
                    </div>
                    <span className="font-medium text-sm text-app-green">{product.rating}</span>
                    <span className="text-sm text-app-text-light">({product.reviewCount} reviews)</span>
                  </div>
                )
              }
              {/* pricing */}

              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-semibold text-3xl md:text-4xl text-app-green">{currency}{product.price.toFixed(2)}</span>
                {
                  product.originalPrice > product.price && (
                    <span className="text-app-text-light text-sm sm:text-[16px] md:text-lg line-through">{currency}{product.originalPrice.toFixed(2)}</span>
                  )
                }
                <span className="text-app-text-light text-sm">/{product.unit}</span>
              </div>

              {/* description */}
              <p className="text-app-text-light text-sm leading-relaxed mb-6">{product.description}</p>

              {/* product stock details */}
              <div className="mb-6">
                {
                  product.stock > 0 ? (
                    <span className="flex items-center gap-1 text-app-success font-medium text-sm">
                      <CheckIcon className="size-4" /> In Stock ({product.stock} available)
                    </span>
                  ) : (
                    <p className="text-app-error text-sm font-medium">Out of Stock</p>
                  )
                }
              </div>

              {/* Cart details */}
              <div className="flex gap-3 max-h-10.5">
                <div className="flex items-center border border-app-border rounded-xl overflow-hidden">
                  <button className="p-3 hover:bg-app-cream transition-colors" onClick={handleMinus}><MinusIcon className="size-4" /></button>
                  <span className="px-5 text-sm font-semibold min-w-10 text-center">{displayQuantity}</span>
                  <button className="p-3 hover:bg-app-cream transition-colors" onClick={handlePlus}><PlusIcon className="size-4" /></button>
                </div>
                <button className={`rounded-xl font-semibold text-[16px] py-3 flex-1 flex justify-center items-center transition-colors gap-2 text-center disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${inCart ? "bg-app-cream text-app-green border border-app-green" : "bg-app-orange text-white hover:bg-app-orange-dark"}`} onClick={() => { if (!inCart) addToCart(product, localQuantity) }} disabled={product.stock === 0}>
                  <ShoppingCart className="size-4" />
                  {
                    inCart ? "Added to Cart" : "Add to Cart"
                  }
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* customer reviews */}
        {
          product.reviewCount > 0 && <DummyReviewsSection product={product} />
        }

        {/* related products */}

        {relatedProducts.length > 0 &&
          (
            <section className="mt-12 mb-44">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-2xl text-app-green">Related Products</h3>
                  <p className="text-sm text-app-text-light mt-1">More from {categoryLable}</p>
                </div>
                <Link to={`/products?category=${product.category}`} className="flex items-center gap-1 text-app-orange hover:text-app-orange-dark transition-colors text-sm font-semibold">View All <ArrowRightIcon className="size-4" /></Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-8">
                {
                  relatedProducts.slice(0, 5).map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                  ))
                }
              </div>
            </section>
          )}
      </div>


    </div>

  )
}
