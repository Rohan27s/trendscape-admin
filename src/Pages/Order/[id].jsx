import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams,useNavigate } from 'react-router-dom';
import { deleteOrder, fetchOrderDetails } from '../../Redux/reducers/ordersSlice';
import Loading from '../../Component/Loading';

const Order = () => {
    const { id } = useParams(); // Extract order ID from URL
    const dispatch = useDispatch();
    const orderDetails = useSelector(state => state.orders.orderDetails);
    const loading = useSelector(state => state.orders.loading);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
      // Dispatch action to fetch order details when component mounts
      dispatch(fetchOrderDetails(id));
    }, [dispatch, id]);
  
    const handleDelete = () => {
      dispatch(deleteOrder(id));
      setShowConfirmation(false);
      navigate('/orders');
    };

  return (
    <div className="max-w-4xl mx-auto py-8">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="flex flex-row justify-between ">
          <h1 className="text-3xl font-semibold mb-4">Order Details</h1>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => setShowConfirmation(true)}>
              Delete Order
            </button>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Shipping Details</h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{orderDetails?.shippingDetails?.name}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Mobile Number</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{orderDetails?.shippingDetails?.mobileNumber}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{orderDetails?.shippingDetails?.houseStreet}, {orderDetails?.shippingDetails?.cityTown}, {orderDetails?.shippingDetails?.state} - {orderDetails?.shippingDetails?.pincode}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Order Summary</h3>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-4">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Items</h3>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  {orderDetails?.cartItems.map((item, index) => (
                    <div key={index} className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Product {index + 1}</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                        <div className="flex items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.quantity} x ₹{item.price}</p>
                          </div>
                        </div>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="px-4 py-5 bg-gray-50 sm:px-6">
                <p className="text-sm font-medium text-gray-900">Order Total: ₹{orderDetails?.cartTotal}</p>
              </div>
            </div>
          </div>
          {showConfirmation && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-4 rounded-md shadow-lg">
                <p className="text-lg font-semibold mb-4">Are you sure you want to delete this order?</p>
                <div className="flex justify-center">
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md mr-4" onClick={handleDelete}>
                    Delete
                  </button>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => setShowConfirmation(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}  
        </div>
        
      )}
    </div>
  );
}

export default Order;
