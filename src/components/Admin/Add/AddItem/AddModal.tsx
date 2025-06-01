import React, { useState } from 'react';

interface ProductFormProps {
  onClose: () => void;
  onSubmit: (product: ProductData) => void;
}

interface ProductData {
  category: string;
  name: string;
  price: string;
  description: string;
  packageCount: string;
  inventory: string;
}

const ProductFormPopup: React.FC<ProductFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ProductData>({
    category: '',
    name: '',
    price: '',
    description: '',
    packageCount: '',
    inventory: ''
  });

  const categories = ['بربری', 'سنگک', 'تافتون', 'فانتزی', 'محلی'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">فرم ثبت محصول جدید</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700 mb-2">دسته بندی</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">انتخاب کنید</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">نام محصول</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 mb-2">قیمت</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 mb-2">توضیحات</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="packageCount" className="block text-gray-700 mb-2">تعداد در بسته</label>
              <input
                type="text"
                id="packageCount"
                name="packageCount"
                value={formData.packageCount}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="inventory" className="block text-gray-700 mb-2">موجودی</label>
              <input
                type="text"
                id="inventory"
                name="inventory"
                value={formData.inventory}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                ثبت محصول
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductFormPopup;