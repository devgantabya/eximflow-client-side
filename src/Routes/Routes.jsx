import { createBrowserRouter } from "react-router";
import Root from "./../Layout/Root";
import Home from "./../Pages/Home";
import Register from "./../Auth/Register";
import Login from "./../Auth/Login";
import AllProducts from "../Pages/AllProducts/AllProducts";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import MyExports from "../Pages/MyExports/MyExports";
import MyImports from "../Pages/MyImports/MyImports";
import AddExport from "../Pages/AddExport/AddExport";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
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
        path: "allProducts/:id",
        Component: ProductDetails,
      },
      {
        path: "myExports",
        Component: MyExports,
      },
      {
        path: "myImports",
        Component: MyImports,
      },
      {
        path: "addExport",
        Component: AddExport,
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
