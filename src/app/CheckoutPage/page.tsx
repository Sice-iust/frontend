import Cart from "../CheckoutPage/Cart/Cart"


export default function Checkout() {
  
  return (
    <div className={`flex-shrink-0  flex flex-row bg-[#f5f5f5]`}>
      <div className={`flex-shrink-0`}> 
        <Cart/>  
      </div>
    </div>
  );
}