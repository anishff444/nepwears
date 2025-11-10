import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-nepal-900 text-nepal-100 mt-auto">
      {/* Main Footer */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-terracotta-500 to-nepal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl font-display">N</span>
              </div>
              <span className="text-2xl font-display font-bold text-white">
                NepWears
              </span>
            </div>
            <p className="text-nepal-300 text-sm leading-relaxed">
              Authentic Nepali fashion celebrating the rich heritage and craftsmanship of Nepal. Wear your culture with pride.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-nepal-800 hover:bg-terracotta-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-nepal-800 hover:bg-terracotta-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-nepal-800 hover:bg-terracotta-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-display font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products"
                  className="text-nepal-300 hover:text-terracotta-400 transition-colors text-sm"
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-nepal-300 hover:text-terracotta-400 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-nepal-300 hover:text-terracotta-400 transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="text-nepal-300 hover:text-terracotta-400 transition-colors text-sm"
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-display font-semibold text-lg mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-nepal-300 hover:text-terracotta-400 transition-colors text-sm"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-nepal-300 hover:text-terracotta-400 transition-colors text-sm"
                >
                  Returns & Exchange
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-nepal-300 hover:text-terracotta-400 transition-colors text-sm"
                >
                  Size Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-nepal-300 hover:text-terracotta-400 transition-colors text-sm"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-nepal-300 hover:text-terracotta-400 transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-display font-semibold text-lg mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-nepal-300">
                <MapPin className="w-5 h-5 text-terracotta-500 flex-shrink-0 mt-0.5" />
                <span>Kathmandu, Nepal</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-nepal-300">
                <Phone className="w-5 h-5 text-terracotta-500 flex-shrink-0 mt-0.5" />
                <a href="tel:+977-1-234567" className="hover:text-terracotta-400 transition-colors">
                  +977-1-234567
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-nepal-300">
                <Mail className="w-5 h-5 text-terracotta-500 flex-shrink-0 mt-0.5" />
                <a href="mailto:hello@nepwears.com" className="hover:text-terracotta-400 transition-colors">
                  hello@nepwears.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-nepal-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-nepal-400">
            <p>
              &copy; {currentYear} NepWears. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Made with <span className="text-red-500">❤</span> in Nepal
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
