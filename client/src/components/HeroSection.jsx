import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../assets/phones/p3.jpg";
import img2 from "../assets/phones/p1.jpg";
import img3 from "../assets/phones/i3.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "The Future Is Now",
      subtitle: "Experience next-gen mobile technology",
      image: img1,
    },
    {
      title: "Ultra Performance",
      subtitle: "Cutting-edge processors for seamless experience",
      image: img2,
    },
    {
      title: "Immersive Display",
      subtitle: "Vibrant colors and crystal clear resolution",
      image: img3,
    },
  ];

  const Navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section
      id="home"
      className="min-h-screen pt-20 flex items-center relative overflow-hidden"
    >
      {/* Futuristic grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black opacity-90 z-10" />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:30px_30px] opacity-40 z-20" />

        {/* Horizontal scan line effect */}
        <motion.div
          className="absolute h-px w-full bg-white/20 blur-sm z-20"
          animate={{
            top: ["0%", "100%"],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 8,
            ease: "linear",
          }}
        />
      </div>

      {/* Background animated shapes with monochrome palette */}
      <div className="absolute inset-0 overflow-hidden z-30">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 15,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-gray-500/10 blur-3xl"
          animate={{
            x: [0, -70, 0],
            y: [0, 50, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 18,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 z-40 relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content Side */}
          <motion.div
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Tech decorative elements */}
            <div className="absolute top-10 left-0 w-20 h-px bg-white/20" />
            <div className="absolute top-10 left-0 w-px h-20 bg-white/20" />

            <div className="relative">
              {/* Slide indicator - tech style */}
              <div className="mb-6 flex items-center">
                <div className="w-8 h-px bg-white/30" />
                <div className="ml-2 font-mono text-xs text-gray-400">
                  {String(currentSlide + 1).padStart(2, "0")}/
                  {String(slides.length).padStart(2, "0")}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  {/* Title with tech decoration */}
                  <div className="relative mb-2">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter text-white">
                      {slides[currentSlide].title}
                    </h1>
                    <motion.div
                      className="absolute -left-6 top-1/2 w-4 h-px bg-white/40"
                      initial={{ width: 0 }}
                      animate={{ width: 16 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    />
                  </div>

                  {/* Subtitle with animated underline */}
                  <div className="relative">
                    <p className="text-xl md:text-2xl text-gray-300 mb-2">
                      {slides[currentSlide].subtitle}
                    </p>
                    <motion.div
                      className="h-px bg-gradient-to-r from-white/0 via-white/40 to-white/0"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Buttons with futuristic design */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.button
                className="px-8 py-4 rounded-none bg-white text-black font-medium text-lg relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => Navigate("/user/products-catalog")}
              >
                <span className="relative z-10">Shop Now</span>
                <motion.div
                  className="absolute left-0 bottom-0 w-full h-0 bg-gray-200"
                  initial={{ height: 0 }}
                  whileHover={{ height: "100%" }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute top-0 right-0 w-0 h-0 border-t-8 border-r-8 border-white border-l-transparent border-b-transparent" />
              </motion.button>

              <motion.button
                className="px-8 py-4 border border-white/30 text-white font-medium text-lg relative overflow-hidden group backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Exciting Deals</span>
                <motion.div
                  className="absolute left-0 bottom-0 w-full h-0 bg-white/10"
                  initial={{ height: 0 }}
                  whileHover={{ height: "100%" }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute top-0 right-0 w-0 h-0 border-t-8 border-r-8 border-white/30 border-l-transparent border-b-transparent" />
              </motion.button>
            </div>

            {/* Slide navigation indicators - more tech style */}
            <div className="flex space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className="group relative"
                  onClick={() => setCurrentSlide(index)}
                >
                  <div
                    className={`w-12 h-1 ${
                      currentSlide === index ? "bg-white" : "bg-white/20"
                    } transition-all duration-300 group-hover:bg-white/70`}
                  />
                  <motion.div
                    className={`absolute -bottom-4 left-0 text-xs font-mono ${
                      currentSlide === index ? "text-white/80" : "text-white/40"
                    }`}
                    animate={{
                      opacity: currentSlide === index ? 1 : 0.4,
                    }}
                  >
                    0{index + 1}
                  </motion.div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Phone Display Side */}
          <motion.div
            className="order-1 md:order-2 flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md">
              {/* Tech frame decoration */}
              <div className="absolute -top-4 -left-4 w-8 h-8">
                <div className="absolute top-0 left-0 w-full h-px bg-white/30"></div>
                <div className="absolute top-0 left-0 w-px h-full bg-white/30"></div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8">
                <div className="absolute top-0 right-0 w-full h-px bg-white/30"></div>
                <div className="absolute top-0 right-0 w-px h-full bg-white/30"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8">
                <div className="absolute bottom-0 left-0 w-full h-px bg-white/30"></div>
                <div className="absolute bottom-0 left-0 w-px h-full bg-white/30"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8">
                <div className="absolute bottom-0 right-0 w-full h-px bg-white/30"></div>
                <div className="absolute bottom-0 right-0 w-px h-full bg-white/30"></div>
              </div>

              {/* Glowing background effect */}
              <motion.div
                className="absolute -inset-4 bg-white/5 rounded-lg blur-3xl"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.4, 0.3],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 4,
                  ease: "easeInOut",
                }}
              />

              {/* Phone display with scanner effect */}
              <div className="relative backdrop-blur-sm border border-white/10 rounded-lg p-6 bg-white/5 overflow-hidden">
                <motion.div
                  className="absolute inset-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent"
                  initial={{ y: "-100%" }}
                  animate={{ y: "200%" }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                    ease: "linear",
                  }}
                />

                {/* Crosshair positioning lines */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-white/5" />
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-px bg-white/5" />

                {/* Main phone image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    className="relative"
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{
                      opacity: 1,
                      rotateY: 0,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      },
                    }}
                    exit={{ opacity: 0, rotateY: -90 }}
                  >
                    <img
                      src={slides[currentSlide].image}
                      alt="Featured device"
                      className="w-full rounded-lg shadow-2xl shadow-black/30"
                    />

                    {/* Tech specs overlay */}
                    <motion.div
                      className="absolute -right-3 top-10 flex flex-col items-start"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <div className="w-20 h-px bg-white/30 mb-2" />
                      <div className="text-xs font-mono text-white/60 mb-1">
                        RAM: 16GB
                      </div>
                      <div className="text-xs font-mono text-white/60 mb-1">
                        CPU: 3.2 GHz
                      </div>
                      <div className="text-xs font-mono text-white/60">
                        AI: Enhanced
                      </div>
                      <div className="w-20 h-px bg-white/30 mt-2" />
                    </motion.div>

                    {/* Bottom tech line */}
                    <motion.div
                      className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
                      initial={{ width: 0 }}
                      animate={{ width: "80%" }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <div className="h-px bg-white/30 w-full" />
                      <div className="mt-1 text-[10px] font-mono text-white/40 text-center">
                        CELESTIAL-X3 PRO
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import img1 from "../assets/phones/one.jpg";
// import img2 from "../assets/phones/two.jpg";

// const HeroSection = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const slides = [
//     {
//       title: "The Future Is Now",
//       subtitle: "Experience next-gen mobile technology",
//       image: img1,
//       color: "from-purple-600 to-pink-600",
//     },
//     {
//       title: "Ultra Performance",
//       subtitle: "Cutting-edge processors for seamless experience",
//       image: img2,
//       color: "from-blue-600 to-cyan-600",
//     },
//     {
//       title: "Immersive Display",
//       subtitle: "Vibrant colors and crystal clear resolution",
//       image: img1,
//       color: "from-emerald-600 to-teal-600",
//     },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <section className="min-h-screen pt-20 flex items-center relative overflow-hidden">
//       {/* Background animated shapes */}
//       <div className="absolute inset-0 overflow-hidden">
//         <motion.div
//           className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-700/30 blur-3xl"
//           animate={{
//             x: [0, 50, 0],
//             y: [0, 30, 0],
//           }}
//           transition={{
//             repeat: Number.POSITIVE_INFINITY,
//             duration: 15,
//             ease: "easeInOut",
//           }}
//         />
//         <motion.div
//           className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-pink-700/20 blur-3xl"
//           animate={{
//             x: [0, -70, 0],
//             y: [0, 50, 0],
//           }}
//           transition={{
//             repeat: Number.POSITIVE_INFINITY,
//             duration: 18,
//             ease: "easeInOut",
//           }}
//         />
//       </div>

//       <div className="container mx-auto px-4 z-10">
//         <div className="grid md:grid-cols-2 gap-8 items-center">
//           <motion.div
//             className="order-2 md:order-1"
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <motion.div
//               key={currentSlide}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.5 }}
//             >
//               <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
//                 {slides[currentSlide].title}
//               </h1>
//               <p className="text-xl md:text-2xl text-white/80 mb-8">
//                 {slides[currentSlide].subtitle}
//               </p>
//             </motion.div>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <motion.button
//                 className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Shop Now
//               </motion.button>

//               <motion.button
//                 className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-lg hover:bg-white/20 transition-all"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Learn More
//               </motion.button>
//             </div>

//             <div className="mt-12 flex space-x-2">
//               {slides.map((_, index) => (
//                 <button
//                   key={index}
//                   className={`w-3 h-3 rounded-full transition-all ${
//                     currentSlide === index ? "bg-white w-8" : "bg-white/30"
//                   }`}
//                   onClick={() => setCurrentSlide(index)}
//                 />
//               ))}
//             </div>
//           </motion.div>

//           <motion.div
//             className="order-1 md:order-2 flex justify-center"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             <div className="relative">
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
//                 animate={{
//                   scale: [1, 1.1, 1],
//                   rotate: [0, 5, 0],
//                 }}
//                 transition={{
//                   repeat: Number.POSITIVE_INFINITY,
//                   duration: 8,
//                   ease: "easeInOut",
//                 }}
//               />

//               <motion.div
//                 className="relative z-10 glassmorphism rounded-3xl p-4 border border-white/20"
//                 animate={{
//                   rotateY: [0, 5, 0],
//                   rotateX: [0, -5, 0],
//                 }}
//                 transition={{
//                   repeat: Number.POSITIVE_INFINITY,
//                   duration: 6,
//                   ease: "easeInOut",
//                 }}
//               >
//                 <motion.img
//                   key={currentSlide}
//                   src={slides[currentSlide].image}
//                   alt="Featured device"
//                   className="w-full max-w-xs mx-auto rounded-2xl"
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   transition={{ duration: 0.5 }}
//                 />

//                 <motion.div
//                   className={`absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t ${slides[currentSlide].color} opacity-30 blur-xl -z-10 rounded-b-3xl`}
//                 />
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
