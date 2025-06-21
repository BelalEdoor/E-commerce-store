import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import Product from '../components/Product';
import Hero from '../components/Hero';
const Home = () => {
  const { products, selectedCategory } = useContext(ProductContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
      const data = await response.json();
      const uniqueCategories = [...new Set(data.map(item => item.category.name))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const filteredProducts = selectedCategory === 'All' || selectedCategory === ''
    ? products
    : products.filter(item => item.category.name === selectedCategory);

  const productsByCategory = categories.map(category => {
    const categoryProducts = products.filter(p => p.category.name === category);
    return { category, products: categoryProducts };
  });

  return (
    <div>
      <Hero />
      <section className='pt-20' id="products">
        <div className='container mx-auto'>

          {selectedCategory === "" ? (
            <p className="text-center text-gray-500 py-10">Please select a category to see products.</p>
          ) : selectedCategory === 'All' ? (
            productsByCategory.map(({ category, products }) => (
              <div 
                key={category} 
                className="mb-12 border border-gray-300 rounded-lg p-6 bg-gray-100"
                style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
              >
                <h2 className="text-2xl font-semibold mb-4 capitalize border-b border-gray-300 pb-2">
                  {category}
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px]'>
                  {products.map(product => (
                    <Product product={product} key={product.id} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px]'>
              {filteredProducts.map(product => (
                <Product product={product} key={product.id} />
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default Home;
