// components/Profile/Sidebar.tsx
import Link from "next/link";


export default function Sidebar() {
  return (
    
    <div className="w-full bg-red-400 shadow-md p-4 mt-5">
      
        <ul className="space-y-2">
          <li>
            <Link href="/profile" className="block p-2 hover:bg-gray-100 rounded">
              Profile Overview
            </Link>
          </li>
          <li>
            <Link href="/profile/orders" className="block p-2 bg-gray-100 rounded">
              My Orders
            </Link>
          </li>
          {/* Add more menu items as needed */}
        </ul>
      
    </div>
  );
}