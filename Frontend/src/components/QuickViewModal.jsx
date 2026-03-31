import React,{ useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

const BASE_URL = "https://realestate-workdo.onrender.com";

const QuickViewModal = ({
  isOpen,
  onClose,
  product,
  variant,
  onAddToCart,
  onAddToWishlist,
  onAddToCompare,
}) => {
  // ✅ Hooks must be at top
  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(variant);


  if (!isOpen || !product) return null;

  const handleAddToWishlist = () => {
    onAddToWishlist(product, variant);
    setIsWishlisted(true);
  };

  const increaseQty = () => setQty((prev) => prev + 1);
  const decreaseQty = () => {
    if (qty > 1) setQty((prev) => prev - 1);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white relative rounded-xl max-w-4xl w-full max-h-[50vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-2xl absolute right-2 top-2 text-gray-500 hover:text-gray-700 p-2"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row p-6 gap-8">
          
          {/* Image */}
          <div className="flex-1">
            <img
              src={`${BASE_URL}${variant?.image_url}`}
              alt={product.title}
              className="w-full h-60 object-cover rounded-lg"
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#172229] mb-4">
              {product.title}
            </h1>

            <p className="mb-4 text-gray-600">
              Experience luxury living in this stunning property featuring
              modern amenities, spacious rooms, and premium finishes...
            </p>

            

            {/* Price */}
            <div className="mb-4">
              <span className="text-2xl font-semibold text-[#172229]">
                Rs. {Number(variant?.price || 0).toLocaleString()}
              </span>
            </div>

           

            {/* Actions */}
            <div className="flex flex-row gap-2">
              <button
                onClick={() => onAddToCart(product, variant, qty)}
                className="bg-[#172229] h-9 px-2 rounded-full text-white text-[14px] "
              >
                Add to Cart
                <span></span>
              </button>

               {/* Quantity */}
            <div className="flex items-center gap-3 border rounded-full w-fit px-3 py-1 mb-4">
              <span className="cursor-pointer" onClick={decreaseQty}>
                <FiMinus />
              </span>

              <span className="font-semibold">{qty}</span>

              <span className="cursor-pointer" onClick={increaseQty}>
                <FiPlus />
              </span>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
