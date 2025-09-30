import React, { useContext, useState } from 'react';
import Title from '../component/Title';
import CartTotal from '../component/CartTotal';
import jazzCash from '../assets/jazz1.png';
import { shopDataContext } from '../contaxt/ShopContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../contaxt/AuthContext';

function PlaceOrder() {
  const [method, setMethod] = useState('cod');
  const navigate = useNavigate();
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItem = [];

      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItem.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItem,
        amount: getCartAmount() + delivery_fee,
      };

      if (method === 'cod') {
        const result = await axios.post(
          `${serverUrl}/api/order/placeorder`,
          orderData,
          { withCredentials: true }
        );

        if (result.data) {
          setCartItem({});
          navigate("/order");
        } else {
          console.log(result.data.message);
        }
      } else if (method === 'jazz cash') {
        console.log('JazzCash integration here...');
      } else {
        console.log('Unknown payment method');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-l flex items-center justify-center px-4 md:px-8 pt-28 pb-10">
      {/* Form Container */}
      <div className="w-full max-w-4xl flex justify-center">
        <form
          className="w-full flex flex-col gap-4 pb-32"
          onSubmit={onSubmitHandler}
        >
          <Title text1="DELIVERY" text2="INFORMATION" />

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="First Name"
              required
              className="w-full md:w-1/2 h-12 rounded-md bg-black text-white placeholder-white text-lg px-4"
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
            />

            <input
              type="text"
              placeholder="Last Name"
              required
              className="w-full md:w-1/2 h-12 rounded-md bg-black text-white placeholder-white text-lg px-4"
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
            />
          </div>

          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full h-12 rounded-md bg-black text-white placeholder-white text-lg px-4"
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
          />

          <input
            type="text"
            placeholder="Street"
            required
            className="w-full h-12 rounded-md bg-black text-white placeholder-white text-lg px-4"
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
          />

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="City"
              required
              className="w-full md:w-1/2 h-12 rounded-md bg-black text-white placeholder-white text-lg px-4"
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
            />
            <input
              type="text"
              placeholder="State"
              required
              className="w-full md:w-1/2 h-12 rounded-md bg-black placeholder-white text-white text-lg px-4"
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="number"
              placeholder="Pin Code"
              required
              className="w-full md:w-1/2 h-12 rounded-md bg-black text-white placeholder-white text-lg px-4"
              onChange={onChangeHandler}
              name="pinCode"
              value={formData.pinCode}
            />
            <input
              type="text"
              placeholder="Country"
              required
              className="w-full md:w-1/2 h-12 rounded-md bg-black text-white placeholder-white text-lg px-4"
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
            />
          </div>

          <input
            type="number"
            placeholder="Phone Number"
            required
            className="w-full h-12 rounded-md bg-black text-white placeholder-white text-lg px-4"
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
          />

          {/* Cart + Payment + Button */}
          <div className="mt-6 flex flex-col gap-6">
            <CartTotal />

            <Title text1="PAYMENT" text2="METHOD" />

            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 flex-wrap">
              {/* <button
                type="button"
                onClick={() => setMethod('jazz cash')}
                className={`w-[150px] h-12 rounded-sm border-2 ${
                  method === 'jazz cash' ? 'border-blue-900' : 'border-transparent'
                }`}
              >
                <img src={jazzCash} alt="JazzCash" className="w-full h-full object-cover rounded-sm" />
              </button> */}

              <button
                type="button"
                onClick={() => setMethod('cod')}
                className={`w-[200px] h-12 bg-gradient-to-t from-[#95b3f8]  to-white text-[14px] px-4 rounded-sm text-[#332f6f] font-bold border-2 ${
                  method === 'cod' ? 'border-blue-900' : 'border-transparent'
                }`}
              >
                CASH ON DELIVERY
              </button>
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-center mt-4">
              <button
                type="submit"
                className="text-[18px] bg-slate-600 py-3 px-12 rounded-2xl  text-white flex items-center justify-center gap-4 border border-[#80808049] active:bg-slate-500 cursor-pointer"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PlaceOrder;
