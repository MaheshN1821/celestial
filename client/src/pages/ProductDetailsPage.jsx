import { useState, useEffect, useContext } from "react";
import img1 from "../assets/phones/p1.jpg";
import img2 from "../assets/phones/p2.jpg";
import img3 from "../assets/phones/p3.jpg";
import {
  Star,
  Heart,
  ShoppingCart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Check,
  MessageSquare,
  Sun,
  Moon,
} from "lucide-react";
import { GlobalContext } from "../components/Context";

// Placeholder data
// const productData = {
//   id: 1,
//   name: "Nova Pro Ultra",
//   brand: "TechVision",
//   price: 999.99,
//   oldPrice: 1199.99,
//   rating: 4.7,
//   reviewCount: 352,
//   description:
//     "Experience the future with the Nova Pro Ultra. Featuring a stunning 6.8-inch OLED display, AI-powered photography system, and industry-leading performance with our latest quantum processor.",
//   additionalDescription: [
//     "The Nova Pro Ultra represents the pinnacle of mobile technology. With its revolutionary design and cutting-edge features, it's more than just a smartphone—it's a glimpse into the future of personal computing.",
//     "Equipped with a stunning 6.8-inch OLED display featuring a 120Hz refresh rate, every interaction feels incredibly smooth and responsive. The display uses our latest Quantum Dot technology, delivering rich, vibrant colors with perfect blacks and exceptional brightness even in direct sunlight.",
//   ],
//   inStock: true,
//   colors: ["Cosmic Black", "Glacier White", "Titanium Gray"],
//   storage: ["128GB", "256GB", "512GB"],
//   ram: ["6GB", "8GB", "12GB"],
//   images: [img1, img2, img3],
//   specifications: [
//     { name: "Display", value: '6.8" OLED, 120Hz' },
//     { name: "Processor", value: "QuantumX 9 Gen" },
//     { name: "RAM", value: "12GB LPDDR5" },
//     { name: "Camera", value: "108MP Main + 50MP Ultra + 12MP Telephoto" },
//     { name: "Battery", value: "5000mAh, 65W Fast Charging" },
//     { name: "OS", value: "AndroidOS 15" },
//   ],
//   features: [
//     "AI-Enhanced Photography",
//     "Quantum Computing Capabilities",
//     "Military-Grade Security",
//     "8K Video Recording",
//     "Water and Dust Resistant (IP68)",
//     "5G Connectivity",
//   ],
// };

const reviews = [
  {
    id: 1,
    user: "Alex M.",
    avatar: img1,
    rating: 5,
    date: "May 5, 2025",
    title: "Best purchase this year!",
    comment:
      "The camera system is extraordinary, and the battery life exceeds expectations. Processing power handles everything I throw at it without any lag.",
    likes: 47,
    verified: true,
  },
  {
    id: 2,
    user: "Taylor K.",
    avatar: img2,
    rating: 4,
    date: "April 28, 2025",
    title: "Great device, minor software issues",
    comment:
      "The hardware is incredible, but I've experienced a few minor software glitches. Customer support is helping me resolve them. Otherwise, it's an amazing device that I use daily.",
    likes: 23,
    verified: true,
  },
  {
    id: 3,
    user: "Jordan P.",
    avatar: img3,
    rating: 5,
    date: "April 22, 2025",
    title: "Worth every penny",
    comment:
      "I was hesitant about the price, but after using it for two weeks, I can confirm it's worth every penny. The display is absolutely stunning and the performance is unmatched.",
    likes: 35,
    verified: true,
  },
];

// Component for the product rating stars
const RatingStars = ({ rating, darkTheme }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${
            i < Math.floor(rating)
              ? darkTheme
                ? "text-white fill-white"
                : "text-black fill-black"
              : i < rating
              ? darkTheme
                ? "text-white fill-white opacity-50"
                : "text-black fill-black opacity-50"
              : darkTheme
              ? "text-gray-600"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

// Main Product Details Page Component
export default function ProductDetailsPage() {
  const { singleProdData } = useContext(GlobalContext);
  const productData = { ...singleProdData };
  const [selectedColor, setSelectedColor] = useState(productData.colors);
  const [selectedStorage, setSelectedStorage] = useState(productData.storage);
  const [selectedRam, setSelectedRam] = useState(productData.ram);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [darkTheme, setDarkTheme] = useState(true);

  // Animation-related states
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const handleQuantityChange = (increment) => {
    const newQuantity = increment ? quantity + 1 : Math.max(1, quantity - 1);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    alert(
      `Added to cart: ${quantity} ${productData.name} - ${selectedColor}, ${selectedStorage}, ${selectedRam}`
    );
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    alert("Review submitted successfully!");
    setShowReviewForm(false);
    setReviewTitle("");
    setReviewComment("");
    setReviewRating(5);
  };

  const changeImage = (increment) => {
    const newIndex = increment
      ? (activeImage + 1) % productData.images.length
      : (activeImage - 1 + productData.images.length) %
        productData.images.length;
    setActiveImage(newIndex);
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isPageLoaded ? "opacity-100" : "opacity-0"
      } ${
        darkTheme ? "bg-black text-white" : "bg-white text-black"
      } p-4 md:p-8`}
    >
      {/* Theme Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full transition-all ${
            darkTheme
              ? "bg-zinc-800 text-white hover:bg-zinc-700"
              : "bg-zinc-100 text-black hover:bg-zinc-200"
          }`}
        >
          {darkTheme ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Navigation Breadcrumb */}
      <div
        className={`text-sm mb-6 ${
          darkTheme ? "text-zinc-400" : "text-zinc-500"
        }`}
      >
        Home / Products / Mobiles & Tablets / {productData.name}
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left Side - Product Images */}
        <div className="relative">
          {/* Main Image with Glassmorphism Effect */}
          <div
            className={`relative h-96 md:h-[28rem] w-full overflow-hidden rounded-2xl ${
              darkTheme
                ? "bg-zinc-900 border-zinc-800"
                : "bg-zinc-50 border-zinc-200"
            } backdrop-blur-lg border shadow-xl mb-4`}
          >
            <img
              src={productData.img}
              alt={`${productData.name} view ${activeImage + 1}`}
              className="object-contain w-full h-full p-4"
            />

            {/* Image Navigation Controls */}
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <button
                onClick={() => changeImage(false)}
                className={`rounded-full p-2 backdrop-blur-sm transition-all ${
                  darkTheme
                    ? "bg-black/70 text-white hover:bg-black/90"
                    : "bg-white/70 text-black hover:bg-white/90"
                }`}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => changeImage(true)}
                className={`rounded-full p-2 backdrop-blur-sm transition-all ${
                  darkTheme
                    ? "bg-black/70 text-white hover:bg-black/90"
                    : "bg-white/70 text-black hover:bg-white/90"
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Image Count Indicator */}
            {/* <div
              className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 backdrop-blur-md px-3 py-1 rounded-full text-xs ${
                darkTheme ? "bg-black/80 text-white" : "bg-white/80 text-black"
              }`}
            >
              {activeImage + 1} / {productData.images.length}
            </div> */}
          </div>

          {/* Thumbnail Images */}
          <div className="flex items-center justify-center gap-3 overflow-x-auto py-2">
            {productData?.img?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-16 h-16 rounded-lg overflow-hidden ${
                  idx === activeImage
                    ? `ring-2 ${
                        darkTheme ? "ring-white" : "ring-black"
                      } shadow-lg scale-110 transition-all`
                    : "opacity-70 hover:opacity-100 transition-all"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side - Product Information */}
        <div className="flex flex-col">
          {/* Product Header */}
          <div
            className={`${
              darkTheme
                ? "bg-zinc-900 border-zinc-800"
                : "bg-zinc-50 border-zinc-200"
            } backdrop-blur-lg rounded-xl p-6 border shadow-lg mb-6 transition-all ${
              darkTheme ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full mb-2 inline-block ${
                    darkTheme
                      ? "bg-zinc-800 text-white"
                      : "bg-zinc-200 text-black"
                  }`}
                >
                  {productData.brand}
                </span>
                <h1
                  className={`text-3xl md:text-4xl font-bold mb-2 ${
                    darkTheme ? "text-white" : "text-black"
                  }`}
                >
                  {productData.name}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <RatingStars
                    rating={productData.rating}
                    darkTheme={darkTheme}
                  />
                  <span
                    className={darkTheme ? "text-zinc-300" : "text-zinc-600"}
                  >
                    {productData.rating}
                  </span>
                </div>
              </div>
              <button
                onClick={handleWishlist}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isWishlisted
                    ? "bg-white/20 text-white-400"
                    : darkTheme
                    ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
                aria-label="Add to wishlist"
              >
                <Heart
                  size={20}
                  className={
                    isWishlisted
                      ? darkTheme
                        ? "fill-white"
                        : "fill-black"
                      : ""
                  }
                />
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold">₹{productData.price}</span>
              {productData.oldPrice && (
                <span
                  className={`text-xl line-through ${
                    darkTheme ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  ₹{productData.oldPrice}
                </span>
              )}
              {productData.oldPrice && (
                <span
                  className={`text-xl font-medium px-1 py-1 mx-0 rounded-md ${
                    darkTheme
                      ? "bg-zinc-800 text-green-400"
                      : "bg-zinc-100 text-green-600"
                  }`}
                >
                  Save ₹{(productData.oldPrice - productData.price).toFixed(2)}
                </span>
              )}
            </div>

            <p
              className={
                darkTheme ? "text-zinc-300 mb-6" : "text-zinc-700 mb-6"
              }
            >
              {productData.description}
            </p>

            {/* Product Availability */}
            <div className="flex items-center gap-2 mb-6">
              <div
                className={`w-3 h-3 rounded-full ${
                  productData.inStock ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span
                className={
                  productData.inStock ? "text-green-400" : "text-red-400"
                }
              >
                {productData.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>

          {/* Product Customization */}
          <div
            className={`${
              darkTheme
                ? "bg-zinc-900 border-zinc-800"
                : "bg-zinc-50 border-zinc-200"
            } backdrop-blur-lg rounded-xl p-6 border shadow-lg mb-6`}
          >
            {/* Color Selection */}
            <div className="mb-6">
              <h3
                className={`text-sm mb-3 ${
                  darkTheme ? "text-zinc-400" : "text-zinc-500"
                }`}
              >
                COLOR
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                {productData?.colors?.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      selectedColor === color
                        ? darkTheme
                          ? "bg-white text-black border-2 border-white shadow-lg"
                          : "bg-black text-white border-2 border-black shadow-lg"
                        : darkTheme
                        ? "bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700"
                        : "bg-zinc-100 text-zinc-700 border border-zinc-200 hover:bg-zinc-200"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            <div className="mb-6">
              <h3
                className={`text-sm mb-3 ${
                  darkTheme ? "text-zinc-400" : "text-zinc-500"
                }`}
              >
                STORAGE
              </h3>
              <div className="flex gap-3">
                {productData?.storage?.map((storage) => (
                  <button
                    key={storage}
                    onClick={() => setSelectedStorage(storage)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      selectedStorage === storage
                        ? darkTheme
                          ? "bg-white text-black border-2 border-white shadow-lg"
                          : "bg-black text-white border-2 border-black shadow-lg"
                        : darkTheme
                        ? "bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700"
                        : "bg-zinc-100 text-zinc-700 border border-zinc-200 hover:bg-zinc-200"
                    }`}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>

            {/* RAM Selection */}
            <div className="mb-6">
              <h3
                className={`text-sm mb-3 ${
                  darkTheme ? "text-zinc-400" : "text-zinc-500"
                }`}
              >
                RAM
              </h3>
              <div className="flex gap-3">
                {productData?.ram?.map((ram) => (
                  <button
                    key={ram}
                    onClick={() => setSelectedRam(ram)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      selectedRam === ram
                        ? darkTheme
                          ? "bg-white text-black border-2 border-white shadow-lg"
                          : "bg-black text-white border-2 border-black shadow-lg"
                        : darkTheme
                        ? "bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700"
                        : "bg-zinc-100 text-zinc-700 border border-zinc-200 hover:bg-zinc-200"
                    }`}
                  >
                    {ram}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div
                className={`flex items-center justify-between rounded-lg border p-1 w-36 ${
                  darkTheme
                    ? "bg-zinc-800 border-zinc-700"
                    : "bg-zinc-100 border-zinc-200"
                }`}
              >
                <button
                  onClick={() => handleQuantityChange(false)}
                  className={`p-2 rounded-md transition-colors ${
                    darkTheme ? "hover:bg-zinc-700" : "hover:bg-zinc-200"
                  }`}
                  disabled={quantity <= 1}
                >
                  <Minus
                    size={16}
                    className={
                      quantity <= 1
                        ? darkTheme
                          ? "text-zinc-500"
                          : "text-zinc-400"
                        : darkTheme
                        ? "text-zinc-300"
                        : "text-zinc-600"
                    }
                  />
                </button>
                <span className="font-medium text-lg">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(true)}
                  className={`p-2 rounded-md ${
                    darkTheme ? "hover:bg-zinc-700" : "hover:bg-zinc-200"
                  } transition-colors`}
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                  darkTheme
                    ? "bg-white text-black hover:bg-zinc-200 shadow-lg"
                    : "bg-black text-white hover:bg-zinc-900 shadow-lg"
                }`}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div
        className={`mb-12 rounded-xl border shadow-lg overflow-hidden ${
          darkTheme
            ? "bg-zinc-900 border-zinc-800"
            : "bg-zinc-50 border-zinc-200"
        } backdrop-blur-lg`}
      >
        {/* Tab Navigation */}
        <div
          className={`flex overflow-x-auto border-b ${
            darkTheme
              ? "border-zinc-800 bg-zinc-900"
              : "border-zinc-200 bg-zinc-100"
          }`}
        >
          {["description", "specifications", "features", "reviews"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? darkTheme
                      ? "text-white border-b-2 border-white"
                      : "text-black border-b-2 border-black"
                    : darkTheme
                    ? "text-zinc-400 hover:text-zinc-200"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "description" && (
            <div className="animate-fadeIn">
              <p
                className={
                  darkTheme
                    ? "text-zinc-300 leading-relaxed"
                    : "text-zinc-700 leading-relaxed"
                }
              >
                {productData.description}
              </p>
              <p
                className={`leading-relaxed mt-4 ${
                  darkTheme ? "text-zinc-300" : "text-zinc-700"
                }`}
              >
                {productData?.additionalDescription1}
              </p>
              <p
                className={`leading-relaxed mt-4 ${
                  darkTheme ? "text-zinc-300" : "text-zinc-700"
                }`}
              >
                {productData?.additionalDescription2}
              </p>
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              {productData.specifications.map((spec, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 p-4 rounded-lg border ${
                    darkTheme
                      ? "bg-zinc-900 border-zinc-800"
                      : "bg-zinc-100 border-zinc-200"
                  }`}
                >
                  <div
                    className={
                      darkTheme
                        ? "bg-zinc-800 p-2 rounded-lg text-white"
                        : "bg-zinc-200 p-2 rounded-lg text-black"
                    }
                  >
                    <Check size={20} />
                  </div>
                  <div>
                    <h4
                      className={`font-medium ${
                        darkTheme ? "text-white" : "text-black"
                      }`}
                    >
                      {spec.name}
                    </h4>
                    <p
                      className={darkTheme ? "text-zinc-400" : "text-zinc-600"}
                    >
                      {spec.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "features" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              {productData.features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-4 rounded-lg border ${
                    darkTheme
                      ? "bg-zinc-900 border-zinc-800"
                      : "bg-zinc-100 border-zinc-200"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      darkTheme ? "bg-white" : "bg-black"
                    }`}
                  ></div>
                  <span
                    className={darkTheme ? "text-zinc-200" : "text-zinc-700"}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="animate-fadeIn">
              {/* Reviews Summary */}
              <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
                <div
                  className={`p-6 rounded-xl border flex-1 ${
                    darkTheme
                      ? "bg-zinc-900 border-zinc-800"
                      : "bg-zinc-100 border-zinc-200"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">
                      {productData.rating}
                    </div>
                    <div className="flex justify-center mb-2">
                      <RatingStars
                        rating={productData.rating}
                        darkTheme={darkTheme}
                      />
                    </div>
                    <div
                      className={`text-sm ${
                        darkTheme ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      {productData.reviewCount} reviews
                    </div>
                  </div>

                  {/* Rating Distribution */}
                  <div className="mt-6 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-2">
                        <span
                          className={`text-sm w-4 ${
                            darkTheme ? "text-zinc-400" : "text-zinc-500"
                          }`}
                        >
                          {star}
                        </span>
                        <div
                          className={`h-2 rounded-full flex-1 overflow-hidden ${
                            darkTheme ? "bg-zinc-800" : "bg-zinc-200"
                          }`}
                        >
                          <div
                            className={`h-full ${
                              darkTheme ? "bg-white" : "bg-black"
                            }`}
                            style={{
                              width: `${
                                star === 5
                                  ? 70
                                  : star === 4
                                  ? 20
                                  : star === 3
                                  ? 7
                                  : star === 2
                                  ? 2
                                  : 1
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span
                          className={`text-xs w-8 ${
                            darkTheme ? "text-zinc-400" : "text-zinc-500"
                          }`}
                        >
                          {star === 5
                            ? "70%"
                            : star === 4
                            ? "20%"
                            : star === 3
                            ? "7%"
                            : star === 2
                            ? "2%"
                            : "1%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className={`w-full md:w-auto font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all ${
                      darkTheme
                        ? "bg-white text-black hover:bg-zinc-200"
                        : "bg-black hover:bg-zinc-900 text-white"
                    }`}
                  >
                    <MessageSquare size={18} />
                    Write a Review
                  </button>
                </div>
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <div
                  className={`p-6 rounded-xl border mb-8 animate-slideDown ${
                    darkTheme
                      ? "bg-black/90 border-gray-800"
                      : "bg-white/95 border-gray-200"
                  }`}
                >
                  <h3 className="text-xl font-medium mb-4">
                    Share Your Experience
                  </h3>
                  <form onSubmit={handleSubmitReview}>
                    <div className="mb-4">
                      <label
                        className={`block mb-2 text-sm ${
                          darkTheme ? "text-white" : "text-black"
                        }`}
                      >
                        Rating
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setReviewRating(star)}
                            className="p-1 focus:outline-none"
                          >
                            <Star
                              size={24}
                              className={`${
                                star <= reviewRating
                                  ? darkTheme
                                    ? "text-white fill-white"
                                    : "text-black fill-black"
                                  : darkTheme
                                  ? "text-gray-700"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        className={`block mb-2 text-sm ${
                          darkTheme ? "text-white" : "text-black"
                        }`}
                      >
                        Review Title
                      </label>
                      <input
                        type="text"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        className={`w-full p-3 rounded-lg border ${
                          darkTheme
                            ? "bg-black border-gray-800 text-white placeholder-gray-500"
                            : "bg-white border-gray-200 text-black placeholder-gray-400"
                        }`}
                        placeholder="Summarize your experience"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        className={`block mb-2 text-sm ${
                          darkTheme ? "text-white" : "text-black"
                        }`}
                      >
                        Your Review
                      </label>
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        className={`w-full p-3 rounded-lg border min-h-32 ${
                          darkTheme
                            ? "bg-black border-gray-800 text-white placeholder-gray-500"
                            : "bg-white border-gray-200 text-black placeholder-gray-400"
                        }`}
                        placeholder="Share your thoughts about this product"
                        required
                      ></textarea>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className={`py-3 px-6 rounded-lg font-medium ${
                          darkTheme
                            ? "bg-white hover:bg-gray-100 text-black"
                            : "bg-black hover:bg-gray-900 text-white"
                        }`}
                      >
                        Submit Review
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className={`py-3 px-6 rounded-lg font-medium ${
                          darkTheme
                            ? "bg-gray-900 hover:bg-gray-800 text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-black"
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Review List */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className={`p-6 rounded-xl border transition-all ${
                      darkTheme
                        ? "bg-black border-gray-800"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={review.avatar}
                          alt={review.user}
                          className="w-10 h-10 rounded-full object-cover border border-gray-500/20"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-medium ${
                                darkTheme ? "text-white" : "text-black"
                              }`}
                            >
                              {review.user}
                            </span>
                          </div>
                          <div
                            className={`text-xs ${
                              darkTheme ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {review.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <RatingStars
                          rating={review.rating}
                          darkTheme={darkTheme}
                        />
                      </div>
                    </div>

                    <h4
                      className={`font-medium mb-2 ${
                        darkTheme ? "text-white" : "text-black"
                      }`}
                    >
                      {review.title}
                    </h4>
                    <p
                      className={`mb-4 ${
                        darkTheme ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {/* <div className="mb-8">
        <h2
          className={`text-2xl font-bold mb-6 ${
            darkTheme ? "text-white" : "text-black"
          }`}
        >
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className={`rounded-xl overflow-hidden border transition-all duration-500 group ${
                darkTheme
                  ? "bg-black border-gray-800 hover:shadow-2xl hover:shadow-white/10"
                  : "bg-white border-gray-200 hover:shadow-2xl hover:shadow-black/10"
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={img1}
                  alt={`Related product ${item}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3
                  className={`font-medium mb-1 transition-colors ${
                    darkTheme
                      ? "text-white group-hover:text-white"
                      : "text-black group-hover:text-black"
                  }`}
                >
                  TechVision Device {item}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  <RatingStars rating={4.5} darkTheme={darkTheme} />
                  <span
                    className={`text-xs ${
                      darkTheme ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    4.5 (120)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className={`font-bold ${
                      darkTheme ? "text-white" : "text-black"
                    }`}
                  >
                    ${(799.99 + item * 50).toFixed(2)}
                  </span>
                  <button
                    className={`p-2 rounded-lg text-white transition-all ${
                      darkTheme
                        ? "bg-white/20 hover:bg-gray-200/20 text-black"
                        : "bg-black hover:bg-gray-900 text-white"
                    }`}
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
