import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { useADDRESS } from '../../context/GetAddress';

declare global {
  interface Window {
    L?: any;
  }
}

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect?: (lat: number, lng: number) => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, onLocationSelect }) => {
  const mapRef = useRef<any>(null);
  const miniMapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const miniMarkerRef = useRef<any>(null);
  const [lat, setLat] = useState<number>(35.699756);
  const [lng, setLng] = useState<number>(51.338076);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const { data, fetchData } = useADDRESS();
  const [addressData, setAddressData] = useState({
    mainAddress: "",
    detailedAddress: "",
    plaque: "",
    floor: "",
    unit: "",
    addressTitle: ""
  });

  // Load the map SDK and initialize maps
  useEffect(() => {
    if (!isOpen) return;

    const scriptId = "neshan-map-sdk";
    const styleId = "leaflet-style";

    const loadSDK = () => {
      setSdkLoaded(true);
      initializeMaps();
    };

    const initializeMaps = () => {
      if (!window.L) {
        console.error("Neshan Leaflet SDK not available");
        return;
      }

      // Add CSS if not already added
      if (!document.getElementById(styleId)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.8/index.css";
        link.id = styleId;
        document.head.appendChild(link);
      }

      // Initialize main map when not in address form view
      if (!showAddressForm) {
        initializeMainMap();
      } else {
        initializeMiniMap();
      }
    };

    const initializeMainMap = () => {
      // Remove existing map if it exists
      if (mapRef.current) {
        mapRef.current.remove();
      }

      // Create new map instance
      mapRef.current = new window.L.Map("map", {
        key: "web.449b3e29ce6b4a19952518f63277f678",
        maptype: "neshan",
        poi: true,
        traffic: true,
        center: [lat, lng],
        zoom: 14,
      });

      const orangeIcon = new window.L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      markerRef.current = new window.L.Marker([lat, lng], {
        icon: orangeIcon,
        draggable: false,
      }).addTo(mapRef.current);

      mapRef.current.on("click", (e: any) => {
        const { lat, lng } = e.latlng;
        markerRef.current.setLatLng([lat, lng]);
        setLat(lat);
        setLng(lng);
        if (onLocationSelect) {
          onLocationSelect(lat, lng);
        }
      });
    };

    const initializeMiniMap = () => {
      if (miniMapRef.current) {
        miniMapRef.current.setView([lat, lng], 16);
        miniMarkerRef.current.setLatLng([lat, lng]);
        return;
      }

      miniMapRef.current = new window.L.Map("mini-map", {
        key: "web.449b3e29ce6b4a19952518f63277f678",
        maptype: "neshan",
        poi: false,
        traffic: false,
        center: [lat, lng],
        zoom: 16,
        scrollWheelZoom: false,
        dragging: false,
        zoomControl: false,
        touchZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
      });

      const orangeIcon = new window.L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      miniMarkerRef.current = new window.L.Marker([lat, lng], {
        icon: orangeIcon,
      }).addTo(miniMapRef.current);
    };

    // Load SDK if not already loaded
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.8/index.js";
      script.async = true;
      script.id = scriptId;
      document.body.appendChild(script);

      script.onload = loadSDK;
      script.onerror = () => {
        console.error("Error loading Neshan SDK");
      };
    } else if (window.L) {
      loadSDK();
    }

    return () => {
      // Cleanup when component unmounts
      if (mapRef.current) {
        mapRef.current.off("click");
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
      if (miniMapRef.current) {
        miniMapRef.current.remove();
        miniMapRef.current = null;
        miniMarkerRef.current = null;
      }
    };
  }, [isOpen, showAddressForm, lat, lng, onLocationSelect]);

  const backToMap = () => {
    setShowAddressForm(false);
  };

  const handleShowAddress = async () => {
    try {
      const response = await axios.get(`https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`, {
        headers: {
          "Api-Key": "service.aa597c7703fa42c79faa9ba8f6eb62b7",
        },
      });

      setAddressData(prev => ({
        ...prev,
        mainAddress: response.data.formatted_address || "",
        detailedAddress: response.data.route?.name || ""
      }));
      
      setShowAddressForm(true);
    } catch (error) {
      console.error("Error fetching address:", error);
      setShowAddressForm(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`https://nanziback.liara.run/users/locations/mylocation/`, {
        address: addressData.mainAddress,
        home_plaque: addressData.plaque,
        home_unit: addressData.unit,
        home_floor: addressData.floor,
        name: addressData.addressTitle,
      }, {
        headers: { 
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json", 
        }
      });
      fetchData();
      onClose();
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-md shadow-lg w-full max-w-2xl p-4 relative border border-gray-200">
        <CloseIcon 
          className="cursor-pointer rounded-full p-1 hover:bg-gray-100 text-2xl absolute top-2 right-2" 
          onClick={onClose} 
        />
        
        {!showAddressForm ? (
          <div className="mt-2">
            <div style={{ height: "500px", width: "100%" }}>
              <div id="map" style={{ height: "100%", width: "100%" }} />
            </div>
            <button
              onClick={handleShowAddress}
              className="w-full h-15 bg-[#f18825] mt-5 rounded-xl items-center text-2xl justify-center text-center text-white py-3"
            >
              تایید موقعیت روی نقشه
            </button>
          </div>
        ) : (
          <div className="mt-4 p-4" dir="rtl">
            <h1 className="text-xl font-bold mb-6 text-center">آدرس جدید</h1>
            
            <div className="mb-6 relative" style={{ height: "200px", width: "100%" }}>
              <div id="mini-map" className="flex flex-row" style={{ height: "100%", width: "100%", borderRadius: "8px", border: "1px solid #e5e7eb" }} />
              <button
                onClick={backToMap}
                className="absolute bottom-2 right-2 bg-white text-gray-800 py-1 px-3 rounded-lg text-sm font-semibold shadow-md hover:bg-gray-100 transition"
                style={{ zIndex: 1000 }}
              >
                <div className="flex flex-row-reverse gap-1 cursor-pointer">
                  <span className="text-green-600">تغییر آدرس روی نقشه</span>
                  <FaRegEdit className="text-green-600 h-4 w-4"/>
                </div>
              </button>
            </div>

            <div className="mb-6">
              <h2 className="font-semibold mb-2">نشانی</h2>
              <input
                type="text"
                name="mainAddress"
                value={addressData.mainAddress}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="مثال: انقلاب اسلامی، جمالزاده"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <h2 className="font-semibold mb-2">پلاک</h2>
                <input
                  type="text"
                  name="plaque"
                  value={addressData.plaque}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <h2 className="font-semibold mb-2">طبقه</h2>
                <input
                  type="text"
                  name="floor"
                  value={addressData.floor}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <h2 className="font-semibold mb-2">واحد</h2>
                <input
                  type="text"
                  name="unit"
                  value={addressData.unit}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="mb-6">
              <h2 className="font-semibold mb-2">عنوان آدرس</h2>
              <input
                type="text"
                name="addressTitle"
                value={addressData.addressTitle}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="مثال: خانه، محل کار"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#f18825] text-white py-3 rounded-lg text-lg font-semibold"
            >
              ذخیره آدرس
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;