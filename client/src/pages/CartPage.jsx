import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Trash2,
  Heart,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  CreditCard,
  ShoppingCart,
} from "lucide-react";

const CartPage = () => {
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [darkMode, setDarkMode] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Minimalist Watch",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      quantity: 1,
    },
    {
      id: 2,
      name: "Premium Headphones",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      quantity: 2,
    },
  ]);

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

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const placeOrder = () => {
    if (cart.length === 0) return;

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: "processing",
      items: [...cart],
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    alert("Order placed successfully!");
  };

  //   const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 10.0 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const nextStep = () => {
    setCheckoutStep(checkoutStep + 1);
  };

  const prevStep = () => {
    setCheckoutStep(checkoutStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrder();
  };

  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Theme classes based on dark/light mode
  const themeClasses = {
    background: darkMode ? "bg-black text-white" : "bg-white text-black",
    card: darkMode
      ? "bg-zinc-900 border border-zinc-800"
      : "bg-gray-200/60 border border-gray-200",
    input: darkMode
      ? "bg-zinc-800 border-zinc-700 text-white focus:border-white"
      : "bg-white border-gray-300 text-black focus:border-black",
    primaryButton: darkMode
      ? "bg-white text-black hover:bg-gray-200"
      : "bg-black text-white hover:bg-gray-800",
    secondaryButton: darkMode
      ? "bg-transparent border border-white text-white hover:bg-white hover:text-black"
      : "bg-transparent border border-black text-black hover:bg-black hover:text-white",
    quantityButton: darkMode
      ? "bg-zinc-800 hover:bg-zinc-700 text-white"
      : "bg-gray-200 hover:bg-gray-300 text-black",
    divider: darkMode ? "border-zinc-800" : "border-gray-200",
    radioButton: darkMode ? "accent-white" : "accent-black",
  };

  // Set body background color based on theme
  useEffect(() => {
    document.body.className = darkMode ? "bg-black" : "bg-white";
  }, [darkMode]);

  if (cart.length === 0 && checkoutStep === 1) {
    return (
      <div
        className={`min-h-screen ${themeClasses.background} transition-colors duration-300 ease-in-out`}
      >
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-end mb-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-zinc-900 text-white"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="text-center py-16">
            <ShoppingCart size={64} className="mx-auto mb-6 opacity-30" />
            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="mb-8 text-lg opacity-75">
              Add some items to your cart to continue shopping.
            </p>
            <button
              className={`px-8 py-3 rounded-lg ${themeClasses.primaryButton} font-medium transition-colors duration-200`}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${themeClasses.background} transition-colors duration-300 ease-in-out`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Theme toggle and header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">
            {checkoutStep === 1
              ? "Shopping Cart"
              : checkoutStep === 2
              ? "Shipping Information"
              : "Payment Details"}
          </h1>
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Progress indicator */}
        <div className="mb-12">
          <div className="flex justify-between">
            <div
              className={`text-center ${
                checkoutStep >= 1 ? "font-semibold" : "opacity-50"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${
                  checkoutStep >= 1
                    ? themeClasses.primaryButton
                    : themeClasses.divider
                }`}
              >
                1
              </div>
              <span>Cart</span>
            </div>
            <div
              className={`flex-1 flex items-center mx-2 ${themeClasses.divider} border-t mt-5`}
            ></div>
            <div
              className={`text-center ${
                checkoutStep >= 2 ? "font-semibold" : "opacity-50"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${
                  checkoutStep >= 2
                    ? themeClasses.primaryButton
                    : themeClasses.divider
                }`}
              >
                2
              </div>
              <span>Shipping</span>
            </div>
            <div
              className={`flex-1 flex items-center mx-2 ${themeClasses.divider} border-t mt-5`}
            ></div>
            <div
              className={`text-center ${
                checkoutStep >= 3 ? "font-semibold" : "opacity-50"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${
                  checkoutStep >= 3
                    ? themeClasses.primaryButton
                    : themeClasses.divider
                }`}
              >
                3
              </div>
              <span>Payment</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {checkoutStep === 1 && (
            <div className="lg:w-2/3">
              <div
                className={`${themeClasses.card} rounded-2xl shadow-xl p-6 mb-6`}
              >
                <h2 className="text-2xl font-semibold mb-6">Cart Items</h2>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className={`flex flex-col sm:flex-row items-center gap-6 py-6 ${themeClasses.divider} border-b last:border-b-0`}
                  >
                    <div className="relative overflow-hidden rounded-xl w-32 h-32">
                      <img
                        src={item.image || "/api/placeholder/400/320"}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium text-xl">{item.name}</h3>
                      <p
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        } text-lg mt-1`}
                      >
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 my-4 sm:my-0">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className={`w-10 h-10 flex items-center justify-center rounded-full ${themeClasses.quantityButton} transition-colors`}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center text-lg font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className={`w-10 h-10 flex items-center justify-center rounded-full ${themeClasses.quantityButton} transition-colors`}
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className={`p-3 rounded-full ${themeClasses.quantityButton} transition-colors`}
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {checkoutStep === 2 && (
            <div className="lg:w-2/3">
              <div
                className={`${themeClasses.card} rounded-2xl shadow-xl p-6 mb-6`}
              >
                <h2 className="text-2xl font-semibold mb-6">
                  Shipping Information
                </h2>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg ${themeClasses.input} transition-colors focus:outline-none`}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg ${themeClasses.input} transition-colors focus:outline-none`}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg ${themeClasses.input} transition-colors focus:outline-none`}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg ${themeClasses.input} transition-colors focus:outline-none`}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg ${themeClasses.input} transition-colors focus:outline-none`}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg ${themeClasses.input} transition-colors focus:outline-none`}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg ${themeClasses.input} transition-colors focus:outline-none`}
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </form>
              </div>
            </div>
          )}

          {checkoutStep === 3 && (
            <div className="lg:w-2/3">
              <h1>Hello!</h1>
            </div>
          )}

          <div className="lg:w-1/3">
            <div
              className={`${themeClasses.card} rounded-2xl shadow-xl p-6 sticky top-6`}
            >
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

              {cart.length > 0 && (
                <div className="mb-6 max-h-60 overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center mb-4">
                      <div className="h-16 w-16 rounded-lg overflow-hidden mr-4">
                        <img
                          src={item.image || "/api/placeholder/400/320"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p
                          className={
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }
                        >
                          {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className={`space-y-4 mb-8 ${themeClasses.divider} pb-6`}>
                <div className="flex justify-between">
                  <span
                    className={darkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    Subtotal
                  </span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span
                    className={darkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    Shipping
                  </span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span
                    className={darkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    Tax
                  </span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
              </div>

              <div className="space-y-4">
                {checkoutStep === 1 && (
                  <button
                    onClick={nextStep}
                    disabled={cart.length === 0}
                    className={`w-full py-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center ${themeClasses.primaryButton} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <span>Proceed to Checkout</span>
                    <ChevronRight size={18} className="ml-2" />
                  </button>
                )}

                {checkoutStep === 2 && (
                  <>
                    <button
                      onClick={nextStep}
                      className={`w-full py-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center ${themeClasses.primaryButton}`}
                    >
                      <span>Continue to Payment</span>
                      <ChevronRight size={18} className="ml-2" />
                    </button>
                    <button
                      onClick={prevStep}
                      className={`w-full py-4 rounded-lg flex items-center justify-center ${themeClasses.secondaryButton} transition-colors duration-200`}
                    >
                      <ChevronLeft size={18} className="mr-2" />
                      <span>Back to Cart</span>
                    </button>
                  </>
                )}

                {checkoutStep === 3 && (
                  <>
                    <button
                      onClick={handleSubmit}
                      className={`w-full py-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center ${themeClasses.primaryButton}`}
                    >
                      <ShoppingBag size={18} className="mr-2" />
                      <span>Place Order</span>
                    </button>
                    <button
                      onClick={prevStep}
                      className={`w-full py-4 rounded-lg flex items-center justify-center ${themeClasses.secondaryButton} transition-colors duration-200`}
                    >
                      <ChevronLeft size={18} className="mr-2" />
                      <span>Back to Shipping</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
