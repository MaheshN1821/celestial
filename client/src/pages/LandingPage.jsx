import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts";
import Categories from "../components/Categories";
import SpecialOffers from "../components/SpecialOffers";
import ComparisonTool from "../components/ComparisonTool";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import "../index.css";

function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 
          bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),
          linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] 
          bg-[size:40px_40px] opacity-30"
        ></div>

        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(40,40,40,0.3)_0%,rgba(0,0,0,0)_70%)]"></div>

        {/* Animated background blurs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10">
        <Navbar scrollY={scrollY} />

        <main className="relative">
          <HeroSection />
          <FeaturedProducts />
          <Categories />
          <SpecialOffers />
          <ComparisonTool />
          <Testimonials />
          <Newsletter />
        </main>

        <Footer />
      </div>

      {/* Animated scroll indicator */}
      {/* <div
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-10 h-16 border-2 border-white/20 rounded-full flex justify-center pt-2"
        style={{ opacity: scrollY > 100 ? 0 : 1, transition: "opacity 0.3s" }}
      >
        <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce"></div>
      </div> */}
    </div>
  );
}

export default LandingPage;

// import { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import HeroSection from "../components/HeroSection";
// import FeaturedProducts from "../components/FeaturedProducts";
// import Categories from "../components/Categories";
// import SpecialOffers from "../components/SpecialOffers";
// import ComparisonTool from "../components/ComparisonTool";
// import Testimonials from "../components/Testimonials";
// import Newsletter from "../components/Newsletter";
// import Footer from "../components/Footer";
// import "../index.css";

// function LandingPage() {
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
//       <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-10 z-0"></div>
//       <div className="relative z-10">
//         <Navbar scrollY={scrollY} />
//         <main>
//           <HeroSection />
//           <FeaturedProducts />
//           <Categories />
//           <SpecialOffers />
//           <ComparisonTool />
//           <Testimonials />
//           <Newsletter />
//         </main>
//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default LandingPage;
