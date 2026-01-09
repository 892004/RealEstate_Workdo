import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import ProductsList from "./pages/ProductsList";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import AddVariant from "./pages/AddVariant";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import ForgotPass from "./pages/ForgotPass";
import RealEstatePage from "./pages/RealEstatePage";
// import Footer from "./components/Footer/Footer";
import CollectionPage from "./pages/CollectionPage";
import Wishlist from "./pages/Wishlist";

export default function App() {
  return (
    <Routes>

      {/* 🌐 PUBLIC ROUTES */}
      <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/signup" element={<Signup />} />
      <Route path="/admin/forgot-pass" element={<ForgotPass />} />
      <Route path="/productlist" element={<Navigate to="/admin/products" />} />
      <Route path="/blog/:slug" element={<RealEstatePage />}/>
      <Route path="/collection/:collection" element={<CollectionPage />} />
      <Route path="/pages/wishlist" element={<Wishlist />} />

      </Route>

      {/* 🔐 ADMIN ROUTES */}
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/products" element={<ProductsList />} />
      <Route path="/admin/products/create" element={<CreateProduct />} />
      <Route path="/admin/products/:id/edit" element={<EditProduct />} />
      <Route path="/admin/products/:id/variants" element={<AddVariant />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/signup" element={<Signup />} />
      <Route path="/admin/forgot-pass" element={<ForgotPass />} />
      <Route path="/productlist" element={<Navigate to="/admin/products" />} />
      <Route path="/blog/:slug" element={<RealEstatePage />}/>
    </Routes>
  );
}
