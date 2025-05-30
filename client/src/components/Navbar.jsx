import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  User,
  Heart,
  LogIn,
  Package,
  LogOut,
  ReceiptPoundSterlingIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ scrollY }) => {
  const Navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState({
    searchContent: "",
  });
  const [hoverItem, setHoverItem] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const userDropdownRef = useRef(null);

  useEffect(() => {
    const fName = sessionStorage.getItem("firstName");
    const lName = sessionStorage.getItem("lastName");

    let fullName;
    if (fName && lName) {
      fullName = fName + " " + lName;
      setIsLoggedIn(true);
      setUsername(fullName);
      setIsUserDropdownOpen(false);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contentToSearch = {
      toSearch: searchVal?.searchContent?.toLowerCase(),
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/search/prod",
        contentToSearch,
        {
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
      return;
    }
    // console.log(searchVal);
    // console.log(searchVal.searchContent);
    // console.log(searchVal?.searchContent?.toLowerCase());
  };

  const handleLogin = () => {
    Navigate("/auth/user/login");
    // Mock login functionality
    // setIsLoggedIn(true);
    // setUsername("John Doe");
    // setIsUserDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/user/logout",
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response?.status === 204) {
        console.log("User is logged out Successfully!");
        setIsLoggedIn(false);
        setUsername("");
        setIsUserDropdownOpen(false);
        sessionStorage.clear();
      }
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrollY > 50
          ? "py-2 backdrop-blur-2xl bg-black/30 border-b border-white/10"
          : "py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center mb-1 md:mb-0 -mt-2"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300">
              CELESTIAL
            </span>
            <motion.span
              className="ml-1 h-2 w-2 rounded-full bg-white"
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {["Home", "Phones", "Tablets", "Deals", "Seller"].map(
              (item, index) => (
                <motion.a
                  key={item}
                  href={
                    item == "Tablets"
                      ? "#phones"
                      : item == "Seller"
                      ? "seller-home"
                      : "#" + item.toLowerCase()
                  }
                  className="text-gray-300 hover:text-white hover:p-2 transition-all relative group py-2"
                  onMouseEnter={() => setHoverItem(item)}
                  onMouseLeave={() => setHoverItem(null)}
                  whileHover={{ y: -2 }}
                >
                  <span className="relative z-10">{item}</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-gray-500 to-white"
                    initial={{ width: 0 }}
                    animate={{
                      width: hoverItem === item ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="absolute inset-0 -z-10 rounded-lg bg-white/5"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoverItem === item ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              )
            )}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1 sm:space-x-5">
            {/* Search Button/Input */}
            <div className="relative">
              {isSearchOpen ? (
                <motion.div
                  initial={{ width: 40, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 40, opacity: 0 }}
                  className="flex items-center"
                >
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 text-white focus:outline-none focus:border-white/30"
                      autoFocus
                      value={searchVal.searchContent}
                      onChange={(e) =>
                        setSearchVal({ searchContent: e.target.value })
                      }
                      onBlur={() => setIsSearchOpen(false)}
                    />
                  </form>
                  <X
                    className="w-5 h-5 text-gray-300 absolute right-3 cursor-pointer"
                    onClick={() => setIsSearchOpen(false)}
                  />
                </motion.div>
              ) : (
                <motion.button
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all shadow-lg shadow-black/20"
                  whileHover={{
                    scale: 1.1,
                    borderColor: "rgba(255,255,255,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="w-5 h-5 text-gray-300" />
                </motion.button>
              )}
            </div>

            {/* User Button */}
            <div className="relative" ref={userDropdownRef}>
              <motion.button
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all shadow-lg shadow-black/20"
                whileHover={{
                  scale: 1.1,
                  borderColor: "rgba(255,255,255,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                <User className="w-5 h-5 text-gray-300" />
              </motion.button>

              {/* User Dropdown */}
              <AnimatePresence>
                {isUserDropdownOpen && (
                  <motion.div
                    className="absolute -right-36 mt-2 w-48 bg-black/70 backdrop-blur-2xl border border-white/10 rounded-lg shadow-lg shadow-black/30 overflow-hidden z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isLoggedIn ? (
                      <div className="py-2">
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-sm text-gray-300">Signed in as</p>
                          <p className="text-sm font-medium text-white truncate">
                            {username}
                          </p>
                        </div>
                        <motion.a
                          href="#orders"
                          onClick={() => Navigate("/user/order-tracking")}
                          className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-white/10 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <Package className="w-4 h-4 mr-2" />
                          Track Orders
                        </motion.a>
                        <motion.button
                          onClick={handleLogout}
                          className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/10 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign out
                        </motion.button>
                      </div>
                    ) : (
                      <div className="py-2">
                        <motion.button
                          onClick={handleLogin}
                          className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/10 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <LogIn className="w-4 h-4 mr-2" />
                          Sign in
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist Button */}
            <motion.button
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all shadow-lg shadow-black/20"
              whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => Navigate("/user/wishlist")}
            >
              <Heart className="w-5 h-5 text-gray-300" />
            </motion.button>

            {/* Cart Button */}
            <motion.button
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all shadow-lg shadow-black/20 relative"
              whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => Navigate("/user/cart")}
            >
              <ShoppingCart className="w-5 h-5 text-gray-300" />
              <motion.span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-gray-200 to-white flex items-center justify-center text-xs font-bold text-black"
                initial={{ scale: 0.8 }}
                animate={{ scale: [0.8, 1.1, 1] }}
                transition={{ duration: 0.5 }}
              >
                3
              </motion.span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all shadow-lg shadow-black/20"
              whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden mt-2 absolute w-full bg-black/70 backdrop-blur-2xl border-b border-white/10"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMenuOpen ? "auto" : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ visibility: isMenuOpen ? "visible" : "hidden" }}
      >
        <div className="container mx-auto px-4 py-6">
          <nav className="flex flex-col space-y-5">
            {["Home", "Phones", "Tablets", "Deals"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-white py-2 px-4 transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
                initial={{ x: -20, opacity: 0 }}
                animate={{
                  x: isMenuOpen ? 0 : -20,
                  opacity: isMenuOpen ? 1 : 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{ x: 5 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;

///////////////////////////////////////////////////////
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { ShoppingCart, Search, Menu, X, User, Heart } from "lucide-react";

// const Navbar = ({ scrollY }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchVal, setSearchVal] = useState({
//     searchContent: "",
//   });
//   const [hoverItem, setHoverItem] = useState(null);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(searchVal);
//     console.log(searchVal.searchContent);
//   };

//   return (
//     <motion.header
//       className={`fixed w-full z-50 transition-all duration-500 ${
//         scrollY > 50
//           ? "py-2 backdrop-blur-2xl bg-black/30 border-b border-white/10"
//           : "py-4"
//       }`}
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.7, ease: "easeOut" }}
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col sm:flex-row items-center justify-between">
//           {/* Logo */}
//           <motion.div
//             className="flex items-center mb-1 -mt-2"
//             whileHover={{ scale: 1.05 }}
//           >
//             <span className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300">
//               CELESTIAL
//             </span>
//             <motion.span
//               className="ml-1 h-2 w-2 rounded-full bg-white"
//               animate={{
//                 opacity: [0.4, 1, 0.4],
//                 scale: [1, 1.2, 1],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />
//           </motion.div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-10">
//             {["Home", "Phones", "Tablets", "Deals"].map((item, index) => (
//               <motion.a
//                 key={item}
//                 href={`#${item.toLowerCase()}`}
//                 className="text-gray-300 hover:text-white hover:p-2 transition-all relative group py-2"
//                 onMouseEnter={() => setHoverItem(item)}
//                 onMouseLeave={() => setHoverItem(null)}
//                 whileHover={{ y: -2 }}
//               >
//                 <span className="relative z-10">{item}</span>
//                 <motion.span
//                   className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-gray-500 to-white"
//                   initial={{ width: 0 }}
//                   animate={{
//                     width: hoverItem === item ? "100%" : "0%",
//                   }}
//                   transition={{ duration: 0.3 }}
//                 />
//                 <motion.span
//                   className="absolute inset-0 -z-10 rounded-lg bg-white/5"
//                   initial={{ opacity: 0 }}
//                   animate={{
//                     opacity: hoverItem === item ? 1 : 0,
//                   }}
//                   transition={{ duration: 0.3 }}
//                 />
//               </motion.a>
//             ))}
//           </nav>

//           {/* Action Buttons */}
//           <div className="flex items-center space-x-1 sm:space-x-5">
//             {/* Search Button/Input */}
//             <div className="relative">
//               {isSearchOpen ? (
//                 <motion.div
//                   initial={{ width: 40, opacity: 0 }}
//                   animate={{ width: 200, opacity: 1 }}
//                   exit={{ width: 40, opacity: 0 }}
//                   className="flex items-center"
//                 >
//                   <form onSubmit={(e) => handleSubmit(e)}>
//                     <input
//                       type="text"
//                       placeholder="Search..."
//                       className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 text-white focus:outline-none focus:border-white/30"
//                       autoFocus
//                       value={searchVal.searchContent}
//                       onChange={(e) =>
//                         setSearchVal({ searchContent: e.target.value })
//                       }
//                       onBlur={() => setIsSearchOpen(false)}
//                     />
//                   </form>
//                   <X
//                     className="w-5 h-5 text-gray-300 absolute right-3 cursor-pointer"
//                     onClick={() => setIsSearchOpen(false)}
//                   />
//                 </motion.div>
//               ) : (
//                 <motion.button
//                   className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all shadow-lg shadow-black/20"
//                   whileHover={{
//                     scale: 1.1,
//                     borderColor: "rgba(255,255,255,0.3)",
//                   }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setIsSearchOpen(true)}
//                 >
//                   <Search className="w-5 h-5 text-gray-300" />
//                 </motion.button>
//               )}
//             </div>

//             {/* User Button */}
//             <motion.button
//               className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all shadow-lg shadow-black/20"
//               whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.3)" }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <User className="w-5 h-5 text-gray-300" />
//             </motion.button>

//             {/* Wishlist Button */}
//             <motion.button
//               className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all shadow-lg shadow-black/20"
//               whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.3)" }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Heart className="w-5 h-5 text-gray-300" />
//             </motion.button>

//             {/* Cart Button */}
//             <motion.button
//               className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all shadow-lg shadow-black/20 relative"
//               whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.3)" }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <ShoppingCart className="w-5 h-5 text-gray-300" />
//               <motion.span
//                 className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-gray-200 to-white flex items-center justify-center text-xs font-bold text-black"
//                 initial={{ scale: 0.8 }}
//                 animate={{ scale: [0.8, 1.1, 1] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 3
//               </motion.span>
//             </motion.button>

//             {/* Mobile Menu Button */}
//             <motion.button
//               className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all shadow-lg shadow-black/20"
//               whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.3)" }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? (
//                 <X className="w-5 h-5 text-gray-300" />
//               ) : (
//                 <Menu className="w-5 h-5 text-gray-300" />
//               )}
//             </motion.button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <motion.div
//         className="md:hidden mt-2 absolute w-full bg-black/70 backdrop-blur-2xl border-b border-white/10"
//         initial={{ height: 0, opacity: 0 }}
//         animate={{
//           height: isMenuOpen ? "auto" : 0,
//           opacity: isMenuOpen ? 1 : 0,
//         }}
//         transition={{ duration: 0.5, ease: "easeInOut" }}
//         style={{ visibility: isMenuOpen ? "visible" : "hidden" }}
//       >
//         <div className="container mx-auto px-4 py-6">
//           <nav className="flex flex-col space-y-5">
//             {["Home", "Phones", "Tablets", "Deals"].map((item, index) => (
//               <motion.a
//                 key={item}
//                 href={`#${item.toLowerCase()}`}
//                 className="text-gray-300 hover:text-white py-2 px-4 transition-colors flex items-center"
//                 onClick={() => setIsMenuOpen(false)}
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{
//                   x: isMenuOpen ? 0 : -20,
//                   opacity: isMenuOpen ? 1 : 0,
//                 }}
//                 transition={{
//                   duration: 0.3,
//                   delay: index * 0.1,
//                   ease: "easeOut",
//                 }}
//                 whileHover={{ x: 5 }}
//               >
//                 {item}
//               </motion.a>
//             ))}
//           </nav>
//         </div>
//       </motion.div>
//     </motion.header>
//   );
// };

// export default Navbar;

// {
//   /* <motion.span className="w-1 h-1 bg-white rounded-full mr-3" /> */
// }
