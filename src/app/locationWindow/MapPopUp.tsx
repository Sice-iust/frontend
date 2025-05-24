import React, { useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";

declare global {
  interface Window {
    L?: any;
  }
}

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) return;

    const scriptId = "neshan-map-sdk";
    const styleId = "leaflet-style";

    const loadMap = () => {
      if (!window.L) {
        console.error("Neshan Leaflet SDK not available");
        return;
      }

      if (!document.getElementById(styleId)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        link.id = styleId;
        document.head.appendChild(link);
      }

      if (!mapRef.current) {
        mapRef.current = new window.L.Map("map", {
          key: "web.22af1a5a63b741ec80c20d2c00a31174", 
          maptype: "neshan",
          poi: true,
          traffic: true,
          center: [35.699756, 51.338076], 
          zoom: 14,
        });

        const marker = new window.L.Marker([35.699756, 51.338076], {
          draggable: true,
        }).addTo(mapRef.current);

        marker.bindPopup(
          '<p style="text-align:center;">سلام<br/>با نگه داشتن موس می‌توانید من را جابه‌جا کنید</p>'
        ).openPopup();
      }
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.4/index.js";
      script.async = true;
      script.id = scriptId;
      document.body.appendChild(script);

      script.onload = loadMap;
      script.onerror = () => {
        console.error("Error loading Neshan SDK");
      };
    } else if (window.L) {
      loadMap();
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isOpen]);

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-md shadow-lg w-full max-w-2xl p-4 relative border border-gray-200">
        <CloseIcon
          className="cursor-pointer rounded-full p-1 hover:bg-gray-100 text-2xl absolute top-2 right-2"
          onClick={onClose}
        />
        <div className="mt-2">
          <div style={{ height: "500px", width: "100%" }}>
            <div id="map" style={{ height: "100%", width: "100%" }} />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Popup;