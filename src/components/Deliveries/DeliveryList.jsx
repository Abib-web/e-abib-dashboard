import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeliveries, selectAllDeliveries } from '../../store/deliverySlice'; // Assurez-vous d'avoir ce slice

const DeliveryList = () => {
  const dispatch = useDispatch();
  const deliveries = useSelector(selectAllDeliveries);

  useEffect(() => {
    dispatch(fetchDeliveries());
  }, [dispatch]);

  return (
    <div>
      <h2>Gestion des Livraisons</h2>
      <ul>
        {deliveries.map(delivery => (
          <li key={delivery.id}>{delivery.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default DeliveryList;
