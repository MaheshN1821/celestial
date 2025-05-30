import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, Tag, ArrowRight } from "lucide-react";
import img1 from "../assets/phones/s3.jpg";
import img2 from "../assets/phones/p1.jpg";
import { useNavigate } from "react-router-dom";

const offers = [
  {
    id: 1,
    title: "Summer Sale",
    description: "Get up to 40% off on selected smartphones",
    image: img1,
    discount: "40%",
    expiry: "5 days",
    color: "from-purple-600 to-pink-600",
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Be the first to try our latest tablets",
    image: img2,
    discount: "15%",
    expiry: "7 days",
    color: "from-blue-600 to-cyan-600",
  },
];

const OfferCard = ({ offer, index, Navigate }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="group"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative overflow-hidden glassmorphism rounded-2xl border border-white/10 transition-all duration-300 group-hover:border-purple-500/50">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${offer.color} opacity-10`}
        />

        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
              <p className="text-white/70">{offer.description}</p>
            </div>

            <div
              className={`px-4 py-2 rounded-lg bg-gradient-to-r ${offer.color} text-white font-bold text-xl`}
            >
              {offer.discount}
            </div>
          </div>

          <div className="relative flex-1 mb-6">
            <motion.img
              src={offer.image}
              alt={offer.title}
              className="w-full h-48 object-cover rounded-xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              className={`absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-gradient-to-br ${offer.color} opacity-30 blur-2xl`}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center text-white/70">
              <Clock className="w-4 h-4 mr-2" />
              <span>Ends in {offer.expiry}</span>
            </div>

            <motion.button
              className="px-6 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 text-white font-medium hover:bg-white/20 transition-all flex items-center"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => Navigate("/user/products-catalog")}
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SpecialOffers = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const Navigate = useNavigate();

  return (
    <section id="deals" className="py-20 relative">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/3 w-80 h-80 rounded-full bg-pink-700/20 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
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
          <div className="inline-flex items-center justify-center mb-4">
            <Tag className="w-6 h-6 mr-2 text-pink-500" />
            <h2 className="text-4xl md:text-5xl font-bold">Special Offers</h2>
          </div>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Limited-time deals and exclusive offers on our premium devices.
            Don't miss out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer, index) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              index={index}
              Navigate={Navigate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
