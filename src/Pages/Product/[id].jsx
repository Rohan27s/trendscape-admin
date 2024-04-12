import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../Redux/reducers/productSlice';

const Product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.product);
    const loading = useSelector(state => state.products.loading);
    const error = useSelector(state => state.products.error);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState({
        colors: [],
        sizes: [],
        quantity: {}
    });

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (product) {
            const { colors, sizes, quantity } = product;
            setEditedProduct({
                ...product,
                colors: colors || [],
                sizes: sizes || [],
                quantity: quantity || {}
            });
        }
    }, [product]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        if (product) {
            const { colors, sizes, quantity } = product;
            setEditedProduct({
                ...product,
                colors: colors || [],
                sizes: sizes || [],
                quantity: quantity || {}
            });
        }
    };

    const handleSave = () => {
        console.log("Saving edited product:", editedProduct);
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const handleAddColor = () => {
        const newColor = "";
        const newQuantity = {};
        editedProduct.sizes.forEach(size => {
            newQuantity[size] = 0;
        });
        setEditedProduct(prevState => ({
            ...prevState,
            colors: [...prevState.colors, newColor],
            quantity: {
                ...prevState.quantity,
                [newColor]: newQuantity
            }
        }));
    };
    const handleColorChange = (e, find) => {
        console.log("e",e.target.value);
        console.log("find",find);
console.log(editedProduct.colors);
        const { value } = e.target;
        // setEditedProduct(prevState => {
        //   const updatedColors = [...prevState.colors];
        // //   updatedColors[find] = value;
        //   return {
        //     ...prevState,
        //     colors: updatedColors
        //   };
        // });
      };
      


    const handleRemoveColor = (index) => {
        const updatedColors = [...editedProduct.colors];
        const removedColor = updatedColors.splice(index, 1)[0];
        const updatedQuantity = { ...editedProduct.quantity };
        delete updatedQuantity[removedColor];
        setEditedProduct(prevState => ({
            ...prevState,
            colors: updatedColors,
            quantity: updatedQuantity
        }));
    };


    if (loading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-center mt-8">Error: {error}</div>;
    if (!product) return null;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-end mb-4">
                {isEditing ? (
                    <>
                        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleCancelEdit}>Cancel</button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleSave}>Save</button>
                    </>
                ) : (
                    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleEdit}>Edit</button>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-center items-center">
                    <img src={product.images[0]} alt={product.name} className="w-80 h-80 object-cover rounded-lg" />
                </div>
                <div>
                    <h1 className="text-3xl font-semibold mb-4">{isEditing ? (
                        <input type="text" name="name" value={editedProduct.name} onChange={handleInputChange} className="border border-gray-300 p-2 w-full mb-2 rounded-lg" />
                    ) : (
                        product.name
                    )}</h1>
                    <p className="text-lg mb-2">Price: ₹{isEditing ? (
                        <input type="number" name="price" value={editedProduct.price} onChange={handleInputChange} className="border border-gray-300 p-2 w-full mb-2 rounded-lg" />
                    ) : (
                        product.price
                    )}</p>
                    <p className="text-lg mb-2">Brand: {isEditing ? (
                        <input type="text" name="brand" value={editedProduct.brand} onChange={handleInputChange} className="border border-gray-300 p-2 w-full mb-2 rounded-lg" />
                    ) : (
                        product.brand
                    )}</p>
                    <p className="text-lg mb-4">Rating: {isEditing ? (
                        <input type="number" name="rating" value={editedProduct.rating} onChange={handleInputChange} className="border border-gray-300 p-2 w-full mb-2 rounded-lg" />
                    ) : (
                        product.rating
                    )}</p>
                    <p className="text-lg mb-4">Description: {isEditing ? (
                        <textarea name="description" value={editedProduct.description} onChange={handleInputChange} className="border border-gray-300 p-2 w-full mb-2 rounded-lg" />
                    ) : (
                        product.description
                    )}</p>
                    <div className="mb-4">
                        {isEditing ? (
                            <>
                                <h3 className="text-lg font-semibold mb-2">Colors:</h3>
                                <div>
                                    {editedProduct.colors.map((color, index) => (
                                        <div key={"color-"+index} className="flex items-center mb-2">
                                            <input
                                                type="text"
                                                value={color}
                                                onChange={(e) => handleColorChange(e, "color-"+index)}
                                                className="border border-gray-300 p-2 w-full rounded-lg mr-2"
                                            />

                                            <button className="bg-red-500 text-white px-4 py-1 rounded-lg" onClick={() => handleRemoveColor(index)}>Remove</button>
                                        </div>
                                    ))}

                                    <button className="bg-green-500 text-white px-4 py-1 rounded-lg" onClick={handleAddColor}>Add Color</button>
                                </div>
                            </>
                        ) : (
                            <p className="text-lg font-semibold mb-2">Colors: {editedProduct.colors.join(', ')}</p>
                        )}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Quantity:</h3>
                        {isEditing ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Color</th>
                                        {editedProduct.sizes.map((size, index) => (
                                            <th key={index}>{size}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {editedProduct.colors.map((color, colorIndex) => (
                                        <tr key={colorIndex}>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={color}
                                                    onChange={(e) => {
                                                        const updatedColors = [...editedProduct.colors];
                                                        updatedColors[colorIndex] = e.target.value;
                                                        setEditedProduct({ ...editedProduct, colors: updatedColors });
                                                    }}
                                                    className="border border-gray-300 p-2 w-full rounded-lg"
                                                />
                                            </td>
                                            {editedProduct.sizes.map((size, sizeIndex) => (
                                                <td key={sizeIndex}>
                                                    <input
                                                        type="number"
                                                        value={editedProduct.quantity[color][size]}
                                                        onChange={(e) => {
                                                            const updatedQuantity = { ...editedProduct.quantity };
                                                            updatedQuantity[color][size] = parseInt(e.target.value);
                                                            setEditedProduct({ ...editedProduct, quantity: updatedQuantity });
                                                        }}
                                                        className="border border-gray-300 p-2 w-full rounded-lg"
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Color</th>
                                        {product.sizes.map((size, index) => (
                                            <th key={index}>{size}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(product.quantity).map(([color, sizes], index) => (
                                        <tr key={index}>
                                            <td>{color}</td>
                                            {product.sizes.map((size, index) => (
                                                <td key={index}>{sizes[size]}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
