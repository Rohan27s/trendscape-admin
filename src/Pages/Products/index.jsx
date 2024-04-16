import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../Redux/reducers/productSlice';
import Loading from '../../Component/Loading';
import { Link } from 'react-router-dom';
import { FiTrash2, FiEdit } from 'react-icons/fi'; // Importing icons from react-icons
import { IoAdd } from "react-icons/io5";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const loading = useSelector(state => state.products.loading);
  const [selectedProductId, setSelectedProductId] = useState(null); // To store the product id of the selected product for deletion

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (productId, e) => {
    e.stopPropagation(); // Stop event propagation to prevent row click
    await dispatch(deleteProduct(productId));
    // Fetch products again after deletion
    dispatch(fetchProducts());
  };

  const handleDeleteConfirmation = (productId) => {
    setSelectedProductId(productId);
  };

  const handleCancelDelete = (e) => {
    e.stopPropagation();
    setSelectedProductId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Products</h1>
        <Link to={`/products/create`} >
          <button className="flex flex-row items-center justify-center gap-1 bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
          <IoAdd className='text-2xl font-bold'/>  Create Product
          </button>
        </Link>
      </div>
      {loading ? (
        <div className='h-screen w-full'>
          <Loading />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products?.map((product, index) => (
                <tr key={product._id} className={`bg-gray-50 hover:bg-gray-200 cursor-pointer transition duration-300`} onClick={() => window.location.href=`/products/${product._id}`}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    <img src={product.images[0]} alt={product.name} className="h-14 w-14 object-cover rounded-md" />
                  </td>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">₹{product.price}</td>
                  <td className="px-6 py-4">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={(e) => { e.stopPropagation(); handleDeleteConfirmation(product._id); }}>
                      <FiTrash2 className="inline-block mr-1" /> Delete
                    </button>
                    {selectedProductId === product._id && (
                      <div className="fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-4 rounded-md shadow-lg">
                          <p>Are you sure you want to delete this product?</p>
                          <div className="flex justify-center mt-4">
                            <button className="bg-red-500 text-white px-4 py-2 rounded-md mr-4" onClick={(e) => { e.stopPropagation(); handleDelete(product._id, e); }}>
                              Delete
                            </button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={handleCancelDelete}>
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Products;
