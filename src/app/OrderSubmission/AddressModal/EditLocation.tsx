import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { useADDRESS } from '../../../context/GetAddress';
import { NULL } from "sass";
import { convertToPersianNumbers } from "../../../utils/Coversionutils";


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


  useEffect(() => {
    getAddressData()
  }, [itemid]);

  const [addressData, setAddressData] = useState({
      mainAddress: "",
      plaque: "",
      floor: "",
      unit: "",
      addressTitle: "",
  });

  const getAddressData = async () => {
      try {
          const response = await axios.get(`https://nanziback.liara.run/users/locations/modify/${itemid}/`, {
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
                  home_plaque: response.data.home_plaque,
              };

              setData(sortedData); 
              setAddressData({ 
                  mainAddress: sortedData.address || "",
                  plaque: sortedData.home_plaque || "",
                  floor: sortedData.home_floor || "",
                  unit: sortedData.home_unit || "",
                  addressTitle: sortedData.title || "",
              });
          }
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setAddressData((prev) => ({
          ...prev,
          [name]: value,
      }));
  };


  const handleSubmit = async (e: React.FormEvent ) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {

        await await axios.put(`https://nanziback.liara.run/users/locations/modify/${itemid}/`, {
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
      <div className="bg-white dark:bg-[#191919] rounded-md shadow-lg w-full max-w-2xl p-4 relative border dark:text-white border-gray-200 dark:border-black" >
        <CloseIcon 
          className="cursor-pointer rounded-full p-1 hover:bg-gray-100 text-2xl absolute top-2 right-2" 
          onClick={onClose} 
        />
          <div className="mt-4 p-4" dir="rtl">
            <h1 className="text-xl font-bold mb-6 text-center">ویرایش آدرس</h1>

            <div className="mb-6">
              <h2 className="font-semibold mb-2">نشانی</h2>
              <input
                type="text"
                name="mainAddress"
                value={addressData.mainAddress}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <h2 className="font-semibold mb-2">پلاک</h2>
                <input
                  type="text"
                  name="plaque"
                  value={convertToPersianNumbers(addressData.plaque)}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <h2 className="font-semibold mb-2">طبقه</h2>
                <input
                  type="text"
                  name="floor"
                  value={convertToPersianNumbers(addressData.floor)}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <h2 className="font-semibold mb-2">واحد</h2>
                <input
                  type="text"
                  name="unit"
                  value={convertToPersianNumbers(addressData.unit)}
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
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#f18825] text-white dark:text-black py-3 rounded-lg text-lg font-semibold"
            >
              به روز رسانی آدرس
            </button>
          </div>
      </div>
    </div>
  );
};

export default EditLocation;