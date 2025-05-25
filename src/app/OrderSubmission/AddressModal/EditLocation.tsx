import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { useADDRESS } from '../../../context/GetAddress';
import { NULL } from "sass";


interface PopupProps {

  onClose: () => void;
  itemid :number;

}

const EditLocation: React.FC<PopupProps> = ({  onClose, itemid }) => {
  const mapRef = useRef<any>(null);
  const miniMapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const miniMarkerRef = useRef<any>(null);
  const [lat, setLat] = useState<number>(35.699756);
  const [lng, setLng] = useState<number>(51.338076);
  const [showAddressForm, setShowAddressForm] = useState(true);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const { data,fetchData } = useADDRESS();
  const [dataAddress, setData] = useState({
    id:"",
    username: "",
    address:"",
    title:"",
    home_floor: "", 
    home_unit:"",
    home_plaque:""
  });
  const [addressData, setAddressData] = useState({
    mainAddress: "",
    detailedAddress: "",
    plaque: "",
    floor: "",
    unit: "",
    addressTitle: ""
  });

  useEffect(() => {
    getAddressData(itemid)
  }, [itemid]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
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
  const getAddressData = async(id)=>{
        try {
            const response = await axios.get(`https://nanziback.liara.run/users/locations/modify/${id}/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            console.log("Raw Response:", response.data);

            if (response.data) {
                const sortedData = {
                    id: response.data.id,
                    username: response.data.user?.username || "Unknown",
                    address: response.data.address,
                    title: response.data.name,
                    home_floor: response.data.home_floor, 
                    home_unit: response.data.home_unit,
                    home_plaque: response.data.home_plaque
                };

                setData(sortedData);
            } else {
                console.log("errorrrrr")
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
  }


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
                value={dataAddress.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                // placeholder={dataAddress.address}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <h2 className="font-semibold mb-2">پلاک</h2>
                <input
                  type="text"
                  name="plaque"
                  value={dataAddress.home_plaque}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  // placeholder={dataAddress.home_plaque}
                />
              </div>
              <div>
                <h2 className="font-semibold mb-2">طبقه</h2>
                <input
                  type="text"
                  name="floor"
                  value={dataAddress.home_floor}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  // placeholder={dataAddress.home_floor}
                />
              </div>
              <div>
                <h2 className="font-semibold mb-2">واحد</h2>
                <input
                  type="text"
                  name="unit"
                  value={dataAddress.home_unit}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  // placeholder={dataAddress.home_unit}
                />
              </div>
            </div>

            <div className="mb-6">
              <h2 className="font-semibold mb-2">عنوان آدرس</h2>
              <input
                type="text"
                name="addressTitle"
                value={dataAddress.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                // placeholder={dataAddress.title}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#f18825] text-white py-3 rounded-lg text-lg font-semibold"
            >
              به روز رسانی آدرس
            </button>
          </div>
      </div>
    </div>
  );
};

export default EditLocation;