import React, { useContext } from 'react'
import { shopDataContext } from '../contaxt/ShopContext'
import Title from './Title'

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext)

  // 🧠 Calculate amounts
  const subTotal = getCartAmount?.() || 0
  const total = subTotal === 0 ? 0 : subTotal + (delivery_fee || 0)

  return (
    <div className='w-full lg:ml-[30px]'>
      {/* Section Title */}
      <div className='text-xl py-[10px]'>
        <Title text1={'CART'} text2={'TOTAL'} />
      </div>

      {/* Divider */}
      <hr />

      {/* Cart Total Box */}
      <div className='flex flex-col gap-2 mt-2 text-sm p-[30px] border-[2px]  rounded-lg '>
        {/* SubTotal */}
        <div className='flex justify-between text-black text-[18px] p-[10px]'>
          <p>SubTotal</p>
          <p>{currency} {subTotal}.00</p>
        </div>

        {/* Delivery Fee */}
        <div className='flex justify-between text-black text-[18px] p-[10px]'>
          <p>Delivery Fee</p>
          <p>{currency} {subTotal === 0 ? 0 : delivery_fee}</p>
        </div>

        {/* Divider */}
        <hr className='border-[#000000]' />

        {/* Total */}
        <div className='flex justify-between text-black text-[20px] font-semibold p-[10px] mt-2'>
          <b>Total</b>
          <b>{currency} {total}.00</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
