import React, { useEffect, useState } from 'react'
import Background from '../component/Background.jsx'
import Product from './Product.jsx'
import OurPolicy from '../component/OurPolicy.jsx'
import NewLetterBox from '../component/NewLetterBox.jsx'
import Footer from '../component/Footer.jsx'

function Home() {

  let [heroCount, setHeroCount] = useState(0)

  useEffect(() => {
    let intervalId;

    if (!intervalId) {
      intervalId = setInterval(() => {
        setHeroCount(prev => (prev === 3 ? 0 : prev + 1));
      }, 3000);
    }

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='overflow-x-hidden relative top-[70px]'>

      {/* background only */}
      <div className='w-[100vw] lg:h-[100vh] md:h-[50vh] sm:h-[30vh] relative'>
        <Background heroCount={heroCount} />
      </div>

      <Product />
      <OurPolicy />
      <NewLetterBox />
      <Footer />
    </div>
  )
}

export default Home
