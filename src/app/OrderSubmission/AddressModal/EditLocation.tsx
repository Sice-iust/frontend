import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { useADDRESS } from '../../../context/GetAddress';


interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect?: (lat: number, lng: number) => void;
}

const EditLocation: React.FC<PopupProps> = ({ isOpen, onClose, onLocationSelect }) => {
  const mapRef = useRef<any>(null);
  const miniMapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const miniMarkerRef = useRef<any>(null);
  const [lat, setLat] = useState<number>(35.699756);
  const [lng, setLng] = useState<number>(51.338076);
  const [showAddressForm, setShowAddressForm] = useState(true);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const { data,fetchData } = useADDRESS();
  const [addressData, setAddressData] = useState({
    mainAddress: "",
    detailedAddress: "",
    plaque: "",
    floor: "",
    unit: "",
    addressTitle: ""
  });

  useEffect(() => {
    if (showAddressForm && sdkLoaded && window.L) {
      initMiniMap();
    }
  }, [showAddressForm, sdkLoaded, lat, lng]);

  const initMiniMap = () => {
    if (miniMapRef.current) return;

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
    const backtomap = () => {
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
            home_floor : addressData.floor,
            name:addressData.addressTitle,
        }, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", }
        });
        fetchData();
    } catch (error) {
            console.error(error.response?.data);
    }
    console.log("Address submitted:", addressData);
    onClose();
  };



  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-md shadow-lg w-full max-w-2xl p-4 relative border border-gray-200">
        <CloseIcon 
          className="cursor-pointer rounded-full p-1 hover:bg-gray-100 text-2xl absolute top-2 right-2" 
          onClick={onClose} 
        />
          <div className="mt-4 p-4" dir="rtl">
            <h1 className="text-xl font-bold mb-6 text-center">ویرایش آدرس</h1>
            
            {/* <div className="mb-6 relative" style={{ height: "200px", width: "100%" }}>
              <div id="mini-map" className="flex flex-row" style={{ height: "100%", width: "100%", borderRadius: "8px", border: "1px solid #e5e7eb" }} />
              <button
                onClick={() => setShowAddressForm(false)}
                className="absolute bottom-2 right-2 bg-white text-gray-800 py-1 px-3 rounded-lg text-sm font-semibold shadow-md hover:bg-gray-100 transition"
                style={{ zIndex: 1000 }}
              >
                <div className="flex flex-row-reverse gap-1 cursor-pointer" onClick={backtomap}>
                  <span className="text-green-600">تغییر آدرس روی نقشه</span>
                  <FaRegEdit className="text-green-600 h-4 w-4"/>
                </div>
              </button>
            </div> */}

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
      </div>
    </div>
  );
};

export default EditLocation;