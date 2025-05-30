import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Bell } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 
          bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),
          linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] 
          bg-[size:40px_40px] opacity-30"
        ></div>

        {/* Animated background blurs */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-white/5 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
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
          className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Animated background element */}
          <motion.div
            className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-white/5 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut",
            }}
          />

          {/* Highlight lines */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-b from-white/30 via-transparent to-transparent"></div>

          <div className="relative z-10 text-center">
            <motion.div
              className="inline-flex items-center justify-center mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Bell className="w-6 h-6 mr-2 text-white/70" />
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                STAY CONNECTED
              </h2>
            </motion.div>

            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 tracking-wide">
              Join our digital ecosystem. Receive cutting-edge insights,
              exclusive tech previews, and innovation alerts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-4 pl-12 pr-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>

              <motion.button
                onClick={handleSubmit}
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium border border-white/10 flex items-center justify-center group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>

                <span className="relative z-10 tracking-wider">SUBSCRIBE</span>
              </motion.button>
            </div>

            <p className="text-sm text-gray-500 mt-4 tracking-wide">
              Your gateway to tomorrow's technology. Privacy guaranteed.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;

// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { Mail, Bell } from "lucide-react";

// const Newsletter = () => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   return (
//     <section className="py-20 relative">
//       <div className="absolute inset-0 overflow-hidden">
//         <motion.div
//           className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-pink-700/20 blur-3xl"
//           animate={{
//             x: [0, -30, 0],
//             y: [0, 20, 0],
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
//           className="glassmorphism rounded-2xl border border-white/10 p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden"
//           initial={{ opacity: 0, y: 50 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />

//           <motion.div
//             className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-3xl"
//             animate={{
//               scale: [1, 1.1, 1],
//               rotate: [0, 10, 0],
//             }}
//             transition={{
//               repeat: Number.POSITIVE_INFINITY,
//               duration: 8,
//               ease: "easeInOut",
//             }}
//           />

//           <div className="relative z-10 text-center">
//             <div className="inline-flex items-center justify-center mb-6">
//               <Bell className="w-6 h-6 mr-2 text-pink-500" />
//               <h2 className="text-3xl md:text-4xl font-bold">Stay Updated</h2>
//             </div>

//             <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
//               Subscribe to our newsletter to receive updates on new product
//               launches, exclusive offers, and tech tips.
//             </p>

//             <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
//               <div className="flex-1 relative">
//                 <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="w-full py-3 pl-12 pr-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
//                 />
//               </div>

//               <motion.button
//                 type="submit"
//                 className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg shadow-purple-500/20"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Subscribe
//               </motion.button>
//             </form>

//             <p className="text-sm text-white/50 mt-4">
//               We respect your privacy. Unsubscribe at any time.
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Newsletter;
