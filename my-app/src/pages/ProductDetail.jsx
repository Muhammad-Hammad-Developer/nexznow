import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../contaxt/ShopContext'
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../component/RelatedProduct';

function ProductDetail() {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(shopDataContext);
  const [producttData, setProductData] = useState(null);

  const [image, setImage] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    if (!products || products.length === 0) return;
    const found = products.find((p) => p._id === productId);
    if (found) {
      setProductData(found);
      setImage1(found.image1 || '');
      setImage2(found.image2 || '');
      setImage3(found.image3 || '');
      setImage4(found.image4 || '');
      setImage(found.image1 || '');
      // optionally set default size (first available)
      // setSize(found.sizes?.[0] || '');
    }
  }, [productId, products]);

  if (!producttData) return <div className='opacity-0'>Loading...</div>;

  return (
    <div>
      <div className='w-[98.9vw] min-h-[120vh] flex items-center justify-start flex-col bg-gradient-to-l gap-[20px] lg:flex-row'>

        {/* Image Thumbnails Section */}
        <div className='lg:w-[50vw] md:w-[90vw] lg:h-[90vh] h-[50vh] mt-[70px] flex items-center justify-center gap-[30px] md:gap-[10px] flex-col-reverse lg:flex-row'>
          <div className='lg:w-[20%] md:w-[80%] lg:h-auto flex items-center justify-center gap-[20px] lg:gap-[20px] lg:flex-col flex-wrap'>
            {[image1, image2, image3, image4].map((img, i) => (
              <div key={i} className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md overflow-hidden'>
                <img src={img} alt={`thumb-${i}`} className='w-full h-full object-cover cursor-pointer rounded-md' onClick={() => setImage(img)} />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className='lg:w-[60%] w-[80%] lg:h-[78%] h-[70%] border-[1px] border-[#80808049] rounded-md overflow-hidden'>
            <img src={image} alt={producttData.name} className='w-[100%] lg:h-[100%] h-[100%] object-contain rounded-md' />
          </div>
        </div>

        {/* Product Info Section */}
        <div className='lg:w-[50vw] w-[100vw] lg:h-[75vh] h-[40vh] lg:mt-[80px] flex items-start justify-start flex-col py-[20px] px-[30px] md:pb-[20px] md:pl-[20px] lg:pl-[0px] lg:px-[0px] lg:py-[0px] gap-[10px]'>
          <h1 className='text-[40px] font-semibold text-[black]'>{producttData.name.toUpperCase()}</h1>

          {/* Rating */}
          <div className='flex items-center gap-[1px]'>
            <FaStar className='text-[20px] fill-[#FFD700]' />
            <FaStar className='text-[20px] fill-[#FFD700]' />
            <FaStar className='text-[20px] fill-[#FFD700]' />
            <FaStar className='text-[20px] fill-[#FFD700]' />
            <FaStarHalfAlt className='text-[20px] fill-[#FFD700]' />
            <p className='text-[18px] font-semibold pl-[5px] text-[white]'>(124)</p>
          </div>

          {/* Price */}
          <p className='text-[30px] font-semibold pl-[5px] text-[black]'>{currency} {producttData.price}</p>

          {/* Description */}
          <div className='w-[80%] md:w-[60%] text-[15px] font-semibold pl-[5px] text-[black]'>
            {producttData.description}
          </div>

          {/* Sizes */}
          <div className='flex flex-col gap-[10px] my-[10px]'>
            <p className='text-[25px] font-semibold pl-[5px] text-[black]'>Select Size</p>
            <div className='flex gap-[5px] flex-wrap'>
              {producttData.sizes?.map((item, index) => (
                <button
                  key={index}
                  className={`border py-2 px-4 rounded-md transition-all duration-150 ${item === size ? 'bg-black text-white' : 'bg-slate-300 hover:bg-slate-400'}`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Add to Cart */}
            <button
              className='text-[15px] active:bg-slate-500 cursor-pointer bg-slate-600 py-[10px] px-[20px] rounded-2xl mt-[10px] border-[1px] border-[#80808049] text-[white] shadow-md'
              onClick={() => {
                if (!size) {
                  alert("Please select a size before adding to cart");
                  return;
                }
                addToCart(producttData._id, size);
              }}
            >
              Add To Cart
            </button>

            {/* SIZE CHART SECTION (dynamic) */}
            <div className='mt-6 w-full overflow-x-auto'>
              <h3 className='text-[20px] font-semibold mb-3 text-[black]'>Size Chart</h3>

              {producttData.sizeChart && producttData.sizeChart.length > 0 ? (
                <table className='table-auto border border-gray-400 text-[14px] md:text-[16px] text-center w-[90%]'>
                  <thead className='bg-slate-200'>
                    <tr>
                      <th className='border border-gray-400 px-3 py-2'>Size</th>
                      <th className='border border-gray-400 px-3 py-2'>Chest</th>
                      <th className='border border-gray-400 px-3 py-2'>Length</th>
                      <th className='border border-gray-400 px-3 py-2'>Waist</th>
                      <th className='border border-gray-400 px-3 py-2'>Sleeves</th>
                    </tr>
                  </thead>
                  <tbody>
                    {producttData.sizeChart.map((row, idx) => (
                      <tr
                        key={idx}
                        className={`cursor-pointer ${row.size === size ? "bg-black text-white" : ""}`}
                        onClick={() => setSize(row.size)}
                      >
                        <td className='border border-gray-400 px-3 py-2'>{row.size}</td>
                        <td className='border border-gray-400 px-3 py-2'>{row.chest}</td>
                        <td className='border border-gray-400 px-3 py-2'>{row.length}</td>
                        <td className='border border-gray-400 px-3 py-2'>{row.waist}</td>
                        <td className='border border-gray-400 px-3 py-2'>{row.sleeves}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-600">No size chart available for this product.</p>
              )}
            </div>
          </div>

          {/* Extra Info */}
          <div className='w-[100%] h-[1px] bg-slate-700 mt-4'>
            <div className='w-[88%] text-[16px] text-[black]'>
              <p>100% Original Product.</p>
              <p>Cash On Delivery Is Available On This Product.</p>
              <p>Easy Return And Exchange Policy Within 7 Days.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Related Products */}
      <div className='w-[100%] min-h-[70vh] bg-gradient-to-l flex items-start justify-start flex-col overflow-x-hidden'>
        <div className='flex px-[20px] mt-[90px] lg:ml-[80px] ml-[0px] lg:mt-[0px]'>
          <p className=' px-5 py-3 text-sm text-[black]'>Description</p>
          <p className=' px-5 py-3 text-sm text-[black]'>Review(124)</p>
        </div>

        <div className='w-[80%] md:h-[150px] h-[220px] text-[black] md:text-[15px] lg:text-[20px] px-[10px] md:px-[30px] lg:ml-[100px] ml-[20px]'>
          <p className='w-[95%] h-[90%] flex items-center justify-center'>
            At NumSports, we’re more than just a sports store – we’re a community for athletes and active lifestyles. 
            Our mission is to provide top-notch sportswear, equipment, and accessories that help you push your limits 
            and achieve your goals. With a commitment to quality, affordability, and style, NumSports.
          </p>
        </div>

        <RelatedProduct
          category={producttData.category}
          subCategory={producttData.subCategory}
          currentProductId={producttData._id}
        />
      </div>
    </div>
  );
}

export default ProductDetail;
