import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../Redux/reducers/productSlice';
import storage from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    brand: '',
    rating: 0,
    description: '',
    colors: [],
    sizes: [],
    quantity: 0,
  });
  const [selectedImages, setSelectedImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Upload images to Firebase Storage
    const imageURLs = [];
    const storageRef = ref(storage);
    for (const image of selectedImages) {
      const imageRef = ref(storageRef, `images/${image.name}`);
      await uploadBytes(imageRef, image)
        .then(async () => {
          // Get download URL for uploaded image
          const imageURL = await getDownloadURL(imageRef);
          imageURLs.push(imageURL);
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
    }
  
    // Set the image URLs in the new product data
    const newProductData = {
      ...newProduct,
      images: imageURLs,
    };
  
    // Dispatch action to create new product
    dispatch(createProduct(newProductData));
  
    // Clear form after submission
    setNewProduct({
      name: '',
      price: '',
      brand: '',
      rating: 0,
      description: '',
      colors: [],
      sizes: [],
      quantity: 0,
    });
    setSelectedImages([]);
  };
  

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-8">Create Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} className="border border-gray-300 p-2 w-full rounded-lg" placeholder="Product Name" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} className="border border-gray-300 p-2 w-full rounded-lg" placeholder="Price" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Brand</label>
          <input type="text" name="brand" value={newProduct.brand} onChange={handleInputChange} className="border border-gray-300 p-2 w-full rounded-lg" placeholder="Brand" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" value={newProduct.description} onChange={handleInputChange} className="border border-gray-300 p-2 w-full rounded-lg" placeholder="Description"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <input type="number" name="rating" value={newProduct.rating} onChange={handleInputChange} className="border border-gray-300 p-2 w-full rounded-lg" placeholder="Rating" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input type="number" name="quantity" value={newProduct.quantity} onChange={handleInputChange} className="border border-gray-300 p-2 w-full rounded-lg" placeholder="Quantity" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Upload Images</label>
          <input id="image-upload" type="file" multiple accept="image/*" onChange={handleImageChange} className="border border-gray-300 p-2 w-full rounded-lg" />
        </div>
        <div className="mb-4">
          {selectedImages.map((file, index) => (
            <img key={index} src={URL.createObjectURL(file)} alt={`Selected Image ${index + 1}`} className="w-10 h-10 md:w-60 md:h-60 object-cover rounded-lg m-2" />
          ))}
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
