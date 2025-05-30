import "../index.css";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProductManagement from "./ProductManagement";

function SellerProducts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-black">
            <ProductManagement />
          </main>
        </div>
      </div>
    </>
  );
}

export default SellerProducts;
