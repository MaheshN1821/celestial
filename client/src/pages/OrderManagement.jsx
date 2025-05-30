"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  X,
  Eye,
  Truck,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Calendar,
  User,
  Package,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  Download,
} from "lucide-react";

const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [cancellationReason, setCancellationReason] =
    useState("Customer Request");
  const [statusNote, setStatusNote] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // Sample order data
  const [orders, setOrders] = useState([
    {
      id: "ORD-7829",
      customer: {
        name: "Emma Wilson",
        email: "emma.wilson@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, Apt 4B, New York, NY 10001",
      },
      date: "2023-05-15T14:30:00",
      items: [
        {
          id: 1,
          name: "Nova Pro Ultra",
          price: 999.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          id: 2,
          name: "Premium Case",
          price: 49.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
      total: 1049.98,
      status: "Pending",
      paymentMethod: "Credit Card",
      shippingMethod: "Express Delivery",
      notes: "",
    },
    {
      id: "ORD-7828",
      customer: {
        name: "Michael Brown",
        email: "michael.brown@example.com",
        phone: "+1 (555) 987-6543",
        address: "456 Oak Ave, Seattle, WA 98101",
      },
      date: "2023-05-15T10:15:00",
      items: [
        {
          id: 3,
          name: "UltraBook X1",
          price: 1299.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          id: 4,
          name: "Wireless Mouse",
          price: 29.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          id: 5,
          name: "Laptop Sleeve",
          price: 39.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
      total: 1369.97,
      status: "Processing",
      paymentMethod: "PayPal",
      shippingMethod: "Standard Shipping",
      notes: "Customer requested gift wrapping",
    },
    {
      id: "ORD-7827",
      customer: {
        name: "Sophia Davis",
        email: "sophia.davis@example.com",
        phone: "+1 (555) 456-7890",
        address: "789 Pine St, San Francisco, CA 94101",
      },
      date: "2023-05-14T16:45:00",
      items: [
        {
          id: 6,
          name: "AirBuds Pro",
          price: 149.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
      total: 149.99,
      status: "Shipped",
      paymentMethod: "Credit Card",
      shippingMethod: "Express Delivery",
      notes: "",
      trackingNumber: "TRK123456789",
    },
    {
      id: "ORD-7826",
      customer: {
        name: "James Miller",
        email: "james.miller@example.com",
        phone: "+1 (555) 789-0123",
        address: "321 Maple Rd, Chicago, IL 60007",
      },
      date: "2023-05-13T09:20:00",
      items: [
        {
          id: 7,
          name: "SmartWatch Elite",
          price: 299.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          id: 8,
          name: "Watch Band",
          price: 29.99,
          quantity: 2,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
      total: 359.97,
      status: "Delivered",
      paymentMethod: "Credit Card",
      shippingMethod: "Standard Shipping",
      notes: "",
      deliveredDate: "2023-05-16T14:30:00",
    },
    {
      id: "ORD-7825",
      customer: {
        name: "Olivia Johnson",
        email: "olivia.johnson@example.com",
        phone: "+1 (555) 234-5678",
        address: "567 Elm St, Austin, TX 78701",
      },
      date: "2023-05-12T13:10:00",
      items: [
        {
          id: 9,
          name: "PowerTab 10",
          price: 499.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          id: 10,
          name: "Tablet Stand",
          price: 24.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          id: 11,
          name: "Screen Protector",
          price: 19.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
      total: 544.97,
      status: "Cancelled",
      paymentMethod: "PayPal",
      shippingMethod: "Express Delivery",
      notes: "Customer requested cancellation due to purchase error",
      cancellationReason: "Customer Request",
    },
    {
      id: "ORD-7824",
      customer: {
        name: "Daniel Wilson",
        email: "daniel.wilson@example.com",
        phone: "+1 (555) 345-6789",
        address: "890 Cedar Ave, Boston, MA 02108",
      },
      date: "2023-05-11T11:25:00",
      items: [
        {
          id: 12,
          name: "Gaming Console Pro",
          price: 499.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          id: 13,
          name: "Wireless Controller",
          price: 59.99,
          quantity: 2,
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          id: 14,
          name: "Game Subscription",
          price: 14.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
      total: 634.96,
      status: "Delivered",
      paymentMethod: "Credit Card",
      shippingMethod: "Express Delivery",
      notes: "",
      deliveredDate: "2023-05-14T10:15:00",
    },
  ]);

  // Get unique statuses for filter dropdown
  const statuses = ["All", ...new Set(orders.map((order) => order.status))];

  // Format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Calculate time ago
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${
        diffInMinutes === 1 ? "minute" : "minutes"
      } ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
    }

    return formatDate(dateString);
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Handle opening order details modal
  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsOrderDetailsModalOpen(true);
  };

  // Handle opening update status modal
  const handleOpenUpdateStatusModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setTrackingNumber(order.trackingNumber || "");
    setCancellationReason(order.cancellationReason || "Customer Request");
    setStatusNote("");
    setIsUpdateStatusModalOpen(true);
  };

  // Update order status
  const handleUpdateStatus = () => {
    const updatedOrders = orders.map((order) => {
      if (order.id === selectedOrder.id) {
        const updatedOrder = { ...order, status: newStatus };

        if (newStatus === "Shipped" && trackingNumber) {
          updatedOrder.trackingNumber = trackingNumber;
        }

        if (newStatus === "Cancelled") {
          updatedOrder.cancellationReason = cancellationReason;
        }

        if (statusNote) {
          updatedOrder.notes = statusNote;
        }

        return updatedOrder;
      }
      return order;
    });

    setOrders(updatedOrders);
    setIsUpdateStatusModalOpen(false);
  };

  // Get status badge color
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-white/10 text-white border border-white/20";
      case "Processing":
        return "bg-white/10 text-white border border-white/20";
      case "Shipped":
        return "bg-white/10 text-white border border-white/20";
      case "Delivered":
        return "bg-white text-black";
      case "Cancelled":
        return "bg-black text-white border border-white/50";
      default:
        return "bg-white/10 text-white border border-white/20";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4" />;
      case "Processing":
        return <RefreshCw className="h-4 w-4" />;
      case "Shipped":
        return <Truck className="h-4 w-4" />;
      case "Delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "Cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal-backdrop")) {
        setIsOrderDetailsModalOpen(false);
        setIsUpdateStatusModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOrderDetailsModalOpen || isUpdateStatusModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOrderDetailsModalOpen, isUpdateStatusModalOpen]);

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Order Management</h1>
            <p className="mt-1 text-sm text-white/70">
              View and manage customer orders
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export Orders
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-white/10">
                <Package className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm font-medium text-white/70">Total Orders</p>
              <p className="text-2xl font-bold text-white mt-1">
                {orders.length}
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-white/10">
                <Clock className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm font-medium text-white/70">Pending</p>
              <p className="text-2xl font-bold text-white mt-1">
                {orders.filter((order) => order.status === "Pending").length}
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-white/10">
                <Truck className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm font-medium text-white/70">Shipped</p>
              <p className="text-2xl font-bold text-white mt-1">
                {orders.filter((order) => order.status === "Shipped").length}
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-white/10">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm font-medium text-white/70">Revenue</p>
              <p className="text-2xl font-bold text-white mt-1">
                $
                {orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white/50" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
              placeholder="Search orders by ID or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-white/70 mr-2" />
                <select
                  className="appearance-none block w-full px-3 py-2.5 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  {statuses.map((status) => (
                    <option
                      key={status}
                      value={status}
                      className="bg-black text-white"
                    >
                      {status}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white/70">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            <button
              className="px-4 py-2.5 bg-white/5 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("All");
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-white/70 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {currentOrders.length > 0 ? (
                  currentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white mr-3">
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm text-white">
                              {order.customer.name}
                            </div>
                            <div className="text-xs text-white/70">
                              {order.customer.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-white/50 mr-2" />
                          <div>
                            <div className="text-sm text-white">
                              {formatDate(order.date)}
                            </div>
                            <div className="text-xs text-white/70">
                              {getTimeAgo(order.date)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white flex items-center">
                          <Package className="h-4 w-4 text-white/50 mr-2" />
                          {order.items.length}{" "}
                          {order.items.length === 1 ? "item" : "items"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          ${order.total.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1.5 inline-flex items-center text-xs leading-5 font-medium rounded-full ${getStatusBadgeClass(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          <span className="ml-1.5">{order.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-3">
                          <button
                            onClick={() => handleViewOrderDetails(order)}
                            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleOpenUpdateStatusModal(order)}
                            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                            title="Update Status"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-8 text-center text-white/70"
                    >
                      <div className="flex flex-col items-center">
                        <Package className="h-10 w-10 text-white/30 mb-2" />
                        <p>No orders found matching your criteria</p>
                        <button
                          className="mt-3 text-white underline hover:text-white/80"
                          onClick={() => {
                            setSearchTerm("");
                            setFilterStatus("All");
                          }}
                        >
                          Reset filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-white/70">
              Showing {indexOfFirstOrder + 1} to{" "}
              {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
              {filteredOrders.length} orders
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border ${
                  currentPage === 1
                    ? "border-white/10 text-white/30"
                    : "border-white/20 text-white hover:bg-white/10"
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg ${
                      currentPage === page
                        ? "bg-white text-black"
                        : "bg-white/5 text-white border border-white/20 hover:bg-white/10"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg border ${
                  currentPage === totalPages
                    ? "border-white/10 text-white/30"
                    : "border-white/20 text-white hover:bg-white/10"
                }`}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {isOrderDetailsModalOpen && selectedOrder && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto modal-backdrop"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="inline-block align-bottom bg-black border border-white/20 rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="relative">
                {/* Header */}
                <div className="px-6 pt-5 pb-4 border-b border-white/10">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl leading-6 font-bold text-white flex items-center">
                      Order Details
                      <span
                        className={`ml-3 px-3 py-1 inline-flex items-center text-xs leading-5 font-medium rounded-full ${getStatusBadgeClass(
                          selectedOrder.status
                        )}`}
                      >
                        {getStatusIcon(selectedOrder.status)}
                        <span className="ml-1.5">{selectedOrder.status}</span>
                      </span>
                    </h3>
                    <button
                      onClick={() => setIsOrderDetailsModalOpen(false)}
                      className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Order Information */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-xl">
                      <h4 className="text-white font-medium mb-4 flex items-center">
                        <Package className="h-5 w-5 mr-2 text-white/70" />
                        Order Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Order ID:</span>
                          <span className="text-white font-medium">
                            {selectedOrder.id}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Date:</span>
                          <span className="text-white">
                            {formatDate(selectedOrder.date)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Payment Method:</span>
                          <span className="text-white">
                            {selectedOrder.paymentMethod}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">
                            Shipping Method:
                          </span>
                          <span className="text-white">
                            {selectedOrder.shippingMethod}
                          </span>
                        </div>
                        {selectedOrder.trackingNumber && (
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">
                              Tracking Number:
                            </span>
                            <span className="text-white">
                              {selectedOrder.trackingNumber}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Customer Information */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-xl">
                      <h4 className="text-white font-medium mb-4 flex items-center">
                        <User className="h-5 w-5 mr-2 text-white/70" />
                        Customer Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Name:</span>
                          <span className="text-white">
                            {selectedOrder.customer.name}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Email:</span>
                          <span className="text-white">
                            {selectedOrder.customer.email}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Phone:</span>
                          <span className="text-white">
                            {selectedOrder.customer.phone}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Address:</span>
                          <span className="text-white text-right max-w-[60%]">
                            {selectedOrder.customer.address}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-xl mb-6">
                    <h4 className="text-white font-medium mb-4 flex items-center">
                      <Package className="h-5 w-5 mr-2 text-white/70" />
                      Order Items
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-white/10">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                              Product
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">
                              Price
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">
                              Quantity
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {selectedOrder.items.map((item) => (
                            <tr key={item.id} className="hover:bg-white/5">
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-12 w-12 flex-shrink-0 rounded bg-white/10 overflow-hidden">
                                    <img
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      className="h-12 w-12 object-cover"
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-white">
                                      {item.name}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-white text-right">
                                ${item.price.toFixed(2)}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-white text-right">
                                {item.quantity}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white text-right">
                                ${(item.price * item.quantity).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="border-t border-white/10">
                          <tr>
                            <td
                              colSpan="3"
                              className="px-4 py-3 text-right text-sm font-medium text-white/70"
                            >
                              Subtotal:
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-white text-right">
                              ${selectedOrder.total.toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td
                              colSpan="3"
                              className="px-4 py-3 text-right text-sm font-medium text-white/70"
                            >
                              Shipping:
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-white text-right">
                              $0.00
                            </td>
                          </tr>
                          <tr>
                            <td
                              colSpan="3"
                              className="px-4 py-3 text-right text-sm font-bold text-white"
                            >
                              Total:
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-white text-right">
                              ${selectedOrder.total.toFixed(2)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedOrder.notes && (
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-xl">
                      <h4 className="text-white font-medium mb-2 flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2 text-white/70" />
                        Notes
                      </h4>
                      <p className="text-white/90 text-sm">
                        {selectedOrder.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="bg-white/5 px-6 py-4 border-t border-white/10 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOrderDetailsModalOpen(false);
                      handleOpenUpdateStatusModal(selectedOrder);
                    }}
                    className="inline-flex items-center px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Update Status
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOrderDetailsModalOpen(false)}
                    className="ml-3 inline-flex items-center px-4 py-2 border border-white/20 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Status Modal */}
      {isUpdateStatusModalOpen && selectedOrder && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto modal-backdrop"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="inline-block align-bottom bg-black border border-white/20 rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="relative">
                {/* Header */}
                <div className="px-6 pt-5 pb-4 border-b border-white/10">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl leading-6 font-bold text-white">
                      Update Order Status
                    </h3>
                    <button
                      onClick={() => setIsUpdateStatusModalOpen(false)}
                      className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 py-5">
                  <p className="text-sm text-white/70 mb-6">
                    Update the status for order{" "}
                    <span className="font-medium text-white">
                      {selectedOrder.id}
                    </span>
                  </p>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Current Status
                      </label>
                      <div
                        className={`px-3 py-2 rounded-lg ${getStatusBadgeClass(
                          selectedOrder.status
                        )} inline-flex items-center`}
                      >
                        {getStatusIcon(selectedOrder.status)}
                        <span className="ml-1.5">{selectedOrder.status}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        New Status
                      </label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="w-full px-3 py-2.5 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                      >
                        <option value="Pending" className="bg-black text-white">
                          Pending
                        </option>
                        <option
                          value="Processing"
                          className="bg-black text-white"
                        >
                          Processing
                        </option>
                        <option value="Shipped" className="bg-black text-white">
                          Shipped
                        </option>
                        <option
                          value="Delivered"
                          className="bg-black text-white"
                        >
                          Delivered
                        </option>
                        <option
                          value="Cancelled"
                          className="bg-black text-white"
                        >
                          Cancelled
                        </option>
                      </select>
                    </div>

                    {newStatus === "Shipped" && (
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                          Tracking Number
                        </label>
                        <input
                          type="text"
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value)}
                          className="w-full px-3 py-2.5 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                          placeholder="Enter tracking number"
                        />
                      </div>
                    )}

                    {newStatus === "Cancelled" && (
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                          Cancellation Reason
                        </label>
                        <select
                          value={cancellationReason}
                          onChange={(e) =>
                            setCancellationReason(e.target.value)
                          }
                          className="w-full px-3 py-2.5 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                        >
                          <option
                            value="Customer Request"
                            className="bg-black text-white"
                          >
                            Customer Request
                          </option>
                          <option
                            value="Out of Stock"
                            className="bg-black text-white"
                          >
                            Out of Stock
                          </option>
                          <option
                            value="Payment Issue"
                            className="bg-black text-white"
                          >
                            Payment Issue
                          </option>
                          <option
                            value="Duplicate Order"
                            className="bg-black text-white"
                          >
                            Duplicate Order
                          </option>
                          <option value="Other" className="bg-black text-white">
                            Other
                          </option>
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Notes (Optional)
                      </label>
                      <textarea
                        rows="3"
                        value={statusNote}
                        onChange={(e) => setStatusNote(e.target.value)}
                        className="w-full px-3 py-2.5 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                        placeholder="Add notes about this status change"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-white/5 px-6 py-4 border-t border-white/10 flex justify-end">
                  <button
                    type="button"
                    onClick={handleUpdateStatus}
                    className="inline-flex items-center px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Update Status
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsUpdateStatusModalOpen(false)}
                    className="ml-3 inline-flex items-center px-4 py-2 border border-white/20 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;

//-------------------------------------------------------------------------//

// import { useState } from "react";
// import {
//   Search,
//   Filter,
//   ChevronDown,
//   X,
//   Eye,
//   Truck,
//   AlertCircle,
//   Clock,
//   CheckCircle,
//   XCircle,
//   RefreshCw,
//   PlusCircle,
// } from "lucide-react";

// const OrderManagement = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
//   const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);
//   const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
//   const [newStatus, setNewStatus] = useState("");
//   const [trackingNumber, setTrackingNumber] = useState("");
//   const [cancellationReason, setCancellationReason] =
//     useState("Customer Request");
//   const [statusNotes, setStatusNotes] = useState("");

//   // Sample order data
//   const [orders, setOrders] = useState([
//     {
//       id: "ORD-7829",
//       customer: {
//         name: "Emma Wilson",
//         email: "emma.wilson@example.com",
//         phone: "+1 (555) 123-4567",
//         address: "123 Main St, Apt 4B, New York, NY 10001",
//       },
//       date: "2023-05-15T14:30:00",
//       items: [
//         {
//           id: 1,
//           name: "Nova Pro Ultra",
//           price: 999.99,
//           quantity: 1,
//           image: "/api/placeholder/80/80",
//         },
//         {
//           id: 2,
//           name: "Premium Case",
//           price: 49.99,
//           quantity: 1,
//           image: "/api/placeholder/80/80",
//         },
//       ],
//       total: 1049.98,
//       status: "Pending",
//       paymentMethod: "Credit Card",
//       shippingMethod: "Express Delivery",
//       notes: "",
//     },
//     {
//       id: "ORD-7828",
//       customer: {
//         name: "Michael Brown",
//         email: "michael.brown@example.com",
//         phone: "+1 (555) 987-6543",
//         address: "456 Oak Ave, Seattle, WA 98101",
//       },
//       date: "2023-05-15T10:15:00",
//       items: [
//         {
//           id: 3,
//           name: "UltraBook X1",
//           price: 1299.99,
//           quantity: 1,
//           image: "/api/placeholder/80/80",
//         },
//         {
//           id: 4,
//           name: "Wireless Mouse",
//           price: 29.99,
//           quantity: 1,
//           image: "/api/placeholder/80/80",
//         },
//         {
//           id: 5,
//           name: "Laptop Sleeve",
//           price: 39.99,
//           quantity: 1,
//           image: "/api/placeholder/80/80",
//         },
//       ],
//       total: 1369.97,
//       status: "Processing",
//       paymentMethod: "PayPal",
//       shippingMethod: "Standard Shipping",
//       notes: "Customer requested gift wrapping",
//     },
//     {
//       id: "ORD-7827",
//       customer: {
//         name: "Sophia Davis",
//         email: "sophia.davis@example.com",
//         phone: "+1 (555) 456-7890",
//         address: "789 Pine St, San Francisco, CA 94101",
//       },
//       date: "2023-05-14T16:45:00",
//       items: [
//         {
//           id: 6,
//           name: "AirBuds Pro",
//           price: 149.99,
//           quantity: 1,
//           image: "/api/placeholder/80/80",
//         },
//       ],
//       total: 149.99,
//       status: "Shipped",
//       paymentMethod: "Credit Card",
//       shippingMethod: "Express Delivery",
//       notes: "",
//       trackingNumber: "TRK123456789",
//     },
//     {
//       id: "ORD-7826",
//       customer: {
//         name: "James Miller",
//         email: "james.miller@example.com",
//         phone: "+1 (555) 789-0123",
//         address: "321 Maple Rd, Chicago, IL 60007",
//       },
//       date: "2023-05-13T09:20:00",
//       items: [
//         {
//           id: 7,
//           name: "SmartWatch Elite",
//           price: 299.99,
//           quantity: 1,
//           image: "/api/placeholder/80/80",
//         },
//         {
//           id: 8,
//           name: "Watch Band",
//           price: 29.99,
//           quantity: 2,
//           image: "/api/placeholder/80/80",
//         },
//       ],
//       total: 359.97,
//       status: "Delivered",
//       paymentMethod: "Credit Card",
//       shippingMethod: "Standard Shipping",
//       notes: "",
//       deliveredDate: "2023-05-16T14:30:00",
//     },
//     {
//       id: "ORD-7825",
//       customer: {
//         name: "Olivia Johnson",
//         email: "olivia.johnson@example.com",
//         phone: "+1 (555) 234-5678",
//         address: "567 Elm St, Austin, TX 78701",
//       },
//       date: "2023-05-12T13:10:00",
//       items: [
//         {
//           id: 9,
//           name: "PowerTab 10",
//           price: 499.99,
//           quantity: 1,
//           image: "/api/placeholder/80/80",
//         },
//         {
//           id: 10,
//           name: "Tablet Stand",
//           price: 24.99,
//           quantity: 1,
//           image: "/api/placeholder/80/80",
//         },
//         {
//           id: 11,
//           name: "Screen Protector",
//           price: 19.99,
//           quantity: 1,
//           image: "/api/placeholder/80/80",
//         },
//       ],
//       total: 544.97,
//       status: "Cancelled",
//       paymentMethod: "PayPal",
//       shippingMethod: "Express Delivery",
//       notes: "Customer requested cancellation due to purchase error",
//       cancellationReason: "Customer Request",
//     },
//   ]);

//   // Get unique statuses for filter dropdown
//   const statuses = ["All", ...new Set(orders.map((order) => order.status))];

//   // Format date
//   const formatDate = (dateString) => {
//     const options = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     };
//     return new Date(dateString).toLocaleDateString("en-US", options);
//   };

//   // Calculate time ago
//   const getTimeAgo = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInSeconds = Math.floor((now - date) / 1000);

//     if (diffInSeconds < 60) {
//       return `${diffInSeconds} seconds ago`;
//     }

//     const diffInMinutes = Math.floor(diffInSeconds / 60);
//     if (diffInMinutes < 60) {
//       return `${diffInMinutes} ${
//         diffInMinutes === 1 ? "minute" : "minutes"
//       } ago`;
//     }

//     const diffInHours = Math.floor(diffInMinutes / 60);
//     if (diffInHours < 24) {
//       return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
//     }

//     const diffInDays = Math.floor(diffInHours / 24);
//     if (diffInDays < 30) {
//       return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
//     }

//     return formatDate(dateString);
//   };

//   // Filter orders based on search and status
//   const filteredOrders = orders.filter((order) => {
//     const matchesSearch =
//       order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStatus =
//       filterStatus === "All" || order.status === filterStatus;

//     return matchesSearch && matchesStatus;
//   });

//   // Handle opening order details modal
//   const handleViewOrderDetails = (order) => {
//     setSelectedOrder(order);
//     setIsOrderDetailsModalOpen(true);
//   };

//   // Handle opening update status modal
//   const handleOpenUpdateStatusModal = (order) => {
//     setSelectedOrder(order);
//     setNewStatus(order.status);
//     setTrackingNumber(order.trackingNumber || "");
//     setCancellationReason(order.cancellationReason || "Customer Request");
//     setStatusNotes("");
//     setIsUpdateStatusModalOpen(true);
//   };

//   // Handle opening new product modal
//   const handleOpenNewProductModal = () => {
//     setIsNewProductModalOpen(true);
//   };

//   // Update order status
//   const handleUpdateStatus = () => {
//     const updatedOrder = { ...selectedOrder, status: newStatus };

//     if (newStatus === "Shipped" && trackingNumber) {
//       updatedOrder.trackingNumber = trackingNumber;
//     }

//     if (newStatus === "Cancelled") {
//       updatedOrder.cancellationReason = cancellationReason;
//     }

//     if (statusNotes) {
//       updatedOrder.notes = statusNotes;
//     }

//     const updatedOrders = orders.map((order) =>
//       order.id === selectedOrder.id ? updatedOrder : order
//     );

//     setOrders(updatedOrders);
//     setIsUpdateStatusModalOpen(false);
//   };

//   // Get status badge color
//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case "Pending":
//         return "bg-black text-yellow-300 border border-yellow-300";
//       case "Processing":
//         return "bg-black text-blue-300 border border-blue-300";
//       case "Shipped":
//         return "bg-black text-purple-300 border border-purple-300";
//       case "Delivered":
//         return "bg-black text-green-300 border border-green-300";
//       case "Cancelled":
//         return "bg-black text-red-300 border border-red-300";
//       default:
//         return "bg-black text-white border border-white";
//     }
//   };

//   // Get status icon
//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "Pending":
//         return <Clock className="h-4 w-4" />;
//       case "Processing":
//         return <RefreshCw className="h-4 w-4" />;
//       case "Shipped":
//         return <Truck className="h-4 w-4" />;
//       case "Delivered":
//         return <CheckCircle className="h-4 w-4" />;
//       case "Cancelled":
//         return <XCircle className="h-4 w-4" />;
//       default:
//         return <AlertCircle className="h-4 w-4" />;
//     }
//   };

//   // Modal Backdrop Component
//   const ModalBackdrop = ({ onClick }) => (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-75 z-40"
//       onClick={onClick}
//     />
//   );

//   return (
//     <div className="px-4 py-6 sm:px-6 lg:px-8 bg-black min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-white">Order Management</h1>
//             <p className="mt-1 text-sm text-gray-300">
//               View and manage customer orders
//             </p>
//           </div>
//           <div className="mt-4 md:mt-0 flex space-x-3">
//             <button
//               onClick={handleOpenNewProductModal}
//               className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center"
//             >
//               <PlusCircle className="h-4 w-4 mr-2" />
//               Add Product
//             </button>
//             <button className="px-4 py-2 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-black transition-colors">
//               Export Orders
//             </button>
//           </div>
//         </div>

//         {/* Filters and Search */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
//           <div className="relative flex-1 max-w-md">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               className="block w-full pl-10 pr-3 py-2 border border-white rounded-lg bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
//               placeholder="Search orders by ID or customer..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <div className="flex items-center">
//                 <Filter className="h-5 w-5 text-gray-300 mr-2" />
//                 <select
//                   className="appearance-none block w-full px-3 py-2 border border-white rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                 >
//                   {statuses.map((status) => (
//                     <option key={status} value={status}>
//                       {status}
//                     </option>
//                   ))}
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
//                   <ChevronDown className="h-4 w-4" />
//                 </div>
//               </div>
//             </div>

//             <button
//               className="px-4 py-2 bg-black text-white border border-white rounded-lg hover:bg-white hover:text-black transition-colors"
//               onClick={() => {
//                 setSearchTerm("");
//                 setFilterStatus("All");
//               }}
//             >
//               Reset
//             </button>
//           </div>
//         </div>

//         {/* Orders Table */}
//         <div className="bg-black border border-white rounded-xl shadow-lg overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-700">
//               <thead className="bg-white text-black">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                     Order ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                     Customer
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                     Items
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                     Total
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-800">
//                 {filteredOrders.length > 0 ? (
//                   filteredOrders.map((order) => (
//                     <tr
//                       key={order.id}
//                       className="hover:bg-gray-900 transition-colors"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
//                         {order.id}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-white">
//                           {order.customer.name}
//                         </div>
//                         <div className="text-sm text-gray-400">
//                           {order.customer.email}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-white">
//                           {formatDate(order.date)}
//                         </div>
//                         <div className="text-sm text-gray-400">
//                           {getTimeAgo(order.date)}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
//                         {order.items.length}{" "}
//                         {order.items.length === 1 ? "item" : "items"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
//                         ${order.total.toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
//                             order.status
//                           )}`}
//                         >
//                           {getStatusIcon(order.status)}
//                           <span className="ml-1">{order.status}</span>
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <button
//                           onClick={() => handleViewOrderDetails(order)}
//                           className="text-gray-400 hover:text-white mr-3"
//                         >
//                           <Eye className="h-5 w-5" />
//                         </button>
//                         <button
//                           onClick={() => handleOpenUpdateStatusModal(order)}
//                           className="text-gray-400 hover:text-white"
//                         >
//                           <RefreshCw className="h-5 w-5" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="7"
//                       className="px-6 py-4 text-center text-gray-400"
//                     >
//                       No orders found matching your criteria
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Order Details Modal */}
//       {isOrderDetailsModalOpen && selectedOrder && (
//         <>
//           <ModalBackdrop onClick={() => setIsOrderDetailsModalOpen(false)} />
//           <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
//             <div className="bg-black border border-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all max-w-4xl w-full">
//               <div className="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                 <div className="flex justify-between items-center mb-4 border-b border-white pb-2">
//                   <h3 className="text-lg leading-6 font-medium text-white flex items-center">
//                     Order Details
//                     <span
//                       className={`ml-2 px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
//                         selectedOrder.status
//                       )}`}
//                     >
//                       {getStatusIcon(selectedOrder.status)}
//                       <span className="ml-1">{selectedOrder.status}</span>
//                     </span>
//                   </h3>
//                   <button
//                     onClick={() => setIsOrderDetailsModalOpen(false)}
//                     className="text-white hover:text-gray-300"
//                   >
//                     <X className="h-6 w-6" />
//                   </button>
//                 </div>

//                 <div className="mt-2 max-h-[70vh] overflow-y-auto pr-2">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Order Information */}
//                     <div className="bg-black border border-white p-4 rounded-lg">
//                       <h4 className="text-white font-medium mb-4 border-b border-gray-700 pb-2">
//                         Order Information
//                       </h4>
//                       <div className="space-y-2">
//                         <div className="flex justify-between">
//                           <span className="text-gray-300">Order ID:</span>
//                           <span className="text-white font-medium">
//                             {selectedOrder.id}
//                           </span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-300">Date:</span>
//                           <span className="text-white">
//                             {formatDate(selectedOrder.date)}
//                           </span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-300">Payment Method:</span>
//                           <span className="text-white">
//                             {selectedOrder.paymentMethod}
//                           </span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-300">
//                             Shipping Method:
//                           </span>
//                           <span className="text-white">
//                             {selectedOrder.shippingMethod}
//                           </span>
//                         </div>
//                         {selectedOrder.trackingNumber && (
//                           <div className="flex justify-between">
//                             <span className="text-gray-300">
//                               Tracking Number:
//                             </span>
//                             <span className="text-white">
//                               {selectedOrder.trackingNumber}
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Customer Information */}
//                     <div className="bg-black border border-white p-4 rounded-lg">
//                       <h4 className="text-white font-medium mb-4 border-b border-gray-700 pb-2">
//                         Customer Information
//                       </h4>
//                       <div className="space-y-2">
//                         <div className="flex justify-between">
//                           <span className="text-gray-300">Name:</span>
//                           <span className="text-white">
//                             {selectedOrder.customer.name}
//                           </span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-300">Email:</span>
//                           <span className="text-white">
//                             {selectedOrder.customer.email}
//                           </span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-300">Phone:</span>
//                           <span className="text-white">
//                             {selectedOrder.customer.phone}
//                           </span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-300">Address:</span>
//                           <span className="text-white text-right">
//                             {selectedOrder.customer.address}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Order Items */}
//                   <div className="mt-6 bg-black border border-white p-4 rounded-lg">
//                     <h4 className="text-white font-medium mb-4 border-b border-gray-700 pb-2">
//                       Order Items
//                     </h4>
//                     <div className="overflow-x-auto">
//                       <table className="min-w-full divide-y divide-gray-700">
//                         <thead>
//                           <tr className="bg-white text-black">
//                             <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                               Product
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                               Price
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                               Quantity
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                               Total
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-700">
//                           {selectedOrder.items.map((item) => (
//                             <tr key={item.id}>
//                               <td className="px-4 py-3 whitespace-nowrap">
//                                 <div className="flex items-center">
//                                   <div className="h-10 w-10 flex-shrink-0 rounded bg-gray-700">
//                                     <img
//                                       src={
//                                         item.image || "/api/placeholder/80/80"
//                                       }
//                                       alt={item.name}
//                                       className="h-10 w-10 object-cover rounded"
//                                     />
//                                   </div>
//                                   <div className="ml-4">
//                                     <div className="text-sm font-medium text-white">
//                                       {item.name}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </td>
//                               <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                 ${item.price.toFixed(2)}
//                               </td>
//                               <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                 {item.quantity}
//                               </td>
//                               <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
//                                 ${(item.price * item.quantity).toFixed(2)}
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                         <tfoot>
//                           <tr>
//                             <td
//                               colSpan="3"
//                               className="px-4 py-3 text-right text-sm font-medium text-gray-300"
//                             >
//                               Subtotal:
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
//                               ${selectedOrder.total.toFixed(2)}
//                             </td>
//                           </tr>
//                           <tr>
//                             <td
//                               colSpan="3"
//                               className="px-4 py-3 text-right text-sm font-medium text-gray-300"
//                             >
//                               Shipping:
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
//                               $0.00
//                             </td>
//                           </tr>
//                           <tr>
//                             <td
//                               colSpan="3"
//                               className="px-4 py-3 text-right text-sm font-bold text-gray-300"
//                             >
//                               Total:
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-white">
//                               ${selectedOrder.total.toFixed(2)}
//                             </td>
//                           </tr>
//                         </tfoot>
//                       </table>
//                     </div>
//                   </div>

//                   {/* Notes */}
//                   {selectedOrder.notes && (
//                     <div className="mt-6 bg-black border border-white p-4 rounded-lg">
//                       <h4 className="text-white font-medium mb-2">Notes</h4>
//                       <p className="text-gray-300 text-sm">
//                         {selectedOrder.notes}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="bg-black border-t border-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setIsOrderDetailsModalOpen(false);
//                     handleOpenUpdateStatusModal(selectedOrder);
//                   }}
//                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-medium text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white sm:ml-3 sm:w-auto sm:text-sm"
//                 >
//                   Update Status
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setIsOrderDetailsModalOpen(false)}
//                   className="mt-3 w-full inline-flex justify-center rounded-md border border-white shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Update Status Modal */}
//       {isUpdateStatusModalOpen && selectedOrder && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <div
//               className="fixed inset-0 transition-opacity"
//               aria-hidden="true"
//             >
//               <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
//             </div>

//             <span
//               className="hidden sm:inline-block sm:align-middle sm:h-screen"
//               aria-hidden="true"
//             >
//               &#8203;
//             </span>

//             <div className="inline-block align-bottom bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//               <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg leading-6 font-medium text-white">
//                     Update Order Status
//                   </h3>
//                   <button
//                     onClick={() => setIsUpdateStatusModalOpen(false)}
//                     className="text-gray-400 hover:text-white focus:outline-none"
//                   >
//                     <X className="h-6 w-6" />
//                   </button>
//                 </div>

//                 <div className="mt-2">
//                   <p className="text-sm text-gray-300 mb-4">
//                     Update the status for order{" "}
//                     <span className="font-medium text-white">
//                       {selectedOrder.id}
//                     </span>
//                   </p>

//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-400 mb-1">
//                         Current Status
//                       </label>
//                       <div
//                         className={`px-3 py-2 rounded-lg ${getStatusBadgeClass(
//                           selectedOrder.status
//                         )} inline-flex items-center`}
//                       >
//                         {getStatusIcon(selectedOrder.status)}
//                         <span className="ml-1">{selectedOrder.status}</span>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-400 mb-1">
//                         New Status
//                       </label>
//                       <select
//                         value={newStatus}
//                         onChange={(e) => setNewStatus(e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
//                       >
//                         <option value="Pending">Pending</option>
//                         <option value="Processing">Processing</option>
//                         <option value="Shipped">Shipped</option>
//                         <option value="Delivered">Delivered</option>
//                         <option value="Cancelled">Cancelled</option>
//                       </select>
//                     </div>

//                     {newStatus === "Shipped" && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-400 mb-1">
//                           Tracking Number
//                         </label>
//                         <input
//                           type="text"
//                           className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
//                           placeholder="Enter tracking number"
//                         />
//                       </div>
//                     )}

//                     {newStatus === "Cancelled" && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-400 mb-1">
//                           Cancellation Reason
//                         </label>
//                         <select className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent">
//                           <option value="Customer Request">
//                             Customer Request
//                           </option>
//                           <option value="Out of Stock">Out of Stock</option>
//                           <option value="Payment Issue">Payment Issue</option>
//                           <option value="Duplicate Order">
//                             Duplicate Order
//                           </option>
//                           <option value="Other">Other</option>
//                         </select>
//                       </div>
//                     )}

//                     <div>
//                       <label className="block text-sm font-medium text-gray-400 mb-1">
//                         Notes (Optional)
//                       </label>
//                       <textarea
//                         rows="3"
//                         className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
//                         placeholder="Add notes about this status change"
//                       ></textarea>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                 <button
//                   type="button"
//                   onClick={handleUpdateStatus}
//                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
//                 >
//                   Update Status
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setIsUpdateStatusModalOpen(false)}
//                   className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-700 shadow-sm px-4 py-2 bg-gray-900 text-base font-medium text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderManagement;

//-----------------------------------------------------------------------//

// import { useState } from "react";
// import {
//   Search,
//   Filter,
//   ChevronDown,
//   X,
//   Eye,
//   Truck,
//   AlertCircle,
//   Clock,
//   CheckCircle,
//   XCircle,
//   RefreshCw,
// } from "lucide-react";

// const OrderManagement = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
//   const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);
//   const [newStatus, setNewStatus] = useState("");

//   // Sample order data
//   const [orders, setOrders] = useState([
//     {
//       id: "ORD-7829",
//       customer: {
//         name: "Emma Wilson",
//         email: "emma.wilson@example.com",
//         phone: "+1 (555) 123-4567",
//         address: "123 Main St, Apt 4B, New York, NY 10001",
//       },
//       date: "2023-05-15T14:30:00",
//       items: [
//         {
//           id: 1,
//           name: "Nova Pro Ultra",
//           price: 999.99,
//           quantity: 1,
//           image: "/placeholder.svg?height=80&width=80",
//         },
//         {
//           id: 2,
//           name: "Premium Case",
//           price: 49.99,
//           quantity: 1,
//           image: "/placeholder.svg?height=80&width=80",
//         },
//       ],
//       total: 1049.98,
//       status: "Pending",
//       paymentMethod: "Credit Card",
//       shippingMethod: "Express Delivery",
//       notes: "",
//     },
//     {
//       id: "ORD-7828",
//       customer: {
//         name: "Michael Brown",
//         email: "michael.brown@example.com",
//         phone: "+1 (555) 987-6543",
//         address: "456 Oak Ave, Seattle, WA 98101",
//       },
//       date: "2023-05-15T10:15:00",
//       items: [
//         {
//           id: 3,
//           name: "UltraBook X1",
//           price: 1299.99,
//           quantity: 1,
//           image: "/placeholder.svg?height=80&width=80",
//         },
//         {
//           id: 4,
//           name: "Wireless Mouse",
//           price: 29.99,
//           quantity: 1,
//           image: "/placeholder.svg?height=80&width=80",
//         },
//         {
//           id: 5,
//           name: "Laptop Sleeve",
//           price: 39.99,
//           quantity: 1,
//           image: "/placeholder.svg?height=80&width=80",
//         },
//       ],
//       total: 1369.97,
//       status: "Processing",
//       paymentMethod: "PayPal",
//       shippingMethod: "Standard Shipping",
//       notes: "Customer requested gift wrapping",
//     },
//     {
//       id: "ORD-7827",
//       customer: {
//         name: "Sophia Davis",
//         email: "sophia.davis@example.com",
//         phone: "+1 (555) 456-7890",
//         address: "789 Pine St, San Francisco, CA 94101",
//       },
//       date: "2023-05-14T16:45:00",
//       items: [
//         {
//           id: 6,
//           name: "AirBuds Pro",
//           price: 149.99,
//           quantity: 1,
//           image: "/placeholder.svg?height=80&width=80",
//         },
//       ],
//       total: 149.99,
//       status: "Shipped",
//       paymentMethod: "Credit Card",
//       shippingMethod: "Express Delivery",
//       notes: "",
//       trackingNumber: "TRK123456789",
//     },
//     {
//       id: "ORD-7826",
//       customer: {
//         name: "James Miller",
//         email: "james.miller@example.com",
//         phone: "+1 (555) 789-0123",
//         address: "321 Maple Rd, Chicago, IL 60007",
//       },
//       date: "2023-05-13T09:20:00",
//       items: [
//         {
//           id: 7,
//           name: "SmartWatch Elite",
//           price: 299.99,
//           quantity: 1,
//           image: "/placeholder.svg?height=80&width=80",
//         },
//         {
//           id: 8,
//           name: "Watch Band",
//           price: 29.99,
//           quantity: 2,
//           image: "/placeholder.svg?height=80&width=80",
//         },
//       ],
//       total: 359.97,
//       status: "Delivered",
//       paymentMethod: "Credit Card",
//       shippingMethod: "Standard Shipping",
//       notes: "",
//       deliveredDate: "2023-05-16T14:30:00",
//     },
//     {
//       id: "ORD-7825",
//       customer: {
//         name: "Olivia Johnson",
//         email: "olivia.johnson@example.com",
//         phone: "+1 (555) 234-5678",
//         address: "567 Elm St, Austin, TX 78701",
//       },
//       date: "2023-05-12T13:10:00",
//       items: [
//         {
//           id: 9,
//           name: "PowerTab 10",
//           price: 499.99,
//           quantity: 1,
//           image: "/placeholder.svg?height=80&width=80",
//         },
//         {
//           id: 10,
//           name: "Tablet Stand",
//           price: 24.99,
//           quantity: 1,
//           image: "/placeholder.svg?height=80&width=80",
//         },
//         {
//           id: 11,
//           name: "Screen Protector",
//           price: 19.99,
//           quantity: 1,
//           image: "/placeholder.svg?height=80&width=80",
//         },
//       ],
//       total: 544.97,
//       status: "Cancelled",
//       paymentMethod: "PayPal",
//       shippingMethod: "Express Delivery",
//       notes: "Customer requested cancellation due to purchase error",
//       cancellationReason: "Customer Request",
//     },
//   ]);

//   // Get unique statuses for filter dropdown
//   const statuses = ["All", ...new Set(orders.map((order) => order.status))];

//   // Format date
//   const formatDate = (dateString) => {
//     const options = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     };
//     return new Date(dateString).toLocaleDateString("en-US", options);
//   };

//   // Calculate time ago
//   const getTimeAgo = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInSeconds = Math.floor((now - date) / 1000);

//     if (diffInSeconds < 60) {
//       return `${diffInSeconds} seconds ago`;
//     }

//     const diffInMinutes = Math.floor(diffInSeconds / 60);
//     if (diffInMinutes < 60) {
//       return `${diffInMinutes} ${
//         diffInMinutes === 1 ? "minute" : "minutes"
//       } ago`;
//     }

//     const diffInHours = Math.floor(diffInMinutes / 60);
//     if (diffInHours < 24) {
//       return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
//     }

//     const diffInDays = Math.floor(diffInHours / 24);
//     if (diffInDays < 30) {
//       return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
//     }

//     return formatDate(dateString);
//   };

//   // Filter orders based on search and status
//   const filteredOrders = orders.filter((order) => {
//     const matchesSearch =
//       order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStatus =
//       filterStatus === "All" || order.status === filterStatus;

//     return matchesSearch && matchesStatus;
//   });

//   // Handle opening order details modal
//   const handleViewOrderDetails = (order) => {
//     setSelectedOrder(order);
//     setIsOrderDetailsModalOpen(true);
//   };

//   // Handle opening update status modal
//   const handleOpenUpdateStatusModal = (order) => {
//     setSelectedOrder(order);
//     setNewStatus(order.status);
//     setIsUpdateStatusModalOpen(true);
//   };

//   // Update order status
//   const handleUpdateStatus = () => {
//     const updatedOrders = orders.map((order) =>
//       order.id === selectedOrder.id ? { ...order, status: newStatus } : order
//     );
//     setOrders(updatedOrders);
//     setIsUpdateStatusModalOpen(false);
//   };

//   // Get status badge color
//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case "Pending":
//         return "bg-yellow-900 text-yellow-200";
//       case "Processing":
//         return "bg-blue-900 text-blue-200";
//       case "Shipped":
//         return "bg-purple-900 text-purple-200";
//       case "Delivered":
//         return "bg-green-900 text-green-200";
//       case "Cancelled":
//         return "bg-red-900 text-red-200";
//       default:
//         return "bg-gray-700 text-gray-200";
//     }
//   };

//   // Get status icon
//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "Pending":
//         return <Clock className="h-4 w-4" />;
//       case "Processing":
//         return <RefreshCw className="h-4 w-4" />;
//       case "Shipped":
//         return <Truck className="h-4 w-4" />;
//       case "Delivered":
//         return <CheckCircle className="h-4 w-4" />;
//       case "Cancelled":
//         return <XCircle className="h-4 w-4" />;
//       default:
//         return <AlertCircle className="h-4 w-4" />;
//     }
//   };

//   return (
//     <div className="px-4 py-6 sm:px-6 lg:px-8 bg-black min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-white">Order Management</h1>
//             <p className="mt-1 text-sm text-gray-400">
//               View and manage customer orders
//             </p>
//           </div>
//           <div className="mt-4 md:mt-0">
//             <button className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors">
//               Export Orders
//             </button>
//           </div>
//         </div>

//         {/* Filters and Search */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
//           <div className="relative flex-1 max-w-md">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
//               placeholder="Search orders by ID or customer..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <div className="flex items-center">
//                 <Filter className="h-5 w-5 text-gray-400 mr-2" />
//                 <select
//                   className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                 >
//                   {statuses.map((status) => (
//                     <option key={status} value={status}>
//                       {status}
//                     </option>
//                   ))}
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
//                   <ChevronDown className="h-4 w-4" />
//                 </div>
//               </div>
//             </div>

//             <button
//               className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
//               onClick={() => {
//                 setSearchTerm("");
//                 setFilterStatus("All");
//               }}
//             >
//               Reset
//             </button>
//           </div>
//         </div>

//         {/* Orders Table */}
//         <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
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
//                     Items
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                     Total
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-800">
//                 {filteredOrders.length > 0 ? (
//                   filteredOrders.map((order) => (
//                     <tr
//                       key={order.id}
//                       className="hover:bg-gray-800 transition-colors"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
//                         {order.id}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-white">
//                           {order.customer.name}
//                         </div>
//                         <div className="text-sm text-gray-400">
//                           {order.customer.email}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-white">
//                           {formatDate(order.date)}
//                         </div>
//                         <div className="text-sm text-gray-400">
//                           {getTimeAgo(order.date)}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                         {order.items.length}{" "}
//                         {order.items.length === 1 ? "item" : "items"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
//                         ${order.total.toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
//                             order.status
//                           )}`}
//                         >
//                           {getStatusIcon(order.status)}
//                           <span className="ml-1">{order.status}</span>
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <button
//                           onClick={() => handleViewOrderDetails(order)}
//                           className="text-gray-400 hover:text-white mr-3"
//                         >
//                           <Eye className="h-5 w-5" />
//                         </button>
//                         <button
//                           onClick={() => handleOpenUpdateStatusModal(order)}
//                           className="text-gray-400 hover:text-white"
//                         >
//                           <RefreshCw className="h-5 w-5" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="7"
//                       className="px-6 py-4 text-center text-gray-400"
//                     >
//                       No orders found matching your criteria
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Order Details Modal */}
//       {isOrderDetailsModalOpen && selectedOrder && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <div
//               className="fixed inset-0 transition-opacity"
//               aria-hidden="true"
//             >
//               <div className="absolute inset-0 bg-black opacity-75"></div>
//             </div>

//             <span
//               className="hidden sm:inline-block sm:align-middle sm:h-screen"
//               aria-hidden="true"
//             >
//               &#8203;
//             </span>

//             <div className="inline-block align-bottom bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
//               <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg leading-6 font-medium text-white flex items-center">
//                     Order Details
//                     <span
//                       className={`ml-2 px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
//                         selectedOrder.status
//                       )}`}
//                     >
//                       {getStatusIcon(selectedOrder.status)}
//                       <span className="ml-1">{selectedOrder.status}</span>
//                     </span>
//                   </h3>
//                   <button
//                     onClick={() => setIsOrderDetailsModalOpen(false)}
//                     className="text-gray-400 hover:text-white"
//                   >
//                     <X className="h-6 w-6" />
//                   </button>
//                 </div>

//                 <div className="mt-2 max-h-[70vh] overflow-y-auto pr-2">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Order Information */}
//                     <div className="bg-gray-800 p-4 rounded-lg">
//                       <h4 className="text-white font-medium mb-4">
//                         Order Information
//                       </h4>
//                       <div className="space-y-2">
//                         <div className="flex justify-between">
//                           <span className="text-gray-400">Order ID:</span>
//                           <span className="text-white font-medium">
//                             {selectedOrder.id}
//                           </span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-400">Date:</span>
//                           <span className="text-white">
//                             {formatDate(selectedOrder.date)}
//                           </span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-400">Payment Method:</span>
//                           <span className="text-white">
//                             {selectedOrder.paymentMethod}
//                           </span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-400">
//                             Shipping Method:
//                           </span>
//                           <span className="text-white">
//                             {selectedOrder.shippingMethod}
//                           </span>
//                         </div>
//                         {selectedOrder.trackingNumber && (
//                           <div className="flex justify-between">
//                             <span className="text-gray-400">
//                               Tracking Number:
//                             </span>
//                             <span className="text-white">
//                               {selectedOrder.trackingNumber}
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Customer Information */}
//                     <div className="bg-gray-800 p-4 rounded-lg">
//                       <h4 className="text-white font-medium mb-4">
//                         Customer Information
//                       </h4>
//                       <div className="space-y-2">
//                         <div className="flex justify-between">
//                           <span className="text-gray-400">Name:</span>
//                           <span className="text-white">
//                             {selectedOrder.customer.name}
//                           </span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-400">Email:</span>
//                           <span className="text-white">
//                             {selectedOrder.customer.email}
//                           </span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-400">Phone:</span>
//                           <span className="text-white">
//                             {selectedOrder.customer.phone}
//                           </span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-400">Address:</span>
//                           <span className="text-white text-right">
//                             {selectedOrder.customer.address}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Order Items */}
//                   <div className="mt-6 bg-gray-800 p-4 rounded-lg">
//                     <h4 className="text-white font-medium mb-4">Order Items</h4>
//                     <div className="overflow-x-auto">
//                       <table className="min-w-full divide-y divide-gray-700">
//                         <thead>
//                           <tr>
//                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                               Product
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                               Price
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                               Quantity
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                               Total
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-700">
//                           {selectedOrder.items.map((item) => (
//                             <tr key={item.id}>
//                               <td className="px-4 py-3 whitespace-nowrap">
//                                 <div className="flex items-center">
//                                   <div className="h-10 w-10 flex-shrink-0 rounded bg-gray-700">
//                                     <img
//                                       src={item.image || "/placeholder.svg"}
//                                       alt={item.name}
//                                       className="h-10 w-10 object-cover rounded"
//                                     />
//                                   </div>
//                                   <div className="ml-4">
//                                     <div className="text-sm font-medium text-white">
//                                       {item.name}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </td>
//                               <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                 ${item.price.toFixed(2)}
//                               </td>
//                               <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                 {item.quantity}
//                               </td>
//                               <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
//                                 ${(item.price * item.quantity).toFixed(2)}
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                         <tfoot>
//                           <tr>
//                             <td
//                               colSpan="3"
//                               className="px-4 py-3 text-right text-sm font-medium text-gray-400"
//                             >
//                               Subtotal:
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
//                               ${selectedOrder.total.toFixed(2)}
//                             </td>
//                           </tr>
//                           <tr>
//                             <td
//                               colSpan="3"
//                               className="px-4 py-3 text-right text-sm font-medium text-gray-400"
//                             >
//                               Shipping:
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
//                               $0.00
//                             </td>
//                           </tr>
//                           <tr>
//                             <td
//                               colSpan="3"
//                               className="px-4 py-3 text-right text-sm font-bold text-gray-300"
//                             >
//                               Total:
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-white">
//                               ${selectedOrder.total.toFixed(2)}
//                             </td>
//                           </tr>
//                         </tfoot>
//                       </table>
//                     </div>
//                   </div>

//                   {/* Notes */}
//                   {selectedOrder.notes && (
//                     <div className="mt-6 bg-gray-800 p-4 rounded-lg">
//                       <h4 className="text-white font-medium mb-2">Notes</h4>
//                       <p className="text-gray-300 text-sm">
//                         {selectedOrder.notes}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setIsOrderDetailsModalOpen(false);
//                     handleOpenUpdateStatusModal(selectedOrder);
//                   }}
//                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white sm:ml-3 sm:w-auto sm:text-sm"
//                 >
//                   Update Status
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setIsOrderDetailsModalOpen(false)}
//                   className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-700 shadow-sm px-4 py-2 bg-gray-900 text-base font-medium text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Update Status Modal */}
//       {isUpdateStatusModalOpen && selectedOrder && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <div
//               className="fixed inset-0 transition-opacity"
//               aria-hidden="true"
//             >
//               <div className="absolute inset-0 bg-black opacity-75"></div>
//             </div>

//             <span
//               className="hidden sm:inline-block sm:align-middle sm:h-screen"
//               aria-hidden="true"
//             >
//               &#8203;
//             </span>

//             <div className="inline-block align-bottom bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//               <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg leading-6 font-medium text-white">
//                     Update Order Status
//                   </h3>
//                   <button
//                     onClick={() => setIsUpdateStatusModalOpen(false)}
//                     className="text-gray-400 hover:text-white"
//                   >
//                     <X className="h-6 w-6" />
//                   </button>
//                 </div>

//                 <div className="mt-2">
//                   <p className="text-sm text-gray-300 mb-4">
//                     Update the status for order{" "}
//                     <span className="font-medium text-white">
//                       {selectedOrder.id}
//                     </span>
//                   </p>

//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-400 mb-1">
//                         Current Status
//                       </label>
//                       <div
//                         className={`px-3 py-2 rounded-lg ${getStatusBadgeClass(
//                           selectedOrder.status
//                         )} inline-flex items-center`}
//                       >
//                         {getStatusIcon(selectedOrder.status)}
//                         <span className="ml-1">{selectedOrder.status}</span>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-400 mb-1">
//                         New Status
//                       </label>
//                       <select
//                         value={newStatus}
//                         onChange={(e) => setNewStatus(e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
//                       >
//                         <option value="Pending">Pending</option>
//                         <option value="Processing">Processing</option>
//                         <option value="Shipped">Shipped</option>
//                         <option value="Delivered">Delivered</option>
//                         <option value="Cancelled">Cancelled</option>
//                       </select>
//                     </div>

//                     {newStatus === "Shipped" && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-400 mb-1">
//                           Tracking Number
//                         </label>
//                         <input
//                           type="text"
//                           className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
//                           placeholder="Enter tracking number"
//                         />
//                       </div>
//                     )}

//                     {newStatus === "Cancelled" && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-400 mb-1">
//                           Cancellation Reason
//                         </label>
//                         <select className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent">
//                           <option value="Customer Request">
//                             Customer Request
//                           </option>
//                           <option value="Out of Stock">Out of Stock</option>
//                           <option value="Payment Issue">Payment Issue</option>
//                           <option value="Duplicate Order">
//                             Duplicate Order
//                           </option>
//                           <option value="Other">Other</option>
//                         </select>
//                       </div>
//                     )}

//                     <div>
//                       <label className="block text-sm font-medium text-gray-400 mb-1">
//                         Notes (Optional)
//                       </label>
//                       <textarea
//                         rows="3"
//                         className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
//                         placeholder="Add notes about this status change"
//                       ></textarea>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                 <button
//                   type="button"
//                   onClick={handleUpdateStatus}
//                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white sm:ml-3 sm:w-auto sm:text-sm"
//                 >
//                   Update Status
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setIsUpdateStatusModalOpen(false)}
//                   className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-700 shadow-sm px-4 py-2 bg-gray-900 text-base font-medium text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderManagement;
