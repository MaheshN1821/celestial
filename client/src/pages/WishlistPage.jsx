import { useState } from "react";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 3,
      name: "Smart Speaker",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1589003077984-894e133dabab",
    },
    {
      id: 4,
      name: "Wireless Earbuds",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
    },
    {
      id: 3,
      name: "Smart Speaker",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1589003077984-894e133dabab",
    },
    {
      id: 4,
      name: "Wireless Earbuds",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
    },
  ]);

  const [darkMode, setDarkMode] = useState(true);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const bgColor = darkMode ? "bg-black" : "bg-white";
  const textColor = darkMode ? "text-white" : "text-black";
  const accentColor = darkMode ? "border-zinc-700" : "border-zinc-200";
  const cardBg = darkMode ? "bg-zinc-900" : "bg-zinc-50";
  const buttonHover = darkMode
    ? "hover:bg-white hover:text-black"
    : "hover:bg-black hover:text-white";
  const buttonBg = darkMode ? "bg-white/20" : "bg-black/10";
  const buttonText = darkMode ? "text-white" : "text-black";
  const buttonBorder = darkMode ? "border-white" : "border-black";

  if (wishlist.length === 0) {
    return (
      <div
        className={`min-h-screen ${bgColor} ${textColor} transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Wishlist</h1>
            <button
              onClick={toggleDarkMode}
              className={`px-4 py-2 rounded-full ${buttonBg} border ${buttonBorder} ${buttonText} ${buttonHover} transition-colors flex items-center gap-2`}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          <div
            className={`text-center py-16 ${cardBg} rounded-2xl shadow-xl p-8`}
          >
            <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="mb-8">
              Save items to your wishlist to find them easily later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${bgColor} ${textColor} transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Wishlist</h1>
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-full ${buttonBg} border ${buttonBorder} ${buttonText} ${buttonHover} transition-colors flex items-center gap-2`}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div
          className={`backdrop-blur-lg rounded-2xl shadow-2xl border ${accentColor} overflow-hidden`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className={`${cardBg} m-4 border-b border-r ${accentColor} overflow-hidden transition-all hover:scale-[1.02] group`}
              >
                <div className="relative h-64">
                  <img
                    src={item.image || "/api/placeholder/600/400"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <h3 className="font-bold text-xl text-white">
                      {item.name}
                    </h3>
                    <p className="text-white opacity-90 text-lg">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className={`w-full px-4 py-3 rounded-lg ${buttonBg} border ${buttonBorder} ${buttonText} ${buttonHover} transition-colors text-sm font-medium flex items-center justify-center group-hover:scale-105 duration-300`}
                  >
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;

// import { useState } from "react";

// const WishlistPage = () => {
//   const [wishlist, setWishlist] = useState([
//     {
//       id: 3,
//       name: "Smart Speaker",
//       price: 89.99,
//       image: "https://images.unsplash.com/photo-1589003077984-894e133dabab",
//     },
//     {
//       id: 4,
//       name: "Wireless Earbuds",
//       price: 159.99,
//       image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
//     },
//   ]);

//   const removeFromWishlist = (id) => {
//     setWishlist(wishlist.filter((item) => item.id !== id));
//   };

//   if (wishlist.length === 0) {
//     return (
//       <div className="text-center py-16">
//         <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
//         <p className="mb-8">
//           Save items to your wishlist to find them easily later.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="px-4 sm:px-0">
//       <h1 className="text-3xl font-bold mb-8">Wishlist</h1>

//       <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {wishlist.map((item) => (
//             <div
//               key={item.id}
//               className="bg-black bg-opacity-40 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
//             >
//               <div className="relative h-48">
//                 <img
//                   src={item.image || "/placeholder.svg"}
//                   alt={item.name}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
//               </div>

//               <div className="p-4">
//                 <h3 className="font-medium text-lg mb-1">{item.name}</h3>
//                 <p className="text-gray-300 mb-4">${item.price.toFixed(2)}</p>

//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => removeFromWishlist(item.id)}
//                     className="px-3 py-2 rounded-lg bg-transparent border border-white hover:bg-white hover:text-black transition-colors"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WishlistPage;
