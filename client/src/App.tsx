import { Toaster } from "react-hot-toast"
import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Products } from "./pages/Products"
import { MyOrders } from "./pages/MyOrders"
import { Deals } from "./pages/Deals"
import { Login } from "./pages/Login"
import { ProductDetail } from "./pages/ProductDetail"
import { Checkout } from "./pages/Checkout"
import { Addresses } from "./pages/Addresses"
import { AppLayout } from "./pages/AppLayout"
import { SearchResults } from "./pages/SearchResults"
import { OrderTracking } from "./pages/OrderTracking"
import { ProtectedRoute } from "./components/ProtectedRoute"
import AdminLayout from "./pages/admin/AdminLayout"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminProductForm from "./pages/admin/AdminProductForm"
import AdminProducts from "./pages/admin/AdminProducts"
import AdminOrders from "./pages/admin/AdminOrders"
import AdminDeliveryPartners from "./pages/admin/AdminDeliveryPartners"
import DeliveryLayout from "./pages/delivery/DeliveryLayout"
import DeliveryLogin from "./pages/delivery/DeliveryLogin"
import DeliveryDashboard from "./pages/delivery/DeliveryDashboard"

const App = () => {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000, style: {backgroundColor: "#2d4a35", color: "white", fontSize: "14px", fontWeight: "bold", marginRight: "15px"} }}  />
      <Routes>

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />

        {/* Main pages for user */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} /> {/* index is the default child route means when user visits / then Home page will be rendered defaultly */}
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="deals" element={<Deals />} />
          <Route element={<ProtectedRoute />}>
            <Route path="orders" element={<MyOrders />} />
            <Route path="orders/:id" element={<OrderTracking />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="addresses" element={<Addresses />} />
          </Route>
        </Route>

        {/* admin pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminProductForm />} />
          <Route path="products/:id/edit" element={<AdminProductForm />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="delivery-partners" element={<AdminDeliveryPartners />} />
        </Route>

        {/* delivery partner pages */}
        <Route path="/delivery/login" element={<DeliveryLogin />} />
        <Route path="/delivery" element={<DeliveryLayout/>}>
          <Route index element={<DeliveryDashboard />} />
        </Route>
      </Routes>
    </>
  )
}

export default App