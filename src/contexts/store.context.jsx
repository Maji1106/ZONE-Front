import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

const StoreContext = createContext();

const initialState = {
  stores: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_STORES':
      return { ...state, stores: action.payload };
    case 'ADD_STORE':
      return { ...state, stores: [...state.stores, action.payload] };
    case 'DELETE_STORE':
      return { ...state, stores: state.stores.filter(store => store.id !== action.payload) };
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchAllStores = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/stores');
      dispatch({ type: 'SET_STORES', payload: response.data });
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const addStore = async (storeData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/stores', storeData, {
        headers: {
          'Authorization': `Bearer ${eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMwNjQ2NTMxLCJleHAiOjE3MzA3MzI5MzF9.bqSwCtJcs2Hy1FNw7hsJwY9LRF5BvPcpaQp1luAoHug}`, // แทนที่ 'your_token' ด้วย token ของคุณ
          'Content-Type': 'application/json'
        }
      });
      dispatch({ type: 'ADD_STORE', payload: response.data });
    } catch (error) {
      console.error('Error adding store:', error);
    }
  };
  

  const deleteStore = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/stores/${id}`);
      dispatch({ type: 'DELETE_STORE', payload: id });
    } catch (error) {
      console.error('Error deleting store:', error);
    }
  };

  return (
    <StoreContext.Provider value={{ ...state, fetchAllStores, addStore, deleteStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => useContext(StoreContext);
