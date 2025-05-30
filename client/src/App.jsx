import "./App.css";
import ProductsCatalog from "./components/ProductsCatalog";
import CartPage from "./pages/CartPage";
import LandingPage from "./pages/LandingPage";
import LoginRegister from "./pages/loginRegister";
import OrderManagement from "./pages/OrderManagement";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Seller from "./pages/Seller";
import SellerHome from "./pages/SellerHome";
import SellerLogin from "./pages/SellerLogin";
import SellerOnboardPage from "./pages/SellerOnboardPage";
import SellerOrder from "./pages/SellerOrder";
import SellerProducts from "./pages/SellerProducts";
import SellerRegister from "./pages/SellerRegister";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import WishlistPage from "./pages/WishlistPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/auth/user/login" element={<UserLogin />} />
      <Route path="/auth/seller/login" element={<SellerLogin />} />
      <Route path="/auth/user/register" element={<UserRegister />} />
      <Route path="/auth/seller/register" element={<SellerRegister />} />
      <Route path="/user/cart" element={<CartPage />} />
      <Route path="/user/wishlist" element={<WishlistPage />} />
      <Route path="/seller" element={<Seller />} />
      <Route path="/seller/products" element={<SellerProducts />} />
      <Route path="/seller/orders" element={<SellerOrder />} />
      <Route path="/user/order-tracking" element={<OrderTrackingPage />} />
      <Route path="/user/products-catalog" element={<ProductsCatalog />} />
      <Route path="/user/product-details" element={<ProductDetailsPage />} />
      <Route path="/seller-home" element={<SellerHome />} />
      <Route path="/seller-onboard" element={<SellerOnboardPage />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
