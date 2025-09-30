import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../contaxt/ShopContext'
import Card from './Card'

function LatestCollection() {
  let { products } = useContext(shopDataContext)

  let [latestProduct, setLatestProduct] = useState([])

  useEffect(() => {
    setLatestProduct(products.slice(0, 8))
  }, [products])

  return (
    <div className='w-full text-center md:text-[50px] py-6'>
      <Title text1={"LATEST"} text2={"COLLECTION"} />
      <p className='w-full m-auto text-[13px] md:text-[20px] px-[10px] text-black'>
        Step Into Style - New Collection Dropping This Season!
      </p>

      <div className='w-full mt-[30px] flex items-center justify-center flex-wrap gap-[30px]'>
        {latestProduct.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            image={item.image1}
            id={item._id}
            price={item.price}
          />
        ))}
      </div>
    </div>
  )
}

export default LatestCollection
