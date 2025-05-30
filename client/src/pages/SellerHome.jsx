import { useState } from "react";
import {
  ShoppingBag,
  BarChart3,
  CreditCard,
  TrendingUp,
  Shield,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Menu,
  X,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SellerHome = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("sell");
  const [openFaq, setOpenFaq] = useState(null);
  const Navigate = useNavigate();

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Features data
  const features = [
    {
      icon: ShoppingBag,
      title: "Simplified Selling",
      description:
        "List products in minutes with our easy-to-use dashboard and inventory management system.",
    },
    {
      icon: BarChart3,
      title: "Powerful Analytics",
      description:
        "Track sales, customer behavior, and inventory with real-time analytics and insights.",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description:
        "Receive payments directly to your account with our secure payment processing system.",
    },
    {
      icon: TrendingUp,
      title: "Growth Tools",
      description:
        "Access marketing tools, promotions, and customer engagement features to grow your business.",
    },
  ];

  // How it works steps
  const steps = [
    {
      number: "01",
      title: "Register Your Account",
      description:
        "Create your seller account with basic information about you and your business.",
    },
    {
      number: "02",
      title: "Set Up Your Store",
      description:
        "Customize your store profile, add payment methods, and configure shipping options.",
    },
    {
      number: "03",
      title: "List Your Products",
      description:
        "Upload product details, images, pricing, and inventory quantities.",
    },
    {
      number: "04",
      title: "Start Selling",
      description:
        "Publish your store and start receiving orders from customers worldwide.",
    },
  ];

  // FAQ items
  const faqItems = [
    {
      question: "What are the fees for selling on the platform?",
      answer:
        "We charge a 5% commission on each sale, with no monthly subscription fees. Payment processing fees are 2.9% + $0.30 per transaction. Volume discounts are available for high-volume sellers.",
    },
    {
      question: "How do I receive payments for my sales?",
      answer:
        "Payments are processed every 14 days and deposited directly to your linked bank account. You can track all transactions and pending payments in your seller dashboard.",
    },
    {
      question: "Can I sell internationally?",
      answer:
        "Yes! Our platform supports international selling. You can specify which countries you ship to and set different shipping rates for each region.",
    },
    {
      question: "What happens if a customer returns an item?",
      answer:
        "You can set your own return policy. When a return is initiated, you'll receive a notification and can approve or deny the request based on your policy. Refunds are processed through our system.",
    },
    {
      question: "How do I handle shipping and fulfillment?",
      answer:
        "You're responsible for shipping products to customers. Our platform integrates with major shipping carriers to generate labels and track packages. You can also use our bulk shipping tools for multiple orders.",
    },
  ];

  // Seller rules/guidelines
  const sellerRules = [
    "Maintain accurate product descriptions and images",
    "Process orders within 2 business days",
    "Respond to customer inquiries within 24 hours",
    "Maintain a minimum 4-star rating",
    "Comply with all applicable laws and regulations",
    "No counterfeit or prohibited items",
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 lg:hidden">
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-zinc-800"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1">
              <ul className="space-y-4">
                <li>
                  <a
                    href="#features"
                    className="block p-3 hover:bg-zinc-800 rounded-lg transition-all"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="block p-3 hover:bg-zinc-800 rounded-lg transition-all"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#rules"
                    className="block p-3 hover:bg-zinc-800 rounded-lg transition-all"
                  >
                    Seller Guidelines
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="block p-3 hover:bg-zinc-800 rounded-lg transition-all"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </nav>
            <div className="pt-4 space-y-3">
              <button className="w-full py-3 px-6 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-all">
                Register Now
              </button>
              <button className="w-full py-3 px-6 border border-zinc-700 rounded-lg font-medium hover:bg-zinc-800 transition-all">
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-zinc-800 sticky top-0 z-40 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                CELESTIAL
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <a
                    href="#features"
                    className="text-zinc-300 hover:text-white transition-all"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-zinc-300 hover:text-white transition-all"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#rules"
                    className="text-zinc-300 hover:text-white transition-all"
                  >
                    Seller Guidelines
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="text-zinc-300 hover:text-white transition-all"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex space-x-3">
                <button
                  onClick={() => Navigate("/auth/seller/login")}
                  className="py-2 px-4 border border-zinc-700 rounded-lg font-medium hover:bg-zinc-800 transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => Navigate("/auth/seller/register")}
                  className="py-2 px-4 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-all"
                >
                  Register
                </button>
              </div>
              <button
                className="md:hidden p-2 rounded-full hover:bg-zinc-800"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Your Products Into A
              <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                {" "}
                Thriving Business
              </span>
            </h1>
            <p className="text-xl text-zinc-300 mb-8 md:mb-12">
              Join thousands of successful sellers on our platform and reach
              millions of customers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => Navigate("/auth/seller/register")}
                className="py-3 px-8 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-all text-lg"
              >
                Start Selling Today
              </button>
              <a
                href="#how-it-works"
                className="py-3 px-8 border border-zinc-700 rounded-lg font-medium hover:bg-zinc-800 transition-all flex items-center justify-center text-lg"
              >
                Learn How It Works
              </a>
            </div>

            <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-8 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-bold">10M+</p>
                <p className="text-zinc-400 mt-1">Active Buyers</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold">50K+</p>
                <p className="text-zinc-400 mt-1">Sellers</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold">$500M+</p>
                <p className="text-zinc-400 mt-1">Annual Sales</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold">150+</p>
                <p className="text-zinc-400 mt-1">Countries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-16 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Services
            </h2>

            <div className="flex border-b border-zinc-800 mb-8">
              <button
                className={`flex-1 py-4 text-center font-medium transition-all ${
                  activeTab === "sell"
                    ? "text-white border-b-2 border-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
                onClick={() => setActiveTab("sell")}
              >
                Sell Products
              </button>
              <button
                className={`flex-1 py-4 text-center font-medium transition-all ${
                  activeTab === "manage"
                    ? "text-white border-b-2 border-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
                onClick={() => setActiveTab("manage")}
              >
                Manage Orders
              </button>
              <button
                className={`flex-1 py-4 text-center font-medium transition-all ${
                  activeTab === "grow"
                    ? "text-white border-b-2 border-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
                onClick={() => setActiveTab("grow")}
              >
                Grow Business
              </button>
            </div>

            <div className="bg-zinc-800/50 rounded-xl p-6 md:p-8 border border-zinc-700">
              {activeTab === "sell" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Sell Your Products</h3>
                  <p className="text-zinc-300">
                    List and sell physical or digital products to millions of
                    customers worldwide. Our platform makes it easy to create
                    listings, manage inventory, and process orders.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-white mr-2 mt-1 shrink-0"
                      />
                      <span>Easy product listing with bulk upload options</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-white mr-2 mt-1 shrink-0"
                      />
                      <span>Inventory management with low stock alerts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-white mr-2 mt-1 shrink-0"
                      />
                      <span>Customizable product variations and options</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-white mr-2 mt-1 shrink-0"
                      />
                      <span>
                        Competitive fee structure with no monthly charges
                      </span>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "manage" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Manage Your Orders</h3>
                  <p className="text-zinc-300">
                    Efficiently process orders, manage shipping, and handle
                    customer communications all in one place with our
                    comprehensive order management system.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-white mr-2 mt-1 shrink-0"
                      />
                      <span>
                        Centralized order dashboard with status tracking
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-white mr-2 mt-1 shrink-0"
                      />
                      <span>
                        Integrated shipping label generation and tracking
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-white mr-2 mt-1 shrink-0"
                      />
                      <span>Automated order notifications and updates</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-white mr-2 mt-1 shrink-0"
                      />
                      <span>
                        Customer messaging system for direct communication
                      </span>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "grow" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Grow Your Business</h3>
                  <p className="text-zinc-300">
                    Take your business to the next level with our growth tools,
                    marketing features, and detailed analytics to understand and
                    expand your customer base.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-white mr-2 mt-1 shrink-0"
                      />
                      <span>
                        Detailed sales analytics and performance metrics
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-white mr-2 mt-1 shrink-0"
                      />
                      <span>
                        Promotional tools for discounts and special offers
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-white mr-2 mt-1 shrink-0"
                      />
                      <span>
                        SEO optimization for better product visibility
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-white mr-2 mt-1 shrink-0"
                      />
                      <span>Customer insights and behavior analysis</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
              Our platform provides all the tools and features you need to build
              and grow your online business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-zinc-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
              Get started in just a few simple steps and begin selling to
              customers worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 h-full">
                  <div className="text-3xl font-bold text-white/20 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-zinc-300">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight size={24} className="text-zinc-600" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => Navigate("/auth/seller/register")}
              className="py-3 px-8 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-all"
            >
              Register Now
            </button>
          </div>
        </div>
      </section>

      {/* Seller Guidelines Section */}
      <section id="rules" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Seller Guidelines
              </h2>
              <p className="text-xl text-zinc-300">
                To ensure a quality experience for all users, we maintain these
                standards for sellers.
              </p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4 shrink-0">
                  <Shield size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Our Seller Standards
                  </h3>
                  <p className="text-zinc-300">
                    These guidelines help maintain trust between sellers and
                    buyers on our platform. Sellers who consistently meet these
                    standards receive preferential placement and special badges.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {sellerRules.map((rule, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle
                      size={20}
                      className="text-white mr-3 mt-0.5 shrink-0"
                    />
                    <p>{rule}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800">
                <p className="text-zinc-300">
                  Sellers who violate these guidelines may receive warnings or
                  have their accounts suspended. We're committed to maintaining
                  a marketplace that's fair and trustworthy for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
              Hear from sellers who have grown their businesses on our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-zinc-600 mr-4"></div>
                <div>
                  <h3 className="font-bold">Sarah Johnson</h3>
                  <p className="text-zinc-400 text-sm">Handmade Jewelry</p>
                </div>
              </div>
              <p className="text-zinc-300">
                "I started selling my handmade jewelry as a side hustle, and
                within 6 months I was able to quit my day job. The platform's
                tools made it easy to manage my growing business."
              </p>
              <div className="flex mt-4">
                <Star size={16} className="text-zinc-400 fill-zinc-300" />
                <Star size={16} className="text-zinc-400 fill-zinc-300 " />
                <Star size={16} className="text-zinc-400 fill-zinc-300" />
                <Star size={16} className="text-zinc-400 fill-zinc-300" />
                <Star size={16} className="text-zinc-400 fill-zinc-300" />
              </div>
            </div>

            <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-zinc-600 mr-4"></div>
                <div>
                  <h3 className="font-bold">Michael Chen</h3>
                  <p className="text-zinc-400 text-sm">Electronics Store</p>
                </div>
              </div>
              <p className="text-zinc-300">
                "The analytics tools helped me understand which products were
                performing best, allowing me to optimize my inventory. My sales
                have increased by 200% in the past year."
              </p>
              <div className="flex mt-4">
                <Star size={16} className="text-zinc-400 fill-zinc-300" />
                <Star size={16} className="text-zinc-400 fill-zinc-300 " />
                <Star size={16} className="text-zinc-400 fill-zinc-300" />
                <Star size={16} className="text-zinc-400 fill-zinc-300" />
                <Star size={16} className="text-zinc-400 fill-zinc-300" />
              </div>
            </div>

            <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-zinc-600 mr-4"></div>
                <div>
                  <h3 className="font-bold">Emily Rodriguez</h3>
                  <p className="text-zinc-400 text-sm">Home Decor</p>
                </div>
              </div>
              <p className="text-zinc-300">
                "I was hesitant to start an online business, but the platform
                made it so simple. The customer service team was incredibly
                helpful whenever I had questions."
              </p>
              <div className="flex mt-10">
                <Star size={16} className="text-zinc-400 fill-zinc-300" />
                <Star size={16} className="text-zinc-400 fill-zinc-300 " />
                <Star size={16} className="text-zinc-400 fill-zinc-300" />
                <Star size={16} className="text-zinc-400 fill-zinc-300" />
                <Star size={16} className="text-zinc-400 fill-zinc-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-zinc-300">
                Find answers to common questions about selling on our platform.
              </p>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="border border-zinc-800 rounded-xl overflow-hidden"
                >
                  <button
                    className="flex justify-between items-center w-full p-6 text-left bg-zinc-900/50 hover:bg-zinc-800/50 transition-all"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className="font-medium text-lg">{item.question}</h3>
                    {openFaq === index ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>

                  {openFaq === index && (
                    <div className="p-6 bg-zinc-800/30 border-t border-zinc-800">
                      <p className="text-zinc-300">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-zinc-300 mb-6">
                Still have questions? Contact our seller support team.
              </p>
              <button className="py-3 px-8 border border-zinc-700 rounded-lg font-medium hover:bg-zinc-800 transition-all">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Selling?
            </h2>
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              Join thousands of successful sellers on our platform and turn your
              passion into a thriving business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => Navigate("/auth/seller/register")}
                className="py-3 px-8 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-all text-lg"
              >
                Register Now
              </button>
              <button className="py-3 px-8 border border-zinc-700 rounded-lg font-medium hover:bg-zinc-800 transition-all text-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 border-t border-zinc-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SellerHub</h3>
              <p className="text-zinc-400 mb-4">
                The premier platform for online sellers to grow their business
                and reach customers worldwide.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-all"
                >
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-all"
                >
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-all"
                >
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white transition-all"
                  >
                    Seller Handbook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white transition-all"
                  >
                    Success Stories
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white transition-all"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white transition-all"
                  >
                    Tutorials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white transition-all"
                  >
                    Community Forum
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white transition-all"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white transition-all"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white transition-all"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white transition-all"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white transition-all"
                  >
                    Partners
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white transition-all"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white transition-all"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white transition-all"
                  >
                    Seller Agreement
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white transition-all"
                  >
                    Buyer Protection
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white transition-all"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-zinc-400">
            <p>© 2023 SellerHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SellerHome;
