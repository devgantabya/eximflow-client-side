import { createBrowserRouter } from "react-router";
import Root from "./../Layout/Root";
import Home from "./../Pages/Home";
import Register from "./../Auth/Register";
import Login from "./../Auth/Login";
import AllProducts from "../Pages/AllProducts/AllProducts";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import MyExports from "../Pages/MyExports/MyExports";
import MyImports from "../Pages/MyImports/MyImports";
import AddProduct from "../Pages/AddProduct/AddProduct";
import PrivateRoutes from "./PrivateRoutes";
import NotFound from "./../Pages/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "allProducts",
        Component: AllProducts,
      },
      {
        path: "productDetails/:id",
        loader: async ({ params }) => {
          const res = await fetch(
            `https://eximflow-api-server.vercel.app/products/${params.id}`
          );

          if (!res.ok) return null;

          const product = await res.json();

          return product || null;
        },

        Component: ProductDetails,
      },
      {
        path: "myExports",
        element: (
          <PrivateRoutes>
            <MyExports></MyExports>
          </PrivateRoutes>
        ),
      },
      {
        path: "myImports",
        element: (
          <PrivateRoutes>
            <MyImports></MyImports>
          </PrivateRoutes>
        ),
      },
      {
        path: "addProduct",
        element: (
          <PrivateRoutes>
            <AddProduct></AddProduct>
          </PrivateRoutes>
        ),
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
]);
