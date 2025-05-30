import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Smartphone, Tablet, Headphones, Watch, Battery } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Smartphones",
    icon: <Smartphone className="w-8 h-8" />,
    count: 120,
    color: "text-white",
  },
  {
    id: 2,
    name: "Tablets",
    icon: <Tablet className="w-8 h-8" />,
    count: 45,
    color: "text-gray-200",
  },
  {
    id: 3,
    name: "Audio",
    icon: <Headphones className="w-8 h-8" />,
    count: 78,
    color: "text-white",
  },
  {
    id: 4,
    name: "Wearables",
    icon: <Watch className="w-8 h-8" />,
    count: 36,
    color: "text-gray-300",
  },
  {
    id: 5,
    name: "Accessories",
    icon: <Battery className="w-8 h-8" />,
    count: 93,
    color: "text-gray-100",
  },
];

const CategoryCard = ({ category, index, Navigate }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleProd = () => {
    Navigate("/user/products-catalog");
  };

  return (
    <motion.div
      ref={ref}
      className="group"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/5 backdrop-blur-md bg-black/20 transition-all duration-500 group-hover:border-white/20 group-hover:bg-black/30 h-full">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-white/5 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 4,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="p-6 md:p-8 flex flex-col items-center text-center relative z-10 h-full">
          {/* Top corner accents */}
          <div className="absolute top-0 left-0 w-6 h-px bg-white/30" />
          <div className="absolute top-0 left-0 w-px h-6 bg-white/30" />
          <div className="absolute top-0 right-0 w-6 h-px bg-white/30" />
          <div className="absolute top-0 right-0 w-px h-6 bg-white/30" />

          {/* Category icon */}
          <motion.div
            className="relative mb-6"
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, 0],
            }}
            transition={{ duration: 0.5 }}
          >
            {/* Icon holder */}
            <div className="w-20 h-20 flex items-center justify-center relative">
              {/* Rotating outer ring */}
              <motion.div
                className="absolute inset-0 border border-white/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />

              {/* Inner circle with icon */}
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-br from-white/10 to-black flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-lg ${category.color}`}
              >
                {category.icon}
              </div>

              {/* Glowing dot */}
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>

          {/* Category details */}
          <h3 className="text-xl font-bold mb-2 tracking-wide text-white">
            {category.name}
          </h3>
          <p className="text-gray-400 font-light">
            <span className="font-mono text-sm">[</span>
            {/* {category.count} Products */}
            Exiting Products
            <span className="font-mono text-sm">]</span>
          </p>

          {/* Action button */}
          <motion.button
            className="mt-6 px-6 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 text-white font-medium hover:bg-white/20 transition-all duration-300 group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={index < 2 ? handleProd : ""}
          >
            <span className="relative z-10">
              {index < 2 ? "Explore" : "Coming Soon"}
            </span>
            <motion.span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white/50 to-white/0"
              initial={{ width: "0%" }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          {/* Bottom corner accents */}
          <div className="absolute bottom-0 left-0 w-6 h-px bg-white/30" />
          <div className="absolute bottom-0 left-0 w-px h-6 bg-white/30" />
          <div className="absolute bottom-0 right-0 w-6 h-px bg-white/30" />
          <div className="absolute bottom-0 right-0 w-px h-6 bg-white/30" />
        </div>
      </div>
    </motion.div>
  );
};

const Categories = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const Navigate = useNavigate();

  return (
    <section id="categories" className="py-24 relative">
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-white/5 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 18,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gray-600/5 blur-3xl"
          animate={{
            x: [0, -70, 0],
            y: [0, 50, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 25,
            ease: "easeInOut",
          }}
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[length:40px_40px] opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Section title with decorative elements */}
          <div className="inline-block relative mb-6">
            <motion.div
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-px h-4 bg-white/30"
              initial={{ height: 0 }}
              animate={inView ? { height: 16 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
            <motion.span
              className="text-sm uppercase tracking-widest text-gray-400 font-light"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Discover our range
            </motion.span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white relative inline-block">
            <span className="relative z-10">Browse Categories</span>
            <motion.span
              className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
              initial={{ width: 0, left: "50%" }}
              animate={inView ? { width: "100%", left: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light mt-6">
            Explore our wide range of products across different categories to
            find exactly what you need.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
              Navigate={Navigate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;

// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { Smartphone, Tablet, Headphones, Watch, Battery } from "lucide-react";

// const categories = [
//   {
//     id: 1,
//     name: "Smartphones",
//     icon: <Smartphone className="w-8 h-8" />,
//     count: 120,
//     color: "bg-white text-black",
//   },
//   {
//     id: 2,
//     name: "Tablets",
//     icon: <Tablet className="w-8 h-8" />,
//     count: 45,
//     color: "bg-gray-200 text-black",
//   },
//   {
//     id: 3,
//     name: "Audio",
//     icon: <Headphones className="w-8 h-8" />,
//     count: 78,
//     color: "bg-gray-800 text-white",
//   },
//   {
//     id: 4,
//     name: "Wearables",
//     icon: <Watch className="w-8 h-8" />,
//     count: 36,
//     color: "bg-gray-600 text-white",
//   },
//   {
//     id: 5,
//     name: "Accessories",
//     icon: <Battery className="w-8 h-8" />,
//     count: 93,
//     color: "bg-gray-400 text-black",
//   },
// ];

// const CategoryCard = ({ category, index }) => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   return (
//     <motion.div
//       ref={ref}
//       className="group"
//       initial={{ opacity: 0, y: 50 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//     >
//       <div className="relative overflow-hidden glassmorphism rounded-2xl border border-white/10 transition-all duration-300 group-hover:border-white/30 group-hover:shadow-lg group-hover:shadow-white/10">
//         {/* Hover gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-gray-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//         <div className="p-8 flex flex-col items-center text-center">
//           {/* Category icon */}
//           <motion.div
//             className={`w-20 h-20 rounded-2xl flex items-center justify-center ${category.color} mb-6 shadow-lg`}
//             whileHover={{
//               scale: 1.1,
//               rotate: [0, -5, 5, 0],
//             }}
//             transition={{ duration: 0.5 }}
//           >
//             {category.icon}
//           </motion.div>

//           {/* Category details */}
//           <h3 className="text-xl font-bold mb-2">{category.name}</h3>
//           <p className="text-gray-400">{category.count} Products</p>

//           {/* Action button */}
//           <motion.button
//             className="mt-6 px-6 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition-all"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Explore
//           </motion.button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const Categories = () => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   return (
//     <section id="categories" className="py-20 relative">
//       <div className="absolute inset-0 overflow-hidden">
//         <motion.div
//           className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-white/5 blur-3xl"
//           animate={{
//             x: [0, 50, 0],
//             y: [0, -30, 0],
//           }}
//           transition={{
//             repeat: Number.POSITIVE_INFINITY,
//             duration: 18,
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
//             Browse Categories
//           </h2>
//           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//             Explore our wide range of products across different categories to
//             find exactly what you need.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//           {categories.map((category, index) => (
//             <CategoryCard key={category.id} category={category} index={index} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Categories;
