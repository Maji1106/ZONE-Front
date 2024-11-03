// src/components/StoreList.js
import React, { useEffect, useState } from 'react';
import { fetchStores } from '../api';

const StoreList = ({ token }) => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const getStores = async () => {
      try {
        const data = await fetchStores(token);
        setStores(data);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    getStores();
  }, [token]);

  return (
    <div>
      <h1>Store List</h1>
      <ul>
        {stores.map(store => (
          <li key={store.id}>{store.name} - {store.address}</li>
        ))}
      </ul>
    </div>
  );
};

export default StoreList;
