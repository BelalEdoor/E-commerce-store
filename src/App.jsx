import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CheckoutScreen from './pages/Invoice';
import PaymentScreen from './pages/PaymentScreen'
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import InvoiceScreen from './pages/Invoice';  


const App = () => {
  return <div className='overflow-hidden pt-20 bg-gray 100'>
    <Router>
      <Header />
      <Routes>
        <Route path='/react-tailwind-ecommerce-website-project' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/checkout' element={<CheckoutScreen />} />
         <Route path='/payment' element={<PaymentScreen />} />
        <Route path="/invoice" element={<InvoiceScreen />} />

      </Routes>
      <Sidebar />
      
      <Footer />
    </Router>
  </div>;
};

export default App;