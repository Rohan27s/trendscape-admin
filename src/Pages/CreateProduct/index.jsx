import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../Redux/reducers/productSlice';
import storage from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import genericColors from '../../Utils/const'; // Importing generic colors
import Loading from '../../Component/Loading';
import { FaSpinner } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    brand: '',
    description: '',
    colors: ['red'], // Add a default color input
    sizes: [],
    quantity: 0,
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [successPopup, setSuccessPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const handleAddColor = (e) => {
    e.preventDefault(); // Prevent form submission
    setNewProduct(prevState => ({
      ...prevState,
      colors: [...prevState.colors, '']
    }));
  };

  const handleColorChange = (e, index) => {
    const { value } = e.target;
    setNewProduct(prevState => {
      const updatedColors = [...prevState.colors];
      updatedColors[index] = value;
      return { ...prevState, colors: updatedColors };
    });
  };

  const handleRemoveColor = (index) => {
    const updatedColors = [...newProduct.colors];
    updatedColors.splice(index, 1);
    setNewProduct({ ...newProduct, colors: updatedColors });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true);
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

    // Set the image URLs and colors in the new product data
    const newProductData = {
      ...newProduct,
      images: imageURLs,
    };

    // Dispatch action to create new product
    dispatch(createProduct(newProductData));
    setIsLoading(false);
    setSuccessPopup(true);
    // Clear form after submission
    setNewProduct({
      name: '',
      price: '',
      brand: '',
      description: '',
      colors: ['red'],
      sizes: [],
      quantity: 0,
    });
    setSelectedImages([]);
  };


  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-8">Create Product</h1>
      {isLoading &&
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="flex justify-center items-center w-full h-full">
            <FaSpinner className="animate-spin text-4xl text-white" />
          </div>
        </div>
      }
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
          <label className="block text-sm font-medium text-gray-700">Upload Images</label>
          <div className="flex items-center justify-between">
            <input id="image-upload" type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
            <label htmlFor="image-upload" className="cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
              Select Images
            </label>
            {selectedImages.length > 0 && (
              <span className="text-sm text-gray-600">{selectedImages.length} image(s) selected</span>
            )}
          </div>
        </div>
        <div className="mb-4 flex flex-row flex-wrap">
          {selectedImages.map((file, index) => (
            <img key={index} src={URL.createObjectURL(file)} alt={`Selected Image ${index + 1}`} className="w-10 h-10 md:w-60 md:h-60 object-cover border-2 rounded-lg m-2" />
          ))}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Colors:</h3>
          <ul>
            {newProduct.colors.map((color, index) => (
              <li key={index} className='flex flex-row gap-3 mb-2'>
                <select
                  value={color || ''}
                  onChange={(e) => handleColorChange(e, index)}
                  className="border border-gray-300 p-2 w-full rounded-lg"
                >
                  <option value="">Select Color</option>
                  {genericColors.map((genericColor, index) => (
                    <option key={index} value={genericColor}>{genericColor}</option>
                  ))}
                </select>
                <button className="bg-red-500 text-white px-4 py-1 rounded-lg" onClick={() => handleRemoveColor(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <button className="bg-transparent border-2 border-slate-900  px-4 py-1 rounded-lg" onClick={handleAddColor}>Add Color</button>
        </div>
        <button type="submit" className="bg-slate-900 hover:bg-slate-700 text-white px-4 py-2 rounded-lg">Create Product</button>
      </form>
      {successPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Product Created Successfully</h2>
              <MdClose className="text-gray-500 text-xl cursor-pointer" onClick={() => setSuccessPopup(false)} />
            </div>
            <p className="text-gray-700 mb-4">Your product has been successfully created.</p>
            <div className='flex'>

              <Link to={'/products'} className="bg-slate-900 mx-auto  hover:bg-slate-700 text-white px-4 py-2 rounded-lg" >See updated products</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateProduct;
