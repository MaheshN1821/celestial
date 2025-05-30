import { useState } from "react";

const OrderTrackingPage = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD-1234",
      date: "2023-11-15",
      total: 379.98,
      status: "delivered",
      items: [
        {
          id: 1,
          name: "Minimalist Watch",
          price: 129.99,
          quantity: 1,
        },
        {
          id: 2,
          name: "Premium Headphones",
          price: 249.99,
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD-5678",
      date: "2023-12-01",
      total: 249.98,
      status: "shipped",
      items: [
        {
          id: 3,
          name: "Smart Speaker",
          price: 89.99,
          quantity: 1,
        },
        {
          id: 4,
          name: "Wireless Earbuds",
          price: 159.99,
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD-9012",
      date: "2023-12-10",
      total: 499.98,
      status: "processing",
      items: [
        {
          id: 5,
          name: "Smartphone",
          price: 499.98,
          quantity: 1,
        },
      ],
    },
  ]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const getStatusClass = (status) => {
    switch (status) {
      case "processing":
        return darkMode
          ? "bg-yellow-400 text-black"
          : "bg-yellow-500 text-white";
      case "shipped":
        return darkMode ? "bg-blue-400 text-black" : "bg-blue-500 text-white";
      case "delivered":
        return darkMode ? "bg-green-400 text-black" : "bg-green-500 text-white";
      default:
        return darkMode ? "bg-zinc-400" : "bg-zinc-500";
    }
  };

  const getStatusPercentage = (status) => {
    switch (status) {
      case "processing":
        return "33%";
      case "shipped":
        return "66%";
      case "delivered":
        return "100%";
      default:
        return "0%";
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (orders.length === 0) {
    return (
      <div
        className={`min-h-screen ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        } transition-colors duration-300`}
      >
        <div className="container mx-auto py-12 px-4">
          <div className="flex justify-end mb-6">
            <button
              onClick={toggleDarkMode}
              className={`px-4 py-2 rounded-full ${
                darkMode ? "bg-white text-black" : "bg-black text-white"
              } transition-colors duration-300`}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold mb-4">No orders found</h2>
            <p className="mb-8">You haven't placed any orders yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      } transition-colors duration-300`}
    >
      <div className="container mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Order Tracking</h1>
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-full ${
              darkMode ? "bg-white text-black" : "bg-black text-white"
            } transition-colors duration-300`}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div
              className={`rounded-2xl shadow-2xl p-6 backdrop-blur-lg ${
                darkMode
                  ? "bg-zinc-900 border border-zinc-800"
                  : "bg-zinc-50 border border-zinc-200"
              } transition-colors duration-300`}
            >
              <h2 className="text-2xl font-bold mb-6">Your Orders</h2>

              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`p-6 rounded-xl cursor-pointer border border-zinc-600 transition-all duration-300 hover:scale-[1.02] ${
                      selectedOrder && selectedOrder.id === order.id
                        ? darkMode
                          ? "bg-white/20 bg-opacity-10 border-l-4 border-white"
                          : "bg-black/10 bg-opacity-5 border-l-4 border-black"
                        : darkMode
                        ? "bg-zinc-800 hover:bg-zinc-700"
                        : "bg-zinc-100 hover:bg-zinc-200"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{order.id}</h3>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-zinc-400" : "text-zinc-500"
                          }`}
                        >
                          Placed on {order.date}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusClass(
                          order.status
                        )}`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-sm">
                        {order.items.length}{" "}
                        {order.items.length === 1 ? "item" : "items"}
                      </p>
                      <p className="font-bold text-lg">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            {selectedOrder ? (
              <div
                className={`rounded-2xl shadow-2xl p-6 backdrop-blur-lg ${
                  darkMode
                    ? "bg-zinc-900 border border-zinc-800"
                    : "bg-zinc-50 border border-zinc-200"
                } transition-colors duration-300`}
              >
                <h2 className="text-2xl font-bold mb-8">
                  Order Details: {selectedOrder.id}
                </h2>

                <div className="mb-10">
                  <div className="relative pt-1">
                    <div className="flex mb-4 items-center justify-between">
                      <div>
                        <span
                          className={`text-xs font-bold inline-block py-1 px-3 uppercase rounded-full ${
                            darkMode
                              ? "bg-white text-black"
                              : "bg-black text-white"
                          }`}
                        >
                          {selectedOrder.status.charAt(0).toUpperCase() +
                            selectedOrder.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`flex h-3 mb-4 overflow-hidden rounded-full ${
                        darkMode ? "bg-zinc-800" : "bg-zinc-200"
                      }`}
                    >
                      <div
                        style={{
                          width: getStatusPercentage(selectedOrder.status),
                        }}
                        className={`${getStatusClass(
                          selectedOrder.status
                        )} transition-all duration-500`}
                      ></div>
                    </div>
                    <div className="flex text-sm justify-between font-medium">
                      <span
                        className={
                          selectedOrder.status === "processing"
                            ? "font-bold"
                            : ""
                        }
                      >
                        Processing
                      </span>
                      <span
                        className={
                          selectedOrder.status === "shipped" ? "font-bold" : ""
                        }
                      >
                        Shipped
                      </span>
                      <span
                        className={
                          selectedOrder.status === "delivered"
                            ? "font-bold"
                            : ""
                        }
                      >
                        Delivered
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-bold text-xl mb-4">Items</h3>

                  <div className="space-y-4">
                    {selectedOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className={`flex justify-between items-center py-4 border-b ${
                          darkMode ? "border-zinc-800" : "border-zinc-200"
                        }`}
                      >
                        <div>
                          <p className="font-medium text-lg">{item.name}</p>
                          <p
                            className={`text-sm ${
                              darkMode ? "text-zinc-400" : "text-zinc-500"
                            }`}
                          >
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`space-y-3 p-4 rounded-xl ${
                    darkMode ? "bg-zinc-800" : "bg-zinc-100"
                  }`}
                >
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${(selectedOrder.total * 0.92).toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(selectedOrder.total * 0.08).toFixed(2)}</span>
                  </div>

                  <div
                    className={`flex justify-between font-bold pt-3 border-t ${
                      darkMode ? "border-zinc-700" : "border-zinc-300"
                    }`}
                  >
                    <span>Total</span>
                    <span className="text-xl">
                      ${selectedOrder.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`rounded-2xl shadow-2xl p-6 backdrop-blur-lg flex items-center justify-center h-full min-h-[400px] ${
                  darkMode
                    ? "bg-zinc-900 border border-zinc-800"
                    : "bg-zinc-50 border border-zinc-200"
                } transition-colors duration-300`}
              >
                <p className={darkMode ? "text-zinc-400" : "text-zinc-500"}>
                  ← Select an order to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
