import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../Redux/reducers/ordersSlice';
import { BsBox, BsArrowRightShort } from 'react-icons/bs';
import { RiShoppingCart2Line } from 'react-icons/ri';
import Loading from '../../Component/Loading';

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.orders);
  const loading = useSelector(state => state.orders.loading);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Function to format the ordered date
  // Function to format the ordered date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  // Function to format time
  const formatTime = (date) => {
    return `${date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}`;
  };

  if (date.toDateString() === today.toDateString()) {
    return `Today at ${formatTime(date)}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${formatTime(date)}`;
  } else {
    return date.toLocaleDateString();
  }
};


  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Orders</h1>
      {loading ? (
        <div className='h-screen w-full'>
          <Loading/>
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ordered Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders?.map((order, index) => (
              <tr key={order._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-nowrap">TD000{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order?.shippingDetails?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">₹{order?.cartTotal}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RiShoppingCart2Line className="inline-block mr-2 text-gray-500" />
                  {order?.cartItems?.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{formatDate(order?.createdAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order?.paymentMethod === 'COD' ? (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md">Pending</span>
                  ) : (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md">Paid</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-500 flex items-center">
                    View
                    <BsArrowRightShort className="ml-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
