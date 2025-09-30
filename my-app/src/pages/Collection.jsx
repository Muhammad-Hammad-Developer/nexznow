import React, { useContext, useEffect, useState } from 'react';
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Title from '../component/Title.jsx';
import { shopDataContext } from '../contaxt/ShopContext.jsx';
import Card from '../component/Card.jsx';

function Collection() {
  const [showFilter, setShowFilter] = useState(false);
  const { products, search, showSearch } = useContext(shopDataContext);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [shortType, setShorType] = useState("relavent");

  const toggleCategory = (e) => {
    const { value } = e.target;
    setCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const { value } = e.target;
    setSubCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const applyFilterAndSort = () => {
    let productCopy = [...products];

    // ✅ Search Filter
    if (showSearch && search) {
      productCopy = productCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // ✅ Category Filter
    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category));
    }

    // ✅ Sub-Category Filter
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
    }

    // ✅ Sorting
    if (shortType === "low-high") {
      productCopy.sort((a, b) => a.price - b.price);
    } else if (shortType === "high-low") {
      productCopy.sort((a, b) => b.price - a.price);
    }

    setFilterProduct(productCopy);
  };

  // ✅ Run filter + sort when dependencies change
  useEffect(() => {
    applyFilterAndSort();
  }, [products, category, subCategory, search, showSearch, shortType]);

  return (
    <div className="min-h-screen bg-gradient-to-l bg-[white] 
      flex flex-col md:flex-row pt-[70px] overflow-x-hidden z-[2]">

      {/* FILTER SECTION */}
      <div className={`
        md:w-[30%] lg:w-[20%] w-full
        ${showFilter || (typeof window !== 'undefined' && window.innerWidth >= 768) ? 'h-auto' : 'h-[60px]'}
        p-[20px] border-r border-gray-400 text-[#aaf5fa]
        overflow-y-auto transition-all duration-300 ease-in-out
      `}>

        {/* FILTER HEADER */}
        <p
          className="text-[25px] font-semibold flex gap-[5px] items-center cursor-pointer select-none text-[black]"
          onClick={() => setShowFilter(prev => !prev)}
        >
          FILTERS
          {!showFilter && <FaChevronRight className="text-[18px] md:hidden transition-transform duration-300 " />}
          {showFilter && <FaChevronDown className="text-[18px] md:hidden transition-transform duration-300" />}
        </p>

        {/* CATEGORYS */}
        <AnimatePresence initial={false}>
          {(showFilter || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
            <motion.div
              key="categories"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className=" pl-5 py-3 mt-6 rounded-mdoverflow-hidden"
            >
              <p className="text-[18px] text-[black]">CATEGORYS</p>
              <div className="w-full flex flex-col gap-[10px] leading-[1.8] text-[black]">
                {["Men", "Women", "Kids"].map(cat => (
                  <label key={cat} className="flex items-center gap-[10px] text-[16px] font-light">
                    <input type="checkbox" value={cat} className="w-3" onChange={toggleCategory} /> {cat}
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SUB-CATEGORYS */}
        <AnimatePresence initial={false}>
          {(showFilter || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
            <motion.div
              key="subcategories"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className=" pl-5 py-3 mt-6 rounded-md  overflow-hidden"
            >
              <p className="text-[18px] text-[black]">SUB-CATEGORYS</p>
              <div className="w-full flex flex-col gap-[10px] leading-[1.8] text-black">
                {["TopWear", "BottomWear", "WinterWear"].map(sub => (
                  <label key={sub} className="flex items-center gap-[10px] text-[16px] font-light">
                    <input type="checkbox" value={sub} className="w-3" onChange={toggleSubCategory} /> {sub}
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 md:py-[10px] pb-[110px]">
        <div className="w-full p-[20px] flex flex-col lg:flex-row lg:px-[50px] gap-4 justify-between">
          <Title text1={"ALL"} text2={"COLLECTION"} />

          {/* SORT SELECT */}
          <select
            value={shortType}
            onChange={(e) => setShorType(e.target.value)}
            className="  w-full md:w-[200px] h-[50px] px-[10px] text-black 
                       rounded-lg hover:border-[#46d1f7] "
          >
            <option value="relavent">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* PRODUCTS GRID */}
        <div className='lg:w-[80vw] md:w-[60vw] w-[100vw] min-h-[70vh] flex items-center 
        justify-center flex-wrap gap-[30px]'>
          {filterProduct.map((item, index) => (
            <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
