import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
  Headset,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="pt-20 pb-10 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              CELESTIAL
            </h3>
            <p className="text-white/70 mb-6">
              Your destination for cutting-edge mobile technology. We bring the
              future to your fingertips.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Youtube className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                "Home",
                "About Us",
                "Products",
                "Blog",
                "Contact Us",
                "FAQs",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">Categories</h4>
            <ul className="space-y-3">
              {[
                "Smartphones",
                "Tablets",
                "Wearables",
                "Audio",
                "Accessories",
                "Refurbished",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-purple-500 flex-shrink-0 mt-1" />
                <span className="text-white/70">
                  123 Tech Street, Digital City, 10010, USA
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-purple-500 flex-shrink-0" />
                <span className="text-white/70">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-purple-500 flex-shrink-0" />
                <span className="text-white/70">info@futuremobile.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-10 border-t border-white/10">
          <div className="flex items-center">
            <CreditCard className="w-10 h-10 mr-4 text-purple-500" />
            <div>
              <h5 className="font-bold">Secure Payment</h5>
              <p className="text-sm text-white/70">
                Multiple secure payment options available
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <Truck className="w-10 h-10 mr-4 text-purple-500" />
            <div>
              <h5 className="font-bold">Fast Delivery</h5>
              <p className="text-sm text-white/70">
                Free shipping on orders over $50
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <ShieldCheck className="w-10 h-10 mr-4 text-purple-500" />
            <div>
              <h5 className="font-bold">Warranty Protection</h5>
              <p className="text-sm text-white/70">
                Extended warranty options available
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <Headset className="w-10 h-10 mr-4 text-purple-500" />
            <div>
              <h5 className="font-bold">24/7 Support</h5>
              <p className="text-sm text-white/70">
                Customer support available anytime
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} FUTUREMOBILE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
