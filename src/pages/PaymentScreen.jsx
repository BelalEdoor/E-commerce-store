import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentScreen = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePaymentDetailsChange = (event) => {
    setPaymentDetails(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!address || !paymentMethod || !paymentDetails) {
      alert('Please fill in all required fields');
      return;
    }

    const totalPrice = calculateTotalPrice();

    navigate('/payment', {
      state: {
        address,
        paymentMethod,
        paymentDetails,
        cardNumber,
        expiryDate,
        cvv,
        totalPrice,
      },
    });
  };

  const calculateTotalPrice = () => {
    return 100;
  };

  const renderCreditCardForm = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Enter Credit Card Details</h2>
        <input
          type="text"
          className="w-full rounded-lg p-2 mb-4 border border-gray-300"
          placeholder="Card Number"
          value={cardNumber}
          onChange={handleCardNumberChange}
        />
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            className="w-1/2 rounded-lg p-2 border border-gray-300"
            placeholder="Expiry Date"
            value={expiryDate}
            onChange={handleExpiryDateChange}
          />
          <input
            type="text"
            className="w-1/2 rounded-lg p-2 border border-gray-300"
            placeholder="CVV"
            value={cvv}
            onChange={handleCvvChange}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30" 
        style={{ 
          backgroundImage: `url('https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRy6Ga9DLZhVZX4TCrJEGF2NaJcMyJzeW3vW1CUgrrIN2Br5GOr')`
        }} 
      />
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Payment</h1>
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <input
            type="text"
            className="w-full rounded-lg p-2 mb-4 border border-gray-300"
            placeholder="Enter address"
            value={address}
            onChange={handleAddressChange}
          />

          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

          <div className="space-y-2 mb-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="creditCard"
                checked={paymentMethod === 'creditCard'}
                onChange={handlePaymentMethodChange}
                className="form-radio h-4 w-4 text-primary"
              />
              <span className="ml-2">Credit Card</span>
            </label>
            {paymentMethod === 'creditCard' && renderCreditCardForm()}

            <label className="inline-flex items-center">
              <input
                type="radio"
                value="crypto"
                checked={paymentMethod === 'crypto'}
                onChange={handlePaymentMethodChange}
                className="form-radio h-4 w-4 text-primary"
              />
              <span className="ml-2">Crypto Payment</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="radio"
                value="cashOnDelivery"
                checked={paymentMethod === 'cashOnDelivery'}
                onChange={handlePaymentMethodChange}
                className="form-radio h-4 w-4 text-primary"
              />
              <span className="ml-2">Cash on Delivery</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="radio"
                value="bankTransfer"
                checked={paymentMethod === 'bankTransfer'}
                onChange={handlePaymentMethodChange}
                className="form-radio h-4 w-4 text-primary"
              />
              <span className="ml-2">Bank Transfer</span>
            </label>
          </div>

          <h2 className="text-xl font-semibold mb-4">Enter Payment Details</h2>
          <textarea
            className="w-full rounded-lg p-2 mb-4 border border-gray-300"
            placeholder="Enter payment details"
            value={paymentDetails}
            onChange={handlePaymentDetailsChange}
          ></textarea>

          <h2 className="text-xl font-semibold mb-4">Shipping Summary</h2>
          <div className="text-sm mb-4">
            <p><strong>Address:</strong> {address}</p>
            <p><strong>Payment Method:</strong> {paymentMethod}</p>
            {paymentMethod === 'creditCard' && (
              <>
                <p><strong>Card Number:</strong> {cardNumber}</p>
                <p><strong>Expiry Date:</strong> {expiryDate}</p>
                <p><strong>CVV:</strong> {cvv}</p>
              </>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Total Price</h2>
            <p className="text-lg font-semibold">${calculateTotalPrice().toFixed(2)}</p>
          </div>

          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-300 mt-6 w-full"
            disabled={!address || !paymentMethod || !paymentDetails}
          >
            Proceed to Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;
