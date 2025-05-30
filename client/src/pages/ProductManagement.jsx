import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ChevronDown,
  X,
  ImageIcon,
  Upload,
} from "lucide-react";
import axios from "axios";

const ProductManagement = () => {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  // Sample product data
  const [products, setProducts] = useState([]);
  const sellerId = sessionStorage.getItem("sellerId");
  const [update, setUpdate] = useState(0);

  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    try {
      const getData = async () => {
        const info = await axios.get(
          "http://localhost:3000/products/get-products",
          { withCredentials: true }
        );
        const data = info?.data?.prodData;
        console.log(data);

        setProducts([...data]);
      };
      getData();
    } catch (err) {
      console.log(err);
    }
  }, [update]);

  // Initial form state for adding/editing products
  const initialFormState = {
    name: "",
    brand: "",
    price: "",
    oldPrice: "",
    description: "",
    inStock: true,
    colors: [""],
    storage: [""],
    ram: [""],
    specifications: [{ name: "", value: "" }],
    features: [""],
    quantityAvailable: "",
    category: "",
    specs: "",
    featured: false,
    additionalDescription1: "",
    additionalDescription2: "",
    img: "",
    publicIds: [],
  };

  const [formData, setFormData] = useState(initialFormState);

  // Handle opening the add/edit product modal
  const handleOpenProductModal = (product = null) => {
    if (product) {
      setFormData({
        ...product,
        // Make sure arrays are properly copied
        colors: [...product.colors],
        storage: [...product.storage],
        ram: [...product.ram],
        specifications: [...product.specifications],
        features: [...product.features],
      });
      setCurrentProduct(product);
    } else {
      setFormData(initialFormState);
      setCurrentProduct(null);
    }
    setIsAddProductModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle array input changes (colors, storage, features, etc.)
  const handleArrayInputChange = (index, field, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({
      ...formData,
      [field]: updatedArray,
    });
  };

  // Add new item to an array field
  const handleAddArrayItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    });
  };

  // Remove item from an array field
  const handleRemoveArrayItem = (field, index) => {
    const updatedArray = [...formData[field]];
    updatedArray.splice(index, 1);
    setFormData({
      ...formData,
      [field]: updatedArray,
    });
  };

  // Handle specification changes
  const handleSpecificationChange = (index, key, value) => {
    const updatedSpecs = [...formData.specifications];
    updatedSpecs[index] = { ...updatedSpecs[index], [key]: value };
    setFormData({
      ...formData,
      specifications: updatedSpecs,
    });
  };

  // Add new specification
  const handleAddSpecification = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { name: "", value: "" }],
    });
  };

  // Remove specification
  const handleRemoveSpecification = (index) => {
    const updatedSpecs = [...formData.specifications];
    updatedSpecs.splice(index, 1);
    setFormData({
      ...formData,
      specifications: updatedSpecs,
    });
  };

  // Save product (add new or update existing)
  const handleSaveProduct = async () => {
    if (currentProduct) {
      // Update existing product
      try {
        const response = await axios.post(
          "http://localhost:3000/seller/update-product",
          JSON.stringify(formData),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(response);
        if (response.status === 200) {
          setUpdate(update + 1);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      // Add new product
      try {
        const data = { ...formData, sellerId: sellerId };
        data.img = data.img.split(",").map((url) => url.trim());
        const response = await axios.post(
          "http://localhost:3000/seller/add-product",
          JSON.stringify(data),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (response.status === 201) {
          setUpdate(update + 1);
        }
      } catch (err) {
        console.log(err);
      }
    }
    setIsAddProductModalOpen(false);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (productToDelete) {
      const updatedProducts = products.filter(
        (p) => p.prodId !== productToDelete.prodId
      );
      setProducts(updatedProducts);
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const handleRemoveUploadedImage = (index) => {
    const imageUrls = formData.img.split(",").map((url) => url.trim());
    const publicIds = [...formData.publicIds];

    // Remove the image URL and corresponding public ID
    imageUrls.splice(index, 1);
    publicIds.splice(index, 1);

    setFormData({
      ...formData,
      img: imageUrls.join(","),
      publicIds: publicIds,
    });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      alert("Add images first to upload");
      return;
    }

    setUploading(true);
    const uploadedUrls = [];
    const uploadedPublicIds = [];

    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "celestial");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/maheshn18/image/upload",
          formData
        );
        uploadedUrls.push(res.data.secure_url);
        uploadedPublicIds.push(res.data.public_id);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Upload failed for one or more images");
      }
    }

    setUploading(false);

    // Combine with existing images if any
    const existingUrls = formData.img
      ? formData.img.split(",").map((url) => url.trim())
      : [];
    const existingPublicIds = formData.publicIds || [];

    setFormData((prev) => ({
      ...prev,
      img: [...existingUrls, ...uploadedUrls].join(","),
      publicIds: [...existingPublicIds, ...uploadedPublicIds],
    }));

    // Clear the file input and images state
    setImages([]);
    // Reset the file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = "";
    }

    alert("Images uploaded successfully!");
  };

  // Filter products based on search and category
  const filteredProducts = products?.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "All" || product.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Stop propagation for modal content
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Product Management
            </h1>
            <p className="mt-1 text-sm text-white/70">
              Add, edit, and manage your product inventory
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => handleOpenProductModal()}
              className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center shadow-lg shadow-white/10"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Product
            </button>
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
              className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg bg-black text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent shadow-lg shadow-white/5"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                className="appearance-none block w-full px-3 py-2 border border-white/20 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent shadow-lg shadow-white/5"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white/50">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>

            <button
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors shadow-lg shadow-white/5"
              onClick={() => {
                setSearchTerm("");
                setFilterCategory("All");
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-black border border-white/10 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <tr
                      key={index + 1}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded bg-white/10">
                            {product.images && product.images.length > 0 ? (
                              <img
                                src={product.images[0] || "/placeholder.svg"}
                                alt={product.name}
                                className="h-10 w-10 object-cover rounded"
                              />
                            ) : (
                              <div className="h-10 w-10 flex items-center justify-center rounded bg-white/5">
                                <ImageIcon className="h-5 w-5 text-white/50" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              {product.name}
                            </div>
                            <div className="text-sm text-white/50">
                              {product.brand}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white/80">
                          {product.category}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">
                          ₹{product.price}
                        </div>
                        {product.oldPrice && (
                          <div className="text-sm text-white/50 line-through">
                            ₹{product.oldPrice}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white/80">
                          {product.quantityAvailable} units
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.inStock
                              ? "bg-green-900/30 text-green-400 border border-green-500/30"
                              : "bg-red-900/30 text-red-400 border border-red-500/30"
                          }`}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleOpenProductModal(product)}
                          className="text-white/70 hover:text-white mr-3 transition-colors"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => {
                            setProductToDelete(product);
                            setIsDeleteModalOpen(true);
                          }}
                          className="text-white/70 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-white/50"
                    >
                      No products found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {isAddProductModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 flex items-center justify-center"
          onClick={() => setIsAddProductModalOpen(false)}
        >
          <div
            className="relative inline-block align-bottom bg-black border border-white/20 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
            onClick={handleModalContentClick}
          >
            <div className="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-white">
                  {currentProduct ? "Edit Product" : "Add New Product"}
                </h3>
                <button
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="text-white/70 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-2 max-h-[70vh] overflow-y-auto pr-2">
                <form className="space-y-6">
                  {/* Basic Information */}
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <h4 className="text-white font-medium mb-4">
                      Basic Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">
                          Product Name*
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Ex: S22 Ultra"
                          className="w-full px-3 py-2 border border-white/20 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">
                          Brand*
                        </label>
                        <input
                          type="text"
                          name="brand"
                          value={formData.brand}
                          onChange={handleInputChange}
                          placeholder="Ex: Samsung"
                          className="w-full px-3 py-2 border border-white/20 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">
                          Category*
                        </label>
                        <input
                          type="text"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          placeholder="Ex: smartphone or tablet"
                          className="w-full px-3 py-2 border border-white/20 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">
                          Short Specs
                        </label>
                        <input
                          type="text"
                          name="specs"
                          value={formData.specs}
                          onChange={handleInputChange}
                          placeholder='Ex: 6.7" AMOLED, 8GB RAM, 256GB'
                          className="w-full px-3 py-2 border border-white/20 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Inventory */}
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <h4 className="text-white font-medium mb-4">
                      Pricing & Inventory
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">
                          Price (₹)*
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="Offer Price"
                          className="w-full px-3 py-2 border border-white/20 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">
                          Old Price (₹)
                        </label>
                        <input
                          type="number"
                          name="oldPrice"
                          value={formData.oldPrice}
                          onChange={handleInputChange}
                          placeholder="Actual Price"
                          className="w-full px-3 py-2 border border-white/20 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">
                          Quantity Available*
                        </label>
                        <input
                          type="number"
                          name="quantityAvailable"
                          value={formData.quantityAvailable}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-white/20 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="inStock"
                          checked={formData.inStock}
                          onChange={handleInputChange}
                          className="h-5 w-5 text-white accent-black/80 focus:ring-white border-white/30 rounded"
                        />
                        <span className="ml-2 text-sm text-white/80">
                          In Stock
                        </span>
                      </label>
                    </div>
                    <div className="mt-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="featured"
                          checked={formData.featured}
                          onChange={handleInputChange}
                          className="h-5 w-5 accent-black/80 text-white focus:ring-white border-white/30 rounded"
                        />
                        <span className="ml-2 text-sm text-white/80">
                          Featured Product
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <h4 className="text-white font-medium mb-4">Description</h4>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">
                        Short Description*
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Explain the product in brief"
                        className="w-full px-3 py-2 border border-white/20 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
                        required
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">
                        Additional Information*
                      </label>
                      <input
                        name="additionalDescription1"
                        value={formData.additionalDescription1}
                        onChange={handleInputChange}
                        placeholder="Explain the product in points"
                        className="w-full px-3 py-2 border border-white/20 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
                        required
                      ></input>
                      <input
                        name="additionalDescription2"
                        value={formData.additionalDescription2}
                        onChange={handleInputChange}
                        placeholder="Explain the product in points"
                        className="w-full mt-2 px-3 py-2 border border-white/20 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
                        required
                      ></input>
                    </div>
                  </div>

                  {/* Product Variants */}
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <h4 className="text-white font-medium mb-4">
                      Product Variants
                    </h4>

                    {/* Colors */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Colors
                      </label>
                      {formData.colors.map((color, index) => (
                        <div
                          key={`color-${index}`}
                          className="flex items-center mb-2"
                        >
                          <input
                            type="text"
                            value={color}
                            placeholder="Enter one color at a time"
                            onChange={(e) =>
                              handleArrayInputChange(
                                index,
                                "colors",
                                e.target.value
                              )
                            }
                            className="flex-1 px-3 py-2 border border-white/20 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveArrayItem("colors", index)
                            }
                            className="ml-2 text-white/70 hover:text-red-500"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddArrayItem("colors")}
                        className="mt-1 text-sm text-white/80 hover:text-white flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Color
                      </button>
                    </div>

                    {/* Storage */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Storage Options
                      </label>
                      {formData.storage.map((storage, index) => (
                        <div
                          key={`storage-${index}`}
                          className="flex items-center mb-2"
                        >
                          <input
                            type="text"
                            value={storage}
                            placeholder="Enter one storage option at a time"
                            onChange={(e) =>
                              handleArrayInputChange(
                                index,
                                "storage",
                                e.target.value
                              )
                            }
                            className="flex-1 px-3 py-2 border border-white/20 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveArrayItem("storage", index)
                            }
                            className="ml-2 text-white/70 hover:text-red-500"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddArrayItem("storage")}
                        className="mt-1 text-sm text-white/80 hover:text-white flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Storage Option
                      </button>
                    </div>

                    {/* RAM */}
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        RAM Options
                      </label>
                      {formData.ram.map((ram, index) => (
                        <div
                          key={`ram-${index}`}
                          className="flex items-center mb-2"
                        >
                          <input
                            type="text"
                            value={ram}
                            placeholder="Enter one value at a time"
                            onChange={(e) =>
                              handleArrayInputChange(
                                index,
                                "ram",
                                e.target.value
                              )
                            }
                            className="flex-1 px-3 py-2 border border-white/20 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveArrayItem("ram", index)}
                            className="ml-2 text-white/70 hover:text-red-500"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddArrayItem("ram")}
                        className="mt-1 text-sm text-white/80 hover:text-white flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add RAM Option
                      </button>
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <h4 className="text-white font-medium mb-4">
                      Specifications
                    </h4>
                    {formData.specifications.map((spec, index) => (
                      <div
                        key={`spec-${index}`}
                        className="flex items-center mb-2"
                      >
                        <input
                          type="text"
                          value={spec.name}
                          onChange={(e) =>
                            handleSpecificationChange(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="Name, Ex: RAM"
                          className="w-1/3 px-3 py-2 border border-white/20 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-white mr-2"
                        />
                        <input
                          type="text"
                          value={spec.value}
                          onChange={(e) =>
                            handleSpecificationChange(
                              index,
                              "value",
                              e.target.value
                            )
                          }
                          placeholder="Value, Ex: 12GB"
                          className="flex-1 px-3 py-2 border border-white/20 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSpecification(index)}
                          className="ml-2 text-white/70 hover:text-red-500"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddSpecification}
                      className="mt-1 text-sm text-white/80 hover:text-white flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Specification
                    </button>
                  </div>

                  {/* Features */}
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <h4 className="text-white font-medium mb-4">Features</h4>
                    {formData.features.map((feature, index) => (
                      <div
                        key={`feature-${index}`}
                        className="flex items-center mb-2"
                      >
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) =>
                            handleArrayInputChange(
                              index,
                              "features",
                              e.target.value
                            )
                          }
                          placeholder="Ex: Military-Grade Security"
                          className="flex-1 px-3 py-2 border border-white/20 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveArrayItem("features", index)
                          }
                          className="ml-2 text-white/70 hover:text-red-500"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddArrayItem("features")}
                      className="mt-1 text-sm text-white/80 hover:text-white flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Feature
                    </button>
                  </div>

                  {/* Images */}
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <h4 className="text-white font-medium mb-4">
                      Product Images
                    </h4>
                    <div className="flex flex-row flex-wrap mb-4">
                      {formData?.img && formData.img.length > 0
                        ? formData?.img?.map((image, index) => (
                            <div
                              key={`image-${index}`}
                              className="relative group mr-2 mb-2"
                            >
                              <img
                                src={image.trim() || "/placeholder.svg"}
                                alt={`Product ${index + 1}`}
                                className="h-24 w-24 object-cover rounded-lg border border-white/20"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveUploadedImage(index)}
                                className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))
                        : null}
                      <div className="flex flex-col gap-2">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                          className="text-sm w-[280px] text-white/50 mt-1 block file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-white/10 file:text-white/80 hover:file:bg-white/20"
                        />
                        {images.length > 0 && (
                          <p className="text-xs text-white/70">
                            {images.length} file(s) selected
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={handleUpload}
                        disabled={uploading}
                        className="m-4 ml-0 sm:m-0 border px-3 bg-zinc-500/20"
                      >
                        {uploading ? "Uploading..." : "Upload Images"}
                      </button>
                    </div>
                    <p className="text-xs text-white/50">
                      Upload product images. First image will be used as the
                      product thumbnail.
                    </p>
                  </div>
                </form>
              </div>
            </div>
            <div className="bg-white/5 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-white/10">
              <button
                type="button"
                onClick={handleSaveProduct}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white sm:ml-3 sm:w-auto sm:text-sm"
              >
                {currentProduct ? "Update Product" : "Add Product"}
              </button>
              <button
                type="button"
                onClick={() => setIsAddProductModalOpen(false)}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-white/30 shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 flex items-center justify-center"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <div
            className="relative inline-block align-bottom bg-black border border-white/20 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            onClick={handleModalContentClick}
          >
            <div className="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-900/30 sm:mx-0 sm:h-10 sm:w-10 border border-red-500/30">
                  <Trash2 className="h-6 w-6 text-red-400" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-white">
                    Delete Product
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-white/80">
                      Are you sure you want to delete "{productToDelete?.name}
                      "? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-white/10">
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-white/30 shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
