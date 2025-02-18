import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, selectAllOrders } from '../../store/orderSlice'; // Assurez-vous d'avoir ce slice

const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div>
      <h2>Gestion des Commandes</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>{order.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
