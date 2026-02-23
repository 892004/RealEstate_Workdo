import React, { useState, useEffect } from 'react'
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import '../components/Checkout/cheackout.css'
import Footer from '../components/Footer/Footer';

const CheckOut = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    phone: '',
    saveInfo: false,
    shippingMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    savePayment: false
  });

  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(10);
  const [total, setTotal] = useState(0);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const loadCartItems = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
          
          // Calculate subtotal
          const calculatedSubtotal = parsedCart.reduce((sum, item) => {
            return sum + (item.price * item.qty);
          }, 0);
          setSubtotal(calculatedSubtotal);
          
          // Calculate total
          setTotal(calculatedSubtotal + shipping);
        } catch (error) {
          console.error('Error parsing cart data:', error);
          setCartItems([]);
        }
      }
    };

    loadCartItems();

    // Listen for cart changes
    const handleStorageChange = () => {
      loadCartItems();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleStorageChange);
    };
  }, [shipping]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <section className="cheackout min-h-screen w-full bg-gray-50">
        <div className="nav h-16 w-full bg-white border-b border-gray-200 flex items-center justify-between px-8">
            <Link to='/' className="text-xl font-semibold text-gray-800">
                Modernrealestate WorkDo
            </Link>
            <Link to='/pages/cart' className="text-2xl text-blue-500 cursor-pointer">
                <HiOutlineShoppingBag />
            </Link>
        </div>

        <div className="content flex flex-col lg:flex-row min-h-screen px-40">
            {/* Left Section - Form */}
            <div className="left-section w-full lg:w-1/2 bg-white p-6 lg:p-8">
                {/* Contact Information */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
                        <Link to='/admin/login' className="text-blue-600 hover:underline text-sm">
                            Sign in
                        </Link>
                    </div>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email or mobile phone number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="flex items-center mt-3 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            name="emailOffers"
                            checked={formData.emailOffers}
                            onChange={handleChange}
                            className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        Email me with news and offers
                    </label>
                </div>

                {/* Delivery */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First name"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last name"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>


                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />

                    <input
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleChange}
                        placeholder="Apartment, suite, etc. (optional)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            placeholder="Postal code"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />

                    <label className="flex items-center text-sm text-gray-600">
                        <input
                            type="checkbox"
                            name="saveInfo"
                            checked={formData.saveInfo}
                            onChange={handleChange}
                            className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        Save this information for next time
                    </label>
                </div>

                {/* Shipping Method */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping method</h2>
                    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                        <label className="flex items-center justify-between cursor-pointer">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="shippingMethod"
                                    value="standard"
                                    checked={formData.shippingMethod === 'standard'}
                                    onChange={handleChange}
                                    className="mr-3 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <div>
                                    <div className="font-medium text-gray-900">Standard</div>
                                </div>
                            </div>
                            <span className="font-medium text-gray-900">FREE</span>
                        </label>
                    </div>
                </div>

                {/* Payment */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment</h2>
                    
                    <div className="flex items-center mb-4 text-sm text-gray-600">
                        <FaLock className="mr-2" />
                        All transactions are secure and encrypted
                    </div>

                    <div className="space-y-3 mb-6">
                        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="card"
                                checked={formData.paymentMethod === 'card'}
                                onChange={handleChange}
                                className="mr-3 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span>Credit card</span>
                        </label>
                    </div>

                    {formData.paymentMethod === 'card' && (
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                placeholder="Card number"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            
                            <input
                                type="text"
                                name="cardName"
                                value={formData.cardName}
                                onChange={handleChange}
                                placeholder="Name on card"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="cardExpiry"
                                    value={formData.cardExpiry}
                                    onChange={handleChange}
                                    placeholder="MM / YY"
                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    name="cardCvv"
                                    value={formData.cardCvv}
                                    onChange={handleChange}
                                    placeholder="CVV"
                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    )}

                    <label className="flex items-center mt-4 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            name="savePayment"
                            checked={formData.savePayment}
                            onChange={handleChange}
                            className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        Save payment information for next time
                    </label>
                </div>

                {/* Place Order Button */}
                <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer ">
                    Pay now
                </button>
            </div>

            {/* Right Section - Order Summary */}
            <div className="right-section w-full lg:w-1/2 bg-[#F5F5F5] p-6 lg:p-8">
                <div className=" rounded-lg p-6">
                    {/* Order Items */}
                    <div className="space-y-4 mb-6">
                        {cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <div key={`${item.productId}-${item.variantId}`} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                                            {item.image ? (
                                                <img 
                                                    src={item.image} 
                                                    alt={item.title || 'Product'} 
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                                    <span className="text-gray-500 text-xs">No Image</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">{item.title || 'Product Name'}</h3>
                                            <p className="text-sm text-gray-600">
                                                {item.variantId ? `Variant: ${item.variantId}` : 'Size: Standard'}
                                            </p>
                                            <p className="text-sm text-gray-600">Qty: {item.qty || 1}</p>
                                        </div>
                                    </div>
                                    <span className="font-medium text-gray-900">
                                        ₹{((item.price || 0) * (item.qty || 1)).toFixed(2)}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">Your cart is empty</p>
                                <Link 
                                    to="/collection/all" 
                                    className="text-blue-600 hover:underline mt-2 inline-block"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        )}
                    </div>


                    {/* Order Total */}
                    <div className="border-t border-gray-200 pt-4 space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg text-gray-900 pt-2 border-t border-gray-200">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CheckOut