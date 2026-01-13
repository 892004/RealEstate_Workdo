  import React, { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
  import Footer from "../components/Footer/Footer";

  const Cart = () => {
    const [cart, setCart] = useState([]);
    const [subTotal, setSubTotal] = useState(0);

    useEffect(() => {
      const getCart = () => {
        const data = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(data);
        
        // Calculate subtotal
        const total = data.reduce((sum, item) => {
          return sum + (item.price * item.quantity);
        }, 0);
        setSubTotal(total);
      };

      // Initial load
      getCart();

      // Listen for cart updates
      window.addEventListener("cartUpdated", getCart);
      window.addEventListener("storage", getCart);

      return () => {
        window.removeEventListener("cartUpdated", getCart);
        window.removeEventListener("storage", getCart);
      };
    }, []);

    const updateQuantity = (id, newQuantity) => {
      if (newQuantity < 1) return;
      
      const updatedCart = cart.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cartUpdated"));
    };

    const removeFromCart = (id) => {
      const updatedCart = cart.filter(item => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cartUpdated"));
    };

    return (
      <>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl mb-4">Your cart is empty</h2>
              <Link 
                to="/collection/best-seller" 
                className="bg-black text-white px-6 py-3 rounded inline-block"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  {cart.map((item) => (
                    <div key={`${item.productId}-${item.variantId}`} className="border-b pb-4 mb-4 last:border-b-0">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded"
                        />
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <p className="text-gray-600">
                            {item.size && `Size: ${item.size}`}
                            {item.variant && ` • ${item.variant}`}
                          </p>
                          <p className="text-xl font-bold mt-2">Rs. {item.price.toLocaleString()}</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => updateQuantity(item.productId, item.variantId, item.qty - 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                          >
                            <FaMinus size={12} />
                          </button>
                          
                          <span className="w-12 text-center">{item.qty}</span>
                          
                          <button 
                            onClick={() => updateQuantity(item.productId, item.variantId, item.qty + 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.productId, item.variantId)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="flex justify-between mb-4">
                    <span>Subtotal</span>
                    <span className="font-semibold">Rs. {subTotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between mb-4">
                    <span>Shipping</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  
                  <div className="flex justify-between mb-6 text-lg font-bold">
                    <span>Total</span>
                    <span>Rs. {subTotal.toLocaleString()}</span>
                  </div>
                  
                  <button className="w-full bg-black text-white py-3 rounded mb-3 hover:bg-gray-800">
                    Proceed to Checkout
                  </button>
                  
                  <Link 
                    to="/collection/best-seller"
                    className="block w-full text-center py-3 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </>
    );
  };

  export default Cart;
