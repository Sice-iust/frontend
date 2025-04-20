import React from "react";  
import Navbar from "../../HomePage/navbar"; 
import Menu from "./OrdersPage-menu" 


const ProfileOrders = () => { 
  
  
  return (  
    <div className="mx-7 mt-10 mb-10 min-h-[200px] w-95% 
                    sm:w-[90%] mx-5 mt-10 mb-10
                    md:w-[80%] 
                    lg:w-[80%] 
                    xl:w-[70%] 
                    rounded-2xl bg-white shadow-md p-4"> 
      <Menu currentOrdersCount={2} finalOrdersCount={3} /> 
    </div>  
  );  
};  

export default ProfileOrders;  