import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../Redux/reducers/ordersSlice';
import Loading from '../../Component/Loading';
import { RiShoppingCart2Line } from 'react-icons/ri';

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.orders);
  const loading = useSelector(state => state.orders.loading);
  const token = useSelector((state) => state.auth.user.token);
  useEffect(() => {
    dispatch(fetchOrders(token));
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

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

  const handleRowClick = (orderId) => {
    window.location.href = `/orders/${orderId}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Orders</h1>
      {loading ? (
        <div className='h-screen w-full'>
          <Loading/>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ordered Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders?.map((order, index) => (
                <tr key={order._id} className={`bg-gray-50 hover:bg-gray-200 cursor-pointer transition duration-300`} onClick={() => handleRowClick(order._id)}>
                  <td className="px-6 py-4">TE000{index + 1}</td>
                  <td className="px-6 py-4">{order?.shippingDetails?.name}</td>
                  <td className="px-6 py-4">₹{order?.cartTotal}</td>
                  <td className="px-6 py-4">
                    <RiShoppingCart2Line className="inline-block mr-2 text-gray-500" />
                    {order?.cartItems?.length}
                  </td>
                  <td className="px-6 py-4">{formatDate(order?.createdAt)}</td>
                  <td className="px-6 py-4">
                    {order?.paymentMethod === 'cod' ? (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md">Pending</span>
                    ) : (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md">Paid</span>
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

export default Orders;
