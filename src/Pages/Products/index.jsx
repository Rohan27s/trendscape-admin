import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../Redux/reducers/productSlice';
import Loading from '../../Component/Loading';
import { Link } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const loading = useSelector(state => state.products.loading);
  const [selectedProductId, setSelectedProductId] = useState(null); // To store the product id of the selected product for deletion

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async () => {
    if (selectedProductId) {
      await dispatch(deleteProduct(selectedProductId));
      setSelectedProductId(null);
      // Fetch products again after deletion
      dispatch(fetchProducts());
    }
  };
  

  const handleDeleteConfirmation = (productId) => {
    setSelectedProductId(productId);
  };

  const handleCancelDelete = () => {
    setSelectedProductId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Products</h1>
        <Link to={`/products/create`}>
          <button className="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
            Create Product
          </button>
        </Link>
      </div>
      {loading ? (
        <div className='h-screen w-full'>
          <Loading />
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr.No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products?.map((product, index) => (
              <tr key={product._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={product.images[0]} alt={product.name} className="h-12 w-12 object-cover" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">₹{product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/products/${product._id}`}>
                    <button className="border-2 text-black border-slate-900 rounded-md bg-transparent hover:bg-slate-700 hover:text-white font-bold py-2 px-4 ">
                      View
                    </button>
                  </Link>
                  <button className="border-2 text-black border-red-500 rounded-md bg-transparent hover:bg-red-500 hover:text-white font-bold py-2 px-4 ml-2" onClick={() => handleDeleteConfirmation(product._id)}>
                    Delete
                  </button>
                  {selectedProductId === product._id && (
                    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-50 flex justify-center items-center">
                      <div className="bg-white p-4 rounded-md shadow-lg">
                        <p>Are you sure you want to delete this product?</p>
                        <div className="flex justify-center mt-4">
                          <button className="bg-red-500 text-white px-4 py-2 rounded-md mr-4" onClick={handleDelete}>Delete</button>
                          <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={handleCancelDelete}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Products;
