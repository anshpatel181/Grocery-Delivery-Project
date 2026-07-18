import {
  ArrowUpRightIcon,
  BikeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LogOutIcon,
  MapPinIcon,
  MenuIcon,
  PackageIcon,
  SearchIcon,
  ShieldIcon,
  ShoppingCartIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const Navbar = () => {
  // const {user} = useAuth();
  // const user:any = localStorage.getItem("auth_user")
  const user: any = {isAdmin: true}
  const { cartCount, setIsCartOpen } = useCart()
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    setSearchQuery("")
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
    navigate("/login")
  };

  return (
    <nav className="bg-white sticky top-0 z-50 border border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-4">
        <Link
          className="text-[22px] font-medium flex items-center gap-2 shrink-0"
          to="/"
        >
          <BikeIcon size={24} /> Instacart
        </Link>
        <div className="w-full flex items-center justify-end gap-4 lg:gap-10">
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-600">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-app-orange" : "hover:text-app-orange transition-colors"}>Home</NavLink>
            <NavLink to="/products" className={({ isActive }) => isActive ? "text-app-orange" : "hover:text-app-orange transition-colors"}>Products</NavLink>
            <NavLink to="/deals" className={({ isActive }) => isActive ? "text-app-orange" : "hover:text-app-orange transition-colors"}>Deals</NavLink>
          </div>
          <form
            className="hidden sm:flex flex-1 max-w-sm text-xs sm:text-sm"
            onSubmit={handleSearch}
          >
            <div className="relative w-full">
              <SearchIcon className="absolute top-1/2 size-4 left-2.5 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search for groceries..."
                className="w-full bg-orange-50 rounded-full ring ring-app-orange/15 focus:ring-app-orange/30 p-2 pl-8 pr-2 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* right actions */}
          <div className="flex items-center gap-3">
            <button className="relative cursor-pointer p-2 rounded-xl" onClick={() => setIsCartOpen(true)}>
              <ShoppingCartIcon className="size-5 text-zinc-900 " />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 size-4 bg-app-orange text-white text-[10px] rounded-full flex justify-center items-center">
                  {cartCount}
                </span>
              )}
            </button>
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 p-2 cursor-pointer"
                >
                  <div className="size-7 rounded-full bg-green-950 text-white flex items-center justify-center">
                    J
                  </div>
                  {isMenuOpen ? (
                    <ChevronUpIcon className="size-3 text-zinc-500" />
                  ) : (
                    <ChevronDownIcon className="size-3 text-zinc-500" />
                  )}
                </button>
              ) : (
                <div className="flex justify-center items-center gap-2">
                  <Link
                    to="/login"
                    className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-950 rounded-full hover:bg-app-green-light transition-colors"
                  >
                    <UserIcon size={16} /> Sign In
                  </Link>
                  {isMenuOpen ? (
                    <XIcon
                      className="md:hidden"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                    />
                  ) : (
                    <MenuIcon
                      className="md:hidden"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                    />
                  )}
                </div>
              )}

              {isMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2.5 w-56 bg-white rounded-xl shadow-lg border border-app-border py-2 z-50 animate-fade-in">
                    {user && (
                      <div className="px-4 py-2 border-b border-app-border">
                        <p className="text-sm font-medium text-zinc-900">
                          John Doe
                        </p>
                        <p className="text-xs text-zinc-500">
                          john@example.com
                        </p>
                      </div>
                    )}

                    <div onClick={() => setIsMenuOpen(false)}>
                      {!user && (
                        <Link to="/login" className="dropdown-link">
                          <UserIcon size={16} /> Sign In
                        </Link>
                      )}

                      {user && (
                        <Link to="/orders" className="dropdown-link">
                          <PackageIcon size={16} /> My Orders
                        </Link>
                      )}
                      {user && (
                        <Link to="/addresses" className="dropdown-link">
                          <MapPinIcon size={16} /> Addresses
                        </Link>
                      )}

                      <Link to="/products" className="dropdown-link md:hidden">
                        <ArrowUpRightIcon size={16} /> Products
                      </Link>
                      <Link to="/deals" className="dropdown-link md:hidden">
                        <ArrowUpRightIcon size={16} /> Deals
                      </Link>
                      {user?.isAdmin && (
                        <Link
                          to="/admin/products"
                          className="dropdown-link text-app-orange-dark"
                        >
                          <ShieldIcon size={16} />
                          <span className="text-app-orange-dark">
                            Admin Panel
                          </span>
                        </Link>
                      )}
                      {user && (
                        <div className="border-t border-app-border pt-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-app-error hover:bg-red-50 w-full transition-colors"
                          >
                            <LogOutIcon size={16} /> Logout
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
