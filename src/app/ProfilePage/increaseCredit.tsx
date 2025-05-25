// components/CreditPopup.tsx
'use client';
import React, { useState, useEffect } from 'react';

interface CreditPopupProps {
  currentBalance: number;
  onClose: () => void;
  onPayment: (amount: number) => void;
}

const CreditPopup: React.FC<CreditPopupProps> = ({ currentBalance, onClose, onPayment }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [displayAmount, setDisplayAmount] = useState<string>('');

  const presetAmounts = [
    { value: 10000, label: '۱۰ هزار تومان' },
    { value: 20000, label: '۲۰ هزار تومان' },
    { value: 50000, label: '۵۰هزار تومان' },
    { value: 100000, label: '۱۰۰ هزار تومان' },
  ];

  // Convert English numbers to Persian
  const toPersianNumber = (num: number): string => {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    return num.toString().replace(/\d/g, (d) => persianDigits[parseInt(d)]);
  };

  // Convert Persian numbers to English
  const toEnglishNumber = (str: string): string => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return str.split('').map((char) => {
      const index = persianDigits.indexOf(char);
      return index !== -1 ? index.toString() : char;
    }).join('');
  };

  useEffect(() => {
    if (customAmount) {
      const englishNumber = toEnglishNumber(customAmount);
      const numValue = parseInt(englishNumber.replace(/,/g, ''));
      if (!isNaN(numValue)) {
        setDisplayAmount(toPersianNumber(numValue).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
      }
    } else {
      setDisplayAmount('');
    }
  }, [customAmount]);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setDisplayAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const englishValue = toEnglishNumber(inputValue);
    const cleanedValue = englishValue.replace(/\D/g, '');
    setCustomAmount(cleanedValue);
  };

  const handlePayment = () => {
    let amount = 0;
    
    if (selectedAmount) {
      amount = selectedAmount;
    } else if (customAmount) {
      const numValue = parseInt(customAmount);
      amount = isNaN(numValue) ? 0 : numValue;
    }

    if (amount > 0) {
      onPayment(amount);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">افزایش اعتبار</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-2">موجودی فعلی:</p>
          <p className="text-xl font-bold">
            {toPersianNumber(currentBalance).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} تومان
          </p>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-3">مبلغ مورد نظر را انتخاب کنید:</p>
          <div className="grid grid-cols-2 gap-3">
            {presetAmounts.map((amount) => (
              <button
                key={amount.value}
                onClick={() => handleAmountSelect(amount.value)}
                className={`py-3 px-4 rounded-lg border ${
                  selectedAmount === amount.value
                    ? 'border-orange-500 bg-orange-100 text-orange-600'
                    : 'border-gray-300 hover:border-orange-300'
                }`}
              >
                {amount.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6" dir='rtl'>
          <p className="text-gray-600 mb-2" dir='rtl'>یا مبلغ دلخواه وارد کنید:</p>
          <input dir='rtl'
            type="text"
            value={displayAmount}
            onChange={handleCustomAmountChange}
            placeholder="مثال: ۳۰,۰۰۰"
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-left"
            inputMode="numeric"
          />
        </div>

        <button
          onClick={handlePayment}
          disabled={!selectedAmount && !customAmount}
          className={`w-full py-3 rounded-lg text-white ${
            selectedAmount || customAmount
              ? 'bg-orange-400 hover:bg-orange-500'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          پرداخت
        </button>
      </div>
    </div>
  );
};

export default CreditPopup;