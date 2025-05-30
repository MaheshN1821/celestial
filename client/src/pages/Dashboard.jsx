import {
  BarChart,
  Users,
  DollarSign,
  Package,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(true);

  const sellerFName = sessionStorage.getItem("sellerFirstName");
  const sellerLName = sessionStorage.getItem("sellerLastName");

  let sellerName = "seller";
  if (sellerFName && sellerLName) {
    sellerName = sellerFName + sellerLName;
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Sample data for stats and charts
  const stats = [
    {
      id: 1,
      name: "Total Revenue",
      value: "$24,567.89",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "bg-gradient-to-r from-gray-800 to-gray-700",
    },
    {
      id: 2,
      name: "Products Sold",
      value: "1,234",
      change: "+7.2%",
      trend: "up",
      icon: Package,
      color: "bg-gradient-to-r from-gray-800 to-gray-700",
    },
    {
      id: 3,
      name: "New Orders",
      value: "56",
      change: "-3.1%",
      trend: "down",
      icon: ShoppingCart,
      color: "bg-gradient-to-r from-gray-800 to-gray-700",
    },
    {
      id: 4,
      name: "Customer Visits",
      value: "12,345",
      change: "+18.7%",
      trend: "up",
      icon: Users,
      color: "bg-gradient-to-r from-gray-800 to-gray-700",
    },
  ];

  const topProducts = [
    {
      id: 1,
      name: "Nova Pro Ultra",
      category: "Smartphone",
      sales: 234,
      revenue: "$233,766",
    },
    {
      id: 2,
      name: "AirBuds Pro",
      category: "Audio",
      sales: 187,
      revenue: "$28,050",
    },
    {
      id: 3,
      name: "UltraBook X1",
      category: "Laptop",
      sales: 156,
      revenue: "$187,200",
    },
    {
      id: 4,
      name: "SmartWatch Elite",
      category: "Wearable",
      sales: 132,
      revenue: "$39,600",
    },
    {
      id: 5,
      name: "PowerTab 10",
      category: "Tablet",
      sales: 98,
      revenue: "$49,000",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-7829",
      customer: "Emma Wilson",
      date: "2 mins ago",
      amount: "$1,299.99",
      status: "Pending",
    },
    {
      id: "ORD-7828",
      customer: "Michael Brown",
      date: "15 mins ago",
      amount: "$2,499.98",
      status: "Processing",
    },
    {
      id: "ORD-7827",
      customer: "Sophia Davis",
      date: "1 hour ago",
      amount: "$999.99",
      status: "Shipped",
    },
    {
      id: "ORD-7826",
      customer: "James Miller",
      date: "3 hours ago",
      amount: "$599.99",
      status: "Delivered",
    },
  ];

  return (
    <div
      className={`px-4 py-6 sm:px-6 lg:px-8 ${
        darkMode ? "bg-black" : "bg-white"
      } min-h-screen transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Seller Dashboard
            </h1>
            <p
              className={`mt-1 text-sm ${
                darkMode ? "text-white opacity-60" : "text-black opacity-60"
              }`}
            >
              Welcome back, {sellerName}! Here's what's happening with your
              store today.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button
              onClick={toggleTheme}
              className={`px-3 py-2 rounded-4xl font-medium transition-colors flex items-center ${
                darkMode ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              {/* {darkMode ? "Light Mode" : "Dark Mode"} */}
            </button>
            <button
              className={`px-4 py-2 ${
                darkMode ? "bg-white text-black" : "bg-black text-white"
              } rounded-lg font-medium hover:opacity-90 transition-colors`}
            >
              View Reports
            </button>
            <button
              className={`px-4 py-2 border ${
                darkMode ? "border-white text-white" : "border-black text-black"
              } rounded-lg font-medium hover:opacity-80 transition-colors`}
            >
              Export Data
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={`rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow ${
                darkMode
                  ? // ? "bg-gradient-to-r from-black to-zinc-900 border border-zinc-800"
                    "bg-zinc-900 border border-zinc-800"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`p-3 rounded-lg ${
                    darkMode ? "bg-black/80" : "bg-gray-100"
                  }`}
                >
                  <stat.icon
                    className={`h-6 w-6 ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  />
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium ${
                    stat.trend === "up"
                      ? darkMode
                        ? "bg-green-900 text-green-200"
                        : "bg-green-100 text-green-800"
                      : darkMode
                      ? "bg-red-900 text-red-200"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-3 w-3" />
                  )}
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <h3
                  className={`text-lg font-medium ${
                    darkMode ? "text-white opacity-80" : "text-black opacity-80"
                  }`}
                >
                  {stat.name}
                </h3>
                <p
                  className={`mt-1 text-3xl font-semibold ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <div
            className={`lg:col-span-2 rounded-xl p-6 shadow-lg ${
              darkMode
                ? "bg-black border border-zinc-800"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                className={`text-lg font-medium ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                Revenue Overview
              </h2>
              <div className="flex items-center space-x-2">
                <select
                  className={`text-sm rounded-lg px-3 py-1.5 border focus:outline-none focus:ring-1 ${
                    darkMode
                      ? "bg-black text-white border-zinc-800 focus:ring-white"
                      : "bg-white text-black border-gray-200 focus:ring-black"
                  }`}
                >
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                </select>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <BarChart
                  className={`h-12 w-12 ${
                    darkMode ? "text-white opacity-60" : "text-black opacity-60"
                  } mx-auto`}
                />
                <p
                  className={`mt-2 text-sm ${
                    darkMode ? "text-white opacity-60" : "text-black opacity-60"
                  }`}
                >
                  Revenue chart visualization would appear here
                </p>
                <p
                  className={`text-xs ${
                    darkMode ? "text-white opacity-40" : "text-black opacity-40"
                  }`}
                >
                  Using actual chart libraries like Recharts or Chart.js
                </p>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div
            className={`rounded-xl p-6 shadow-lg ${
              darkMode
                ? "bg-black border border-zinc-800"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                className={`text-lg font-medium ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                Top Products
              </h2>
              <button
                className={`text-sm flex items-center ${
                  darkMode
                    ? "text-white opacity-80 hover:opacity-100"
                    : "text-black opacity-80 hover:opacity-100"
                }`}
              >
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {topProducts.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    darkMode
                      ? "bg-zinc-900 hover:bg-zinc-800"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-md flex items-center justify-center ${
                        darkMode
                          ? "bg-black"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      <Package
                        className={`h-5 w-5 ${
                          darkMode
                            ? "text-white opacity-70"
                            : "text-black opacity-70"
                        }`}
                      />
                    </div>
                    <div className="ml-3">
                      <p
                        className={`text-sm font-medium ${
                          darkMode ? "text-white" : "text-black"
                        }`}
                      >
                        {product.name}
                      </p>
                      <p
                        className={`text-xs ${
                          darkMode
                            ? "text-white opacity-60"
                            : "text-black opacity-60"
                        }`}
                      >
                        {product.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-medium ${
                        darkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {product.revenue}
                    </p>
                    <p
                      className={`text-xs ${
                        darkMode
                          ? "text-white opacity-60"
                          : "text-black opacity-60"
                      }`}
                    >
                      {product.sales} units
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div
          className={`mt-8 rounded-xl p-6 shadow-lg ${
            darkMode
              ? "bg-black border border-zinc-800"
              : "bg-white border border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              className={`text-lg font-medium ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Recent Orders
            </h2>
            <button
              className={`text-sm flex items-center ${
                darkMode
                  ? "text-white opacity-80 hover:opacity-100"
                  : "text-black opacity-80 hover:opacity-100"
              }`}
            >
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead>
                <tr>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode
                        ? "text-white opacity-60"
                        : "text-black opacity-60"
                    }`}
                  >
                    Order ID
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode
                        ? "text-white opacity-60"
                        : "text-black opacity-60"
                    }`}
                  >
                    Customer
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode
                        ? "text-white opacity-60"
                        : "text-black opacity-60"
                    }`}
                  >
                    Date
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode
                        ? "text-white opacity-60"
                        : "text-black opacity-60"
                    }`}
                  >
                    Amount
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode
                        ? "text-white opacity-60"
                        : "text-black opacity-60"
                    }`}
                  >
                    Status
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode
                        ? "text-white opacity-60"
                        : "text-black opacity-60"
                    }`}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  darkMode ? "divide-zinc-800" : "divide-gray-200"
                }`}
              >
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className={`transition-colors ${
                      darkMode ? "hover:bg-zinc-800" : "hover:bg-gray-50"
                    }`}
                  >
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        darkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {order.id}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        darkMode
                          ? "text-white opacity-80"
                          : "text-black opacity-80"
                      }`}
                    >
                      {order.customer}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        darkMode
                          ? "text-white opacity-80"
                          : "text-black opacity-80"
                      }`}
                    >
                      {order.date}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        darkMode
                          ? "text-white opacity-80"
                          : "text-black opacity-80"
                      }`}
                    >
                      {order.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === "Delivered"
                            ? darkMode
                              ? "bg-green-900 text-green-200"
                              : "bg-green-100 text-green-800"
                            : order.status === "Shipped"
                            ? darkMode
                              ? "bg-blue-900 text-blue-200"
                              : "bg-blue-100 text-blue-800"
                            : order.status === "Processing"
                            ? darkMode
                              ? "bg-yellow-900 text-yellow-200"
                              : "bg-yellow-100 text-yellow-800"
                            : darkMode
                            ? "bg-zinc-700 text-zinc-200"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        darkMode ? "text-white" : "text-black"
                      }`}
                    >
                      <button
                        className={`hover:opacity-80 transition-colors ${
                          darkMode ? "text-white" : "text-black"
                        }`}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

//------------------------------------------------------------------

// import {
//   BarChart,
//   Users,
//   DollarSign,
//   Package,
//   ShoppingCart,
//   ArrowUpRight,
//   ArrowDownRight,
//   ChevronRight,
// } from "lucide-react";

// const Dashboard = () => {
//   // Sample data for stats and charts
//   const stats = [
//     {
//       id: 1,
//       name: "Total Revenue",
//       value: "$24,567.89",
//       change: "+12.5%",
//       trend: "up",
//       icon: DollarSign,
//       color: "bg-gradient-to-r from-gray-800 to-gray-700",
//     },
//     {
//       id: 2,
//       name: "Products Sold",
//       value: "1,234",
//       change: "+7.2%",
//       trend: "up",
//       icon: Package,
//       color: "bg-gradient-to-r from-gray-800 to-gray-700",
//     },
//     {
//       id: 3,
//       name: "New Orders",
//       value: "56",
//       change: "-3.1%",
//       trend: "down",
//       icon: ShoppingCart,
//       color: "bg-gradient-to-r from-gray-800 to-gray-700",
//     },
//     {
//       id: 4,
//       name: "Customer Visits",
//       value: "12,345",
//       change: "+18.7%",
//       trend: "up",
//       icon: Users,
//       color: "bg-gradient-to-r from-gray-800 to-gray-700",
//     },
//   ];

//   const topProducts = [
//     {
//       id: 1,
//       name: "Nova Pro Ultra",
//       category: "Smartphone",
//       sales: 234,
//       revenue: "$233,766",
//     },
//     {
//       id: 2,
//       name: "AirBuds Pro",
//       category: "Audio",
//       sales: 187,
//       revenue: "$28,050",
//     },
//     {
//       id: 3,
//       name: "UltraBook X1",
//       category: "Laptop",
//       sales: 156,
//       revenue: "$187,200",
//     },
//     {
//       id: 4,
//       name: "SmartWatch Elite",
//       category: "Wearable",
//       sales: 132,
//       revenue: "$39,600",
//     },
//     {
//       id: 5,
//       name: "PowerTab 10",
//       category: "Tablet",
//       sales: 98,
//       revenue: "$49,000",
//     },
//   ];

//   const recentOrders = [
//     {
//       id: "ORD-7829",
//       customer: "Emma Wilson",
//       date: "2 mins ago",
//       amount: "$1,299.99",
//       status: "Pending",
//     },
//     {
//       id: "ORD-7828",
//       customer: "Michael Brown",
//       date: "15 mins ago",
//       amount: "$2,499.98",
//       status: "Processing",
//     },
//     {
//       id: "ORD-7827",
//       customer: "Sophia Davis",
//       date: "1 hour ago",
//       amount: "$999.99",
//       status: "Shipped",
//     },
//     {
//       id: "ORD-7826",
//       customer: "James Miller",
//       date: "3 hours ago",
//       amount: "$599.99",
//       status: "Delivered",
//     },
//   ];

//   return (
//     <div className="px-4 py-6 sm:px-6 lg:px-8 bg-black min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-white">Seller Dashboard</h1>
//             <p className="mt-1 text-sm text-gray-400">
//               Welcome back, Alex! Here's what's happening with your store today.
//             </p>
//           </div>
//           <div className="mt-4 md:mt-0 flex space-x-3">
//             <button className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors">
//               View Reports
//             </button>
//             <button className="px-4 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors">
//               Export Data
//             </button>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {stats.map((stat) => (
//             <div
//               key={stat.id}
//               className={`${stat.color} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow`}
//             >
//               <div className="flex items-center justify-between">
//                 <div className="p-3 rounded-lg bg-black bg-opacity-30">
//                   <stat.icon className="h-6 w-6 text-white" />
//                 </div>
//                 <span
//                   className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                     stat.trend === "up"
//                       ? "bg-green-900 text-green-200"
//                       : "bg-red-900 text-red-200"
//                   }`}
//                 >
//                   {stat.trend === "up" ? (
//                     <ArrowUpRight className="mr-1 h-3 w-3" />
//                   ) : (
//                     <ArrowDownRight className="mr-1 h-3 w-3" />
//                   )}
//                   {stat.change}
//                 </span>
//               </div>
//               <div className="mt-4">
//                 <h3 className="text-lg font-medium text-gray-300">
//                   {stat.name}
//                 </h3>
//                 <p className="mt-1 text-3xl font-semibold text-white">
//                   {stat.value}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Charts and Tables Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Revenue Chart */}
//           <div className="lg:col-span-2 bg-gray-900 rounded-xl p-6 shadow-lg">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-medium text-white">
//                 Revenue Overview
//               </h2>
//               <div className="flex items-center space-x-2">
//                 <select className="bg-gray-800 text-white text-sm rounded-lg px-3 py-1.5 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-white">
//                   <option>Last 7 Days</option>
//                   <option>Last 30 Days</option>
//                   <option>Last 90 Days</option>
//                 </select>
//               </div>
//             </div>
//             <div className="h-64 flex items-center justify-center">
//               <div className="text-center">
//                 <BarChart className="h-12 w-12 text-gray-500 mx-auto" />
//                 <p className="mt-2 text-sm text-gray-400">
//                   Revenue chart visualization would appear here
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   Using actual chart libraries like Recharts or Chart.js
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Top Products */}
//           <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-medium text-white">Top Products</h2>
//               <button className="text-sm text-gray-400 hover:text-white flex items-center">
//                 View All <ChevronRight className="h-4 w-4 ml-1" />
//               </button>
//             </div>
//             <div className="space-y-4">
//               {topProducts.slice(0, 4).map((product) => (
//                 <div
//                   key={product.id}
//                   className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
//                 >
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 rounded-md bg-gray-700 flex items-center justify-center">
//                       <Package className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <div className="ml-3">
//                       <p className="text-sm font-medium text-white">
//                         {product.name}
//                       </p>
//                       <p className="text-xs text-gray-400">
//                         {product.category}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm font-medium text-white">
//                       {product.revenue}
//                     </p>
//                     <p className="text-xs text-gray-400">
//                       {product.sales} units
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Recent Orders */}
//         <div className="mt-8 bg-gray-900 rounded-xl p-6 shadow-lg">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-lg font-medium text-white">Recent Orders</h2>
//             <button className="text-sm text-gray-400 hover:text-white flex items-center">
//               View All <ChevronRight className="h-4 w-4 ml-1" />
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-800">
//               <thead>
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                     Order ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                     Customer
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                     Amount
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-800">
//                 {recentOrders.map((order) => (
//                   <tr
//                     key={order.id}
//                     className="hover:bg-gray-800 transition-colors"
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
//                       {order.id}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                       {order.customer}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                       {order.date}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                       {order.amount}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           order.status === "Delivered"
//                             ? "bg-green-900 text-green-200"
//                             : order.status === "Shipped"
//                             ? "bg-blue-900 text-blue-200"
//                             : order.status === "Processing"
//                             ? "bg-yellow-900 text-yellow-200"
//                             : "bg-gray-700 text-gray-200"
//                         }`}
//                       >
//                         {order.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                       <button className="text-white hover:text-gray-300 transition-colors">
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
