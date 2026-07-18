import { BikeIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { footerData } from "../assets/assets"

export const Footer = () => {
  return (
    <footer className="bg-app-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand information */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BikeIcon className="size-6 text-white" />
              <span className="text-xl font-semibold">{footerData.brand.name}</span>
            </Link>

            <p className="text-sm text-white/70 mb-4">{footerData.brand.description}</p>
            <div className="flex gap-3">
              {
                footerData.brand.socials.map((social, index) =>
                  <a key={index} href={social.link} className="size-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/2"><img src={social.icon} alt="icon" className="size-4" /></a>
                )
              }
            </div>
          </div>

          {/* Dynamic sections */}
          {
            footerData.sections.map((section, i) => (
              <div key={i}>
                <h3 className="text-sm font-semibold uppercase mb-4">{section.title}</h3>
                <ul className="space-y-2.5">
                  {
                    section.links.map((link, i) => (
                      <li key={i}>
                        {
                          link.to ? (
                        <Link className="text-sm text-white/70 hover:text-white" to={link.to}>
                          {link.label}
                        </Link>
                          ) : (
                            <a href={link.href} className="text-sm text-white/70 hover:text-white" >{link.label}</a>
                          )
                        }
                      </li>
                    ))
                  }
                </ul>
              </div>
            ))
          }

          {/* contact */}
          <div>
            <h3 className="upper case text-sm font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
                <li className="flex items-center gap-3 text-white/70"><MapPinIcon size={16} className="text-sm text-white"/>123, xyz street, Gujarat</li>
                <li className="flex items-center gap-3 text-white/70"><PhoneIcon size={16} className="text-sm text-white" /> +1 (111) 123-4567</li>
                <li className="flex items-center gap-3 text-white/70"><MailIcon size={16} className="text-sm text-white" /> Hello@example.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-xs">&copy; 2026 Instacart. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/" className="text-xs text-white/50 hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link to="/" className="text-xs text-white/50 hover:text-white/70 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
