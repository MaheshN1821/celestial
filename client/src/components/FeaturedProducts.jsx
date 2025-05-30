import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, ShoppingCart, Heart } from "lucide-react";
import img1 from "../assets/phones/s1.jpg";
import img2 from "../assets/phones/i3.jpg";
import img3 from "../assets/phones/p1.jpg";
import img4 from "../assets/tablets/gt1.jpg";
import { Navigate, useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Galaxy Ultra Pro",
    category: "Smartphone",
    price: 1299,
    rating: 4.8,
    image: img1,
    features: ["8K Camera", "5nm Processor", "120Hz Display"],
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    category: "Smartphone",
    price: 1399,
    rating: 4.9,
    image: img2,
    features: ["ProMotion", "A17 Bionic", "48MP Camera"],
  },
  {
    id: 3,
    name: "Pixel 8 Pro",
    category: "Smartphone",
    price: 1099,
    rating: 4.7,
    image: img3,
    features: ["Tensor G3", "Super Res Zoom", "LTPO OLED"],
  },
  {
    id: 4,
    name: "Galaxy Tab Ultra",
    category: "Tablet",
    price: 1199,
    rating: 4.6,
    image: img4,
    features: ['14.6" AMOLED', "S Pen included", "16GB RAM"],
  },
];

const ProductCard = ({ product, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="group relative perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative transform-style-3d transition-all duration-500 group-hover:rotate-y-6 bg-black/50 rounded-2xl border border-white/10 overflow-hidden">
        {/* Grid line overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0 
          bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),
          linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] 
          bg-[size:40px_40px] opacity-50"
        ></div>

        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 1, -1, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10 p-6">
          {/* Product image with holographic effect */}
          <div className="relative mb-6 flex justify-center">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/10 to-gray-500/10 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
            />

            <motion.img
              src={product.image}
              alt={product.name}
              className="h-48 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
              whileHover={{
                rotate: [0, -2, 2, 0],
                transition: { duration: 0.5 },
              }}
            />
          </div>

          {/* Product details */}
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm tracking-wide uppercase">
                  {product.category}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm font-semibold text-white">
                ₹{product.price}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-white text-white"
                      : "fill-gray-700 text-gray-700"
                  }`}
                />
              ))}
              <span className="text-gray-400 text-sm ml-2">
                {product.rating}
              </span>
            </div>

            {/* Features */}
            <ul className="space-y-1 mt-2">
              {product.features.map((feature, i) => (
                <li
                  key={i}
                  className="text-sm text-gray-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 mr-2 rounded-full bg-gradient-to-r from-white to-gray-400 transition-all group-hover:w-3"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex space-x-2">
            <motion.button
              className="flex-1 py-3 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium flex items-center justify-center space-x-2 shadow-lg shadow-black/50 border border-white/10 relative overflow-hidden"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>

              <ShoppingCart className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Add to Cart</span>
            </motion.button>

            <motion.button
              className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedProducts = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const Navigate = useNavigate();

  return (
    <section id="phones" className="py-20 bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(40,40,40,0.3)_0%,rgba(0,0,0,0)_70%)]"></div>

        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
          >
            <div className="w-20 h-1 bg-gradient-to-r from-gray-400 to-white mx-auto"></div>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            NEXUS DEVICES
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light tracking-wide">
            Cutting-edge mobile technology reimagined for the future of
            connectivity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.button
            className="px-8 py-4 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium border border-white/10 flex items-center mx-auto group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => Navigate("/user/products-catalog")}
          >
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>

            <span className="relative z-10 tracking-wider">
              VIEW ALL DEVICES
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { Star, ShoppingCart, Heart } from "lucide-react";

// const products = [
//   {
//     id: 1,
//     name: "Galaxy Ultra Pro",
//     category: "Smartphone",
//     price: 1299,
//     rating: 4.8,
//     image: "/placeholder.svg?height=400&width=200",
//     features: ["8K Camera", "5nm Processor", "120Hz Display"],
//   },
//   {
//     id: 2,
//     name: "iPhone 15 Pro Max",
//     category: "Smartphone",
//     price: 1399,
//     rating: 4.9,
//     image: "/placeholder.svg?height=400&width=200",
//     features: ["ProMotion", "A17 Bionic", "48MP Camera"],
//   },
//   {
//     id: 3,
//     name: "Pixel 8 Pro",
//     category: "Smartphone",
//     price: 1099,
//     rating: 4.7,
//     image: "/placeholder.svg?height=400&width=200",
//     features: ["Tensor G3", "Super Res Zoom", "LTPO OLED"],
//   },
//   {
//     id: 4,
//     name: "Galaxy Tab Ultra",
//     category: "Tablet",
//     price: 1199,
//     rating: 4.6,
//     image: "/placeholder.svg?height=300&width=400",
//     features: ['14.6" AMOLED', "S Pen included", "16GB RAM"],
//   },
// ];

// const ProductCard = ({ product, index }) => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   return (
//     <motion.div
//       ref={ref}
//       className="group relative"
//       initial={{ opacity: 0, y: 50 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//     >
//       <div className="relative glassmorphism rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-white/30 group-hover:shadow-lg group-hover:shadow-white/10">
//         {/* Hover gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//         <div className="p-6">
//           {/* Product image with animation */}
//           <div className="relative mb-6 flex justify-center">
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-br from-white/10 to-gray-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//               animate={{
//                 scale: [1, 1.05, 1],
//                 rotate: [0, 2, 0],
//               }}
//               transition={{
//                 repeat: Number.POSITIVE_INFINITY,
//                 duration: 5,
//                 ease: "easeInOut",
//               }}
//             />

//             <motion.img
//               src={product.image}
//               alt={product.name}
//               className="h-48 object-contain relative z-10"
//               whileHover={{
//                 scale: 1.05,
//                 rotate: [0, -2, 2, 0],
//                 transition: { duration: 0.5 },
//               }}
//             />
//           </div>

//           {/* Product details */}
//           <div className="space-y-3">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-xl font-bold text-white">{product.name}</h3>
//                 <p className="text-gray-400">{product.category}</p>
//               </div>
//               <div className="neumorph-sm rounded-lg px-3 py-1 text-sm font-semibold text-white">
//                 ${product.price}
//               </div>
//             </div>

//             {/* Rating */}
//             <div className="flex items-center space-x-1">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={`w-4 h-4 ${
//                     i < Math.floor(product.rating)
//                       ? "fill-white text-white"
//                       : "fill-gray-700 text-gray-700"
//                   }`}
//                 />
//               ))}
//               <span className="text-gray-400 text-sm ml-1">
//                 {product.rating}
//               </span>
//             </div>

//             {/* Features */}
//             <ul className="space-y-1 mt-2">
//               {product.features.map((feature, i) => (
//                 <li key={i} className="text-sm text-gray-300 flex items-center">
//                   <span className="w-1.5 h-1.5 rounded-full bg-white mr-2"></span>
//                   {feature}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Action buttons */}
//           <div className="mt-6 flex space-x-2">
//             <motion.button
//               className="flex-1 py-3 rounded-lg bg-white text-black font-medium flex items-center justify-center space-x-2 shadow-lg shadow-white/10"
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <ShoppingCart className="w-4 h-4" />
//               <span>Add to Cart</span>
//             </motion.button>

//             <motion.button
//               className="w-12 h-12 rounded-lg neumorph-sm flex items-center justify-center border border-white/10 hover:border-white/30 transition-colors"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <Heart className="w-5 h-5 text-white" />
//             </motion.button>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const FeaturedProducts = () => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   return (
//     <section id="phones" className="py-20 relative">
//       <div className="absolute inset-0 overflow-hidden">
//         <motion.div
//           className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl"
//           animate={{
//             x: [0, -50, 0],
//             y: [0, 30, 0],
//           }}
//           transition={{
//             repeat: Number.POSITIVE_INFINITY,
//             duration: 15,
//             ease: "easeInOut",
//           }}
//         />
//       </div>

//       <div className="container mx-auto px-4 relative z-10">
//         <motion.div
//           ref={ref}
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 30 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="text-4xl md:text-5xl font-bold mb-4">
//             Featured Devices
//           </h2>
//           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//             Discover our collection of cutting-edge mobile devices with the
//             latest technology and innovative features.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {products.map((product, index) => (
//             <ProductCard key={product.id} product={product} index={index} />
//           ))}
//         </div>

//         <motion.div
//           className="mt-12 text-center"
//           initial={{ opacity: 0 }}
//           animate={inView ? { opacity: 1 } : {}}
//           transition={{ duration: 0.5, delay: 0.5 }}
//         >
//           <motion.button
//             className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium hover:bg-white/20 transition-all"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             View All Products
//           </motion.button>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedProducts;
