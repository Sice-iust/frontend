import React, { useEffect, useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function LocationPopup({ onClose }) {
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState("");
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         () => {
//           setError("دسترسی به موقعیت مکانی رد شد.");
//         }
//       );
//     } else {
//       setError("مرورگر شما از قابلیت موقعیت مکانی پشتیبانی نمی‌کند.");
//     }
//   }, []);

//   useEffect(() => {
//     if (location && !mapRef.current) {
//       mapRef.current = L.map("map").setView([location.lat, location.lng], 15);

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "© OpenStreetMap contributors",
//       }).addTo(mapRef.current);

//       L.marker([location.lat, location.lng]).addTo(mapRef.current)
//         .bindPopup("موقعیت فعلی شما").openPopup();
//     }
//   }, [location]);

  return (
    // <div className="fixed inset-0 flex justify-center items-center z-10">
    //   <div className="fixed inset-0 bg-black opacity-50" aria-hidden="true"></div>
    //   <div className="relative bg-white p-4 rounded-lg shadow-lg min-w-120 min-h-30 w-auto">
    //     <div className="relative flex justify-center items-center">
    //       <h2 className="text-xl font-semibold mb-4">موقعیت شما روی نقشه</h2>
    //       <IoMdClose
    //         className="absolute right-0 top-0 h-7 w-5 text-gray-600 cursor-pointer"
    //         onClick={onClose}
    //       />
    //     </div>
    //     {error ? (
    //       <p className="text-red-500">{error}</p>
    //     ) : (
    //       <div id="map" className="w-96 h-60 rounded-lg shadow-md"></div>
    //     )}
    //   </div>
    // </div>
    <></>
  );
}