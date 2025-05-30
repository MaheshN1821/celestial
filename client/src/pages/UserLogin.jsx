import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const UserLogin = () => {
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
        "http://localhost:3000/auth/user/login",
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response);
      if (response.status === 200) {
        sessionStorage.setItem("userId", response.data.info._id);
        sessionStorage.setItem("accToken", response.data.accessToken);
        sessionStorage.setItem("firstName", response.data.info.firstName);
        sessionStorage.setItem("lastName", response.data.info.lastName);
        Navigate("/");
      }
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const loginOptions = {
    email: {
      required: "Email is required",
      message: "Invalid E-mail or Password!",
    },
    password: {
      required: "Password is required",
      message: "Invalid E-mail or Password!",
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
              Welcome Back, User
            </h1>
            <p className="text-gray-300">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("email", loginOptions.email)}
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
                  {...register("password", loginOptions.password)}
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
                {errors.password && (
                  <span className="">{errors.password.message}</span>
                )}
              </div>
              {/* <div className="mt-2 text-right">
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Forgot password?
                </a>
              </div> */}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-white text-black font-medium rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-lg hover:shadow-white/10"
            >
              Sign In
            </button>
          </form>

          {/* Link to Register */}
          <div className="mt-8 text-center">
            <p className="text-gray-300">
              Don't have an account?
              <a
                onClick={() => Navigate("/auth/user/register")}
                className="ml-1 text-white font-medium hover:underline focus:outline-none"
              >
                Sign up
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

export default UserLogin;
