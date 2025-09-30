import React, { useContext, useEffect, useState } from 'react';
import Title from '../component/Title';
import { shopDataContext } from '../contaxt/ShopContext';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../component/CartTotal';

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cartItem) return;

    const tempData = [];
    for (const productId in cartItem) {
      for (const size in cartItem[productId]) {
        if (cartItem[productId][size]) {
          tempData.push({
            _id: productId,
            size: size,
            quantity: cartItem[productId][size]
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className='w-[98.9vw] min-h-[100vh] px-[20px] overflow-hidden bg-white'>
      
      {/* Title */}
      <div className='h-[8%] w-full text-center mt-[80px]'>
        <Title text1={'Your'} text2={'Cart'} />
      </div>

      {/* Cart Items */}
      <div className='w-full mt-6 flex flex-col gap-6 md:gap-8'>
        {cartData.length === 0 && (
          <p className='text-center text-gray-600 text-lg mt-10'>Your cart is empty</p>
        )}

        {cartData.map((item, index) => {
          const productData = Array.isArray(products)
            ? products.find((p) => p._id === item._id)
            : null;

          if (!productData) return null;

          return (
            <div key={index} className='w-full border-t border-b py-4'>
              <div className='w-full flex items-center gap-6 bg-gray-100 py-4 px-6 rounded-2xl hover:bg-gray-200 transition-all duration-200 relative'>

                {/* Product Image */}
                <img
                  className='w-[100px] h-[100px] rounded-md object-cover'
                  src={productData.image1}
                  alt={productData.name}
                />

                {/* Product Info */}
                <div className='flex flex-col justify-center w-full h-full gap-2'>
                  <p className='text-[20px] md:text-[25px] text-black font-semibold'>
                    {productData.name}
                  </p>

                  <div className='flex items-center gap-6 flex-wrap'>
                    {/* Price */}
                    <p className='text-[18px] text-green-700 font-medium'>
                      {currency}{productData.price}
                    </p>

                    {/* Size */}
                    <p className='w-[40px] h-[40px] text-[16px] text-black bg-white rounded-md flex items-center justify-center border border-gray-300'>
                      {item.size}
                    </p>

                    {/* Quantity Input */}
                    <div className='flex items-center justify-center'>
                      <input
                        type="number"
                        min={0}
                        value={item.quantity}
                        className='w-[60px] h-[40px] px-2 py-1 text-black text-[16px] font-semibold 
                                   text-center bg-white border border-gray-300 rounded-md'
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value >= 0) {
                            updateQuantity(item._id, item.size, value);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Delete Icon */}
                <RiDeleteBin6Line 
                  className='text-red-500 w-[25px] h-[25px] absolute top-[50%] md:top-[40%] md:right-[5%] right-1 cursor-pointer'
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Total & Checkout */}
      {cartData.length > 0 && (
        <div className='flex justify-start items-end mt-10 mb-6 sm:mb-20 pb-[100px]'>
          <div className='w-full sm:w-[450px]'>
            <CartTotal />
            <button
              className='text-[18px] hover:bg-slate-800 cursor-pointer bg-slate-600
                py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px]
                border border-gray-800 ml-[30px] mt-[20px]'
              onClick={() => navigate("/placeorder")}
            >
              Proceed To CheckOut
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
