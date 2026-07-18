import { BikeIcon, LockIcon, MailIcon, UserIcon } from "lucide-react"
import { assets } from "../assets/assets"
import { Link, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

export const Login = () => {

  const base_server_url = import.meta.env.VITE_BACKEND_URL
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (isLogin) {
      const userData = {
        email,
        password
      }

      try {

        const data = await axios.post(base_server_url + "/auth/login", JSON.stringify(userData), {
          headers: {
            "Content-Type": "application/json"
          }
        })


        localStorage.setItem("auth_user", JSON.stringify(data.data.user))
        localStorage.setItem("auth_token", JSON.stringify(data.data.token))
        setEmail("")
        setPassword("")
        navigate("/")

      } catch (error) {

        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message || "Login Failed")
        } else {
          toast.error("Something went wrong")
          console.log(error)
        }
      }
    }

    else {

      try {

        const userData = {
          name,
          email,
          password
        }
        const data = await axios.post(base_server_url + "/auth/register", JSON.stringify(userData), {
          headers: {
            "Content-Type": "application/json"
          }
        })

        toast.success("Registered")
        localStorage.setItem("auth_user", JSON.stringify(data.data.user))
        localStorage.setItem("auth_token", JSON.stringify(data.data.token))
        setName("")
        setEmail("")
        setPassword("")
        navigate("/")

      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message || "Registration failed")
        } else {
          toast.error("Something went wrong")
          console.log(error)
        }
      }
    }
  }

  useEffect(() => {
    setName("")
    setEmail("")
    setPassword("")
  }, [isLogin])
  return (
    <div className="flex min-h-screen">

      {/* left side */}
      <div className="hidden lg:flex lg:w-1/2 bg-app-green relative items-center justify-center">
        <img src={assets.hero_bg} alt="bg-image" className="absolute inset-0 object-cover h-full bg-center opacity-10" />
        <div className="text-center px-12 relative">
          <h2 className="text-white text-4xl font-semibold mb-4">Welcome back to Instacart</h2>
          <p className="text-white/60 font-serif text-xl max-w-sm mx-auto">Fresh groceries and organic produce, delivered to your doorstep</p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 gap-2">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6"><BikeIcon className="size-8 text-[#1b3022]" /><span className="text-2xl font-semibold text-[#1b3022]" >Instacart</span></Link>
            <h1 className="font-semibold text-2xl text-[#1b3022] mb-2">{isLogin ? "Sign in to your account" : "Sign up for an account"}</h1>
            <p className="text-[#6B7280] text-sm">{isLogin ? "Don't have an account?" : "Already have an account?"} <button className="text-orange-500 ml-1 cursor-pointer font-semibold hover:text-orange-600 transition-colors" onClick={() => setIsLogin(!isLogin)} >{isLogin ? "Create one" : "Sign In"}</button></p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">

            {
              !isLogin && (
                <>
                  <label htmlFor="name">Name</label>
                  <div className="relative">
                    <UserIcon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required className="w-full pl-10 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-gray-200 transition-all" />
                  </div>
                </>
              )
            }

            <label htmlFor="email">Email Address</label>
            <div className="relative">
              <MailIcon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]" />
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full pl-10 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-gray-200 transition-all" />
            </div>

            <label htmlFor="password">Password</label>
            <div className="relative">
              <LockIcon className="size-4 absolute top-1/2 left-3.5 -translate-y-1/2 text-[#6B7280]" />
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required className="w-full border text-sm not-focus:border-gray-200 bg-white rounded-xl pl-10 pr-4 py-3 transition-all" />
            </div>

            <button type="submit" className="flex items-center justify-center font-semibold border rounded-xl bg-green-950 hover:bg-green-900 transition-colors disabled:opacity-50 text-white py-3 w-full cursor-pointer">{isLogin ? "Sign In" : "Sign Up"}</button>
          </form>
        </div>
      </div>
    </div>
  )
}
