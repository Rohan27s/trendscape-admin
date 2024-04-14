import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../Redux/reducers/productSlice';
import Loading from '../../Component/Loading';
import { Link } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const loading = useSelector(state => state.products.loading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
