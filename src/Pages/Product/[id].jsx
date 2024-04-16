import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById, updateProduct } from '../../Redux/reducers/productSlice';
import genericColors from '../../Utils/const';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from '../../firebase';
import Loading from '../../Component/Loading';
import { FaSpinner, FaUpload } from 'react-icons/fa';

const Product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.product);
    const loading = useSelector(state => state.products.loading);
    const error = useSelector(state => state.products.error);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState({});
    const [selectedImages, setSelectedImages] = useState([]);
    const storageRef = ref(storage);
    console.log(storageRef);
    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (product) {
            setEditedProduct(product);
        }
    }, [product]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleSave = async () => {
        // Upload images to Firebase Storage
        const imageURLs = [];
        for (const image of selectedImages) {
            const imageRef = ref(storageRef, `images/${image.name}`);
            await uploadBytes(imageRef, image)
                .then(async () => {
                    // Get download URL for uploaded image
                    const imageURL = await getDownloadURL(imageRef);
                    imageURLs.push(imageURL);
                })
                .catch((error) => {
                    console.error("Error uploading image:", error);
                });
        }

        // Create a copy of the edited product with updated image URLs
        const updatedProduct = {
            ...editedProduct,
            images: [...editedProduct.images, ...imageURLs]
        };

        // Dispatch updateProduct action with the updated product data
        dispatch(updateProduct(id, updatedProduct));

        setIsEditing(false);
    };

    useEffect(() => {
        console.log("New wlaaa", editedProduct);

    }, [editedProduct])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const handleAddColor = () => {
        setEditedProduct(prevState => ({
            ...prevState,
            colors: [...prevState.colors, '']
        }));
    };

    const handleColorChange = (e, index) => {
        const { value } = e.target;
        setEditedProduct(prevState => {
            const updatedColors = [...prevState.colors];
            updatedColors[index] = value;
            return { ...prevState, colors: updatedColors };
        });
    };

    const handleRemoveColor = (index) => {
        const updatedColors = [...editedProduct.colors];
        updatedColors.splice(index, 1);
        setEditedProduct({ ...editedProduct, colors: updatedColors });
    };

    const handleAddSize = () => {
        setEditedProduct(prevState => ({
            ...prevState,
            sizes: [...prevState.sizes, '']
        }));
    };

    const handleSizeChange = (e, index) => {
        const { value } = e.target;
        setEditedProduct(prevState => {
            const updatedSizes = [...prevState.sizes];
            updatedSizes[index] = value;
            return { ...prevState, sizes: updatedSizes };
        });
    };

    const handleRemoveSize = (index) => {
        const updatedSizes = [...editedProduct.sizes];
        updatedSizes.splice(index, 1);
        setEditedProduct({ ...editedProduct, sizes: updatedSizes });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(files);
    };

    if (!product) return <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="flex justify-center items-center w-full h-full">
            <FaSpinner className="animate-spin text-4xl text-white" />
        </div>
    </div>;
    if (error) return <div className="text-center mt-8">Error: {error}</div>;
    if (!product) return null;

    return (
        <div className="max-w-4xl mx-auto  py-8">
            <div className="flex justify-end mb-4">
                {isEditing ? (
                    <>
                        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleCancelEdit}>Cancel</button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2" onClick={handleSave}>Save</button>
                    </>
                ) : (
                    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleEdit}>Edit</button>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center flex-row items-center flex-wrap w-full bg-gray-200 p-4 rounded-lg">
                {/* Render existing images */}
                {editedProduct.images && editedProduct.images.map((image, index) => (
                    <div key={index} className={`w-${index === 0 ? 'full' : '40'} bg-gray-200 max-h-${index === 0 ? '[50vh]' : '40'} rounded-lg m-2 overflow-hidden relative`}>
                        <img
                            src={image}
                            alt={`Product Image ${index + 1}`}
                            className='w-full h-full object-cover'
                        />
                    </div>
                ))}
                {/* Input field for uploading images */}
                {isEditing && (
                    <div className="relative group flex justify-center w-full ">
                        <label htmlFor="image-upload" className="flex items-center cursor-pointer">
                            <FaUpload className="w-6 h-6 mr-2 text-gray-600 group-hover:text-gray-800 transition-colors duration-300" />
                            Upload more images
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                )}
                {/* Display selected images */}
                {isEditing && selectedImages?.map((file, index) => (
                    <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`Selected Image ${index + 1}`}
                        className="w-40 h-40 object-cover rounded-lg m-2"
                    />
                ))}
            </div>

                <div>
                    <h1 className="text-3xl font-semibold mb-4">{isEditing ? (
                        <input type="text" name="name" value={editedProduct.name || ''} onChange={handleInputChange} className="border border-gray-300 p-2 w-full mb-2 rounded-lg" placeholder="Product Name" />
                    ) : (
                        editedProduct.name
                    )}</h1>
                    <p className="text-lg mb-2">Price: ₹{isEditing ? (
                        <input type="number" name="price" value={editedProduct.price || ''} onChange={handleInputChange} className="border border-gray-300 p-2 w-full mb-2 rounded-lg" placeholder="Price" />
                    ) : (
                        editedProduct.price
                    )}</p>
                    <p className="text-lg mb-2">Brand: {isEditing ? (
                        <input type="text" name="brand" value={editedProduct.brand || ''} onChange={handleInputChange} className="border border-gray-300 p-2 w-full mb-2 rounded-lg" placeholder="Brand" />
                    ) : (
                        editedProduct.brand
                    )}</p>
                    <p className="text-lg mb-4">Rating: {editedProduct.rating} ⭐</p>
                    <p className="text-lg mb-4">Description: {isEditing ? (
                        <textarea name="description" value={editedProduct.description || ''} onChange={handleInputChange} className="border border-gray-300 p-2 w-full mb-2 rounded-lg" placeholder="Description"></textarea>
                    ) : (
                        editedProduct.description
                    )}</p>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Colors:</h3>
                        {isEditing ? (
                            <ul>
                                {editedProduct.colors && editedProduct.colors.map((color, index) => (
                                    <li key={index} className='flex flex-row gap-3 mb-2'>
                                        <select
                                            value={color || ''}
                                            onChange={(e) => handleColorChange(e, index)}
                                            className="border border-gray-300 p-2 w-full  rounded-lg "
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
                        ) : (
                            <p className="text-lg font-semibold mb-2">{editedProduct.colors && editedProduct.colors.join(', ')}</p>
                        )}
                        {isEditing && (
                            <button className="bg-green-500 text-white px-4 py-1 rounded-lg" onClick={handleAddColor}>Add Color</button>
                        )}
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Sizes:</h3>
                        {isEditing ? (
                            <ul>
                                {editedProduct.sizes && editedProduct.sizes.map((size, index) => (
                                    <li key={index} className='flex flex-row gap-3 mb-2'>
                                        <input
                                            type="text"
                                            value={size || ''}
                                            onChange={(e) => handleSizeChange(e, index)}
                                            className="border border-gray-300 p-2 w-full rounded-lg "
                                            placeholder="Size"
                                        />
                                        <button className="bg-red-500 text-white px-4 py-1 rounded-lg" onClick={() => handleRemoveSize(index)}>Remove</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-lg font-semibold mb-2">{editedProduct.sizes && editedProduct.sizes.join(', ')}</p>
                        )}
                        {isEditing && (
                            <button className="bg-green-500 text-white px-4 py-1 rounded-lg" onClick={handleAddSize}>Add Size</button>
                        )}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Quantity:</h3>
                        {isEditing ? (
                            <input
                                type="number"
                                name="quantity"
                                value={editedProduct.quantity || ''}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 w-full mb-2 rounded-lg"
                                placeholder="Quantity"
                            />
                        ) : (
                            <p className="text-lg">{editedProduct.quantity}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
