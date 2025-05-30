import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Tech Enthusiast",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "The Galaxy Ultra Pro exceeded all my expectations. The camera quality is outstanding, and the battery life is impressive. Definitely worth the investment!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Content Creator",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "As a content creator, having a reliable device is crucial. The iPhone 15 Pro Max has been my go-to for all my photography and video needs. The colors are vibrant and true to life.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Software Developer",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "The Pixel 8 Pro has the best software experience I've ever had on a smartphone. The AI features are genuinely useful, and the clean interface makes everything easy to find.",
    rating: 4,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Digital Artist",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "The Galaxy Tab Ultra is perfect for digital art. The S Pen feels natural, and the large display gives me plenty of space to work with. It's become an essential tool in my creative process.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-purple-700/20 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Read testimonials from our satisfied customers who love their new
            devices.
          </p>
        </motion.div>

        <div className="relative">
          <div className="glassmorphism rounded-2xl border border-white/10 p-8 md:p-12 max-w-4xl mx-auto">
            <div className="absolute -top-6 -left-6">
              <Quote className="w-12 h-12 text-purple-500 opacity-50" />
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <motion.div
                className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/30 flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <div className="flex-1">
                <AnimatedTestimonial
                  testimonial={testimonials[currentIndex]}
                  key={currentIndex}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <motion.button
              className="w-12 h-12 rounded-full neumorph flex items-center justify-center"
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex === index ? "bg-purple-500 w-6" : "bg-white/30"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            <motion.button
              className="w-12 h-12 rounded-full neumorph flex items-center justify-center"
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

const AnimatedTestimonial = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-400/20 text-gray-400/20"
            }`}
          />
        ))}
      </div>

      <p className="text-lg md:text-xl italic">"{testimonial.content}"</p>

      <div>
        <h4 className="text-xl font-bold">{testimonial.name}</h4>
        <p className="text-white/60">{testimonial.role}</p>
      </div>
    </motion.div>
  );
};

export default Testimonials;
