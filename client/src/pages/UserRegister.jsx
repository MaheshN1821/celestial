import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserRegister = () => {
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/user/register",
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      response.status === 201 ? Navigate("/auth/user/login") : "";
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const registerOptions = {
    firstName: {
      required: "* First Name is required",
      maxLength: { value: 15, message: "Maximum length is 15" },
    },
    lastName: {
      required: "* Last Name is required",
      maxLength: { value: 10, message: "Maximum length is 10" },
    },
    email: {
      required: "* Email is required",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        message: "Invalid email address",
      },
    },
    password: {
      required: "* Password is required",
      validate: {
        hasUppercase: (value) =>
          /[A-Z]/.test(value) ||
          "Password must contain at least 1 uppercase letter",
        hasLowercase: (value) =>
          /[a-z]/.test(value) ||
          "Password must contain at least 1 lowercase letter",
        hasDigit: (value) =>
          /\d/.test(value) || "Password must contain at least 1 digit",
        hasSpecialChar: (value) =>
          /[@$!%*?&]/.test(value) ||
          "Password must contain at least 1 special character",
        minLength: (value) =>
          value.length >= 8 || "Password must be at least 8 characters long",
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-md">
        {/* Glassmorphism card */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-xl border border-white/20 p-8 transition-all duration-500">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h1>
            <p className="text-gray-300">Fill in your details to get started</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name fields */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-200 mb-1"
                >
                  First Name
                </label>
                <input
                  name="firstName"
                  id="firstName"
                  placeholder="John"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  {...register("firstName", registerOptions.firstName)}
                />
                {errors.firstName && (
                  <span className="mt-2">{errors.firstName.message}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-200 mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  placeholder="Doe"
                  {...register("lastName", registerOptions.lastName)}
                />
                {errors.lastName && (
                  <span className="">{errors.lastName.message}</span>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                placeholder="your@email.com"
                {...register("email", registerOptions.email)}
              />
              {errors.email && <span className="">{errors.email.message}</span>}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  placeholder="••••••••"
                  {...register("password", registerOptions.password)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="">{errors.password.message}</span>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-white text-black font-medium rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-lg hover:shadow-white/10"
            >
              Create Account
            </button>
          </form>

          {/* Link to Login */}
          <div className="mt-8 text-center">
            <p className="text-gray-300">
              Already have an account?
              <a
                className="ml-1 text-white font-medium hover:underline focus:outline-none"
                onClick={() => Navigate("/auth/user/login")}
              >
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* Decorative circle */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/20 to-white/5 rounded-full blur-md"></div>
      </div>
    </div>
  );
};

export default UserRegister;
