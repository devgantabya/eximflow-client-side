import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Routes";
import "./index.css";
import AuthProvider from "./contexts/AuthContext/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImportsProvider } from "./contexts/ImportsContext/ImportProvider";
import ProductsProvider from "./contexts/ProductsContext/ProductsProvider";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ImportsProvider>
      <ProductsProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </ProductsProvider>
    </ImportsProvider>
  </AuthProvider>
);
