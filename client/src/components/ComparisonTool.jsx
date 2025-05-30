import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight,
  Zap,
  Cpu,
  Battery,
  // Memory,
  HardDrive,
  Smartphone,
} from "lucide-react";
import img1 from "../assets/phones/s1.jpg";
import img2 from "../assets/phones/i3.jpg";
import img3 from "../assets/phones/p1.jpg";

const phones = [
  {
    id: 1,
    name: "Galaxy Ultra Pro",
    image: img1,
    specs: {
      display: '6.8" Dynamic AMOLED 2X',
      processor: "Snapdragon 8 Gen 2",
      camera: "200MP + 12MP + 10MP + 10MP",
      battery: "5000mAh",
      ram: "12GB",
      storage: "512GB",
    },
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    image: img2,
    specs: {
      display: '6.7" Super Retina XDR',
      processor: "A17 Bionic",
      camera: "48MP + 12MP + 12MP",
      battery: "4400mAh",
      ram: "8GB",
      storage: "512GB",
    },
  },
  {
    id: 3,
    name: "Pixel 8 Pro",
    image: img3,
    specs: {
      display: '6.7" LTPO OLED',
      processor: "Google Tensor G3",
      camera: "50MP + 48MP + 48MP",
      battery: "5050mAh",
      ram: "12GB",
      storage: "256GB",
    },
  },
];

const ComparisonTool = () => {
  const [selectedPhones, setSelectedPhones] = useState([phones[0], phones[1]]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handlePhoneChange = (index, phoneId) => {
    const newSelectedPhones = [...selectedPhones];
    newSelectedPhones[index] = phones.find(
      (phone) => phone.id === Number.parseInt(phoneId)
    );
    setSelectedPhones(newSelectedPhones);
  };

  const specIcons = {
    display: <Smartphone className="w-5 h-5" />,
    processor: <Cpu className="w-5 h-5" />,
    camera: <Zap className="w-5 h-5" />,
    battery: <Battery className="w-5 h-5" />,
    ram: <Battery className="w-5 h-5" />,
    storage: <HardDrive className="w-5 h-5" />,
  };

  return (
    <section className="py-20 bg-black text-white relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(40,40,40,0.3)_0%,rgba(0,0,0,0)_70%)]"></div>

        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl"
          animate={{
            x: [0, 40, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gray-500/5 blur-3xl"
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
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
            CELESTIAL COMPARE
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light tracking-wide">
            Advanced holographic device analysis system
          </p>
        </motion.div>

        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 backdrop-blur-lg shadow-2xl p-8 relative overflow-hidden">
          {/* Highlight lines */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-white/30 via-transparent to-transparent"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Labels column */}
            <div className="flex flex-col justify-center order-1 md:order-none">
              <div className="space-y-12">
                <div className="h-16"></div>
                <div className="h-64"></div>
                <div className="space-y-12">
                  {Object.entries(specIcons).map(([key, icon]) => (
                    <div key={key} className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        {icon}
                      </div>
                      <p className="text-gray-300 font-medium uppercase tracking-wider text-sm">
                        {key === "ram"
                          ? "RAM"
                          : key.charAt(0).toUpperCase() + key.slice(1)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Device columns */}
            {selectedPhones.map((phone, index) => (
              <motion.div
                key={index}
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + index * 0.2 }}
              >
                <div className="mb-8">
                  <div className="relative">
                    <select
                      className="w-full p-4 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent pr-10"
                      value={phone.id}
                      onChange={(e) => handlePhoneChange(index, e.target.value)}
                    >
                      {phones.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mb-12">
                  <motion.div
                    className="relative"
                    whileHover={{
                      scale: 1.05,
                      rotate: [0, -2, 2, 0],
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-gray-500/20 to-white/20 rounded-full blur-2xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.7, 0.5],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Phone image */}
                    <div className="relative z-10 p-2">
                      <img
                        src={phone.image || "/placeholder.svg"}
                        alt={phone.name}
                        className="h-64 object-contain"
                      />

                      {/* Scanning effect */}
                      <motion.div
                        className="absolute left-0 top-0 w-full h-2 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                        animate={{
                          top: ["0%", "100%", "0%"],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          ease: "linear",
                        }}
                      />
                    </div>
                  </motion.div>
                </div>

                <div className="space-y-12">
                  {Object.entries(phone.specs).map(([key, value]) => (
                    <motion.div
                      key={key}
                      className="font-medium bg-black/50 border border-white/10 rounded-lg p-3 text-center backdrop-blur-sm"
                      whileHover={{
                        scale: 1.03,
                        backgroundColor: "rgba(255,255,255,0.1)",
                      }}
                    >
                      {value}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.button
              className="px-8 py-4 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium shadow-lg shadow-black/50 border border-white/10 flex items-center mx-auto group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>

              <span className="relative z-10 font-medium tracking-wider">
                DETAILED ANALYSIS
              </span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div> */}
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-4"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        />
      </div>
    </section>
  );
};

export default ComparisonTool;

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { ArrowRight } from "lucide-react";

// const phones = [
//   {
//     id: 1,
//     name: "Galaxy Ultra Pro",
//     image: "/placeholder.svg?height=400&width=200",
//     specs: {
//       display: '6.8" Dynamic AMOLED 2X',
//       processor: "Snapdragon 8 Gen 2",
//       camera: "200MP + 12MP + 10MP + 10MP",
//       battery: "5000mAh",
//       ram: "12GB",
//       storage: "512GB",
//     },
//   },
//   {
//     id: 2,
//     name: "iPhone 15 Pro Max",
//     image: "/placeholder.svg?height=400&width=200",
//     specs: {
//       display: '6.7" Super Retina XDR',
//       processor: "A17 Bionic",
//       camera: "48MP + 12MP + 12MP",
//       battery: "4400mAh",
//       ram: "8GB",
//       storage: "512GB",
//     },
//   },
//   {
//     id: 3,
//     name: "Pixel 8 Pro",
//     image: "/placeholder.svg?height=400&width=200",
//     specs: {
//       display: '6.7" LTPO OLED',
//       processor: "Google Tensor G3",
//       camera: "50MP + 48MP + 48MP",
//       battery: "5050mAh",
//       ram: "12GB",
//       storage: "256GB",
//     },
//   },
// ];

// const ComparisonTool = () => {
//   const [selectedPhones, setSelectedPhones] = useState([phones[0], phones[1]]);
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   const handlePhoneChange = (index, phoneId) => {
//     const newSelectedPhones = [...selectedPhones];
//     newSelectedPhones[index] = phones.find(
//       (phone) => phone.id === Number.parseInt(phoneId)
//     );
//     setSelectedPhones(newSelectedPhones);
//   };

//   return (
//     <section className="py-20 relative">
//       <div className="absolute inset-0 overflow-hidden">
//         <motion.div
//           className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full bg-blue-700/20 blur-3xl"
//           animate={{
//             x: [0, 40, 0],
//             y: [0, -20, 0],
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
//             Compare Devices
//           </h2>
//           <p className="text-xl text-white/70 max-w-2xl mx-auto">
//             Find the perfect device by comparing specifications side by side.
//           </p>
//         </motion.div>

//         <div className="glassmorphism rounded-2xl border border-white/10 p-8">
//           <div className="grid grid-cols-3 gap-6">
//             <div className="flex flex-col justify-center">
//               <div className="space-y-8">
//                 <div className="h-16"></div>
//                 <div className="h-64"></div>
//                 <div className="space-y-6">
//                   <p className="text-white/70 font-medium">Display</p>
//                   <p className="text-white/70 font-medium">Processor</p>
//                   <p className="text-white/70 font-medium">Camera</p>
//                   <p className="text-white/70 font-medium">Battery</p>
//                   <p className="text-white/70 font-medium">RAM</p>
//                   <p className="text-white/70 font-medium">Storage</p>
//                 </div>
//               </div>
//             </div>

//             {selectedPhones.map((phone, index) => (
//               <motion.div
//                 key={index}
//                 className="flex flex-col"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={inView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
//               >
//                 <div className="mb-8">
//                   <select
//                     className="w-full p-3 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-white"
//                     value={phone.id}
//                     onChange={(e) => handlePhoneChange(index, e.target.value)}
//                   >
//                     {phones.map((p) => (
//                       <option key={p.id} value={p.id}>
//                         {p.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="flex justify-center mb-8">
//                   <motion.div
//                     className="relative"
//                     whileHover={{
//                       scale: 1.05,
//                       rotate: [0, -2, 2, 0],
//                     }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     <motion.div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-2xl" />
//                     <img
//                       src={phone.image || "/placeholder.svg"}
//                       alt={phone.name}
//                       className="h-64 object-contain relative z-10"
//                     />
//                   </motion.div>
//                 </div>

//                 <div className="space-y-6">
//                   <p className="font-medium">{phone.specs.display}</p>
//                   <p className="font-medium">{phone.specs.processor}</p>
//                   <p className="font-medium">{phone.specs.camera}</p>
//                   <p className="font-medium">{phone.specs.battery}</p>
//                   <p className="font-medium">{phone.specs.ram}</p>
//                   <p className="font-medium">{phone.specs.storage}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           <motion.div
//             className="mt-12 text-center"
//             initial={{ opacity: 0 }}
//             animate={inView ? { opacity: 1 } : {}}
//             transition={{ duration: 0.5, delay: 0.5 }}
//           >
//             <motion.button
//               className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg shadow-purple-500/20 flex items-center mx-auto"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <span>View Detailed Comparison</span>
//               <ArrowRight className="w-4 h-4 ml-2" />
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ComparisonTool;
