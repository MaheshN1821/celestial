import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Building,
  CreditCard,
  MapPin,
  FileText,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SellerOnboardPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const Navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      // Personal Details
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",

      // Business Details
      businessName: "",
      businessType: "",
      gstNumber: "",
      panNumber: "",
      businessCategory: "Electronics",

      // Address Details
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",

      // Bank Details
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      accountHolderName: "",

      // Documents
      panCard: null,
      gstCertificate: null,
      bankStatement: null,
      businessLicense: null,
    },
  });

  const validateStep = async (step) => {
    let fieldsToValidate = [];

    switch (step) {
      case 1:
        fieldsToValidate = ["firstName", "lastName", "email", "phone"];
        break;
      case 2:
        fieldsToValidate = ["businessName", "gstNumber", "panNumber"];
        break;
      case 3:
        fieldsToValidate = ["addressLine1", "city", "state", "pincode"];
        break;
      case 4:
        fieldsToValidate = ["bankName", "accountNumber", "ifscCode"];
        break;
      default:
        return true;
    }

    const result = await trigger(fieldsToValidate);
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/seller/onboard",
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 201) {
        setIsSubmitted(true);
        setCurrentStep(5);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const steps = [
    { number: 1, title: "Personal Details", icon: User },
    { number: 2, title: "Business Details", icon: Building },
    { number: 3, title: "Address Details", icon: MapPin },
    { number: 4, title: "Bank Details", icon: CreditCard },
    { number: 5, title: "Documents", icon: FileText },
  ];

  const businessTypes = [
    "Sole Proprietorship",
    "Partnership",
    "Private Limited Company",
    "Public Limited Company",
    "LLP",
  ];

  const businessCategories = ["Electronics"];

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  // Validation rules
  const validationRules = {
    firstName: {
      required: "First name is required",
      minLength: {
        value: 2,
        message: "First name must be at least 2 characters",
      },
    },
    lastName: {
      required: "Last name is required",
      minLength: {
        value: 2,
        message: "Last name must be at least 2 characters",
      },
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
    phone: {
      required: "Phone number is required",
      pattern: {
        value: /^[6-9]\d{9}$/,
        message: "Invalid phone number (10 digits starting with 6-9)",
      },
    },
    businessName: {
      required: "Business name is required",
      minLength: {
        value: 3,
        message: "Business name must be at least 3 characters",
      },
    },
    gstNumber: {
      required: "GST number is required",
      pattern: {
        value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
        message: "Invalid GST number format",
      },
    },
    panNumber: {
      required: "PAN number is required",
      pattern: {
        value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
        message: "Invalid PAN number format",
      },
    },
    addressLine1: {
      required: "Address is required",
      minLength: {
        value: 10,
        message: "Address must be at least 10 characters",
      },
    },
    city: {
      required: "City is required",
      minLength: {
        value: 2,
        message: "City must be at least 2 characters",
      },
    },
    state: {
      required: "State is required",
    },
    pincode: {
      required: "Pincode is required",
      pattern: {
        value: /^[1-9][0-9]{5}$/,
        message: "Invalid pincode format",
      },
    },
    bankName: {
      required: "Bank name is required",
    },
    accountNumber: {
      required: "Account number is required",
      pattern: {
        value: /^[0-9]{9,18}$/,
        message: "Account number must be 9-18 digits",
      },
    },
    ifscCode: {
      required: "IFSC code is required",
      pattern: {
        value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
        message: "Invalid IFSC code format",
      },
    },
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Personal Information
              </h2>
              <p className="text-zinc-400">
                Let's start with your basic details
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  {...register("firstName", validationRules.firstName)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  {...register("lastName", validationRules.lastName)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register("email", validationRules.email)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  {...register("phone", validationRules.phone)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-white text-sm font-medium mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  {...register("dateOfBirth")}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Business Information
              </h2>
              <p className="text-zinc-400">Tell us about your business</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-white text-sm font-medium mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  {...register("businessName", validationRules.businessName)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your business name"
                />
                {errors.businessName && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.businessName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Business Type
                </label>
                <select
                  {...register("businessType")}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                >
                  <option value="" className="bg-zinc-800">
                    Select business type
                  </option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type} className="bg-zinc-800">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Business Category
                </label>
                <select
                  {...register("businessCategory")}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                >
                  {businessCategories.map((category) => (
                    <option
                      key={category}
                      value={category}
                      className="bg-zinc-800"
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  GST Number *
                </label>
                <input
                  type="text"
                  {...register("gstNumber", validationRules.gstNumber)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  placeholder="22AAAAA0000A1Z5"
                />
                {errors.gstNumber && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.gstNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  PAN Number *
                </label>
                <input
                  type="text"
                  {...register("panNumber", validationRules.panNumber)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  placeholder="ABCDE1234F"
                />
                {errors.panNumber && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.panNumber.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Address Details
              </h2>
              <p className="text-zinc-400">Where is your business located?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-white text-sm font-medium mb-2">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  {...register("addressLine1", validationRules.addressLine1)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your address"
                />
                {errors.addressLine1 && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.addressLine1.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-white text-sm font-medium mb-2">
                  Address Line 2
                </label>
                <input
                  type="text"
                  {...register("addressLine2")}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  placeholder="Apartment, suite, etc. (optional)"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  City *
                </label>
                <input
                  type="text"
                  {...register("city", validationRules.city)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  State *
                </label>
                <select
                  {...register("state", validationRules.state)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                >
                  <option value="" className="bg-zinc-800">
                    Select state
                  </option>
                  {states.map((state) => (
                    <option key={state} value={state} className="bg-zinc-800">
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.state.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  {...register("pincode", validationRules.pincode)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter pincode"
                />
                {errors.pincode && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.pincode.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Country
                </label>
                <input
                  type="text"
                  {...register("country")}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  placeholder="Country"
                  readOnly
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Bank Details
              </h2>
              <p className="text-zinc-400">
                Add your bank account for payments
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-white text-sm font-medium mb-2">
                  Bank Name *
                </label>
                <input
                  type="text"
                  {...register("bankName", validationRules.bankName)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter bank name"
                />
                {errors.bankName && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.bankName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Account Number *
                </label>
                <input
                  type="text"
                  {...register("accountNumber", validationRules.accountNumber)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter account number"
                />
                {errors.accountNumber && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.accountNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  IFSC Code *
                </label>
                <input
                  type="text"
                  {...register("ifscCode", validationRules.ifscCode)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  placeholder="SBIN0001234"
                />
                {errors.ifscCode && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.ifscCode.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-white text-sm font-medium mb-2">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  {...register("accountHolderName")}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter account holder name"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Registration Complete!
              </h2>
              <p className="text-zinc-400">
                Your seller account has been created successfully
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-4">
                What's Next?
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-zinc-300">
                    Your account will be reviewed within 24-48 hours
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-zinc-300">
                    You'll receive an email confirmation once approved
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-zinc-300">
                    Start adding your products and begin selling
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center" onClick={() => Navigate("/seller")}>
              <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-zinc-200 transition-all duration-200 transform hover:scale-105">
                Go to Dashboard
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-black" />
              </div> */}
              <span className="text-2xl font-bold text-white">Celestial</span>
            </div>
            <div className="text-zinc-400 max-w-fit">
              Need help?{" "}
              <div className="text-white cursor-pointer hover:underline">
                Contact Support
              </div>
            </div>
          </div>
        </header>

        {/* Progress Steps */}
        <div className="px-6 mb-8 overflow-x-auto whitespace-nowrap sm:overflow-visible">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 backdrop-blur-sm transition-all duration-300 ${
                      currentStep >= step.number
                        ? "bg-white text-black border-white"
                        : "bg-white/10 text-white border-white/30"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                        currentStep > step.number ? "bg-white" : "bg-white/20"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              {steps.map((step) => (
                <div key={step.number} className="text-center mx-4 sm:mx-0">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.number
                        ? "text-white"
                        : "text-zinc-500"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-6 pb-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                {renderStepContent()}

                {/* Navigation Buttons */}
                {currentStep < 5 && (
                  <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                        currentStep === 1
                          ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                          : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                      }`}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    <button
                      type={currentStep === 4 ? "submit" : "button"}
                      onClick={currentStep === 4 ? undefined : nextStep}
                      className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-zinc-200 transition-all duration-200 transform hover:scale-105"
                    >
                      <span>
                        {currentStep === 4 ? "Complete Registration" : "Next"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOnboardPage;
