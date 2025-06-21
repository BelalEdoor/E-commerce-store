import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const InvoiceScreen = () => {
  const { cart, total } = useContext(CartContext);
  const formattedTotal = parseFloat(total).toFixed(2);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg print:p-0 print:shadow-none print:rounded-none print:w-full print:min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">Invoice</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">No items in the cart.</p>
        ) : (
          <>
          <div className='uppercase text-sm font-semibold'>
          Number of items ({cart.length})
          </div>
            <div className="mb-4">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between border-b py-2">
                  <span>{item.title}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-3">
              <span>Total</span>
              <span>${formattedTotal}</span>
            </div>
          </>
        )}

        <p className="mt-6 text-center text-sm text-gray-500">
          * This invoice is for viewing and printing purposes only.
        </p>
      </div>
    </div>
  );
};

export default InvoiceScreen;
