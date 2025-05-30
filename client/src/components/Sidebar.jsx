import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart2,
  Users,
  HelpCircle,
} from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen, darkMode = true }) => {
  const location = useLocation();
  const Navigate = useNavigate();

  const sellerFName = sessionStorage.getItem("sellerFirstName");
  const sellerLName = sessionStorage.getItem("sellerLastName");

  let sellerName = "seller";
  if (sellerFName && sellerLName) {
    sellerName = sellerFName + sellerLName;
  }

  const navigation = [
    { name: "Dashboard", href: "/seller", icon: Home },
    { name: "Products", href: "/seller/products", icon: Package },
    { name: "Orders", href: "/seller/orders", icon: ShoppingCart },
    { name: "Analytics", href: "/seller/analytics", icon: BarChart2 },
    { name: "Customers", href: "/customers", icon: Users },
  ];

  const secondaryNavigation = [
    { name: "Settings", href: "/seller/settings", icon: Settings },
    { name: "Help Center", href: "/seller/help", icon: HelpCircle },
    { name: "Logout", href: "/seller/logout", icon: LogOut },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <div
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          sidebarOpen
            ? "opacity-100 ease-out duration-300"
            : "opacity-0 ease-in duration-200 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Mobile sidebar toggle button */}
      <div className="absolute top-4 right-3 z-30 lg:hidden">
        <button
          className={`p-2 rounded-md focus:outline-none ${
            darkMode
              ? "text-white bg-black"
              : "text-black bg-white border border-gray-200"
          }`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-20 w-64 overflow-y-auto transition-transform transform lg:translate-x-0 lg:static lg:inset-0 ${
          darkMode
            ? "bg-black border-r border-zinc-800"
            : "bg-white border-r border-gray-200"
        } ${
          sidebarOpen
            ? "translate-x-0 ease-out duration-300"
            : "-translate-x-full ease-in duration-200"
        }`}
      >
        <div
          className={`flex items-center flex-start h-16 px-6 ${
            darkMode ? "bg-black" : "bg-white"
          }`}
        >
          <div className="flex items-center">
            <div
              className={`w-10 h-10 ${
                darkMode ? "bg-white" : "bg-black"
              } rounded-full flex items-center justify-center`}
            >
              <span
                className={`${
                  darkMode ? "text-black" : "text-white"
                } text-xl font-bold`}
              >
                C
              </span>
            </div>
            <span
              className={`ml-3 text-xl cursor-pointer font-bold ${
                darkMode ? "text-white" : "text-black"
              }`}
              onClick={() => {
                Navigate("/seller");
              }}
            >
              CELESTIAL
            </span>
          </div>
        </div>

        <nav className="mt-6 px-3 space-y-1">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-all ${
                    isActive
                      ? darkMode
                        ? "bg-zinc-900 text-white"
                        : "bg-gray-100 text-black"
                      : darkMode
                      ? "text-white opacity-70 hover:bg-zinc-900 hover:opacity-100"
                      : "text-black opacity-70 hover:bg-gray-100 hover:opacity-100"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive
                        ? darkMode
                          ? "text-white"
                          : "text-black"
                        : darkMode
                        ? "text-white opacity-70"
                        : "text-black opacity-70"
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div
            className={`pt-6 mt-6 border-t ${
              darkMode ? "border-zinc-800" : "border-gray-200"
            }`}
          >
            <h3
              className={`px-3 text-xs font-semibold uppercase tracking-wider ${
                darkMode ? "text-white opacity-50" : "text-black opacity-50"
              }`}
            >
              Account
            </h3>
            <div className="mt-3 space-y-1">
              {secondaryNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all ${
                    darkMode
                      ? "text-white opacity-70 hover:bg-zinc-900 hover:opacity-100"
                      : "text-black opacity-70 hover:bg-gray-100 hover:opacity-100"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      darkMode
                        ? "text-white opacity-70"
                        : "text-black opacity-70"
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="px-3 mt-6">
          <div
            className={`p-3 rounded-lg ${
              darkMode ? "bg-zinc-900" : "bg-gray-100"
            }`}
          >
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full"
                src="/api/placeholder/40/40"
                alt="User avatar"
              />
              <div className="ml-3">
                <p
                  className={`text-sm font-medium ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  {sellerName}
                </p>
                <p
                  className={`text-xs ${
                    darkMode ? "text-white opacity-60" : "text-black opacity-60"
                  }`}
                >
                  Premium Seller
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

// import { Link, useLocation } from "react-router-dom";
// import {
//   Home,
//   Package,
//   ShoppingCart,
//   Settings,
//   LogOut,
//   Menu,
//   X,
//   BarChart2,
//   Users,
//   HelpCircle,
// } from "lucide-react";

// const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
//   const location = useLocation();

//   const navigation = [
//     { name: "Dashboard", href: "/", icon: Home },
//     { name: "Products", href: "/products", icon: Package },
//     { name: "Orders", href: "/orders", icon: ShoppingCart },
//     { name: "Analytics", href: "/analytics", icon: BarChart2 },
//     { name: "Customers", href: "/customers", icon: Users },
//   ];

//   const secondaryNavigation = [
//     { name: "Settings", href: "/settings", icon: Settings },
//     { name: "Help Center", href: "/help", icon: HelpCircle },
//     { name: "Logout", href: "/logout", icon: LogOut },
//   ];

//   return (
//     <>
//       {/* Mobile sidebar backdrop */}
//       <div
//         className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden ${
//           sidebarOpen
//             ? "opacity-100 ease-out duration-300"
//             : "opacity-0 ease-in duration-200 pointer-events-none"
//         }`}
//         onClick={() => setSidebarOpen(false)}
//       />

//       {/* Mobile sidebar toggle button */}
//       <div className="absolute top-4 left-4 z-30 lg:hidden">
//         <button
//           className="p-2 rounded-md text-white bg-gray-900 focus:outline-none"
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//         >
//           {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 z-20 w-64 bg-gray-900 overflow-y-auto transition-transform transform lg:translate-x-0 lg:static lg:inset-0 ${
//           sidebarOpen
//             ? "translate-x-0 ease-out duration-300"
//             : "-translate-x-full ease-in duration-200"
//         }`}
//       >
//         <div className="flex items-center justify-center h-16 px-6 bg-gray-800">
//           <div className="flex items-center">
//             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
//               <span className="text-gray-900 text-xl font-bold">S</span>
//             </div>
//             <span className="ml-3 text-xl font-bold text-white">SellerHub</span>
//           </div>
//         </div>

//         <nav className="mt-6 px-3 space-y-1">
//           <div className="space-y-1">
//             {navigation.map((item) => {
//               const isActive = location.pathname === item.href;
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   className={`group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-all ${
//                     isActive
//                       ? "bg-gray-800 text-white"
//                       : "text-gray-300 hover:bg-gray-800 hover:text-white"
//                   }`}
//                 >
//                   <item.icon
//                     className={`mr-3 h-5 w-5 ${
//                       isActive
//                         ? "text-white"
//                         : "text-gray-400 group-hover:text-white"
//                     }`}
//                   />
//                   {item.name}
//                 </Link>
//               );
//             })}
//           </div>

//           <div className="pt-6 mt-6 border-t border-gray-700">
//             <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
//               Account
//             </h3>
//             <div className="mt-3 space-y-1">
//               {secondaryNavigation.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   className="group flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-800 hover:text-white transition-all"
//                 >
//                   <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-white" />
//                   {item.name}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </nav>

//         <div className="px-3 mt-6">
//           <div className="p-3 bg-gray-800 rounded-lg">
//             <div className="flex items-center">
//               <img
//                 className="h-10 w-10 rounded-full"
//                 src="/placeholder.svg?height=40&width=40"
//                 alt="User avatar"
//               />
//               <div className="ml-3">
//                 <p className="text-sm font-medium text-white">Alex Johnson</p>
//                 <p className="text-xs text-gray-400">Premium Seller</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;
