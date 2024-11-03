// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useStoreContext } from "../contexts/store.context"; // ตรวจสอบการนำเข้าให้ถูกต้อง
import { useAuthContext } from "../contexts/auth.context";
import Map from "../components/Map";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { fetchAllStores, stores } = useStoreContext(); // ดึง fetchAllStores และ stores

  const [myLocation, setMyLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    if (user) {
      fetchAllStores();
    }
  }, [user, fetchAllStores]); // Added user as a dependency

  if (!stores) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">MAP</h1>
      <Map stores={stores} /> {/* ส่ง props stores ให้กับ Map */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2"></h2>
        <ul className="list-disc list-inside">
          {stores.map((store) => (
            <li key={store.id} className="my-2">
              {store.name} - {store.location}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
