import { useState, useEffect, useContext } from "react";
import img1 from "../assets/phones/ph1.jpg";
import img2 from "../assets/phones/ph2.jpg";
import img3 from "../assets/phones/tt.jpg";
import img4 from "../assets/phones/ph4.jpg";
import img5 from "../assets/tablets/t4.jpg";
import img6 from "../assets/tablets/t12.jpg";
import img7 from "../assets/tablets/t16.jpg";
import img8 from "../assets/tablets/t8.jpg";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Star,
  Smartphone,
  Tablet,
  Heart,
  Sun,
  Moon,
} from "lucide-react";
import axios from "axios";
import { GlobalContext } from "./Context";
import { useNavigate } from "react-router-dom";

export default function ProductsCatalog() {
  // Theme state
  const initialProducts = [
    {
      id: 1,
      name: "NexusPro X1",
      category: "smartphone",
      price: 899,
      rating: 4.8,
      specs: '6.7" AMOLED, 8GB RAM, 256GB',
      image: img1,
      featured: true,
    },
    {
      id: 2,
      name: "QuantumSlate Pro",
      category: "tablet",
      price: 1299,
      rating: 4.9,
      specs: '12.9" Liquid Retina XDR, 16GB RAM, 512GB',
      image: img5,
      featured: true,
    },
    {
      id: 3,
      name: "UltraFold Z",
      category: "smartphone",
      price: 1499,
      rating: 4.7,
      specs: 'Foldable 7.6" Dynamic AMOLED, 12GB RAM, 512GB',
      image: img2,
      featured: false,
    },
    {
      id: 4,
      name: "LightTab Mini",
      category: "tablet",
      price: 699,
      rating: 4.5,
      specs: '8.3" Retina, 4GB RAM, 128GB',
      image: img6,
      featured: false,
    },
    {
      id: 5,
      name: "QuantumPhone Lite",
      category: "smartphone",
      price: 599,
      rating: 4.3,
      specs: '6.1" OLED, 6GB RAM, 128GB',
      image: img3,
      featured: false,
    },
    {
      id: 6,
      name: "MaxiTab Ultra",
      category: "tablet",
      price: 999,
      rating: 4.6,
      specs: '11" AMOLED, 8GB RAM, 256GB',
      image: img7,
      featured: false,
    },
    {
      id: 7,
      name: "VisionPro 5G",
      category: "smartphone",
      price: 799,
      rating: 4.4,
      specs: '6.5" Super Retina, 8GB RAM, 256GB',
      image: img4,
      featured: false,
    },
    {
      id: 8,
      name: "SlimPad Air",
      category: "tablet",
      price: 849,
      rating: 4.2,
      specs: '10.9" Liquid Retina, 8GB RAM, 128GB',
      image: img8,
      featured: false,
    },
  ];

  const Navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: [0, 2000],
    rating: 0,
    featured: false,
  });
  const [wishlist, setWishlist] = useState([]);
  const { setSingleProdData } = useContext(GlobalContext);

  // Sample product data with placeholder images

  useEffect(() => {
    try {
      const getData = async () => {
        const result = await axios.get(
          "http://localhost:3000/products/get-products"
        );
        // console.log(result?.data?.prodData);
        const data = result?.data?.prodData;
        console.log(data);

        setProducts([...data]);
      };

      getData();
    } catch (err) {
      console.log(err);
      return;
    }
  }, []);

  // Effect to filter products based on search and filters
  useEffect(() => {
    let filtered = initialProducts;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.specs.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== "all") {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((product) => product.rating >= filters.rating);
    }

    // Featured filter
    if (filters.featured) {
      filtered = filtered.filter((product) => product.featured);
    }

    setProducts(filtered);
  }, [searchTerm, filters]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: "all",
      priceRange: [0, 2000],
      rating: 0,
      featured: false,
    });
    setSearchTerm("");
  };

  // Toggle wishlist item
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleView = (product, index) => {
    console.log(product);
    console.log(index);
    setSingleProdData(products[index]);
    Navigate("/user/product-details");
  };

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Render stars for rating
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < Math.floor(rating)
                ? isDarkMode
                  ? "text-white fill-white"
                  : "text-zinc-500 fill-zinc-500"
                : isDarkMode
                ? "text-gray-500"
                : "text-gray-300"
            }
          />
        ))}
        <span
          className={`ml-1 text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {rating}
        </span>
      </div>
    );
  };

  // Theme classes
  const themeClasses = {
    background: isDarkMode
      ? "bg-gradient-to-br from-gray-950 to-black text-white"
      : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900",

    header: isDarkMode
      ? "backdrop-blur-lg bg-black/50 border-b border-zinc-800"
      : "backdrop-blur-lg bg-white/30 border-b border-white/20 shadow-lg shadow-blue-100/20",

    brandText: isDarkMode
      ? "bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400"
      : "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600",

    searchInput: isDarkMode
      ? "bg-gray-900/70 backdrop-blur-md border border-gray-800 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 placeholder-gray-500"
      : "bg-white/40 backdrop-blur-lg border border-white/30 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 placeholder-gray-500 shadow-lg shadow-blue-100/20",

    filterButton: (isOpen) =>
      isDarkMode
        ? isOpen
          ? "bg-white/10 border-white/20 text-white"
          : "bg-gray-900/70 border-gray-800 text-gray-300 hover:border-gray-600"
        : isOpen
        ? "bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-200"
        : "bg-white/50 border-white/40 text-gray-700 hover:bg-white/70 shadow-lg shadow-blue-100/20",

    filterPanel: isDarkMode
      ? "backdrop-blur-xl bg-gradient-to-b from-gray-900/90 to-black/90 border border-gray-800 shadow-lg shadow-black/30"
      : "backdrop-blur-xl bg-gradient-to-b from-white/80 to-white/60 border border-white/30 shadow-2xl shadow-blue-200/30",

    filterBorder: isDarkMode ? "border-gray-800" : "border-white/20",

    categoryButton: (isActive) =>
      isDarkMode
        ? isActive
          ? "bg-white text-black border-white font-medium"
          : "bg-transparent text-gray-400 border-gray-700 hover:border-gray-500"
        : isActive
        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-transparent font-medium shadow-lg shadow-indigo-200"
        : "bg-white/50 text-gray-700 border-white/40 hover:bg-white/70 shadow-md",

    slider: isDarkMode
      ? "bg-gray-700 [&::-webkit-slider-thumb]:bg-white"
      : "bg-gradient-to-r from-indigo-200 to-purple-200 [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-indigo-500 [&::-webkit-slider-thumb]:to-purple-500",

    ratingButton: (isActive) =>
      isDarkMode
        ? isActive
          ? "bg-white text-black font-medium"
          : "bg-gray-900 text-gray-400 hover:bg-gray-800"
        : isActive
        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-lg"
        : "bg-white/60 text-gray-700 hover:bg-white/80 shadow-md",

    toggle: isDarkMode
      ? "bg-gray-700 peer-checked:bg-white after:bg-gray-900"
      : "bg-gray-300 peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-500 after:bg-white",

    applyButton: isDarkMode
      ? "bg-white text-black hover:bg-gray-200"
      : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-lg shadow-indigo-200",

    select: isDarkMode
      ? "bg-zinc-900 border border-zinc-800 focus:ring-zinc-700"
      : "bg-white/60 border border-white/40 focus:ring-indigo-200 shadow-md backdrop-blur-sm",

    productCard: isDarkMode
      ? "backdrop-blur-sm bg-zinc-900/40 border border-zinc-800 hover:shadow-lg hover:shadow-black/30"
      : "backdrop-blur-lg bg-white/60 border border-white/30 hover:shadow-2xl hover:shadow-blue-200/30 hover:bg-white/70",

    featuredBadge: isDarkMode
      ? "bg-white/90 text-black"
      : "bg-gradient-to-r from-black to-zinc-400 text-white shadow-lg",

    wishlistButton: isDarkMode
      ? "bg-zinc-900/80 border border-zinc-800 hover:bg-zinc-800"
      : "bg-white/60 border border-white/40 hover:bg-white/80 shadow-lg backdrop-blur-sm",

    productImage: isDarkMode
      ? "bg-gradient-to-b from-gray-800 to-gray-900"
      : "bg-gradient-to-b from-gray-100 to-white shadow-inner",

    addToCartButton: isDarkMode
      ? "bg-white hover:bg-gray-100 text-black"
      : "bg-gradient-to-r from-zinc-500 to-black/10 hover:from-zinc-600 hover:to-black-600 text-white shadow-lg shadow-zinc-200",

    noResultsIcon: isDarkMode
      ? "bg-gray-900 border border-gray-800"
      : "bg-white/60 border border-white/30 shadow-lg backdrop-blur-sm",

    resetButton: isDarkMode
      ? "bg-white hover:bg-gray-100 text-black"
      : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg shadow-indigo-200",
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${themeClasses.background}`}
    >
      {/* Header */}
      <header className={`sticky top-0 z-50 ${themeClasses.header}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className={`text-2xl font-bold ${themeClasses.brandText}`}>
              CELESTIAL
            </h1>
            <div className="flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white"
                    : "bg-white/40 hover:bg-white/60 text-gray-700 hover:text-gray-900 shadow-lg shadow-blue-100/20"
                } backdrop-blur-sm`}
                title={
                  isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
{/* 
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search
                    size={18}
                    className={isDarkMode ? "text-gray-400" : "text-gray-500"}
                  />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                  className={`block w-full md:w-64 pl-10 pr-4 py-2 rounded-full focus:outline-none text-sm transition-all duration-300 ${themeClasses.searchInput}`}
                />
              </div> */}
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`flex items-center gap-1 px-4 py-2 rounded-full backdrop-blur-md border transition-all duration-300 ${themeClasses.filterButton(
                  filterOpen
                )}`}
              >
                <Filter
                  size={18}
                  className={
                    filterOpen
                      ? isDarkMode
                        ? "text-white"
                        : "text-white"
                      : isDarkMode
                      ? "text-gray-400"
                      : "text-gray-600"
                  }
                />
                <span className="hidden md:inline">Filters</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Filter Panel*/}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden mb-8 rounded-2xl ${
            filterOpen
              ? `max-h-[500px] opacity-100 ${themeClasses.filterPanel}`
              : "max-h-0 opacity-0 border-0"
          }`}
        >
          {filterOpen && (
            <div className="p-8 rounded-2xl">
              <div
                className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b ${themeClasses.filterBorder}`}
              >
                <h2 className="text-xl font-semibold mb-2 md:mb-0">
                  Refine Your Search
                </h2>
                <button
                  onClick={clearFilters}
                  className={`text-sm flex items-center gap-1 transition-colors ${
                    isDarkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <X size={14} />
                  <span>Reset All Filters</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Category Filter */}
                <div className="space-y-3">
                  <h3
                    className={`text-sm uppercase tracking-wider font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Category
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["all", "smartphone", "tablet"].map((category) => (
                      <button
                        key={category}
                        onClick={() => handleFilterChange("category", category)}
                        className={`px-4 py-2 rounded-md text-sm border transition-all ${themeClasses.categoryButton(
                          filters.category === category
                        )}`}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-3">
                  <h3
                    className={`text-sm uppercase tracking-wider font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Price Range
                  </h3>
                  <div className="pt-2 space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="100"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        handleFilterChange("priceRange", [
                          0,
                          parseInt(e.target.value),
                        ])
                      }
                      className={`w-full h-1 rounded-full appearance-none 
                        [&::-webkit-slider-thumb]:appearance-none 
                        [&::-webkit-slider-thumb]:h-4 
                        [&::-webkit-slider-thumb]:w-4 
                        [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:shadow-lg
                        ${themeClasses.slider}`}
                    />
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-xs ${
                          isDarkMode ? "text-gray-500" : "text-gray-600"
                        }`}
                      >
                        $0
                      </span>
                      <span className="text-sm font-medium">
                        ${filters.priceRange[1]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="space-y-3">
                  <h3
                    className={`text-sm uppercase tracking-wider font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Minimum Rating
                  </h3>
                  <div className="flex items-center space-x-2">
                    {[0, 4, 4.5, 4.8].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleFilterChange("rating", rating)}
                        className={`min-w-[40px] px-3 py-1.5 rounded text-sm transition-all ${themeClasses.ratingButton(
                          filters.rating === rating
                        )}`}
                      >
                        {rating === 0 ? "Any" : rating + "+"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Featured Filter */}
                <div className="space-y-3">
                  <h3
                    className={`text-sm uppercase tracking-wider font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Featured
                  </h3>
                  <label className="inline-flex items-center space-x-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={filters.featured}
                        onChange={(e) =>
                          handleFilterChange("featured", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div
                        className={`w-11 h-6 rounded-full transition-all shadow-inner
                        after:content-[''] after:absolute after:top-0.5 after:left-0.5 
                        after:rounded-full after:h-5 after:w-5 
                        after:transition-all peer-checked:after:translate-x-5 after:shadow-lg
                        ${themeClasses.toggle}`}
                      ></div>
                    </div>
                    <span
                      className={`text-sm transition-colors ${
                        isDarkMode
                          ? "text-gray-300 group-hover:text-gray-200"
                          : "text-gray-700 group-hover:text-gray-900"
                      }`}
                    >
                      Show featured only
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  onClick={() => setFilterOpen(false)}
                  className={`px-6 py-2 rounded-md flex items-center gap-2 transition-all font-medium ${themeClasses.applyButton}`}
                >
                  Apply Filters
                  <ChevronDown size={16} className="transform rotate-180" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* <div className="text-3xl mb-2 -mt-4 text-center">
          EXCITING COLLECTION
        </div> */}
        {/* Results Info */}
        <div className="flex justify-between items-center mb-8">
          <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
            Showing{" "}
            <span
              className={`font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {products.length}
            </span>{" "}
            results
          </p>
          <div className="flex items-center gap-2">
            <span
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Sort by:
            </span>
            <select
              className={`rounded-lg text-sm py-1.5 px-3 focus:outline-none focus:ring-1 appearance-none cursor-pointer transition-all ${themeClasses.select}`}
            >
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product?.id}
              onClick={() => handleView(product, index)}
              className="group relative overflow-hidden rounded-xl transition-all duration-300"
            >
              {/* Card content */}
              <div
                className={`h-full p-5 transition-all flex flex-col hover:scale-[1.02] rounded-xl ${themeClasses.productCard}`}
                onClick={(product) => handleView(product)}
              >
                {product.featured && (
                  <span
                    className={`absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded ${themeClasses.featuredBadge}`}
                  >
                    Featured
                  </span>
                )}

                {/* Wishlist button */}
                <button
                  onClick={() => toggleWishlist(product?._id)}
                  className={`absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center transition-all ${themeClasses.wishlistButton}`}
                >
                  <Heart
                    size={16}
                    fill={
                      wishlist.includes(product?._id)
                        ? isDarkMode
                          ? "white"
                          : "zinc"
                        : "none"
                    }
                    className={`${
                      wishlist.includes(product?._id)
                        ? isDarkMode
                          ? "text-white"
                          : "text-zinc-500"
                        : isDarkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  />
                </button>

                <div className="flex justify-center mb-4 pt-4">
                  <div
                    className={`relative w-40 h-40 rounded-lg overflow-hidden flex items-center justify-center ${themeClasses.productImage}`}
                  >
                    <img
                      src={product?.img}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                  <p
                    className={`text-sm mb-3 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {product.specs}
                  </p>
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-xl font-semibold">₹{product.price}</p>
                      {renderStars(product.rating)}
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        className={`w-full py-2.5 rounded-lg transition-all text-sm font-medium ${themeClasses.addToCartButton}`}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${themeClasses.noResultsIcon}`}
            >
              <X
                size={32}
                className={isDarkMode ? "text-gray-400" : "text-gray-500"}
              />
            </div>
            <h3 className="text-xl font-medium mb-3">No products found</h3>
            <p
              className={`mb-6 max-w-md ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Try adjusting your filters or search term to find what you're
              looking for
            </p>
            <button
              onClick={clearFilters}
              className={`px-8 py-2.5 rounded-lg transition-all font-medium ${themeClasses.resetButton}`}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

//////////////////////////////////////////////////////

// import { useState, useEffect } from "react";
// import {
//   Search,
//   Filter,
//   X,
//   ChevronDown,
//   Star,
//   Smartphone,
//   Tablet,
//   Heart,
// } from "lucide-react";
// import img1 from "../assets/phones/ph1.jpg";
// import img2 from "../assets/phones/ph2.jpg";
// import img3 from "../assets/phones/tt.jpg";
// import img4 from "../assets/phones/ph4.jpg";
// import img5 from "../assets/tablets/t4.jpg";
// import img6 from "../assets/tablets/t12.jpg";
// import img7 from "../assets/tablets/t16.jpg";
// import img8 from "../assets/tablets/t8.jpg";

// export default function ProductsCatalog() {
//   // Sample product data
//   const initialProducts = [
//     {
//       id: 1,
//       name: "NexusPro X1",
//       category: "smartphone",
//       price: 899,
//       rating: 4.8,
//       specs: '6.7" AMOLED, 8GB RAM, 256GB',
//       image: img1,
//       featured: true,
//     },
//     {
//       id: 2,
//       name: "QuantumSlate Pro",
//       category: "tablet",
//       price: 1299,
//       rating: 4.9,
//       specs: '12.9" Liquid Retina XDR, 16GB RAM, 512GB',
//       image: img5,
//       featured: true,
//     },
//     {
//       id: 3,
//       name: "UltraFold Z",
//       category: "smartphone",
//       price: 1499,
//       rating: 4.7,
//       specs: 'Foldable 7.6" Dynamic AMOLED, 12GB RAM, 512GB',
//       image: img2,
//       featured: false,
//     },
//     {
//       id: 4,
//       name: "LightTab Mini",
//       category: "tablet",
//       price: 699,
//       rating: 4.5,
//       specs: '8.3" Retina, 4GB RAM, 128GB',
//       image: img6,
//       featured: false,
//     },
//     {
//       id: 5,
//       name: "QuantumPhone Lite",
//       category: "smartphone",
//       price: 599,
//       rating: 4.3,
//       specs: '6.1" OLED, 6GB RAM, 128GB',
//       image: img3,
//       featured: false,
//     },
//     {
//       id: 6,
//       name: "MaxiTab Ultra",
//       category: "tablet",
//       price: 999,
//       rating: 4.6,
//       specs: '11" AMOLED, 8GB RAM, 256GB',
//       image: img7,
//       featured: false,
//     },
//     {
//       id: 7,
//       name: "VisionPro 5G",
//       category: "smartphone",
//       price: 799,
//       rating: 4.4,
//       specs: '6.5" Super Retina, 8GB RAM, 256GB',
//       image: img4,
//       featured: false,
//     },
//     {
//       id: 8,
//       name: "SlimPad Air",
//       category: "tablet",
//       price: 849,
//       rating: 4.2,
//       specs: '10.9" Liquid Retina, 8GB RAM, 128GB',
//       image: img8,
//       featured: false,
//     },
//   ];

//   // State variables
//   const [products, setProducts] = useState(initialProducts);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     category: "all",
//     priceRange: [0, 2000],
//     rating: 0,
//     featured: false,
//   });
//   const [wishlist, setWishlist] = useState([]);

//   // Effect to filter products based on search and filters
//   useEffect(() => {
//     let filtered = initialProducts;

//     // Search filter
//     if (searchTerm) {
//       filtered = filtered.filter(
//         (product) =>
//           product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           product.specs.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Category filter
//     if (filters.category !== "all") {
//       filtered = filtered.filter(
//         (product) => product.category === filters.category
//       );
//     }

//     // Price range filter
//     filtered = filtered.filter(
//       (product) =>
//         product.price >= filters.priceRange[0] &&
//         product.price <= filters.priceRange[1]
//     );

//     // Rating filter
//     if (filters.rating > 0) {
//       filtered = filtered.filter((product) => product.rating >= filters.rating);
//     }

//     // Featured filter
//     if (filters.featured) {
//       filtered = filtered.filter((product) => product.featured);
//     }

//     setProducts(filtered);
//   }, [searchTerm, filters]);

//   // Handle search input changes
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Handle filter changes
//   const handleFilterChange = (filterName, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [filterName]: value,
//     }));
//   };

//   // Clear all filters
//   const clearFilters = () => {
//     setFilters({
//       category: "all",
//       priceRange: [0, 2000],
//       rating: 0,
//       featured: false,
//     });
//     setSearchTerm("");
//   };

//   // Toggle wishlist item
//   const toggleWishlist = (productId) => {
//     setWishlist((prev) => {
//       if (prev.includes(productId)) {
//         return prev.filter((id) => id !== productId);
//       } else {
//         return [...prev, productId];
//       }
//     });
//   };

//   // Render stars for rating
//   const renderStars = (rating) => {
//     return (
//       <div className="flex">
//         {[...Array(5)].map((_, i) => (
//           <Star
//             key={i}
//             size={16}
//             className={
//               i < Math.floor(rating) ? "text-white fill-white" : "text-gray-500"
//             }
//           />
//         ))}
//         <span className="ml-1 text-sm text-gray-400">{rating}</span>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-white">
//       {/* Header */}
//       <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/50 border-b border-zinc-800">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex justify-between items-center">
//             <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">
//               CELESTIAL
//             </h1>
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                   <Search size={18} className="text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                   placeholder="Search products..."
//                   className="block w-full md:w-64 pl-10 pr-4 py-2 rounded-full bg-gray-900/70 backdrop-blur-md border border-gray-800 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none text-sm placeholder-gray-500"
//                 />
//               </div>
//               <button
//                 onClick={() => setFilterOpen(!filterOpen)}
//                 className={`flex items-center gap-1 px-4 py-2 rounded-full backdrop-blur-md border transition-all duration-300 ${
//                   filterOpen
//                     ? "bg-white/10 border-white/20 text-white"
//                     : "bg-gray-900/70 border-gray-800 text-gray-300 hover:border-gray-600"
//                 }`}
//               >
//                 <Filter
//                   size={18}
//                   className={filterOpen ? "text-white" : "text-gray-400"}
//                 />
//                 <span className="hidden md:inline">Filters</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         {/* Filter Panel*/}
//         <div
//           className={`transition-all duration-300 ease-in-out overflow-hidden mb-8 rounded-2xl ${
//             filterOpen
//               ? "max-h-[500px] opacity-100 border border-gray-800 shadow-lg shadow-black/30"
//               : "max-h-0 opacity-0 border-0"
//           }`}
//         >
//           {filterOpen && (
//             <div className="backdrop-blur-xl bg-gradient-to-b from-gray-900/90 to-black/90 p-8 rounded-2xl">
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-gray-800">
//                 <h2 className="text-xl font-semibold mb-2 md:mb-0">
//                   Refine Your Search
//                 </h2>
//                 <button
//                   onClick={clearFilters}
//                   className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
//                 >
//                   <X size={14} />
//                   <span>Reset All Filters</span>
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                 {/* Category Filter */}
//                 <div className="space-y-3">
//                   <h3 className="text-sm uppercase tracking-wider text-gray-400 font-medium">
//                     Category
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {["all", "smartphone", "tablet"].map((category) => (
//                       <button
//                         key={category}
//                         onClick={() => handleFilterChange("category", category)}
//                         className={`px-4 py-2 rounded-md text-sm border transition-all ${
//                           filters.category === category
//                             ? "bg-white text-black border-white font-medium"
//                             : "bg-transparent text-gray-400 border-gray-700 hover:border-gray-500"
//                         }`}
//                       >
//                         {category.charAt(0).toUpperCase() + category.slice(1)}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Price Range Filter */}
//                 <div className="space-y-3">
//                   <h3 className="text-sm uppercase tracking-wider text-gray-400 font-medium">
//                     Price Range
//                   </h3>
//                   <div className="pt-2 space-y-3">
//                     <input
//                       type="range"
//                       min="0"
//                       max="2000"
//                       step="100"
//                       value={filters.priceRange[1]}
//                       onChange={(e) =>
//                         handleFilterChange("priceRange", [
//                           0,
//                           parseInt(e.target.value),
//                         ])
//                       }
//                       className="w-full h-1 rounded-full appearance-none bg-gray-700
//                         [&::-webkit-slider-thumb]:appearance-none
//                         [&::-webkit-slider-thumb]:h-4
//                         [&::-webkit-slider-thumb]:w-4
//                         [&::-webkit-slider-thumb]:rounded-full
//                         [&::-webkit-slider-thumb]:bg-white
//                         [&::-webkit-slider-thumb]:cursor-pointer"
//                     />
//                     <div className="flex justify-between items-center">
//                       <span className="text-xs text-gray-500">$0</span>
//                       <span className="text-sm font-medium">
//                         ${filters.priceRange[1]}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Rating Filter */}
//                 <div className="space-y-3">
//                   <h3 className="text-sm uppercase tracking-wider text-gray-400 font-medium">
//                     Minimum Rating
//                   </h3>
//                   <div className="flex items-center space-x-2">
//                     {[0, 4, 4.5, 4.8].map((rating) => (
//                       <button
//                         key={rating}
//                         onClick={() => handleFilterChange("rating", rating)}
//                         className={`min-w-[40px] px-3 py-1.5 rounded text-sm transition-all ${
//                           filters.rating === rating
//                             ? "bg-white text-black font-medium"
//                             : "bg-gray-900 text-gray-400 hover:bg-gray-800"
//                         }`}
//                       >
//                         {rating === 0 ? "Any" : rating + "+"}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Featured Filter */}
//                 <div className="space-y-3">
//                   <h3 className="text-sm uppercase tracking-wider text-gray-400 font-medium">
//                     Featured
//                   </h3>
//                   <label className="inline-flex items-center space-x-3 cursor-pointer group">
//                     <div className="relative">
//                       <input
//                         type="checkbox"
//                         checked={filters.featured}
//                         onChange={(e) =>
//                           handleFilterChange("featured", e.target.checked)
//                         }
//                         className="sr-only peer"
//                       />
//                       <div
//                         className="w-11 h-6 rounded-full bg-gray-700 peer-checked:bg-white
//                         after:content-[''] after:absolute after:top-0.5 after:left-0.5
//                         after:bg-gray-900 after:rounded-full after:h-5 after:w-5
//                         after:transition-all peer-checked:after:translate-x-5"
//                       ></div>
//                     </div>
//                     <span className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
//                       Show featured only
//                     </span>
//                   </label>
//                 </div>
//               </div>

//               <div className="pt-6 flex justify-end">
//                 <button
//                   onClick={() => setFilterOpen(false)}
//                   className="px-6 py-2 rounded-md flex items-center gap-2
//                     bg-white text-black hover:bg-gray-200
//                     transition-colors font-medium"
//                 >
//                   Apply Filters
//                   <ChevronDown size={16} className="transform rotate-180" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Results Info */}
//         <div className="flex justify-between items-center mb-8">
//           <p className="text-gray-400">
//             Showing{" "}
//             <span className="font-semibold text-white">{products.length}</span>{" "}
//             results
//           </p>
//           <div className="flex items-center gap-2">
//             <span className="text-gray-400 text-sm">Sort by:</span>
//             <select className="bg-zinc-900 border border-zinc-800 rounded-lg text-sm py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-zinc-700 appearance-none cursor-pointer">
//               <option>Featured</option>
//               <option>Price: Low to High</option>
//               <option>Price: High to Low</option>
//               <option>Rating</option>
//             </select>
//           </div>
//         </div>

//         {/* Products Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="group relative overflow-hidden rounded-xl transition-all duration-300"
//             >
//               {/* Card background */}
//               <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-zinc-900 to-black"></div>

//               {/* Card content */}
//               <div
//                 className="h-full backdrop-blur-sm bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 transition-all
//                   flex flex-col hover:scale-[1.02] hover:shadow-lg hover:shadow-black/30"
//               >
//                 {product.featured && (
//                   <span className="absolute top-3 left-3 bg-white/90 text-black text-xs font-medium px-2 py-1 rounded">
//                     Featured
//                   </span>
//                 )}

//                 {/* Wishlist button */}
//                 <button
//                   onClick={() => toggleWishlist(product.id)}
//                   className="absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center
//                     bg-zinc-900/80 border border-zinc-800 transition-all hover:bg-zinc-800"
//                 >
//                   <Heart
//                     size={16}
//                     fill={wishlist.includes(product.id) ? "white" : "none"}
//                     className={`${
//                       wishlist.includes(product.id)
//                         ? "text-white"
//                         : "text-gray-400"
//                     }`}
//                   />
//                 </button>

//                 <div className="flex justify-center mb-4 pt-4">
//                   <div className="relative w-40 h-40 rounded-lg overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="object-fill"
//                     />
//                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                       {product.category === "smartphone" ? (
//                         <Smartphone size={64} className="text-white/80" />
//                       ) : (
//                         <Tablet size={64} className="text-white/80" />
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex-1 flex flex-col">
//                   <h3 className="font-medium text-lg mb-1">{product.name}</h3>
//                   <p className="text-sm text-gray-400 mb-3">{product.specs}</p>
//                   <div className="mt-auto">
//                     <div className="flex justify-between items-center mb-4">
//                       <p className="text-xl font-semibold">₹{product.price}</p>
//                       {renderStars(product.rating)}
//                     </div>
//                     <div className="grid grid-cols-1 gap-2">
//                       <button className="w-full py-2.5 rounded-lg bg-white hover:bg-gray-100 text-black transition-colors text-sm font-medium">
//                         Add to Cart
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* No Results Message */}
//         {products.length === 0 && (
//           <div className="flex flex-col items-center justify-center mt-20 text-center">
//             <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-900 border border-gray-800 mb-6">
//               <X size={32} className="text-gray-400" />
//             </div>
//             <h3 className="text-xl font-medium mb-3">No products found</h3>
//             <p className="text-gray-400 mb-6 max-w-md">
//               Try adjusting your filters or search term to find what you're
//               looking for
//             </p>
//             <button
//               onClick={clearFilters}
//               className="px-8 py-2.5 rounded-lg bg-white hover:bg-gray-100 text-black transition-colors font-medium"
//             >
//               Reset All Filters
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

//////////////////////////////////////////////////

// import { useState, useEffect } from "react";
// import {
//   Search,
//   Filter,
//   X,
//   ChevronDown,
//   Star,
//   Smartphone,
//   Tablet,
// } from "lucide-react";

// export default function ProductsCatalog() {
//   // Sample product data
//   const initialProducts = [
//     {
//       id: 1,
//       name: "NexusPro X1",
//       category: "smartphone",
//       price: 899,
//       rating: 4.8,
//       specs: '6.7" AMOLED, 8GB RAM, 256GB',
//       image: "/api/placeholder/300/300",
//       featured: true,
//     },
//     {
//       id: 2,
//       name: "QuantumSlate Pro",
//       category: "tablet",
//       price: 1299,
//       rating: 4.9,
//       specs: '12.9" Liquid Retina XDR, 16GB RAM, 512GB',
//       image: "/api/placeholder/300/300",
//       featured: true,
//     },
//     {
//       id: 3,
//       name: "UltraFold Z",
//       category: "smartphone",
//       price: 1499,
//       rating: 4.7,
//       specs: 'Foldable 7.6" Dynamic AMOLED, 12GB RAM, 512GB',
//       image: "/api/placeholder/300/300",
//       featured: false,
//     },
//     {
//       id: 4,
//       name: "LightTab Mini",
//       category: "tablet",
//       price: 699,
//       rating: 4.5,
//       specs: '8.3" Retina, 4GB RAM, 128GB',
//       image: "/api/placeholder/300/300",
//       featured: false,
//     },
//     {
//       id: 5,
//       name: "QuantumPhone Lite",
//       category: "smartphone",
//       price: 599,
//       rating: 4.3,
//       specs: '6.1" OLED, 6GB RAM, 128GB',
//       image: "/api/placeholder/300/300",
//       featured: false,
//     },
//     {
//       id: 6,
//       name: "MaxiTab Ultra",
//       category: "tablet",
//       price: 999,
//       rating: 4.6,
//       specs: '11" AMOLED, 8GB RAM, 256GB',
//       image: "/api/placeholder/300/300",
//       featured: false,
//     },
//     {
//       id: 7,
//       name: "VisionPro 5G",
//       category: "smartphone",
//       price: 799,
//       rating: 4.4,
//       specs: '6.5" Super Retina, 8GB RAM, 256GB',
//       image: "/api/placeholder/300/300",
//       featured: false,
//     },
//     {
//       id: 8,
//       name: "SlimPad Air",
//       category: "tablet",
//       price: 849,
//       rating: 4.2,
//       specs: '10.9" Liquid Retina, 8GB RAM, 128GB',
//       image: "/api/placeholder/300/300",
//       featured: false,
//     },
//   ];

//   // State variables
//   const [products, setProducts] = useState(initialProducts);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     category: "all",
//     priceRange: [0, 2000],
//     rating: 0,
//     featured: false,
//   });

//   // Effect to filter products based on search and filters
//   useEffect(() => {
//     let filtered = initialProducts;

//     // Search filter
//     if (searchTerm) {
//       filtered = filtered.filter(
//         (product) =>
//           product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           product.specs.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Category filter
//     if (filters.category !== "all") {
//       filtered = filtered.filter(
//         (product) => product.category === filters.category
//       );
//     }

//     // Price range filter
//     filtered = filtered.filter(
//       (product) =>
//         product.price >= filters.priceRange[0] &&
//         product.price <= filters.priceRange[1]
//     );

//     // Rating filter
//     if (filters.rating > 0) {
//       filtered = filtered.filter((product) => product.rating >= filters.rating);
//     }

//     // Featured filter
//     if (filters.featured) {
//       filtered = filtered.filter((product) => product.featured);
//     }

//     setProducts(filtered);
//   }, [searchTerm, filters]);

//   // Handle search input changes
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Handle filter changes
//   const handleFilterChange = (filterName, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [filterName]: value,
//     }));
//   };

//   // Clear all filters
//   const clearFilters = () => {
//     setFilters({
//       category: "all",
//       priceRange: [0, 2000],
//       rating: 0,
//       featured: false,
//     });
//     setSearchTerm("");
//   };

//   // Render stars for rating
//   const renderStars = (rating) => {
//     return (
//       <div className="flex">
//         {[...Array(5)].map((_, i) => (
//           <Star
//             key={i}
//             size={16}
//             className={
//               i < Math.floor(rating)
//                 ? "text-yellow-400 fill-yellow-400"
//                 : "text-gray-300"
//             }
//           />
//         ))}
//         <span className="ml-1 text-sm text-gray-600">{rating}</span>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
//       {/* Header */}
//       <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/30 border-b border-gray-800">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex justify-between items-center">
//             <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400">
//               TECH<span className="text-blue-400">NOVA</span>
//             </h1>
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                   <Search size={18} className="text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                   placeholder="Search products..."
//                   className="block w-full md:w-64 pl-10 pr-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-md border border-gray-700 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none text-sm placeholder-gray-400"
//                 />
//               </div>
//               <button
//                 onClick={() => setFilterOpen(!filterOpen)}
//                 className="flex items-center gap-1 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-md border border-gray-700 hover:bg-gray-700/70 transition-all duration-300"
//               >
//                 <Filter size={18} className="text-gray-300" />
//                 <span className="hidden md:inline">Filters</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         {/* Filter Panel - Glassmorphism */}
//         <div
//           className={`transition-all duration-300 ease-in-out overflow-hidden mb-8 rounded-2xl bg-gray-800/30 backdrop-blur-md border border-gray-700 ${
//             filterOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-0"
//           }`}
//         >
//           {filterOpen && (
//             <div className="p-6 space-y-6">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-xl font-semibold">Filters</h2>
//                 <button
//                   onClick={clearFilters}
//                   className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
//                 >
//                   Clear All
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {/* Category Filter */}
//                 <div className="space-y-2">
//                   <h3 className="text-sm font-medium text-gray-300">
//                     Category
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {["all", "smartphone", "tablet"].map((category) => (
//                       <button
//                         key={category}
//                         onClick={() => handleFilterChange("category", category)}
//                         className={`px-4 py-2 rounded-full text-sm ${
//                           filters.category === category
//                             ? "bg-blue-500 text-white"
//                             : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
//                         }`}
//                       >
//                         {category.charAt(0).toUpperCase() + category.slice(1)}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Price Range Filter */}
//                 <div className="space-y-2">
//                   <h3 className="text-sm font-medium text-gray-300">
//                     Price Range
//                   </h3>
//                   <div className="space-y-1">
//                     <input
//                       type="range"
//                       min="0"
//                       max="2000"
//                       step="100"
//                       value={filters.priceRange[1]}
//                       onChange={(e) =>
//                         handleFilterChange("priceRange", [
//                           0,
//                           parseInt(e.target.value),
//                         ])
//                       }
//                       className="w-full h-2 rounded-full appearance-none bg-gray-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
//                     />
//                     <div className="flex justify-between text-xs text-gray-400">
//                       <span>$0</span>
//                       <span>${filters.priceRange[1]}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Rating Filter */}
//                 <div className="space-y-2">
//                   <h3 className="text-sm font-medium text-gray-300">
//                     Minimum Rating
//                   </h3>
//                   <div className="flex space-x-1">
//                     {[0, 4, 4.5, 4.8].map((rating) => (
//                       <button
//                         key={rating}
//                         onClick={() => handleFilterChange("rating", rating)}
//                         className={`px-3 py-1 rounded-lg text-xs ${
//                           filters.rating === rating
//                             ? "bg-blue-500 text-white"
//                             : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
//                         }`}
//                       >
//                         {rating === 0 ? "Any" : rating + "+"}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Featured Filter */}
//                 <div className="space-y-2">
//                   <h3 className="text-sm font-medium text-gray-300">
//                     Featured
//                   </h3>
//                   <label className="inline-flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={filters.featured}
//                       onChange={(e) =>
//                         handleFilterChange("featured", e.target.checked)
//                       }
//                       className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
//                     />
//                     <span className="text-sm text-gray-300">
//                       Show featured only
//                     </span>
//                   </label>
//                 </div>
//               </div>

//               <div className="pt-4 flex justify-end">
//                 <button
//                   onClick={() => setFilterOpen(false)}
//                   className="px-4 py-2 rounded-full flex items-center gap-1 bg-blue-500 hover:bg-blue-600 transition-colors text-white"
//                 >
//                   Apply Filters{" "}
//                   <ChevronDown size={16} className="transform rotate-180" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Results Info */}
//         <div className="flex justify-between items-center mb-6">
//           <p className="text-gray-400">
//             Showing{" "}
//             <span className="font-semibold text-white">{products.length}</span>{" "}
//             results
//           </p>
//           <div className="flex items-center gap-2">
//             <span className="text-gray-400 text-sm">Sort by:</span>
//             <select className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg text-sm py-1 px-2 focus:outline-none focus:ring-1 focus:ring-blue-400">
//               <option>Featured</option>
//               <option>Price: Low to High</option>
//               <option>Price: High to Low</option>
//               <option>Rating</option>
//             </select>
//           </div>
//         </div>

//         {/* Products Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="group relative overflow-hidden rounded-2xl transition-all duration-300"
//             >
//               {/* Neomorphic effect */}
//               <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.05),inset_2px_2px_5px_rgba(0,0,0,0.5)]"></div>

//               {/* Glassmorphic layer */}
//               <div className="h-full backdrop-blur-sm bg-gray-800/30 border border-gray-700/50 rounded-2xl p-4 transition-all flex flex-col hover:scale-[1.03] hover:bg-gray-800/40">
//                 {product.featured && (
//                   <span className="absolute top-2 right-2 bg-blue-500 text-xs font-medium px-2 py-1 rounded-full">
//                     Featured
//                   </span>
//                 )}

//                 <div className="flex justify-center mb-4">
//                   <div className="relative w-40 h-40 rounded-xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="object-cover"
//                     />
//                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                       {product.category === "smartphone" ? (
//                         <Smartphone size={64} className="text-blue-400/80" />
//                       ) : (
//                         <Tablet size={64} className="text-blue-400/80" />
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex-1 flex flex-col">
//                   <h3 className="font-medium text-lg mb-1">{product.name}</h3>
//                   <p className="text-sm text-gray-400 mb-2">{product.specs}</p>
//                   <div className="mt-auto">
//                     <div className="flex justify-between items-center mb-3">
//                       <p className="text-xl font-semibold">${product.price}</p>
//                       {renderStars(product.rating)}
//                     </div>
//                     <button className="w-full py-2 rounded-xl bg-gray-700/50 hover:bg-blue-500 border border-gray-600 hover:border-blue-600 transition-all text-sm font-medium">
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* No Results Message */}
//         {products.length === 0 && (
//           <div className="flex flex-col items-center justify-center mt-20 text-center">
//             <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-800 mb-4">
//               <X size={32} className="text-gray-400" />
//             </div>
//             <h3 className="text-xl font-medium mb-2">No products found</h3>
//             <p className="text-gray-400 mb-6">
//               Try adjusting your filters or search term
//             </p>
//             <button
//               onClick={clearFilters}
//               className="px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors"
//             >
//               Clear Filters
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
