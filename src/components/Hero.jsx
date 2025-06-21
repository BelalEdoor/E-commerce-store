import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../contexts/ProductContext';

const Hero = () => {
  const { setSelectedCategory, setProducts } = useContext(ProductContext);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState('');
  const [shouldShowProducts, setShouldShowProducts] = useState(false); 

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
      const data = await response.json();
      const uniqueCategories = [...new Set(data.map(item => item.category.name))];
      setCategories(['All', ...uniqueCategories]);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchProducts = async (category) => {
    try {
      let apiUrl = 'https://api.escuelajs.co/api/v1/products';
      if (category !== 'All') {
        apiUrl += `?category=${category}`;
      }
      const response = await fetch(apiUrl);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelected(selectedCategory);
    setShouldShowProducts(false); 
  };

  const handleShopNowClick = (e) => {
    if (!selected) {
      e.preventDefault();
      alert("Please select a category");
      return;
    }
    setSelectedCategory(selected);
    fetchProducts(selected);
    setShouldShowProducts(true); 
  };

  return (
    <section
      className="relative bg-no-repeat bg-cover bg-center h-[700px] flex items-center pt-20"
      style={{
        backgroundImage: `url(https://media.istockphoto.com/id/941302930/vector/online-shopping-smartphone-turned-into-internet-shop-concept-of-mobile-marketing-and-e.jpg?s=612x612&w=0&k=20&c=oEaIaAVRL6w7juxEIVwFPISjW_XkoYbLmK_VRWjNaEk=)`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="text-white max-w-2xl text-center lg:text-left">
          <div className="uppercase tracking-widest font-semibold text-sm mb-4">
            Best shopping deals from our store
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight leading-tight mb-6">
            Find out<br />
            <span className="font-bold">An unforgettable shopping experience</span>
          </h1>
          <p className="text-lg text-gray-200 mb-6">
            Daily deals, guaranteed quality, fast shipping everywhere!
          </p>

          <div className="mb-6">
            <select
              id="category"
              value={selected}
              onChange={handleCategoryChange}
              className="bg-white/80 text-black px-4 py-2 rounded-lg shadow-md focus:outline-none"
            >
              <option value="">Choose a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <a
            href={selected && shouldShowProducts ? "#products" : "#"}
            onClick={handleShopNowClick}
            className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition"
          >
            Shop now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
