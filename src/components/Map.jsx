import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import Swal from "sweetalert2";
import LocationMap from "./LocationMap";
import StoreService from "../services/Store.services";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css"; // ใช้ CSS สำหรับ Leaflet

// Define custom icons
const storeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/9198/9198446.png",
  iconSize: [38, 38],
  iconAnchor: [22, 38],
  popupAnchor: [0, -40],
});

const houseIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/7720/7720526.png",
  iconSize: [38, 38],
  iconAnchor: [22, 38],
  popupAnchor: [0, -40],
});

const selectedStoreIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/7877/7877890.png",
  iconSize: [38, 38],
  iconAnchor: [22, 38],
  popupAnchor: [0, -40],
});

function Map({ stores }) {
  const center = [13.838500199744178, 100.02534412184882];
  const [myLocation, setMylocation] = useState({ lat: "", lng: "" });
  const [selectedStore, setSelectedStore] = useState(null);
  const navigate = useNavigate(); // สร้าง instance ของ navigate

  useEffect(() => {
    handlerGetLocation(); // Get location on mount
  }, []);

  const handlerGetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMylocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  const handleLocationCheck = () => {
    // ... (same as previous)
  };

  const handleDelete = async (storeId) => {
    // ... (same as previous)
  };

  return (
    <>
      <div className="flex justify-center mb-4">
        <button
          className="btn btn-outline btn-accent"
          onClick={handlerGetLocation}
        >
          Get My Location
        </button>
        <button
          className="btn btn-outline btn-accent"
          onClick={handleLocationCheck}
        >
          Check Delivery Availability
        </button>
      </div>

      <div>
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "80vh", width: "80%", margin: "0 auto" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {stores.map((store) => (
            <Marker
              key={store.storeId}
              position={[store.latitude, store.longitude]}
              icon={
                selectedStore && selectedStore.storeId === store.storeId
                  ? selectedStoreIcon
                  : storeIcon
              }
              eventHandlers={{
                click: () => {
                  setSelectedStore(store);
                },
              }}
            >
              <Popup className="popup">
                <b>{store.storeName}</b>
                <p>{store.address}</p>
                <p>Delivery Radius: {store.deliveryRadius} meters</p>
                <a
                  href={store.direction}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Direction
                </a>
                <div className="popup-actions">
                  <button
                    onClick={() => navigate(`/edit/${store.storeId}`)} // นำทางไปยังหน้าแก้ไข
                    className="popup-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(store.storeId)} // เรียกใช้ฟังก์ชัน handleDelete
                    className="popup-button"
                  >
                    Delete
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}

          <LocationMap
            myLocation={myLocation}
            icon={houseIcon}
            onLocationSelect={setMylocation}
          />

          {selectedStore && (
            <>
              <Circle
                center={[selectedStore.latitude, selectedStore.longitude]}
                radius={selectedStore.deliveryRadius}
                color="#008163"
                fillColor="#008163"
                fillOpacity={0.2}
                weight={1.5}
              />
              <Marker
                position={[selectedStore.latitude, selectedStore.longitude]}
                icon={selectedStoreIcon}
              >
                <Popup>
                  <b>{selectedStore.name}</b>
                  <p>{selectedStore.address}</p>
                </Popup>
              </Marker>
            </>
          )}
        </MapContainer>
      </div>
    </>
  );
}

export default Map;
