import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { shopDataContext } from "../contaxt/ShopContext";
import Card from "./Card";

function BestSeller() {
  const { products } = useContext(shopDataContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      // Filter items where bestSeller or bestseller is truthy
      const filtered = products.filter(
        (item) => item.bestSeller || item.bestseller
      );
      setBestSeller(filtered.slice(0, 4));
    }
  }, [products]);

  return (
    <div>
      {/* Title Section */}
      <div className="h-[8%] w-[100%] text-center mt-[50px]">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-black">
          Tried, trusted, loved — discover our all-time best sellers
        </p>
      </div>

      {/* Cards Section */}
      <div
        className="w-[100%] h-[50%] mt-[30px] 
        flex items-center justify-center flex-wrap gap-[50px]"
      >
        {bestSeller.length > 0 ? (
          bestSeller.map((item, index) => (
            <Card
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image1}
            />
          ))
        ) : (
          <p className="text-blue-200 text-lg">No best sellers found</p>
        )}
      </div>
    </div>
  );
}

export default BestSeller;
