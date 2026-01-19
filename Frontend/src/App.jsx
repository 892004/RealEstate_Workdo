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
import ProductDetail from "./pages/ProductDetail";
import Compare from "./pages/Compare";
import Cart from "./pages/Cart";
import Aboutus from "./pages/Aboutus";
import Contactus from "./pages/Contactus";
import Faq from "./pages/Faq";
import Policy from "./pages/Policy";
import TermsCondition from "./pages/TermsCondition";
import ShippingDelivery from "./pages/ShippingDelivery";
import Blog from "./pages/Blog";
import Article from "./components/RealestateHeroSection/Article";
import CheckOut from "./pages/CheckOut";
import NonavLayout from "./NonavLayout";
import ProductInfo from "./pages/ProductInfo";

export default function App() {
  return (
    <Routes>
      {/* 🌐 PUBLIC ROUTES */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/signup" element={<Signup />} />
        <Route path="/admin/forgot-pass" element={<ForgotPass />} />
        <Route
          path="/productlist"
          element={<Navigate to="/admin/products" />}
        />
        <Route path="/blog/:slug" element={<RealEstatePage />} />
        <Route path="/collection/:collection" element={<CollectionPage />} />
        <Route path="/pages/compare" element={<Compare />} />
        <Route path="/pages/cart" element={<Cart />} />
        <Route path="/pages/Aboutus" element={<Aboutus />} />
        <Route path="/pages/Contactus" element={<Contactus />} />
        <Route path="/pages/Faq" element={<Faq />} />
        <Route path="/pages/Policy" element={<Policy />} />
        <Route path="/pages/Shipping-Delivery" element={<ShippingDelivery />} />
        <Route path="/pages/terms-condition" element={<TermsCondition />} />
        <Route path="/pages/wishlist" element={<Wishlist />} />
        <Route path="/pages/blog" element={<Blog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product-info/:id" element={<ProductInfo />} />
      </Route>

      {/* No nav layout */}
      <Route element={<NonavLayout />}>
        <Route path="/pages/Checkout" element={<CheckOut />} />
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
    </Routes>
  );
}
