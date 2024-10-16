import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductData } from '../App';
import { Image } from 'lucide-react';

interface CreateStorefrontProps {
  setProductData: React.Dispatch<React.SetStateAction<ProductData | null>>;
}

const CreateStorefront: React.FC<CreateStorefrontProps> = ({ setProductData }) => {
  const { id } = useParams<{ id: string }>();
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const storedData = localStorage.getItem(`storefront_${id}`);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setProductName(parsedData.name);
        setProductDescription(parsedData.description);
        setPrice(parsedData.price.toString());
        setImagePreview(parsedData.imageUrl);
      }
    }
  }, [id]);

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          handleImageUpload(file);
        }
        break;
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const storefrontId = id || Math.random().toString(36).substr(2, 9);
    let imageUrl = imagePreview || '';

    if (imageFile) {
      imageUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(imageFile);
      });
    }

    const newProductData: ProductData = {
      id: storefrontId,
      name: productName,
      description: productDescription,
      price: parseFloat(price),
      imageUrl: imageUrl,
      locked: false,
    };
    setProductData(newProductData);

    localStorage.setItem(`storefront_${storefrontId}`, JSON.stringify(newProductData));
    navigate(`/storefront/${storefrontId}`);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">{id ? 'Edit' : 'Create'} Your Storefront</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productDescription" className="block text-gray-700 font-bold mb-2">
            Product Description
          </label>
          <textarea
            id="productDescription"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">
            Product Image
          </label>
          <div
            className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            onPaste={handlePaste}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Product preview" className="max-w-full h-auto mx-auto" />
            ) : (
              <div className="text-gray-500">
                <Image className="w-12 h-12 mx-auto mb-2" />
                <p>Drag and drop an image here, or click to select a file</p>
                <p className="text-sm">(You can also paste an image)</p>
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileInputChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          {id ? 'Update' : 'Create'} Storefront
        </button>
      </form>
    </div>
  );
};

export default CreateStorefront;